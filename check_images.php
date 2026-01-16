<?php
require_once __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Facility;

$facility = Facility::where('slug', 'school-transportation')->first();

if ($facility) {
    echo "Facility found: " . $facility->name['en'] . "\n";
    echo "Images: ";
    var_dump($facility->images);
} else {
    echo "Facility not found\n";
}

// Also check all facilities
echo "\nAll facilities:\n";
$facilities = Facility::all();
foreach ($facilities as $f) {
    echo "- {$f->name['en']} (slug: {$f->slug}): " . ($f->images ? count($f->images) . " images" : "no images") . "\n";
}