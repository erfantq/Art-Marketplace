<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class BaseUserController extends Controller
{
    public function register(Request $request) 
    {  

        $username = $request->username;
        $firstname = $request->firstname ?? null;
        $lastname = $request->lastname ?? null;
        $password = $request->password;
        $role = $request->role;
        $email = $request->email ?? null;

        $active = true;

        if(!$username || !$password || !$role) {
            return response()->json([
                'message' => 'Fill all required inputs.',
            ], 422);
        }

        $active = (strtolower($role) == 'artist') ? false : true;

        $result = User::register($username,$firstname, $lastname, $password, $role, $email, $active);

        if($result['success'] && $active) {
            // $user = User::findUser($username);
            // $userWithoutPassword = $user->makeHidden('password')->toArray();
            // $request->session()->put('user', $username);
            // Session::put('user', $username);
            $user = User::findUser($username);

            unset($user['password']);
            Session::put('user', $user);
            Session::save();
            
            // return response()->json([
            //     'message' => 'success',
            //     'username' => $username,
            //     'role'=>$role
            // ]);
            return redirect()->to('/');
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

            if($user == null) {
                throw new \Exception("User not found.");
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
            Session::save();
            // Log::info(Session::all());

            // var_dump(Session::get('user'));

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        
        // return response()->json([
        //     'message' => 'success',
        //     'user' => $user,
        // ]);
        return redirect()->to('/');
    }

    public function showWallet()
    {
        $user = Session::get('user');
        // TODO
        return Inertia::render('components/Share/WalletCharge', compact('user'));
    }

    // If it is normal user gives the buyed arts, If it is artist gives the selled arts
    public function getPurchases()
    {
        $user = Session::get('user');
        $user_username = $user['username'];
        $role = $user['role'];
        try {
            if(strtolower($role) == 'user') {
                $purchases = User::getNormalUserPurchases($user_username);
            } else if(strtolower($role) == 'artist') {
                $purchases = User::getArtistPurchases($user_username);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
        // return Inertia::render('components/Artist/Artist', compact('user'));
        return response()->json(['purchases' => $purchases]);

    }

    public function showUpdate($username)
    {
        $user = Session::get('user');
        // TODO
        return Inertia::render('components/Profile/UpdateProfile', compact('user'));
    }

    public function updateUserInfo(Request $request)
    {
        $oldUsername = Session::get('user')['username'];
        $username = $request->username;
        $password = $request->password;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $email = $request->email;
        $address = $request->address;

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $info = [
            'username' => $username,
            'password' => $hashedPassword,
            'first_name'=> $first_name,
            'last_name'=> $last_name,
            'email' => $email,
            'address' => $address,
        ];
        if(!$username || !$password) {
            return response()->json(['message' => 'username and password are required.'], 422);
        }
        try {
            User::updateUserInfo($info, $oldUsername);
            $user = User::findUser($username);
            Session::put('user', $user);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function logout()
    {
        Session::flush();
        return redirect()->to('/login');
    }
}
