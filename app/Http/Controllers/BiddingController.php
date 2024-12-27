<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Arts;
use App\Models\Bidding;
use App\Services\BiddingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use MongoDB\BSON\ObjectId;


class BiddingController extends Controller
{
    private $biddingService;

    public function __construct()
    {
        $this->biddingService = new BiddingService();
    }

    public function index($artId)
    {
        try {
            // dd($artId);
            $bidding = Bidding::getBidding($artId);
            $user = Session::get('user') ?? null;
            $art = Arts::getArt($artId);
            return Inertia::render('components/User/SuggestBidding', compact('bidding', 'user','art'));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function showAdd()
    {
        // TODO
        $user = Session::get('user');
        $arts = Arts::getArtistArts($user->username);
        return Inertia::render('components/Artist/CreateBiddingg', compact('arts', 'user'));
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
            'start_time' =>  Carbon::now()->timestamp,
            'end_time' => Carbon::now()->addMinutes(2)->timestamp,
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
