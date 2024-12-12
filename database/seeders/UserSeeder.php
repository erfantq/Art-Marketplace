<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $password = 12345;
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $role = 'Artist';

        DB::table('users')->insert([
            'username' => 'erfan1',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan2',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan3',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan4',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan5',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan6',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan7',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan8',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan9',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        DB::table('users')->insert([
            'username' => 'erfan10',
            'password' => $hashedPassword,
            'role' => $role,
            'email' => null,
            'address' => null,
            'wallet_balance' => 0,
            'previous_purchases' => [],
            'current_auctions' => [],
            'previous_auctions' => [],
            'arts' => [],
            'created_at' => now(),
        ]);
        
    }
}
