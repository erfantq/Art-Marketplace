<?php

namespace App\Http\Controllers;

use App\Models\Arts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index()
    {
        $user = Session::get('user') ?? null;
        
        $result = Arts::getArts();
        
        if($result['success']) {
            $arts = $result['arts'];
            $arts = 'test';
            $info = [
                'success' => true,
                'arts' => $arts,
            ];
            // return response()->json($info);
            return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
        } 

        return response()->json($result, 422);

    }


    public function showSelectedArt($artId)
    {
        $result = Arts::getArt($artId);

        if($result['success']) {
            $art = $result['art'];
            // TODO
            return response()->json([
                'success' => true,
                'art' => $art,
            ]);
            // return Inertia::render('', compact('art'));
        }
        
        return response()->json([
            'success' => false,
            'message' => $result['message'],
        ], 422);
    }
}
