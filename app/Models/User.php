<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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

    public static function getDb()
    {
        if(!self::$db) {
            $client = new Client(env('DB_URI'));
            self::$db = $client->selectDatabase(env('DB_DATABASE'));
        }
        return self::$db;
    }

    public static function register($username, $password, $role, $email)
    {
        try {
            $db = self::getDb();
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
                'address' => '',
                'wallet_balance' => 0,
                'discount_codes' => [],
                'previous_purchases' => [],
                'current_auctions' => [],
                'previous_auctions' => [],
                'created_at' => now(),
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
            $db = self::getDb();
            $usersCollection = $db->users;

            return $usersCollection->findOne(['username' => $username]);
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
