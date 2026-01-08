<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Setting;

echo "Testing settings structure as used in HandleInertiaRequests:\n\n";

$settings = Setting::all()->mapWithKeys(function ($setting) {
    return [$setting->key => $setting->getTranslations('value')];
})->toArray();

echo "Available settings keys:\n";
print_r(array_keys($settings));

echo "\n\nAbout page settings:\n";
if (isset($settings['about_title'])) {
    echo "about_title: " . json_encode($settings['about_title'], JSON_PRETTY_PRINT) . "\n\n";
}
if (isset($settings['about_content'])) {
    echo "about_content (FR): " . substr($settings['about_content']['fr'] ?? 'N/A', 0, 100) . "...\n";
    echo "about_content (EN): " . substr($settings['about_content']['en'] ?? 'N/A', 0, 100) . "...\n\n";
}
if (isset($settings['about_image'])) {
    echo "about_image: " . json_encode($settings['about_image'], JSON_PRETTY_PRINT) . "\n";
}
