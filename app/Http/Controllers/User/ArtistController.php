<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Jobs\ApproveTransactionJob;
use App\Models\User;
use App\Services\TransactionsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ArtistController extends Controller
{

    private $transactionService;

    public function __construct()
    {
        $this->transactionService = new TransactionsService();
    }


    public function dashboard()
    {

    }
    
    public function show()
    {
        $user = Session::get('user');
        // TODO
        return Inertia::render('components/Profile/ArtistProfile', compact('user'));
    }

    public function buyRequests()
    {
        $user_username = Session::get('user')['username'];

        try {
            $buy_requests = User::getBuyRequests($user_username);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        // return response()->json(['buy_requests' => $buyRequests]);
        // TODO
        return Inertia::render('components/Artist/ApprovePurchase', compact('buy_requests'));
    }

    public function approveBuyRequest($transactionId)
    {
    
        try {
            $this->transactionService->changeOrderStatus($transactionId, 1);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        return response()->json(['message' => 'Buy request approved successfully']);
      
    }

    
    
}
