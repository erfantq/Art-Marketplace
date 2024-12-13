<?php

namespace App\Models;

use App\Http\Controllers\ArtsCotroller;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

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


    // get all arts
    public static function getArts()
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $arts = $artCollection->find()->toArray();

            return ['success' => true, 'arts' => $arts];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public static function getArtistArts($username) 
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $arts = $artCollection->find(['artist.username' => $username])->toArray();
            return ['success' => true, 'arts' => $arts];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    // get specific art
    public static function getArt($id)
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $art = $artCollection->findOne(['_id' => new ObjectId($id)]);

            return ['success' => true, 'art' => $art];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public static function storeArt($info)
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $artCollection->insertOne($info);
            return ['success' => true, 'message' => 'Art stored successfuly'];
        } catch (\Exception $e) {
            return ['succsess' => false, 'message' => $e->getMessage()];
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
            return ['success' => true, 'message' => 'updated successfuly'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public static function deleteArt($id)
    {
        try {
            $db = DBConnection::getDb();
            $artCollection = $db->arts;

            $filter = ['_id' => new ObjectId($id)];

            $artCollection->deleteOne($filter);
            return ['success' => true, 'message' => 'deleted successfuly'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
