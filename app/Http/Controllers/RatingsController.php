<?php

namespace App\Http\Controllers;

use App\Models\Ratings;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
// use MongoDB\Laravel\Eloquent\Casts\ObjectId;
use MongoDB\BSON\ObjectId;

class RatingsController extends Controller
{
    public function store(Request $request, $artId)
    {

        $timestamp = Carbon::now();
        $rate = $request->rate;
        $comment = $request->comment;
        $username = Session::get('user')['username'];

        $info = [
            '_id' => new ObjectId(),
            'timestamp' => $timestamp,
            'rate' => $rate,
            'comment' => $comment,
            'username' => $username,
        ];

        try {
            Ratings::store($info, $artId);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        return response()->json(['message' => 'Comment submited successfully.']);
    }

    public function destroy($artId, $rateId)
    {
        try {
            Ratings::deleteReview($artId, $rateId);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(['message' => 'Comment deleted successfully.']);
    }
}
