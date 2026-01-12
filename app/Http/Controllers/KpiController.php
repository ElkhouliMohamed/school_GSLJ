<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kpi;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class KpiController extends Controller
{

    public function index()
    {
        // Totals
        $totalVisits = Kpi::where('type', 'visit')->count();
        $totalClicks = Kpi::where('type', 'click')->count();

        // Recent Activity with pagination
        $recentActivity = Kpi::latest()->paginate(20);

        // Daily Visits (Last 30 days)
        $dailyVisits = Kpi::where('type', 'visit')
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Kpi/Kpi', [
            'totalVisits' => $totalVisits,
            'totalClicks' => $totalClicks,
            'recentActivity' => $recentActivity,
            'dailyVisits' => $dailyVisits,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'path' => 'nullable|string',
            'element_id' => 'nullable|string',
        ]);

        // Get country information from IP
        try {
            $location = geoip($request->ip());
            $countryCode = $location->iso_code ?? null;
            $countryName = $location->country ?? null;
        } catch (\Exception $e) {
            $default = config('geoip.default_location');
            $countryCode = $default['iso_code'] ?? null;
            $countryName = $default['country'] ?? null;
        }

        Kpi::create([
            'type' => 'click',
            'path' => $validated['path'] ?? null,
            'element_id' => $validated['element_id'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'country_code' => $countryCode,
            'country_name' => $countryName,
        ]);

        return response()->json(['success' => true]);
    }
}
