<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bidding;
use App\Services\BiddingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;


class BiddingController extends Controller
{
    private $biddingService;

    public function __construct() {
        $this->biddingService = new BiddingService();
    }

    public function index($artId)
    {
        try {
            $bidding = Bidding::getBidding($artId);
            $user = Session::get('user') ?? null;
            return Inertia::render('/', compact('bidding', 'user'));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function showAdd()
    {
        // TODO
        // dd(Session::get('user'));
        return Inertia::render('components/Artist/CreateBiddingg');
    }

    public function add(Request $request)
    {
        $artist = Session::get('user');
        $base_price = $request->base_price;
        $endTime = $request->end_date;
        $artId = $request->art_id;

        $info = [
            'art_id' => new ObjectId((string) $artId),
            'artist' => $artist['username'],
            'base_price' => $base_price,
            'highest_suggestion' => 0,
            'winner' => null,
            'start_time' =>  Carbon::now(),
            'end_time' => new UTCDateTime(Carbon::parse($endTime)->timestamp * 1000),
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

    public function suggestNewPrice(Request $request)
    {
        $user = Session::get('user');
        $artId = $request->artId;
        $suggestedPrice = $request->price;
        try {
            $this->biddingService->processNewSuggestion($user, $artId, $suggestedPrice);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 403);
        }
    }
    

    
}
