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

        var_dump($username.":HSH");
        die();
        // var_dump($password);
        // var_dump($role);
        // die();
    
// die;
        // $request->validate([
        //     'username' => 'required',
        //     'password' => 'required',
        // ]);
        if(!$username || !$password || !$role) {
            return back()->withInput();
        }

        $result = User::register($username, $password, $role);

        if($result['success']) {
            return redirect()->route('home')->with('username', $username)->with('role', $role);
            // return Inertia::render('HomeApp', compact('username'));
        } 

        $message = $result['message'];
            
        return back()->withInput()->with('message', $message);
        

        // return back()->withInput();
        // return Inertia::render('RegisterApp', compact('message', 'username', 'password'));
        // return Inertia::render('HomeApp', ['username' => $result['message']]);
    }

    public function login(Request $request)
    {
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