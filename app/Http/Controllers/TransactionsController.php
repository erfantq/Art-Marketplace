<?php

namespace App\Http\Controllers;

use App\Models\DBConnection;
use App\Models\Transactions;
use App\Services\TransactionsService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use MongoDB\BSON\ObjectId;

class TransactionsController extends Controller
{

    private $transactionService;

    public function __construct()
    {
        $this->transactionService = new TransactionsService();
    }
    public function purchase(Request $request)
    {
        try {
            
            $timestamp = Carbon::now();
            $user = Session::get('user');
            $buyerUsername = $user['username'];
    
            $artId = $request->artId;
            $number = $request->number;
    
            $transactionInfo = [
                'timestamp' => $timestamp,
                'art_id' => new ObjectId((string) $artId),
                'buyer' => $buyerUsername,
                'number' => $number,
                'order_status' => 0,    
            ];
            $this->transactionService->processPurchase($buyerUsername, $artId, $transactionInfo, false);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);            
        }

        return response()->json(['message' => 'Purchase was successful.']);
    }

    
    


}
