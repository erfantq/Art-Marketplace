<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Mockery\CountValidator\Exact;

class UserController extends Controller
{
    public function register(Request $request) 
    {  

        $username = $request->username;
        $password = $request->password;
        $role = $request->role;
        $email = $request->email;

        $active = true;

        if(!$username || !$password || !$role) {
            return response()->json([
                'message' => 'Fill all required inputs.',
            ], 422);
        }

        $active = (strtolower($role) == 'artist') ? false : true;

        $result = User::register($username, $password, $role, $email, $active);

        if($result['success'] && $active) {
            // $user = User::findUser($username);
            // $userWithoutPassword = $user->makeHidden('password')->toArray();
            // $request->session()->put('user', $username);
            // Session::put('user', $username);
            $user = User::findUser($username);

            unset($user['password']);
            Session::put('user', $user);
            
            return response()->json([
                'message' => 'success',
                'user' => $user,
            ]);
        } 

        $message = $result['message'];
        if(!$active) {
            $message = "Your account isn't active. It is being reviewed by the admin and will be activated if approved by the admin.";
        }

        return response()->json([
            'message' => $message
        ], 422);
    

        // return back()->withInput();
        // return Inertia::render('RegisterApp', compact('message', 'username', 'password'));
        // return Inertia::render('HomeApp', ['username' => $result['message']]);
    }

    public function login(Request $request)
    {
        try {
            $canLogin = true;

            $user = User::findUser($request->username);

            // unset($user['password']);

            if(!$user) {
                $message = 'User not found.';
                $canLogin = false;
            }

            $hashedPassword = $user['password'];

            // Verify the password
            if(!Hash::check($request->password, $hashedPassword)) {
                $message = 'Invalid username or password.';
                $canLogin = false;
            }

            // check the activation
            if($user['active'] == false) {
                $message = "Your account isn't active. It is being reviewed by the admin and will be activated if approved by the admin.";
                $canLogin = false;
            }

            if(!$canLogin) {
                return response()->json([
                    'message' => $message,
                    'username' => $request->username,
                    'password' => $request->password,
                ], 422);
            }

            unset($user['password']);
            Session::put('user', $user);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        
        return response()->json([
            'message' => 'success',
            'user' => $user,
        ]);
    }

    public function show()
    {
        $user = Session::get('user');
        return Inertia::render('components/Share/UserProfile', compact('user'));
    }

    public function showWallet()
    {

        // $user = User::findUser('erfan');

        // $userWithoutPassword = $user->makeHidden('password')->toArray();

        // Session::put('user', $user);

        $user = Session::get('user');
        // dd(Inertia::render('TestWallet'));
        // TODO
        return Inertia::render('components/Share/WalletCharge', compact('user'));
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
        try {
            User::updateWallet($user['username'], $newCharge);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

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

            User::changeActive($username);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        return response()->json(['success' => true, 'message' => 'actived successfully.']);
    }

    public function getPurchases()
    {
        $user_username = Session::get('user')['username'];
        try {
            $purchases = User::getPurchases($user_username);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
        return response()->json(['purchases' => $purchases]);

    }

    public function showUpdate()
    {
        // TODO
        return Inertia::render('');
    }

    public function updateUserInfo(Request $request)
    {
        $oldUsername = Session::get('user')['username'];
        $username = $request->username;
        $password = $request->password;
        $email = $request->email;
        $address = $request->address;

        $info = [
            'username' => $username,
            'password' => $password,
            'email' => $email,
            'address' => $address,
        ];
        if(!$username || !$password) {
            return response()->json(['message' => 'username and password are required.'], 422);
        }
        try {
        User::updateUserInfo($info, $oldUsername);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function logout()
    {
        Session::flush();
    }
}




