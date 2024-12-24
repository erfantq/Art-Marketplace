<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class BaseNormalUserAdminController extends Controller
{
    public function updateWallet(Request $request)
    {

        $user = Session::get('user');
        $username = $user['username'];
        $currentCharge = $user['wallet_balance'];
        $inputCharge = $request->charge;
        $inputCharge = (int) $inputCharge;
        if(!is_int($inputCharge)) {
            return response()->json([
                'success' => false,
                'message' => 'The value must be Integer',
            ], 422);
        }

        $newCharge = $currentCharge + $inputCharge;
        $user['wallet_balance'] = $newCharge;
        Session::put('user', $user);
        Session::save();
        try {
            User::updateWallet($user['username'], $newCharge);
            // return response()->json([
            //     'curr'=>$currentCharge,
            //     'new'=>$newCharge
            // ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

    }
}
