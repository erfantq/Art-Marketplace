<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $mongoClient = DB::connection('mongodb')->getMongoClient();

        $database = $mongoClient->selectDatabase(env('DB_DATABASE'));

        $database->createCollection('transactions');

        /*
        transactions {
            timestamp,
            buyer,
            artId,
            number,
            oreder_status,
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
        $database->dropCollection('transactions');
    }
};
