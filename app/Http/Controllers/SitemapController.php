<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $posts = Post::where('is_published', true)
            ->where('type', 'news')
            ->orderBy('updated_at', 'desc')
            ->get();

        $staticPages = [
            '/',
            '/about',
            '/admissions',
            '/campus-life',
            '/contact',
            '/gallery',
            '/news',
        ];

        $content = view('sitemap', [
            'posts' => $posts,
            'staticPages' => $staticPages,
        ])->render();

        return response($content, 200)
            ->header('Content-Type', 'text/xml');
    }
}
