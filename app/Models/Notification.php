<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
