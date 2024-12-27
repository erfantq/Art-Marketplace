<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Session;
use MongoDB\Client;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;


use function Symfony\Component\Clock\now;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected static $db;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'password',
        'email',
        'address',
        'active',
        'wallet_balance',
        'discount_codes',
        'previous_purchases',
        'current_auctions',
        'previous_auctions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public static function register($username,$firstname, $lastname, $password, $role, $email, $active)
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $existingUser = $usersCollection->findOne(['username' => $username]) ?? null;
            if($existingUser != null) {
                // dd($existingUser);
                return ['success' => false, 'message' => 'This username already exists'];
            }

            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            $usersCollection->insertOne([
                'username' => $username,
                'first_name' => $firstname,
                'last_name' => $lastname,
                'password' => $hashedPassword,
                'role' => $role,
                'email' => $email,
                'address' => null,
                'active' => $active,
                'wallet_balance' => 0,
                // 'previous_purchases' => [],
                // 'current_auctions' => [],
                // 'previous_auctions' => [],
                'arts' => [],
                'created_at' => new UTCDateTime(Carbon::now()->timestamp * 1000),
            ]);

            return [
                'success' => true,
                'message' => 'User registered successfully.',
            ];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public static function findUser($username)          
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $user = $usersCollection->findOne(['username' => $username]) ?? null;
        } catch (\Exception $e) {
            // return ['success' => false, 'message' => $e->getMessage()];
            throw new Exception("Database error: " . $e->getMessage());
        }
        return $user;
    }

    public static function updateWallet($username, $value)
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $filter = ['username' => $username];
            $update = ['$set' => ['wallet_balance' => $value]];
            $usersCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function getInactiveUsers()
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $users = $usersCollection->find(['active' => false])->toArray();
        } catch (\Exception $e) {
            throw new Exception("database error:" . $e->getMessage());
        }
        return $users;
    }

    public static function makeActive($username) 
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $filter = ['username' => $username];
            $update = ['$set' => ['active' => true]];
            $usersCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new Exception("database error: " . $e->getMessage());
        }
    }

    public static function getNormalUserPurchases($username)
    {
        try {
            $db = DBConnection::getDb();
            // $usersCollection = $db->users;

            // $transactionIds = $usersCollection->find(['username' => $username], ['previous_purchases' => 1, '_id' => 0])->toArray();

            // $transactions = $db->transactions->find(['_id' => ['$in' => $transactionIds]])->toArray();
            $transactions = $db->transactions->find(['buyer' => $username])->toArray();
            
            return $transactions;
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function getArtistPurchases($username)
    {
        
        try {            
            $db = DBConnection::getDb();
            $transactions = $db->transactions->find(['artist' => $username])->toArray();
            return $transactions;
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function updateUserInfo($info, $oldUsername) 
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $filter = ['username' => $oldUsername];

            $update = ['$set' => $info];
            $usersCollection->updateOne($filter, $update);
        } catch (\Exception $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function getBuyRequests($username) 
    {
        $db = DBConnection::getDb();
        $usersCollection = $db->users;

        $pipeline = [
            [
                '$match' => [
                    '_id' => new ObjectId($username) // Match the user by ID
                ]
            ],
            [
                '$lookup' => [
                    'from' => 'transactions',        // The collection to join
                    'localField' => 'previous_purchases.id',  // Field in the 'users' collection
                    'foreignField' => '_id',         // Field in the 'transactions' collection
                    'as' => 'purchases'             // Alias for the joined data
                ]
            ],
            [
                '$unwind' => '$transactions' // Flatten the purchases array
            ],
            [
                '$match' => [
                    'transactions.order_status' => 0 // Filter where order_status = 0
                ]
            ],
            [
                '$project' => [
                    'previous_purchases' => 1, // Project only the purchases data
                    '_id' => 0        // Exclude the user ID if not needed
                ]
            ]
        ];

        $buyRequests = $usersCollection->aggregate($pipeline)->toArray();
        return $buyRequests;
    }

    

    // public static function getPreviousPurchases($username)
    // {
    //     try {
    //         $db = DBConnection::getDb();
    //         $usersCollection = $db->users;

    //         $previousPurchases = $usersCollection->aggregate([
    //             // Match the user with the given username
    //             ['$match' => ['username' => $username]],
    //             // Project only the matching purchases
    //             ['$project' => [
    //                 '_id' => 0, 
    //                 'previous_purchases' => 1,
    //             ]]
    //         ]);

    //     } catch (\Exception $e) {
    //         throw new Exception("Database error: " . $e->getMessage());
    //     }
    //     return $previousPurchases;
    // }
}
