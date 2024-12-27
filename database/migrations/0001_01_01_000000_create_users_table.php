<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use MongoDB\Client;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        $mongoClient = DB::connection('mongodb')->getMongoClient();

        $database = $mongoClient->selectDatabase(env('DB_DATABASE'));

        $database->createCollection('users');

        $database->users->createIndex(['username' => 1]);

        /*
            User {
                Username
                Password
                Role 
                Email
                Address
                Created_at
                Wallet-balance
                    Relations {
                        Discount-codes
                        Previous_purchases
                        Current_auctions
                        Previous_auctions	
                    }
            }
        */

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $mongoClient = DB::connection('mongodb')->getMongoClient();
        $database = $mongoClient->selectDatabase(env('DB_DATABASE'));
        $database->dropCollection('users');
    }
};
