<?php

namespace App\Http\Controllers;

use App\Models\Arts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtsCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($username)
    {
        try {
            $arts = Arts::getArtistArts($username);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([
            'arts' => $arts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($username)
    {
        // TODO

        return Inertia::render('');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $username)
    {
        $info = [
            'name' => $request->name,
            'price' => $request->price,
            'number' => $request->number,
            'img' => $request->img,
            'artist' => ['username' => $username],
            'reviews' => [],
            'sold_number' => 0,
        ];

        try {
            Arts::storeArt($info);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    
    }

    /**
     * Display the specified resource.
     */
    public function show($username, string $id)
    {
        try {
            $art = Arts::getArt($id);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        
        return response()->json([
            'username' => $username,
            'art' => $art,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($username, string $id)
    {
        try {
            $art = Arts::getArt($id);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        
        return response()->json([
            'username' => $username,
            'art' => $art,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $username, string $id)
    {
        $info = [
            'name' => $request->name,
            'price' => $request->price,
            'number' => $request->number,
            'img' => $request->img,
            'artist' => ['username' => $username],
        ];

        try {
            Arts::updateArt($info, $id);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($username, string $id)
    {
        try {
            Arts::deleteArt($id);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

    }

}
