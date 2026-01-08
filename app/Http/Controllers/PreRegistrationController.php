<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PreRegistration;
use App\Models\User;
use App\Notifications\PreRegistrationNotification;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class PreRegistrationController extends Controller
{
    /**
     * Store a new pre-registration
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_last_name' => 'required|string|max:255',
            'student_first_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'requested_class' => 'required|string|max:255',
            'parent_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'nullable|string',
        ]);

        $preRegistration = PreRegistration::create($validated);

        // Send email notification to admin
        $adminEmail = env('ADMIN_EMAIL', 'admin@school.com');
        Notification::route('mail', $adminEmail)
            ->notify(new PreRegistrationNotification($preRegistration));

        return back()->with('success', 'Votre demande de pré-inscription a été envoyée avec succès. Nous vous contacterons bientôt.');
    }

    /**
     * Display all pre-registrations in admin panel
     */
    public function index()
    {
        $preRegistrations = PreRegistration::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/PreRegistrations/Index', [
            'preRegistrations' => $preRegistrations,
        ]);
    }

    /**
     * Update the status of a pre-registration
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,contacted,enrolled,rejected',
        ]);

        $preRegistration = PreRegistration::findOrFail($id);
        $preRegistration->update($validated);

        return back()->with('success', 'Statut mis à jour avec succès.');
    }
}
