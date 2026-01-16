<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::orderBy('order')->paginate(10);
        return Inertia::render('Admin/Facilities/Index', [
            'facilities' => $facilities,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Facilities/CreateEdit');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name.en' => 'required|string',
            'name.fr' => 'required|string',
            'type' => 'required|string',
            'description.en' => 'nullable|string',
            'description.fr' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'images' => 'nullable', // Relaxed validation
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'type', 'description', 'details', 'icon', 'order', 'is_active']);
        $data['slug'] = Str::slug($request->input('name.en'));
        $data['order'] = $request->input('order', 0);
        $data['is_active'] = $request->boolean('is_active');

        // Handle multiple images
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('facilities', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }
        $data['images'] = $imagePaths;

        Facility::create($data);

        return redirect()->route('admin.facilities.index')->with('success', 'Facility created successfully.');
    }

    public function edit(Facility $facility)
    {
        return Inertia::render('Admin/Facilities/CreateEdit', [
            'facility' => $facility,
        ]);
    }

    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name.en' => 'required|string',
            'name.fr' => 'required|string',
            'type' => 'required|string',
            'description.en' => 'nullable|string',
            'description.fr' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'images' => 'nullable', // Relaxed validation
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'type', 'description', 'details', 'icon', 'order', 'is_active']);
        $data['order'] = $request->input('order', 0);
        $data['is_active'] = $request->boolean('is_active');

        // Handle multiple images - MERGE with existing
        $currentImages = $facility->images ?? [];

        if ($request->hasFile('images')) {
            $newImagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('facilities', 'public');
                $newImagePaths[] = '/storage/' . $path;
            }
            // Append new images to existing ones
            $data['images'] = array_merge($currentImages, $newImagePaths);
        } else {
            // Keep existing images if no new ones uploaded
            // Note: If you want to allow deleting images, that would require a separate mechanism/field
            $data['images'] = $currentImages;
        }

        $facility->update($data);

        return redirect()->route('admin.facilities.index')->with('success', 'Facility updated successfully.');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();
        return redirect()->back()->with('success', 'Facility deleted successfully.');
    }
}
