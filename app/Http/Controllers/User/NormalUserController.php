<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class NormalUserController extends Controller
{

    public function dashboard()
    {

    }
    
    public function show($username)
    {
        $user = User::findUser($username);;
        // TODO
        return Inertia::render('components/Profile/UserProfile', compact('user'));
    }

    


}
