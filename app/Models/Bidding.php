<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\BSON\ObjectId;


class Bidding extends Model
{
    protected $fillable = [
        'art_id',
        'base_price',
        'highest_suggestion',
        'winner',
        'start_time',
        'end_time',
    ];

    public static function getBidding($artId)
    {
        try {
            $db = DBConnection::getDb();
            $biddingsCollection = $db->biddings;
            $bidding = $biddingsCollection->findOne(['_id' => new ObjectId((string) $artId)]);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }
        return $bidding;
    }

    


}
