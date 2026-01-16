<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->groupBy('department');

        return Inertia::render('Team/Index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function show($slug)
    {
        $teamMember = TeamMember::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Team/Show', [
            'teamMember' => $teamMember,
        ]);
    }
}
