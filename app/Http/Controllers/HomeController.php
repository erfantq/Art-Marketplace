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
        $user = Session::get('user');
        $result = Arts::getArts();

        if($result['success']) {
            $arts = $result['arts'];
            return Inertia::render('Components/HomePage/HomePage', compact('user', 'arts'));
        } 

        return response()->json($result, 422);

    }

    public function showSelectedArt($artId)
    {
        $result = Arts::getArt($artId);

        if($result['success']) {
            $art = $result['art'];
            // TODO
            return Inertia::render('', compact('art'));
        }
        
        return response()->json([
            'success' => false,
            'message' => $result['message'],
        ], 422);
    }
}
