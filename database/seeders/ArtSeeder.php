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
        DB::table('arts')->insert([
            'name' => 'art1',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan1'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art2',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan2'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art3',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan3'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art4',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan4'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art5',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan5'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art6',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan6'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art7',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan7'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art8',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan8'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art9',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan9'],
        ]);
        DB::table('arts')->insert([
            'name' => 'art10',
            'price' => '100',
            'number' => '5',
            'img' => null,
            'artist' => ['username' => 'erfan10'],
        ]);
    }
}
