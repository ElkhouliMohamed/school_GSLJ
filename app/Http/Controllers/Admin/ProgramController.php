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
            'name.en' => 'required|string',
            'name.fr' => 'required|string',
            'level' => 'required|string',
            'description.en' => 'nullable|string',
            'description.fr' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'level', 'description', 'objectives', 'curriculum', 'order', 'is_active']);
        $data['slug'] = Str::slug($request->input('name.en'));
        $data['order'] = $request->input('order', 0);
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('programs', 'public');
            $data['image'] = '/storage/' . $path;
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
            'name.en' => 'required|string',
            'name.fr' => 'required|string',
            'level' => 'required|string',
            'description.en' => 'nullable|string',
            'description.fr' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'level', 'description', 'objectives', 'curriculum', 'order', 'is_active']);
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

        $program->update($data);

        return redirect()->route('admin.programs.index')->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->back()->with('success', 'Program deleted successfully.');
    }
}
