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
        try {
            $user = Session::get('user') ?? null;
            
            $arts = Arts::getArts(); 
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        if ($user != null) {
            $role = strtolower($user['role']);
        
            switch ($role) {
                case 'user':
                    return Inertia::render('components/HomePage/HomePage', compact('user', 'arts'));
                case 'artist':
                    // TODO
                    return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
                case 'admin':
                    // TODO
                    return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
                default:
                    return Inertia::render('components/Artworks/UserArtworks', compact('user', 'arts'));
            }
        
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
        
        return Inertia::render('components/Artworks/SelectedArtwork', compact('art'));
    }
}
