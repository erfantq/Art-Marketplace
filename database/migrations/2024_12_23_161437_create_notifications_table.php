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

        $database->createCollection('users');
        // Schema::create('notifications', function (Blueprint $table) {
        //     $table->uuid('id')->primary();
        //     $table->string('type');
        //     $table->morphs('notifiable');
        //     $table->text('data');
        //     $table->timestamp('read_at')->nullable();
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('notifications');
        $mongoClient = DB::connection('mongodb')->getMongoClient();
        $database = $mongoClient->selectDatabase(env('DB_DATABASE'));
        $database->dropCollection('users');
    }
};
