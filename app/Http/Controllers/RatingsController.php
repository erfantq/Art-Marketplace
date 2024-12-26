<?php

namespace App\Http\Controllers;

use App\Models\Ratings;
use Carbon\Carbon;
use MongoDB\BSON\UTCDateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
// use MongoDB\Laravel\Eloquent\Casts\ObjectId;
use MongoDB\BSON\ObjectId;

class RatingsController extends Controller
{
    public function store(Request $request, $artId)
    {

        // $timestamp = Carbon::now(); // Y:M:D H:I:S
        $rate = $request->rate;
        $comment = $request->comment;
        $username = Session::get('user')['username'];

        $info = [
            '_id' => new ObjectId(),
            'timestamp' => new UTCDateTime(Carbon::now()->timestamp * 1000),
            'rate' => $rate,
            'comment' => $comment,
            'username' => $username,
        ];

        try {
            Ratings::store($info, $artId);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        return response()->json(['message' => 'Comment submited successfully.','comment'=>$info]);
    }

    public function destroy(Request $request)
    {
        $artId = $request->art_id;
        $reviewId = $request->review_Id;
        try {
            Ratings::deleteReview($artId, $reviewId);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(['message' => 'Comment deleted successfully.']);
    }
}
