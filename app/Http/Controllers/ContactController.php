<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use App\Mail\ContactSubmissionMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $data = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phoneNumber' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        try {
            // Get admin email from env or config, fallback to a default if not set
            // Ideally should be a setting in the DB or config
            // Get admin email from settings
            $adminEmail = \App\Models\Setting::where('key', 'admin_notification_email')->value('value');

            // Handle translatable value (JSON) or simple string
            if ($adminEmail) {
                $decoded = json_decode($adminEmail, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $adminEmail = $decoded['en'] ?? $decoded['fr'] ?? $adminEmail;
                }
            }

            // Fallback
            if (!$adminEmail) {
                $adminEmail = config('mail.from.address');
            }

            Mail::to($adminEmail)->send(new ContactFormMail($data));

            // Send confirmation email to user
            Mail::to($data['email'])->send(new ContactSubmissionMail($data));

            return back()->with('success', 'Votre message a été envoyé avec succès! Nous vous contacterons bientôt.');
        } catch (\Exception $e) {
            Log::error('Contact form error: ' . $e->getMessage());
            return back()->with('error', 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
        }
    }
}
