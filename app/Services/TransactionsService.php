<?php

namespace App\Services;

use App\Models\Arts;
use App\Models\DBConnection;
use App\Models\User;
use Exception;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

class TransactionsService   
{

    protected $userCollection;
    protected $artsCollection;
    protected $transactionCollection;

    public function __construct()
    {
        $db = DBConnection::getDb();
        $this->userCollection = $db->users;
        $this->artsCollection = $db->arts;
        $this->transactionCollection = $db->transactions;
    }

    public function processPurchase($buyerUsername, $artId, $transactionInfo)
    {
        try {
            $buyer = User::findUser($buyerUsername);
            $art = Arts::getArt($artId);

            if($buyer['wallet_balance'] < $art['price']) {
                throw new \Exception("Insufficient wallet balance.");
            }

            // Insert the transaction info in transactionCollection
            $newWallet = $buyer['wallet_balance'] - $art['price'];
            $this->transactionCollection->insertOne($transactionInfo);

            // update the wallet_balance and previous_purchases for seller
            $seller = $this->userCollection->findOne(['username' => $art['artist.username']]);

            $newIncome = $seller['wallet_balance'] + $art['price'];
            
            $filter = ['username' => $art['artist.username']];
            $update = [
                '$push' => [
                    'previous_purchases' => [
                        $transactionInfo,
                    ],
                ],
                '$set' => [
                    'wallet_balance' => $newIncome,
                ],
            ];

            $this->userCollection->updateOne($filter, $update);

            // update the wallet_balance and previous_purchases for buyer
            unset($transactionInfo['buyer']);

            $filter = ['username' => $buyerUsername];
            $update = [
                '$push' => [
                    'previous_purchases' => [
                        $transactionInfo,
                    ],
                ],
                '$set' => [
                    'wallet_balance' => $newWallet,
                ],
            ];

            $this->userCollection->updateOne($filter, $update);

            


            // update the number and sold_number for art
            $newNumber = $art['number'] - $transactionInfo['number'];
            $newSoldNumber = $art['sold_number'] + $transactionInfo['number']; 

            $filter = ['_id' => new ObjectId($artId)];
            $update = [
                '$set' => [
                    'number' => $newNumber,
                    'sold_number' => $newSoldNumber,
                ]
            ];
            $this->artsCollection->updateOne($filter, $update);
            
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }


    }
}