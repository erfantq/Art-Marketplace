<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\Client;

class DBConnection extends Model
{
    public static $db;

    public static function getDb()
    {
        if(!self::$db) {
            $client = new Client(env('DB_URI'));
            self::$db = $client->selectDatabase(env('DB_DATABASE'));
        }
        return self::$db;
    }
}
