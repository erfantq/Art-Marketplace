<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function register(Request $request) 
    {
        $username = $request->username;
        $password = $request->password;
        // $request->validate([
        //     'username' => 'required',
        //     'password' => 'required',
        // ]);
        if(!$username || !$password) {
            return back()->withInput();
        }

        $result = User::register($username, $password);

        if($result['success']) {
            return redirect()->route('home')->with('username', $username);
            // return Inertia::render('HomeApp', compact('username'));
        }

        $message = $result['message'];

        // return back()->withInput();
        // return Inertia::render('RegisterApp', compact('message', 'username', 'password'));
        // return Inertia::render('HomeApp', ['username' => $result['message']]);
    }
}
