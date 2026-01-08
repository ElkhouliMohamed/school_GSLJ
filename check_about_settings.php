<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Setting;

echo "Checking About page settings in database:\n\n";

$aboutSettings = Setting::whereIn('key', ['about_title', 'about_content', 'about_image'])->get();

if ($aboutSettings->isEmpty()) {
    echo "❌ No About page settings found in database!\n";
    echo "Running seeder...\n";
} else {
    echo "✅ Found " . $aboutSettings->count() . " About page settings:\n\n";

    foreach ($aboutSettings as $setting) {
        echo "Key: " . $setting->key . "\n";
        echo "Type: " . $setting->type . "\n";

        $value = $setting->getTranslations('value');
        echo "Value (FR): " . (isset($value['fr']) ? substr($value['fr'], 0, 100) : 'N/A') . "...\n";
        echo "Value (EN): " . (isset($value['en']) ? substr($value['en'], 0, 100) : 'N/A') . "...\n";
        echo "\n";
    }
}
