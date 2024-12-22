<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bidding;
use App\Services\BiddingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use MongoDB\BSON\ObjectId;


class BiddingController extends Controller
{
    private $biddingService;

    public function __construct() {
        $this->biddingService = new BiddingService();
    }

    public function add(Request $request, $artId)
    {
        $artist = Session::get('user');
        $base_price = $request->base_price;
        $endTime = $request->end_date;

        $info = [
            'art_id' => new ObjectId((string) $artId),
            'base_price' => $base_price,
            'highest_price' => 0,
            'current_user' => null,
            'start_time' =>  Carbon::now(),
            'end_time' => Carbon::parse($endTime)->timestamp,
        ];

        try {
            $this->biddingService->processAdd($info);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(['message' => 'Bidding added successfully.']);
    }

    public function delete($artId)
    {
        try {
            $this->biddingService->processDelete($artId);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        return response()->json(['message' => 'Deleted successfully.']);
    }

    
}
