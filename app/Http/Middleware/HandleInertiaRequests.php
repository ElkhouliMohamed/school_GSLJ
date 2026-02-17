<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $request->session()->get('locale', config('app.locale')),
            'settings' => \App\Models\Setting::all()->mapWithKeys(function ($setting) {
                return [$setting->key => $setting->getTranslations('value')];
            })->toArray(),
            'facilities' => \App\Models\Facility::where('is_active', true)
                ->orderBy('order')
                ->get(['id', 'name', 'slug', 'type'])
                ->map(function ($facility) {
                    return [
                        'id' => $facility->id,
                        'name' => $facility->getTranslations('name'),
                        'slug' => $facility->slug,
                        'type' => $facility->type,
                    ];
                }),
            'programs' => \App\Models\Program::where('is_active', true)
                ->orderBy('order')
                ->get(['id', 'name', 'slug', 'level'])
                ->map(function ($program) {
                    return [
                        'id' => $program->id,
                        'name' => $program->getTranslations('name'),
                        'slug' => $program->slug,
                        'level' => $program->level,
                        'description' => $program->getTranslations('description'),
                    ];
                }),
        ];
    }
}
