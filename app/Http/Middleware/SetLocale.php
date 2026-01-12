<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from session, or default to French
        $locale = Session::get('locale', config('app.locale', 'fr'));

        // Set the session locale if it doesn't exist
        if (!Session::has('locale')) {
            Session::put('locale', $locale);
        }

        // Set the application locale
        App::setLocale($locale);
        \Illuminate\Support\Facades\Log::info('SetLocale Middleware: App locale set to ' . $locale);

        return $next($request);
    }
}
