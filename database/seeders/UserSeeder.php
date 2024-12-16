<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
        
        for ($i=0; $i < 10; $i++) { 
            DB::table('users')->insert([
                'username' => 'erfan' . $i,
                'first_name' => 'firstname' . $i,
                'last_name' => 'lastname' . $i,
                'password' => $hashedPassword,
                'role' => $role,
                'email' => null,
                'address' => null,
                'wallet_balance' => 0,
                'previous_purchases' => [],
                'current_auctions' => [],
                'previous_auctions' => [],
                'arts' => [],
                'created_at' => Carbon::now(),
            ]);
        }
        
    }
}
