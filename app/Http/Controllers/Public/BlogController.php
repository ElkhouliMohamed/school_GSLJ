<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::where('is_published', true)
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        // Try to find by slug first, then by id if it's numeric
        $post = Post::where('is_published', true)
            ->where(function ($query) use ($slug) {
                $query->where('slug', $slug);
                if (is_numeric($slug)) {
                    $query->orWhere('id', $slug);
                }
            })
            ->firstOrFail();

        return Inertia::render('Blog/Show', [
            'post' => $post,
        ]);
    }
}
