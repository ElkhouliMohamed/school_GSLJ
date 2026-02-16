@extends('emails.layouts.main')

@section('content')
    <h2 style="color: #111827; margin-top: 0;">Confirmation de demande d'admission</h2>

    <p>Bonjour,</p>

    <p>Merci d'avoir soumis une demande d'admission pour <strong>{{ $data['student_first_name'] }}
            {{ $data['student_last_name'] }}</strong>.</p>

    <p>Votre demande est en attente, nous vous contacterons bientôt.</p>

    <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Détails de la demande :</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
            <li>Classe demandée : {{ $data['requested_class'] }}</li>
            <li>Parent : {{ $data['parent_name'] }}</li>
            <li>Téléphone : {{ $data['phone'] }}</li>
        </ul>
    </div>

    <p style="margin-top: 30px;">
        Cordialement,<br>
        <strong>{{ config('app.name') }}</strong>
    </p>
@endsection