<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for ($i=0; $i < 10; $i++) { 
            DB::table('arts')->insert([
                'name' => 'art' . $i,
                'price' => 100,
                'number' => 5,
                'img' => null,
                'artist' => ['username' => 'erfan' . $i],
                'reviews' => [],
                'sold_number' => 0,
                'bidding' => false,
            ]);
        }
        
    }
}
