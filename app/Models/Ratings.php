<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;
use PhpParser\Node\Expr\Throw_;

class Ratings extends Model
{
    public static function store($info, $artId)
    {
        try {
            $db = DBConnection::getDb();
            $artsCollection = $db->arts;

            $filter = ['_id' => new ObjectId($artId)];
            $update = ['$push' => ['reviews' => $info]];
            
            $artsCollection->updateOne($filter, $update);

            return ['success' => true, 'message' => 'rate submited.'];
        } catch (\Exception $e) {
            throw new \Exception("couldn't store art:" . $e->getMessage());
        }
    }

    public static function deleteReview($artId, $reviewId)
    {
        try {
            $db = DBConnection::getDb();
            $artsCollection = $db->arts;

            $filter = ['_id' => new ObjectId($artId)];
            $update = ['$pull' => ['reviews' => ['_id' => new ObjectId($reviewId)]]]; 
            $artsCollection->updateOne(
                $filter,
                $update
            );
            
            return ['success' => true, 'message' => 'deleted successfuly.'];
        } catch (\Exception $e) {
            throw new \Exception("couldn't delete art: " . $e->getMessage());
        }
    }
}
