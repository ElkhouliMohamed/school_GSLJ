<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryAlbum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GalleryAlbumController extends Controller
{
    public function index()
    {
        $albums = GalleryAlbum::withCount('galleries')->latest()->paginate(12);

        return Inertia::render('Admin/GalleryAlbums/Index', [
            'albums' => $albums,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/GalleryAlbums/CreateEdit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'nullable|string',
            'description.en' => 'nullable|string',
            'description.fr' => 'nullable|string',
            'cover_image' => 'nullable|image|max:8192',
        ]);

        $data = $request->only(['title', 'description']);
        $data['slug'] = Str::slug($request->input('title.en'));

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('gallery/albums', 'public');
            $data['cover_image'] = '/storage/' . $path;
        }

        $album = GalleryAlbum::create($data);

        return redirect()->route('admin.albums.edit', $album)->with('success', 'Album created successfully. You can now add images.');
    }

    public function edit(GalleryAlbum $album)
    {
        $album->load([
            'galleries' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('Admin/GalleryAlbums/CreateEdit', [
            'album' => $album,
        ]);
    }

    public function update(Request $request, GalleryAlbum $album)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'nullable|string',
            'description.en' => 'nullable|string',
            'description.fr' => 'nullable|string',
            'cover_image' => 'nullable|image|max:8192',
        ]);

        $data = $request->only(['title', 'description']);

        // Only update slug if title changes significantly or logic requires it, usually better to keep slug stable or provide option to regenerate
        // For simplicity, we'll keep the slug or regenerate if empty. Here we won't force regenerate to avoid breaking links.

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('gallery/albums', 'public');
            $data['cover_image'] = '/storage/' . $path;
        }

        $album->update($data);

        return redirect()->back()->with('success', 'Album updated successfully.');
    }

    public function destroy(GalleryAlbum $album)
    {
        $album->delete(); // Cascade delete handles images if setup, or we can manually delete files
        return redirect()->route('admin.albums.index')->with('success', 'Album deleted successfully.');
    }
}
