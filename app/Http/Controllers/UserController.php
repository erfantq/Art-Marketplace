<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    public function register(Request $request) 
    {  
        $username = $request->username;
        $password = $request->password;
        $role = $request->role;
        $email = $request->email;

        if(!$username || !$password || !$role) {
            return response()->json([
                'message' => 'Fill all required inputs.',
            ], 422);
        }

        $result = User::register($username, $password, $role, $email);

        if($result['success']) {
            $user = User::findUser($username);

            unset($user['password']);
            Session::put('user', $user);
            return response()->json([
                'message' => 'success',
                'user' => $user,
            ]);
        } 

        $message = $result['message'];

        return response()->json([
            'message' => $message
        ], 422);
                

        // return back()->withInput();
        // return Inertia::render('RegisterApp', compact('message', 'username', 'password'));
        // return Inertia::render('HomeApp', ['username' => $result['message']]);
    }

    public function login(Request $request)
    {
        $user = User::findUser($request->username);

        unset($user['password']);

        Session::put('user', $user);
        if(!$user) {
            $message = 'User not found.';
            return response()->json([
                'message' => $message,
                'username' => $request->username,
                'password' => $request->password,
            ], 422);
        }

        $username = $user['username'];
        $hashedPassword = $user['password'];

        // Verify the password
        if(!Hash::check($request->password, $hashedPassword)) {
            $message = 'Invalid username or password.';
            return response()->json([
                'message' => $message,
                'username' => $username,
                'password' => $request->password,
            ], 422);
        }

        return response()->json([
            'message' => 'success',
            'user' => $user,
        ]);
    }

    public function show()
    {
        $user = Session::get('user');
        return Inertia::render('', compact('user'));
    }

    public function showWallet()
    {

        // $user = User::findUser('erfan');

        // $userWithoutPassword = $user->makeHidden('password')->toArray();

        // Session::put('user', $user);

        $user = Session::get('user');
        // dd(Inertia::render('TestWallet'));
        // TODO
        return Inertia::render('', compact('user'));
    }

    public function updateWallet(Request $request)
    {

        $user = Session::get('user');
        $currentCharge = $user['wallet_balance'];
        $inputCharge = $request->charge;
        if(!is_int($inputCharge)) {
            return response()->json([
                'success' => false,
                'message' => 'The value must be Integer',
            ], 422);
        }

        $newCharge = $currentCharge + $inputCharge;
        $result = User::updateWallet($user['username'], $newCharge);

        if($result['success'] == true) {
            return response()->json($result);
        }

        return response()->json($result, 422);
    }

}




