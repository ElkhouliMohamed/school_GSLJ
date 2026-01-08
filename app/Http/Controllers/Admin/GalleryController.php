<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->paginate(12);
        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Galleries/CreateEdit');
    }

    public function store(Request $request)
    {
        $rules = [
            'title.en' => 'nullable|string',
            'title.fr' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'video_source' => 'nullable|in:url,upload',
        ];

        if ($request->type === 'photo') {
            $rules['file'] = 'required|image|max:8192'; // 8MB Max for photos
        } elseif ($request->type === 'video') {
            if ($request->video_source === 'upload') {
                $rules['file'] = 'required|mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-matroska|max:102400'; // 100MB Max for videos
            } else {
                $rules['video_url'] = 'required|url';
            }
        }

        $request->validate($rules);

        $data = $request->only(['title', 'type']);

        if ($request->hasFile('file')) {
            $folder = $request->type === 'photo' ? 'gallery/photos' : 'gallery/videos';
            $path = $request->file('file')->store($folder, 'public');
            $data['path'] = '/storage/' . $path;

            if ($request->type === 'photo') {
                $data['thumbnail'] = $data['path'];
            }
            // For video uploads, we don't automatically generate thumbnails yet
        } elseif ($request->type === 'video' && $request->video_source !== 'upload') {
            $data['path'] = $request->video_url;
        }

        Gallery::create($data);

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item added successfully.');
    }

    public function edit(Gallery $gallery)
    {
        return Inertia::render('Admin/Galleries/CreateEdit', [
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $rules = [
            'title.en' => 'nullable|string',
            'title.fr' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'video_source' => 'nullable|in:url,upload',
        ];

        if ($request->type === 'photo') {
            $rules['file'] = 'nullable|image|max:8192';
        } elseif ($request->type === 'video') {
            if ($request->video_source === 'upload') {
                $rules['file'] = 'nullable|mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-matroska|max:102400';
            } else {
                $rules['video_url'] = 'nullable|url'; // Nullable on update if not changing
            }
        }

        $request->validate($rules);

        $data = $request->only(['title', 'type']);

        if ($request->hasFile('file')) {
            $folder = $request->type === 'photo' ? 'gallery/photos' : 'gallery/videos';
            $path = $request->file('file')->store($folder, 'public');
            $data['path'] = '/storage/' . $path;

            if ($request->type === 'photo') {
                $data['thumbnail'] = $data['path'];
            }
        } elseif ($request->type === 'video' && $request->video_source === 'url' && $request->filled('video_url')) {
            $data['path'] = $request->video_url;
        }

        $gallery->update($data);

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item updated successfully.');
    }

    public function destroy(Gallery $gallery)
    {
        $gallery->delete();
        return redirect()->back()->with('success', 'Gallery item deleted successfully.');
    }
}
