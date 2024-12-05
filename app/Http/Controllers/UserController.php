<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
            return response()->json([
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
        dd($request->username);
        $user = User::findUser($request->username);

        if(!$user) {
            $message = 'User not found.';
            return back()->withInput()->with('message', $message);
        }

        $role = $user['role'];
        $username = $user['username'];
        $hashedPassword = $user['password'];

        // Verify the password
        if(!Hash::check($request->password, $hashedPassword)) {
            $message = 'Invalid username or password.';
            return back()->withInput()->with('message', $message);
        }

        return redirect()->route('home')->with('username', $username)->with('role', $role);
    }
}