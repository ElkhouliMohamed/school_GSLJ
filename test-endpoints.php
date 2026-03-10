<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::role('admin')->first();
if (!$user) {
    echo "No admin user found\n";
    exit;
}

$facility = \App\Models\Facility::first();
if (!$facility) {
    echo "No facility found\n";
    exit;
}

// Test update
$request = \Illuminate\Http\Request::create('/admin/facilities/' . $facility->id, 'PUT', [
    'name' => ['en' => 'Test', 'fr' => 'Test'],
    'type' => 'transport',
    'is_active' => true,
]);
$request->setUserResolver(function () use ($user) {
    return $user;
});

// Since we are mocking an HTTP request, we should use the HTTP kernel
$httpKernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

try {
    $response = $httpKernel->handle($request);
    echo "UPDATE STATUS: " . $response->getStatusCode() . "\n";
    if ($response->getStatusCode() !== 302 && $response->getStatusCode() !== 200) {
        $content = substr($response->getContent(), 0, 500);
        echo "UPDATE ERROR: " . $content . "\n";
    }
} catch (\Exception $e) {
    echo "UPDATE EXCEPTION: " . $e->getMessage() . "\n";
}

// Test destroy
$request = \Illuminate\Http\Request::create('/admin/facilities/' . $facility->id, 'DELETE');
$request->setUserResolver(function () use ($user) {
    return $user;
});

try {
    $response = $httpKernel->handle($request);
    echo "DELETE STATUS: " . $response->getStatusCode() . "\n";
    if ($response->getStatusCode() !== 302 && $response->getStatusCode() !== 200) {
        $content = substr($response->getContent(), 0, 500);
        echo "DELETE ERROR: " . $content . "\n";
    }
} catch (\Exception $e) {
    echo "DELETE EXCEPTION: " . $e->getMessage() . "\n";
}
