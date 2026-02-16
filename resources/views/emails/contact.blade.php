@extends('emails.layouts.main')

@section('content')
    <h2 style="color: #111827; margin-top: 0;">Nouveau Message de Contact</h2>
    <p>Un nouveau message a été envoyé depuis le formulaire de contact du site web.</p>

    <table class="info-table">
        <tr>
            <td class="label">Nom :</td>
            <td class="value">{{ $data['firstName'] }} {{ $data['lastName'] }}</td>
        </tr>
        <tr>
            <td class="label">Email :</td>
            <td class="value"><a href="mailto:{{ $data['email'] }}" style="color: #7c3aed;">{{ $data['email'] }}</a></td>
        </tr>
        <tr>
            <td class="label">Téléphone :</td>
            <td class="value">{{ $data['phoneNumber'] }}</td>
        </tr>
        <tr>
            <td class="label">Message :</td>
            <td class="value" style="white-space: pre-line;">{{ $data['message'] }}</td>
        </tr>
    </table>
@endsection