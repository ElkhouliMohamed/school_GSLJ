<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TeamMemberController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::orderBy('order')->paginate(10);
        return Inertia::render('Admin/TeamMembers/Index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/TeamMembers/CreateEdit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name.en' => 'required|string',
            'name.fr' => 'required|string',
            'position.en' => 'nullable|string',
            'position.fr' => 'nullable|string',
            'department' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'position', 'department', 'bio', 'email', 'phone', 'qualifications', 'specialties', 'order', 'is_active']);
        $data['slug'] = Str::slug($request->input('name.en'));

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team', 'public');
            $data['photo'] = '/storage/' . $path;
        }

        TeamMember::create($data);

        return redirect()->route('admin.team-members.index')->with('success', 'Team member created successfully.');
    }

    public function edit(TeamMember $teamMember)
    {
        return Inertia::render('Admin/TeamMembers/CreateEdit', [
            'teamMember' => $teamMember,
        ]);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $request->validate([
            'name.en' => 'required|string',
            'name.fr' => 'required|string',
            'position.en' => 'nullable|string',
            'position.fr' => 'nullable|string',
            'department' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'position', 'department', 'bio', 'email', 'phone', 'qualifications', 'specialties', 'order', 'is_active']);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team', 'public');
            $data['photo'] = '/storage/' . $path;
        }

        $teamMember->update($data);

        return redirect()->route('admin.team-members.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();
        return redirect()->back()->with('success', 'Team member deleted successfully.');
    }
}
