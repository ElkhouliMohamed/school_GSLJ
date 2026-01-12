<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('get') && !$request->is('admin*') && !$request->is('api*') && !$request->is('sanctum*') && !$request->is('build*') && !$request->ajax()) {
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

            \App\Models\Kpi::create([
                'type' => 'visit',
                'path' => $request->path(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'country_code' => $countryCode,
                'country_name' => $countryName,
            ]);
        }

        return $next($request);
    }
}
