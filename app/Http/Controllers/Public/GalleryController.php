<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryAlbum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $albums = GalleryAlbum::withCount('galleries')->latest()->paginate(12);

        return Inertia::render('Gallery/Index', [
            'albums' => $albums,
        ]);
    }

    public function show($slug)
    {
        $album = GalleryAlbum::where('slug', $slug)->withCount('galleries')->firstOrFail();

        $galleries = $album->galleries()->latest()->paginate(24);

        return Inertia::render('Gallery/Show', [
            'album' => $album,
            'galleries' => $galleries,
        ]);
    }
}
