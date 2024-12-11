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
        $result = Arts::getArtistArts($username);

        if($result['success']) {
            $arts = $result['arts'];
            return Inertia::render('components/Share/Artworks', compact('arts'));
        }

        return response()->json($result, 422);

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
        ];

        $result = Arts::storeArt($info);

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     */
    public function show($username, string $id)
    {
        $result = Arts::getArt($id);
        if($result['success']) {
            $art = $result['art'];
            // TODO
            return Inertia::render('', compact('username', 'art'));
        }
        return response()->json($result, 422);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($username, string $id)
    {
        $result = Arts::getArt($id);
        if($result['success']) {
            $art = $result['art'];
            // TODO
            return Inertia::render('', compact('username', 'art'));
        }
        return response()->json($result, 422);
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

        $result = Arts::updateArt($info, $id);

        if($result['success']) {
            return response()->json($result);
        }
        return response()->json($result, 422);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($username, string $id)
    {
        $result = Arts::deleteArt($id);

        if($result['success']) {
            return response()->json($result);
        }
        return response()->json($result, 422);
    }
}
