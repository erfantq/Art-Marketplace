<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use MongoDB\BSON\UTCDateTime;

class Notification extends Model
{
    public static function getUserNotifications($username)
    {   
        try {
            $db = DBConnection::getDb();
            $notificationsCollection = $db->notifications;
            $notifications = $notificationsCollection->find(['username' => $username])->toArray();
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
        return $notifications;

    }

    public static function markAllAsRead()
    {
        try {
            $db = DBConnection::getDb();
            $notificationsCollection = $db->notifications;
            $filter = ['read_at' => null];
            $update = ['$set' => ['read_at' => new UTCDateTime(Carbon::now()->timestamp * 1000)]];
            $notificationsCollection->updateMany($filter, $update);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
    }

    public static function insertWinnerNotification($bidding)
    {
        $artIdString = (string) $bidding['art_id'];
        $itemName = Arts::getArt($artIdString)['name'];
        $info = [
            'bidding_id' => $bidding['_id'],
            'item_name' => $itemName,
            'username' => $bidding['winner'],
            'end_time' => $bidding['end_time'],
            'read_at' => null,
            'message' => "Congratulations! You've won the bidding for {$bidding->item_name}.",
        ];

        try {
            $db = DBConnection::getDb();
            $notificationsCollection = $db->notifications;
            $notificationsCollection->insertOne($info);
        } catch (\Exception $e) {
            throw new \Exception("Database error3: " . $e->getMessage());
        }
    }

    public static function insertLoserNotification($bidding, $loserUsername)
    {
        $artIdString = (string) $bidding['art_id'];
        $itemName = Arts::getArt($artIdString)['name'];
        $winner = $bidding['winner'];
        $info = [
            'bidding_id' => $bidding['_id'],
            'item_name' => $itemName,
            'username' => $loserUsername,  //
            'end_time' => $bidding['end_time'],
            'read_at' => null,
            'message' => "Oh no! The user {$winner} has suggested
                           a more price than you for bidding {$itemName}. Your wallet is recharged.",
        ];

        try {
            $db = DBConnection::getDb();
            $notificationsCollection = $db->notifications;
            $notificationsCollection->insertOne($info);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
    }
}
