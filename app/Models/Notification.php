<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
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
}
