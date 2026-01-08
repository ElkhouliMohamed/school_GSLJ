<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index()
    {
        $events = Post::where('type', 'event')->latest()->paginate(10);
        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/CreateEdit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'required|string',
            'content.en' => 'required|string',
            'content.fr' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'content', 'is_published']);
        $data['type'] = 'event';
        $data['slug'] = Str::slug($request->input('title.en'));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->is_published) {
            $data['published_at'] = now();
        }

        Post::create($data);

        return redirect()->route('admin.events.index')->with('success', 'Événement créé avec succès.');
    }

    public function edit(Post $event)
    {
        return Inertia::render('Admin/Events/CreateEdit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Post $event)
    {
        $request->validate([
            'title.en' => 'required|string',
            'title.fr' => 'required|string',
            'content.en' => 'required|string',
            'content.fr' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'content', 'is_published']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $event->update($data);

        return redirect()->route('admin.events.index')->with('success', 'Événement mis à jour avec succès.');
    }

    public function destroy(Post $event)
    {
        $event->delete();
        return redirect()->back()->with('success', 'Événement supprimé avec succès.');
    }
}
