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

        // $client = new Client(env('DB_HOST', 'mongodb://127.0.0.1:27017'));

        // // Select the database and collection
        // $collection = $client->selectCollection('artMarket', 'users');

        // // Insert a document
        // $result = $collection->insertOne([
        //     'name' => 'John Doe',
        //     'email' => 'john.doe@example.com',
        //     'status' => 'active',
        //     'created_at' => now(),
        // ]);




        // $collection->createIndex(
        //     ['user_id' => 1],
        //     ['unique' => true]
        // );

        // DB::setQueryGrammar("db.users.insertOne({name:erfan, password:1234})");


//----------------------------------------------------------------//

        // Initialize MongoDB Client
        // $client = new Client(env('DB_HOST', 'mongodb://127.0.0.1:27017'));
        
        // // Select the database
        // $database = $client->selectDatabase(env('DB_DATABASE', 'your_database'));

        // // Create the users collection
        // $database->createCollection('users');
        

        // // Insert a sample user document
        // $database->selectCollection('users')->insertOne([
        //     'name' => 'Example User',
        //     'email' => 'example.user@example.com',
        //     'password' => bcrypt('password'), // Hashed password
        //     'role' => 'admin',
        //     'created_at' => now(),
        // ]);


        


        // Schema::create('users', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->string('email')->unique();
        //     $table->timestamp('email_verified_at')->nullable();
        //     $table->string('password');
        //     $table->rememberToken();
        //     $table->timestamps();
        // });

        // Schema::create('password_reset_tokens', function (Blueprint $table) {
        //     $table->string('email')->primary();
        //     $table->string('token');
        //     $table->timestamp('created_at')->nullable();
        // });

        // Schema::create('sessions', function (Blueprint $table) {
        //     $table->string('id')->primary();
        //     $table->foreignId('user_id')->nullable()->index();
        //     $table->string('ip_address', 45)->nullable();
        //     $table->text('user_agent')->nullable();
        //     $table->longText('payload');
        //     $table->integer('last_activity')->index();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('users');
        // Schema::dropIfExists('password_reset_tokens');
        // Schema::dropIfExists('sessions');
        $mongoClient = DB::connection('mongodb')->getMongoClient();
        $database = $mongoClient->selectDatabase(env('DB_DATABASE'));
        $database->dropCollection('users');
    }
};
