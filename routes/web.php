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
    Route::resource('albums', \App\Http\Controllers\Admin\GalleryAlbumController::class);
    Route::resource('gallery-items', \App\Http\Controllers\Admin\GalleryController::class)->names('galleries');
    Route::resource('partners', \App\Http\Controllers\Admin\PartnerController::class);
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::resource('programs', \App\Http\Controllers\Admin\ProgramController::class);
    Route::resource('facilities', \App\Http\Controllers\Admin\FacilityController::class);
    Route::resource('team-members', \App\Http\Controllers\Admin\TeamMemberController::class);
    Route::get('settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');

    // Pre-registrations
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
Route::get('/gallery/{slug}', [\App\Http\Controllers\Public\GalleryController::class, 'show'])->name('gallery.show');

// Programs (Educational Cycles)
Route::get('/programs', [\App\Http\Controllers\ProgramController::class, 'index'])->name('programs.index');
Route::get('/programs/{slug}', [\App\Http\Controllers\ProgramController::class, 'show'])->name('programs.show');

// Facilities & Services
Route::get('/facilities', [\App\Http\Controllers\FacilityController::class, 'index'])->name('facilities.index');
Route::get('/facilities/{slug}', [\App\Http\Controllers\FacilityController::class, 'show'])->name('facilities.show');

// Team & Staff
Route::get('/team', [\App\Http\Controllers\TeamController::class, 'index'])->name('team.index');
Route::get('/team/{slug}', [\App\Http\Controllers\TeamController::class, 'show'])->name('team.show');





Route::get('/about', function () {
    $team = \App\Models\TeamMember::where('is_active', true)->orderBy('order')->get();
    return Inertia::render('About', [
        'team' => $team
    ]);
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
Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'submit'])->name('contact.submit');
Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

// Legal Pages
Route::get('/mentions-legales', function () {
    return Inertia::render('Legal/MentionsLegales');
})->name('legal.mentions');

Route::get('/protection-donnees', function () {
    return Inertia::render('Legal/PrivacyPolicy');
})->name('legal.privacy');

Route::get('/cookies', function () {
    return Inertia::render('Legal/Cookies');
})->name('legal.cookies');

Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);
