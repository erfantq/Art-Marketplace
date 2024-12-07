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
            $userWithoutPassword = $user->makeHidden('password')->toArray();
            Session::put('user', $userWithoutPassword);
            return response()->json([
                'message' => 'success',
                'username' => $username,
                'role' => $role,
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

        $userWithoutPassword = $user->makeHidden('password')->toArray();

        Session::put('user', $userWithoutPassword);
        if(!$user) {
            $message = 'User not found.';
            return response()->json([
                'message' => $message,
                'username' => $request->username,
                'password' => $request->password,
            ], 422);
        }

        $role = $user['role'];
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
            'username' => $username,
            'role' => $role,
        ]);
    }

    public function show()
    {
        $user = Session::get('user');
        return Inertia::render('', compact('user'));
    }

}