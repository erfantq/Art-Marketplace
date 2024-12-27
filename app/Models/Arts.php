<?php

namespace App\Models;

use App\Http\Controllers\ArtsCotroller;
use Exception;
use Illuminate\Database\Eloquent\Model;
// use MongoDB\Laravel\Eloquent\Casts\ObjectId;
use MongoDB\BSON\ObjectId;

class Arts extends Model
{

    protected static $db;

    protected $fillable = [
        'name',
        'price',
        'number',
        'img',
        'artist',
        'reviews',
        'sold_number'
    ];

    protected $casts = [
        '_id' => 'string', // Cast ObjectId to string if necessary
    ];


    // get all arts
    public static function getArts()
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $arts = $artCollection->find()->toArray();
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }

        return $arts;
    }

    public static function getArtistArts($username) 
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $arts = $artCollection->find(['artist.username' => $username])->toArray();
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }

        return $arts;
    }

    // get specific art
    public static function getArt($id)
    {
        try {
            $db = DBConnection::getDb();
            $artsCollection = $db->arts;

            $art = $artsCollection->findOne(['_id' => new ObjectId($id)]);
            // $art = $artsCollection->find(strval($id));
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }

        return $art;
    }

    public static function storeArt($info)
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $artCollection->insertOne($info);
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function updateArt($info, $id)
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $filter = ['_id' => new ObjectId($id)];
            $update = ['$set' => $info];

            $artCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function deleteArt($id)
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $filter = ['_id' => new ObjectId($id)];

            $artCollection->deleteOne($filter);
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }
}
