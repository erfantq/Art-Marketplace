<?php
namespace App\Services;

use App\Models\DBConnection;
use App\Models\Notification;
use App\Notifications\BiddingLoserNotification;
use App\Notifications\BiddingWinnerNotification;
use Carbon\Carbon;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;
use Exception;
use Illuminate\Support\Facades\Session;

class BiddingService
{
    private $db;
    private $biddingsCollection;
    private $artsCollection;
    private $usersCollection;
    private $transactionService;

    public function __construct() {
        $this->db = DBConnection::getDb();
        $this->biddingsCollection = $this->db->biddings;
        $this->artsCollection = $this->db->arts;
        $this->usersCollection = $this->db->users;
        $this->transactionService = new TransactionsService();
    }
    public function processAdd($info)
    {
        try {
            $this->store($info);
            $this->changeArtBiddingStatus($info['art_id'], true);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

    }

    public function processDelete($artId)
    {
        try {
            $this->deleteBidding($artId);
            $this->changeArtBiddingStatus(new ObjectId((string) $artId), false);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function processNewSuggestion($user, $artId, $suggestedPrice)
    {
        try {
            $buyerUsername = $user['username'];
            $bidding = $this->biddingsCollection->findOne(['art_id' => new ObjectId((string) $artId)]);
            if($user['wallet_balance'] < $suggestedPrice) {
                throw new \Exception("First charge your wallet.");
            }
            if(!$this->canPurchase($bidding, $suggestedPrice)) {
                throw new \Exception("You should suggest a higher price than last suggested price.");
            }
            if($bidding['winner'] != null) {
                $this->processOldWinner($bidding);
            }
            $this->processNewWinner($user, $suggestedPrice);

            $this->updateBiddingInfo($buyerUsername, $artId, $suggestedPrice);
            

        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function processExpiredBiddings()
    {
        try {
            // $now = Carbon::now();
            $now = new UTCDateTime(Carbon::now()->timestamp * 1000);
            $biddings = $this->biddingsCollection->find()->toArray();
            foreach ($biddings as $bidding) {
                if($now >= $bidding['end_time']) {
                    
                    $winnerUsername = $bidding['winner'];
                    $winner = $this->usersCollection->findOne(['username' => $winnerUsername]);
                    $artId = $bidding['art_id'];
                    $this->updateTransaction($bidding, $winner, $artId);

                    $this->updateArt($artId);

                    $this->updateBidding($artId);

                    // $winner->notify(new BiddingWinnerNotification($bidding));
                    Notification::insertWinnerNotification($bidding);
                }
            }
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
    }

    private function updateTransaction($bidding, $winner, $artId)
    {
        
        $artIdString = (string) $artId;
        $transactionInfo = [
            'timestamp' => Carbon::now(),
            'buyer' => $winner,
            'artId' => new ObjectId((string) $artId),
            'number' => 1,
            'order_status' => 0,    
            'bidding' => true,
        ];
        $this->transactionService->processPurchase($winner, $artIdString, $transactionInfo, true);

    }

    private function updateArt($artId)
    {
        
        $filter = ['_id' => $artId];
        $update = ['$set' => ['bidding' => false]];
        $this->artsCollection->updateOne($filter, $update);
    }

    private function updateBidding($artId)
    {
        $this->biddingsCollection->deleteOne(['art_id' => $artId]);
    }

    private function processOldWinner($bidding)  // notify
    {
        try {
            $backMoney = $bidding['highest_suggestion'];
            $oldWinnerUsername = $bidding['winner'];

            $oldWinner = $this->usersCollection->findOne(['username' => $oldWinnerUsername]);

            $oldUserWalletBalance = $oldWinner['wallet_balance'];
            $oldUserNewWalletBalance = $oldUserWalletBalance + $backMoney;

            $filter = ['username' => $oldWinnerUsername];
            $update = ['$set' => ['wallet_balance' => $oldUserNewWalletBalance]];
            $this->usersCollection->updateOne($filter, $update);

            // $oldWinner->notify(new BiddingLoserNotification($bidding, $oldWinnerUsername));
            Notification::insertLoserNotification($bidding, $oldWinnerUsername);
        } catch (\Exception $e) {
            throw new \Exception("Database error1: " . $e->getMessage());
        }
    }




    private function processNewWinner($user, $suggestedPrice)
    {
        try {
            $currentWalletBalance = $user['wallet_balance'];
            $newWalletBalance = $currentWalletBalance - $suggestedPrice;
            $username = $user['username'];
            
            $filter = ['username' => $username];
            $update = ['$set' => ['wallet_balance' => $newWalletBalance]];
            $this->usersCollection->updateOne($filter, $update);

            $user['wallet_balance'] = $newWalletBalance;
            Session::put('user', $user);
        } catch (\Exception $e) {
            throw new \Exception("Database error2: " . $e->getMessage());
        }
    }

    private function updateBiddingInfo($buyerUsername, $artId, $suggestedPrice)
    {
        try {
            $filter = ['art_id' => new ObjectId((string) $artId)];
            $update = ['$set' => ['winner' => $buyerUsername, 'highest_suggestion' => $suggestedPrice]];

            $this->biddingsCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
    }

    private function canPurchase($bidding, $suggestedPrice): bool
    {
        try {
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
        if($bidding['winner'] != null) {
            if($this->isNewSuggestionMoreExpensive($bidding['highest_suggestion'], $suggestedPrice)) {
                return true;
            }
        } else {
            if($this->isNewSuggestionMoreExpensive($bidding['base_price'], $suggestedPrice)) {
                return true;
            }
        }
        return false;
    }

    private function isNewSuggestionMoreExpensive($oldSuggestion, $newSuggestion)
    {
        return $newSuggestion > $oldSuggestion;
    }

    private function deleteBidding($artId)
    {
        try {
            $this->biddingsCollection->deleteOne(['art_id' => new ObjectId((string) $artId)]);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
    }

    private function store($info)
    {
        try {
            $this->biddingsCollection->insertOne($info);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
    }

    private function changeArtBiddingStatus($artId, $status)
    {
        try {
            $filter = ['_id' => $artId];
            $update = ['$set' => ['bidding' => $status]];
            $this->artsCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new Exception("Datebase error: " . $e->getMessage());
        }
    }
}