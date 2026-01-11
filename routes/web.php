<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('language/{locale}', [\App\Http\Controllers\LanguageController::class, 'switch'])->name('language.switch');

Route::middleware('guest')->group(function () {
    Route::get('login', [\App\Http\Controllers\AuthController::class, 'showLogin'])->name('login');
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
});

Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
    Route::resource('news', \App\Http\Controllers\Admin\NewsController::class);
    Route::resource('events', \App\Http\Controllers\Admin\EventController::class);
    Route::resource('galleries', \App\Http\Controllers\Admin\GalleryController::class);
    Route::resource('partners', \App\Http\Controllers\Admin\PartnerController::class);
    Route::get('settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');

    // Pre-registrations
    Route::get('pre-registrations', [\App\Http\Controllers\PreRegistrationController::class, 'index'])->name('pre-registrations.index');
    Route::get('pre-registrations', [\App\Http\Controllers\PreRegistrationController::class, 'index'])->name('pre-registrations.index');
    Route::patch('pre-registrations/{id}/status', [\App\Http\Controllers\PreRegistrationController::class, 'updateStatus'])->name('pre-registrations.updateStatus');

    // KPIs
    Route::get('kpi', [\App\Http\Controllers\KpiController::class, 'index'])->name('kpi.index');
});

// Public pre-registration form submission
Route::post('/pre-registration', [\App\Http\Controllers\PreRegistrationController::class, 'store'])->name('pre-registration.store');

// KPI Click Tracking
Route::post('/kpi/click', [\App\Http\Controllers\KpiController::class, 'store'])->name('kpi.click');

Route::get('/news', [\App\Http\Controllers\Public\BlogController::class, 'index'])->name('news');
Route::get('/news/{slug}', [\App\Http\Controllers\Public\BlogController::class, 'show'])->name('news.show');

Route::get('/gallery', [\App\Http\Controllers\Public\GalleryController::class, 'index'])->name('gallery.index');

// Debug route to check settings
Route::get('/debug-about', function () {
    $settings = \App\Models\Setting::all()->mapWithKeys(function ($setting) {
        return [$setting->key => $setting->getTranslations('value')];
    })->toArray();

    return response()->json([
        'locale' => app()->getLocale(),
        'about_title' => $settings['about_title'] ?? 'NOT FOUND',
        'about_content' => $settings['about_content'] ?? 'NOT FOUND',
        'about_image' => $settings['about_image'] ?? 'NOT FOUND',
        'all_settings_keys' => array_keys($settings),
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/admissions', function () {
    return Inertia::render('Admissions');
})->name('admissions');

Route::get('/campus-life', function () {
    return Inertia::render('CampusLife');
})->name('campus-life');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');
