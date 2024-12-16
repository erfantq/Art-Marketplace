<?php

namespace App\Http\Controllers;

use App\Models\Arts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

use function Laravel\Prompts\alert;

class HomeController extends Controller
{


    public function index()
    {
        try {
            $user = Session::get('user') ?? null;
            $arts = Arts::getArts();    
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
          
        return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
    }



    public function showSelectedArt($artId)
    {
        try {
            $art = Arts::getArt($artId);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        
        return response()->json(['art' => $art]);
    }
}
