<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class BaseNormalUserAdminController extends Controller
{
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
}
