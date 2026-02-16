@extends('emails.layouts.main')

@section('content')
    <h2 style="color: #111827; margin-top: 0;">Nouvelle Demande de Pré-inscription</h2>
    <p>Une nouvelle demande de pré-inscription a été soumise sur le site web.</p>

    <table class="info-table">
        <tr>
            <td class="label">Élève :</td>
            <td class="value">{{ $preRegistration->student_first_name }} {{ $preRegistration->student_last_name }}</td>
        </tr>
        <tr>
            <td class="label">Date de naissance :</td>
            <td class="value">{{ \Carbon\Carbon::parse($preRegistration->birth_date)->format('d/m/Y') }}</td>
        </tr>
        <tr>
            <td class="label">Classe demandée :</td>
            <td class="value">{{ $preRegistration->requested_class }}</td>
        </tr>
        <tr>
            <td class="label">Parent :</td>
            <td class="value">{{ $preRegistration->parent_name }}</td>
        </tr>
        <tr>
            <td class="label">Email :</td>
            <td class="value">{{ $preRegistration->email }}</td>
        </tr>
        <tr>
            <td class="label">Téléphone :</td>
            <td class="value">{{ $preRegistration->phone }}</td>
        </tr>
        @if($preRegistration->message)
            <tr>
                <td class="label">Message :</td>
                <td class="value">{{ $preRegistration->message }}</td>
            </tr>
        @endif
    </table>

    <div style="text-align: center; margin-top: 30px;">
        <a href="{{ url('/admin/pre-registrations') }}" class="btn">Voir dans l'administration</a>
    </div>
@endsection