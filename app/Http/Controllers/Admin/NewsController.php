<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index()
    {
        $news = Post::where('type', 'news')->latest()->paginate(10);
        return Inertia::render('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/News/CreateEdit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'required|string',
            'content.en' => 'required|string',
            'content.fr' => 'required|string',
            'image' => 'nullable|image|max:8192', // 8MB
            'gallery.*' => 'image|max:8192', // 8MB
        ]);

        $data = $request->only(['title', 'content', 'is_published']);
        $data['type'] = 'news';
        $data['slug'] = Str::slug($request->input('title.en'));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $data['image'] = '/storage/' . $path;
        }

        // Handle Gallery
        $gallery = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('news/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
        }
        $data['gallery'] = $gallery;

        if ($request->is_published) {
            $data['published_at'] = now();
        }

        Post::create($data);

        return redirect()->route('admin.news.index')->with('success', 'Actualité créée avec succès.');
    }

    public function edit(Post $news)
    {
        return Inertia::render('Admin/News/CreateEdit', [
            'news' => $news,
        ]);
    }

    public function update(Request $request, Post $news)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'required|string',
            'content.en' => 'required|string',
            'content.fr' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'content', 'is_published']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $data['image'] = '/storage/' . $path;
        }

        // Handle Gallery
        $gallery = $request->input('existing_gallery', []); // Keep existing images
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('news/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
        }
        $data['gallery'] = $gallery;

        $news->update($data);

        return redirect()->route('admin.news.index')->with('success', 'Actualité mise à jour avec succès.');
    }

    public function destroy(Post $news)
    {
        $news->delete();
        return redirect()->back()->with('success', 'Actualité supprimée avec succès.');
    }
}
