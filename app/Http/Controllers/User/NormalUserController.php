<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class NormalUserController extends Controller
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
}
