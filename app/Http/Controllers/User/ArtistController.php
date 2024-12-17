<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function dashboard()
    {

    }
    

    public function show()
    {
        $user = Session::get('user');
        // TODO
        return Inertia::render('components/Share/UserProfile', compact('user'));
    }

    public function buyRequests()
    {
        $user_username = Session::get('user')['username'];

        try {
            $buyRequests = User::getBuyRequests($user_username);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(['buy_requests' => $buyRequests]);
    }

    
}
