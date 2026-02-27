@extends('emails.layouts.main')

@section('content')
    <h2 style="color: #111827; margin-top: 0;">Confirmation de demande d'admission</h2>

    <p>Bonjour,</p>

    <p>Votre demande d'admission pour <strong>{{ $data['student_first_name'] }} {{ $data['student_last_name'] }}</strong> a
        bien été reçue.</p>

    <p>Notre équipe vous contactera très prochainement pour la suite du processus.</p>

    <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Détails de la demande :</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
            <li>Classe demandée : {{ $data['requested_class'] }}</li>
            <li>Parent / Tuteur : {{ $data['parent_name'] }}</li>
            <li>Téléphone : {{ $data['phone'] }}</li>
        </ul>
    </div>

    <p>Merci de votre confiance.</p>

    <p style="margin-top: 30px;">
        Cordialement,<br>
        <strong>L'Administration</strong><br>
        Groupe Scolaire Privé Bilingue Les Jumelles
    </p>
@endsection