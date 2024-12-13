<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use App\Services\TransactionsService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class TransactionsController extends Controller
{

    private $transactionService;

    public function __construct()
    {
        $this->transactionService = new TransactionsService();
    }
    public function purchase(Request $request)
    {
        $timestamp = Carbon::now();
        $user = Session::get('user');
        $buyerUsername = $user['username'];

        $artId = $request->artId;
        $number = $request->number;

        $transactionInfo = [
            'timestamp' => $timestamp,
            'buyer' => $buyerUsername,
            'artId' => $artId,
            'number' => $number,
        ];
        $result = $this->transactionService->processPurchase($buyerUsername, $artId, $transactionInfo);

        if($result['error']) {
            return response()->json($result, 422);
        }

        return response()->json($result);
        
    }
}
