<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Gallery;
use App\Models\PreRegistration;
use App\Models\User;
use App\Models\Partner;
use App\Models\Kpi;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Get statistics
        $totalPosts = Post::count();
        $publishedPosts = Post::where('is_published', true)->count();
        $draftPosts = $totalPosts - $publishedPosts;

        $totalGalleries = Gallery::count();

        $totalPreRegistrations = PreRegistration::count();
        $pendingPreRegistrations = PreRegistration::where('status', 'pending')->count();
        $contactedPreRegistrations = PreRegistration::where('status', 'contacted')->count();
        $enrolledPreRegistrations = PreRegistration::where('status', 'enrolled')->count();
        $rejectedPreRegistrations = PreRegistration::where('status', 'rejected')->count();

        $totalUsers = User::count();

        $totalPartners = Partner::count();

        // Get KPI data for last 30 days
        $thirtyDaysAgo = Carbon::now()->subDays(30);
        
        // Get actual visit data
        $visitData = Kpi::where('type', 'visit')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->keyBy('date');

        // Fill in missing dates with 0 counts for last 30 days
        $kpiData = collect();
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $kpiData->push([
                'date' => $date,
                'count' => $visitData->has($date) ? $visitData[$date]->count : 0,
            ]);
        }

        $totalVisits = Kpi::where('type', 'visit')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'posts' => [
                    'total' => $totalPosts,
                    'published' => $publishedPosts,
                    'draft' => $draftPosts,
                ],
                'galleries' => $totalGalleries,
                'preRegistrations' => [
                    'total' => $totalPreRegistrations,
                    'pending' => $pendingPreRegistrations,
                    'contacted' => $contactedPreRegistrations,
                    'enrolled' => $enrolledPreRegistrations,
                    'rejected' => $rejectedPreRegistrations,
                ],
                'users' => $totalUsers,
                'partners' => $totalPartners,
                'visits' => [
                    'total' => $totalVisits,
                    'chartData' => $kpiData,
                ],
            ],
        ]);
    }
}
