<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partners = Partner::ordered()->get();

        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Partners/CreateEdit', [
            'partner' => null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name.fr' => 'required|string|max:255',
            'name.en' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'url' => 'nullable|url|max:255',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('partners', 'public');
            $validated['logo'] = $logoPath;
        }

        Partner::create($validated);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partenaire créé avec succès.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partner $partner)
    {
        return Inertia::render('Admin/Partners/CreateEdit', [
            'partner' => $partner
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'name.fr' => 'required|string|max:255',
            'name.en' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'url' => 'nullable|url|max:255',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($partner->logo) {
                Storage::disk('public')->delete($partner->logo);
            }
            $logoPath = $request->file('logo')->store('partners', 'public');
            $validated['logo'] = $logoPath;
        }

        $partner->update($validated);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partenaire mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner)
    {
        // Delete logo file
        if ($partner->logo) {
            Storage::disk('public')->delete($partner->logo);
        }

        $partner->delete();

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partenaire supprimé avec succès.');
    }
}
