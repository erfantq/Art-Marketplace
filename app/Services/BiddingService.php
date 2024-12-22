<?php
namespace App\Services;

use App\Models\DBConnection;
use MongoDB\BSON\ObjectId;
use Exception;

class BiddingService
{
    private $biddingsCollection;
    private $artsCollection;

    public function __construct() {
        $db = DBConnection::getDb();
        $biddingsCollection = $db->biddings;
        $artsCollection = $db->arts;
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

    private function deleteBidding($artId)
    {
        try {
            $db = DBConnection::getDb();
            $biddingsCollection = $db->biddings;
            $biddingsCollection->deleteOne(['art_id' => new ObjectId((string) $artId)]);
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