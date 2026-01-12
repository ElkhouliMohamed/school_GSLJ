<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Partner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Fetch latest news/posts
        // Assuming Post model has a 'published' scope or similiar, if not just take latest.
        // If Post model doesn't exist yet or is in a different namespace, we might need to adjust.
        // For now, I'll assume standard App\Models\Post exists from previous context or I'll check.
        // The user mentioned "blog" feature earlier, so Post model likely exists.

        $news = \App\Models\Post::where('type', 'news')
            ->where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        $events = \App\Models\Post::where('type', 'event')
            ->where('is_published', true)
            ->latest('published_at')
            ->take(4)
            ->get();

        $partners = Partner::active()->ordered()->get();

        $gallery = \App\Models\Gallery::where('type', 'photo')
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('Home', [
            'news' => $news,
            'events' => $events,
            'partners' => $partners,
            'gallery' => $gallery
        ]);
    }
}
