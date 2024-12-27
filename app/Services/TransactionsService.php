<?php

namespace App\Services;

use App\Models\Arts;
use App\Models\DBConnection;
use App\Models\User;
use MongoDB\BSON\ObjectId;
use Exception;

class TransactionsService   
{

    protected $userCollection;
    protected $artsCollection;
    protected $transactionsCollection;

    public function __construct()
    {
        $db = DBConnection::getDb();
        $this->userCollection = $db->users;
        $this->artsCollection = $db->arts;
        $this->transactionsCollection = $db->transactions;
    }

    public function changeOrderStatus($transactionId, $status)
    {
    
        $filter = ['_id' => new ObjectId((string) $transactionId)];
        $update = ['$set' => ['oreder_status' => $status]];
        try {
            $this->transactionsCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
        return response()->json(['message' => 'Buy request approved successfully']);
      
    }

    public function processPurchase($buyerUsername, $artId, $transactionInfo, $isBidding)
    {
        try {
            $buyer = User::findUser($buyerUsername);
            $art = Arts::getArt($artId);

            if(!self::checkWalletBalance($buyer, $art)) {
                throw new \Exception("Insufficient wallet balance.");
            }

            // Insert the transaction info in transactionsCollection
            $transactionInsert = self::insertIntoTransaction($transactionInfo);

            $transactionId = $transactionInsert->getInsertedId();
            // update the wallet_balance and previous_purchases for seller
            self::updateSeller($art, $transactionId);

            // update the wallet_balance and previous_purchases for buyer
            self::updateBuyer($art, $buyer, $transactionId, $isBidding);

            // update the number and sold_number for art
            self::updateArt($art, $transactionInfo);
            
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }


    }

    private function checkWalletBalance($buyer, $art) 
    {
        return $buyer['wallet_balance'] >= $art['price'];
    }

    private function insertIntoTransaction($transactionInfo)
    {
        return $this->transactionsCollection->insertOne($transactionInfo);
    }

    private function updateSeller($art, $transactionId)
    {

        
        $seller = $this->userCollection->findOne(['username' => $art['artist']['username']]);

        $newIncome = $seller['wallet_balance'] + $art['price'];
        
        $filter = ['username' => $art['artist']['username']];
        $update = [
            // '$push' => [
            //     'previous_purchases' => [
            //         'id' => $transactionId,
            //     ],
            // ],
            '$set' => [
                'wallet_balance' => $newIncome,
            ],
        ];

        $this->userCollection->updateOne($filter, $update);
    }

    private function updateBuyer($art, $buyer, $transactionId, $isBidding)
    {
        if($isBidding) {
            $newWallet = $buyer['wallet_balance'];
        } else {
            $newWallet = $buyer['wallet_balance'] - $art['price'];
        }

        $filter = ['username' => $buyer['username']];
        $update = [
            // '$push' => [
            //     'previous_purchases' => [
            //         'id' => $transactionId,
            //     ],
            // ],
            '$set' => [
                'wallet_balance' => $newWallet,
            ],
        ];

        $this->userCollection->updateOne($filter, $update);
    }

    private function updateArt($art, $transactionInfo)
    {
        $newNumber = $art['number'] - $transactionInfo['number'];
        $newSoldNumber = $art['sold_number'] + $transactionInfo['number']; 

        $filter = ['_id' => $art['_id']];
        $update = [
            '$set' => [
                'number' => $newNumber,
                'sold_number' => $newSoldNumber,
            ]
        ];
        $this->artsCollection->updateOne($filter, $update);
    }
}