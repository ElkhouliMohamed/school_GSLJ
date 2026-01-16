<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index(Request $request)
    {
        // Check if type parameter is 'transport' and redirect to the specific transport facility
        if ($request->has('type') && $request->type === 'transport') {
            return redirect()->route('facilities.show', ['slug' => 'school-transportation']);
        }

        $facilities = Facility::where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Facilities/Index', [
            'facilities' => $facilities,
        ]);
    }

    public function show($slug)
    {
        $facility = Facility::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Facilities/Show', [
            'facility' => $facility,
        ]);
    }
}
