<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/CreateEdit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'required|string',
            'content.en' => 'required|string',
            'content.fr' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'content', 'is_published']);
        $data['slug'] = Str::slug($request->input('title.en')); // Simple slug strategy

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->is_published) {
            $data['published_at'] = now();
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/CreateEdit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
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
            $path = $request->file('image')->store('posts', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $post->update($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->back()->with('success', 'Post deleted successfully.');
    }
}
