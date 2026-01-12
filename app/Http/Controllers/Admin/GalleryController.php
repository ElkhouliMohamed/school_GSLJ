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
            'type' => 'required|in:photo,video',
            'video_source' => 'nullable|in:url,upload',
            'title.en' => 'nullable|string',
            'title.fr' => 'nullable|string',
        ];

        if ($request->type === 'photo') {
            $rules['files'] = 'required|array|min:1';
            $rules['files.*'] = 'image|max:8192'; // 8MB Max per photo
        } elseif ($request->type === 'video') {
            if ($request->video_source === 'upload') {
                $rules['file'] = 'required|mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-matroska|max:102400';
            } else {
                $rules['video_url'] = 'required|url';
            }
        }

        $request->validate($rules);

        $baseData = $request->only(['title', 'type']);

        if ($request->type === 'photo' && $request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('gallery/photos', 'public');
                $galleryData = $baseData;
                $galleryData['path'] = '/storage/' . $path;
                $galleryData['thumbnail'] = $galleryData['path'];
                Gallery::create($galleryData);
            }
        } elseif ($request->type === 'video') {
            // Video handling remains single upload for now as complex mass video upload wasn't requested explicitly/is heavy
            $data = $baseData;
            if ($request->video_source === 'upload' && $request->hasFile('file')) {
                $path = $request->file('file')->store('gallery/videos', 'public');
                $data['path'] = '/storage/' . $path;
            } elseif ($request->video_source !== 'upload') {
                $data['path'] = $request->video_url;
            }
            Gallery::create($data);
        }

        return redirect()->route('admin.galleries.index')->with('success', 'Gallery item(s) added successfully.');
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
