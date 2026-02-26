<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::orderBy('order')->paginate(10);
        return Inertia::render('Admin/Programs/Index', [
            'programs' => $programs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Programs/CreateEdit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name.fr' => 'required|string',
            'level' => 'required|string',
            'description.fr' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'bg_image' => 'nullable|image|max:5120',
            'new_gallery_images.*' => 'nullable|image|max:5120',
            'existing_gallery_images' => 'nullable|array',
            'cta_title.fr' => 'nullable|string',
            'cta_description.fr' => 'nullable|string',
            'cta_image' => 'nullable|image|max:2048',
            'cta_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
        ]);

        $data = $request->only(['name', 'level', 'description', 'objectives', 'curriculum', 'cta_title', 'cta_description', 'order', 'is_active']);

        // Ensure we have array structures for translations
        if (!is_array($data['name']))
            $data['name'] = [];
        if (!is_array($data['description']))
            $data['description'] = [];

        // If English is missing, use French
        if (empty($data['name']['en'])) {
            $data['name']['en'] = $request->input('name.fr');
        }
        if (empty($data['description']['en'])) {
            $data['description']['en'] = $request->input('description.fr');
        }

        // CTA translations
        if (!is_array($data['cta_title']))
            $data['cta_title'] = [];
        if (!is_array($data['cta_description']))
            $data['cta_description'] = [];

        if (empty($data['cta_title']['en'])) {
            $data['cta_title']['en'] = $request->input('cta_title.fr');
        }
        if (empty($data['cta_description']['en'])) {
            $data['cta_description']['en'] = $request->input('cta_description.fr');
        }

        $data['slug'] = Str::slug($data['name']['en'] ?? $data['name']['fr']);
        $data['order'] = $request->input('order', 0);
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('programs', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('bg_image')) {
            $path = $request->file('bg_image')->store('programs/backgrounds', 'public');
            $data['bg_image'] = '/storage/' . $path;
        }

        $gallery = [];
        if ($request->hasFile('new_gallery_images')) {
            foreach ($request->file('new_gallery_images') as $file) {
                $path = $file->store('programs/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
        }
        $data['gallery_images'] = $gallery;

        // CTA Files
        if ($request->hasFile('cta_image')) {
            $path = $request->file('cta_image')->store('programs/cta', 'public');
            $data['cta_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('cta_file')) {
            $path = $request->file('cta_file')->store('programs/files', 'public');
            $data['cta_file'] = '/storage/' . $path;
        }

        Program::create($data);

        return redirect()->route('admin.programs.index')->with('success', 'Program created successfully.');
    }

    public function edit(Program $program)
    {
        return Inertia::render('Admin/Programs/CreateEdit', [
            'program' => $program,
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $request->validate([
            'name.fr' => 'required|string',
            'level' => 'required|string',
            'description.fr' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'bg_image' => 'nullable|image|max:5120',
            'new_gallery_images.*' => 'nullable|image|max:5120',
            'existing_gallery_images' => 'nullable|array',
            'cta_title.fr' => 'nullable|string',
            'cta_description.fr' => 'nullable|string',
            'cta_image' => 'nullable|image|max:2048',
            'cta_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
        ]);

        $data = $request->only(['name', 'level', 'description', 'objectives', 'curriculum', 'cta_title', 'cta_description', 'order', 'is_active']);

        // Ensure we have array structures for translations
        if (!is_array($data['name']))
            $data['name'] = [];
        if (!is_array($data['description']))
            $data['description'] = [];

        // If English is missing, use French
        if (empty($data['name']['en'])) {
            $data['name']['en'] = $request->input('name.fr');
        }
        if (empty($data['description']['en'])) {
            $data['description']['en'] = $request->input('description.fr');
        }

        // CTA translations
        if (!is_array($data['cta_title']))
            $data['cta_title'] = [];
        if (!is_array($data['cta_description']))
            $data['cta_description'] = [];

        if (empty($data['cta_title']['en'])) {
            $data['cta_title']['en'] = $request->input('cta_title.fr');
        }
        if (empty($data['cta_description']['en'])) {
            $data['cta_description']['en'] = $request->input('cta_description.fr');
        }

        $data['order'] = $request->input('order', 0);
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('programs', 'public');
            $data['image'] = '/storage/' . $path;
        }
        // No need to unset image if not uploaded, it just won't be in $data if not in ->only() or handled manually...
        // Actually ->only includes 'image' if it was in request but empty? No, ->only only picks keys.
        // But wait, if 'image' is not in request (no file), it won't be in $data?
        // Let's be safe.
        if (!$request->hasFile('image')) {
            unset($data['image']);
        }

        if ($request->boolean('remove_bg_image')) {
            $data['bg_image'] = null;
        } else if ($request->hasFile('bg_image')) {
            $path = $request->file('bg_image')->store('programs/backgrounds', 'public');
            $data['bg_image'] = '/storage/' . $path;
        } else {
            unset($data['bg_image']);
        }

        $gallery = $request->input('existing_gallery_images', []);
        $gallery = array_filter($gallery);

        if ($request->hasFile('new_gallery_images')) {
            foreach ($request->file('new_gallery_images') as $file) {
                $path = $file->store('programs/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
        }
        $data['gallery_images'] = array_values($gallery);

        // CTA Image
        if ($request->boolean('remove_cta_image')) {
            $data['cta_image'] = null;
        } else if ($request->hasFile('cta_image')) {
            $path = $request->file('cta_image')->store('programs/cta', 'public');
            $data['cta_image'] = '/storage/' . $path;
        } else {
            unset($data['cta_image']);
        }

        // CTA File
        if ($request->boolean('remove_cta_file')) {
            $data['cta_file'] = null;
        } else if ($request->hasFile('cta_file')) {
            $path = $request->file('cta_file')->store('programs/files', 'public');
            $data['cta_file'] = '/storage/' . $path;
        } else {
            unset($data['cta_file']);
        }

        $program->update($data);

        return redirect()->route('admin.programs.index')->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->back()->with('success', 'Program deleted successfully.');
    }
}
