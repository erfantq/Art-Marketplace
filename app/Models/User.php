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

    public static function register($username, $password, $role, $email, $active)
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $existingUser = $usersCollection->findOne(['username' => $username]);
            if($existingUser) {
                return ['success' => false, 'message' => 'Username already exists'];
            }

            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            $usersCollection->insertOne([
                'username' => $username,
                'password' => $hashedPassword,
                'role' => $role,
                'email' => $email,
                'address' => null,
                'active' => $active,
                'wallet_balance' => 0,
                'previous_purchases' => [],
                'current_auctions' => [],
                'previous_auctions' => [],
                'arts' => [],
                'created_at' => Carbon::now(),
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

            $user = $usersCollection->findOne(['username' => $username]);
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

    public static function changeActive($username) 
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

    public static function getPurchases($username)
    {
        try {
            $db = DBConnection::getDb();
            $usersCollection = $db->users;

            $purchasesInfo = $usersCollection->find(['username' => $username], ['previous_purchases' => 1, '_id' => 0])->toArray();

            return $purchasesInfo;
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
}
