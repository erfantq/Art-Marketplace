<?php

namespace App\Http\Controllers;

use App\Models\Arts;
use App\Models\Notification;
use App\Services\BiddingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class HomeController extends Controller
{


    public function index()
    {
        try {
            $user = Session::get('user') ?? null;
            // var_dump($user);
            // Log::info(Session::all());
            $biddingService = new BiddingService();
            $biddingService->processExpiredBiddings();

            if($user != null) {
                $notifications = Notification::getUserNotifications($user['username']); // All notifications
            } else {
                $notifications = null;
            }
            // $unreadNotifications = Auth::user()->unreadNotifications;  // Only unread notifications

            $arts = Arts::getArts();
            // dd($arts);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        // if ($user != null) {
        //     $role = strtolower($user['role']);
        
        //      return Inertia::render('components/HomePage/HomePage', compact('user', 'arts'));

        //     // switch ($role) {
        //     //     case 'user':
        //     //         return Inertia::render('components/HomePage/HomePage', compact('user', 'arts'));
        //     //     case 'artist':
        //     //         // TODO
        //     //         return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
        //     //     case 'admin':
        //     //         // TODO
        //     //         return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
        //     //     default:
        //     //         return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
        //     // }
        
        // }
        return Inertia::render('components/HomePage/HomePageHandler', compact('user', 'arts'));
        // return Inertia::render('components/HomePage/HomePageHandler', compact('user', 'arts', 'notifications', 'unreadNotifications'));
    }



    public function showSelectedArt($artId)
    {
        try {
            $art = Arts::getArt($artId);
            $user = Session::get('user') ?? null;

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return Inertia::render('components/Artworks/SelectedArtwork', compact('user','art'));
    }
}
