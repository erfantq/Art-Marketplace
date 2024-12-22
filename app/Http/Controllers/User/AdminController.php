<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AdminController extends Controller
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

    public function inactiveUsers()
    {
        try {
            $inactiveUsers = User::getInactiveUsers();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(['inactiveUsers' => $inactiveUsers]);

    }

    public function makeActive(Request $request)
    {
        try {
            $username = $request->username;

            User::makeActive($username);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        return response()->json(['success' => true, 'message' => 'actived successfully.']);
    }
}
