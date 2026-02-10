<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Program;
use App\Models\Facility;
use App\Models\TeamMember;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $posts = Post::where('is_published', true)
            ->where('type', 'news')
            ->orderBy('updated_at', 'desc')
            ->get();

        $programs = Program::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        $facilities = Facility::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        $teamMembers = TeamMember::where('is_active', true)
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
            '/programs',
            '/facilities',
            '/team',
        ];

        $content = view('sitemap', [
            'posts' => $posts,
            'programs' => $programs,
            'facilities' => $facilities,
            'teamMembers' => $teamMembers,
            'staticPages' => $staticPages,
        ])->render();

        return response($content, 200)
            ->header('Content-Type', 'text/xml');
    }
}
