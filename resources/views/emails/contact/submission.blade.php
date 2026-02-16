@extends('emails.layouts.main')

@section('content')
    <h2 style="color: #111827; margin-top: 0;">Confirmation de demande de contact</h2>

    <p>Bonjour {{ $data['firstName'] }} {{ $data['lastName'] }},</p>

    <p>Merci de nous avoir contactés.</p>

    <p>Votre demande est en attente, nous vous contacterons bientôt.</p>

    <p style="margin-top: 30px;">
        Cordialement,<br>
        <strong>{{ config('app.name') }}</strong>
    </p>
@endsection