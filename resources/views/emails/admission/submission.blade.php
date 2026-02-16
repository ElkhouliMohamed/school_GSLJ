<x-mail::message>
    # Confirmation de demande d'admission

    Bonjour,

    Merci d'avoir soumis une demande d'admission pour **{{ $data['student_first_name'] }}
    {{ $data['student_last_name'] }}**.

    Votre demande est en attente, nous vous contacterons bientôt.

    **Détails de la demande :**
    - Classe demandée : {{ $data['requested_class'] }}
    - Parent : {{ $data['parent_name'] }}
    - Téléphone : {{ $data['phone'] }}

    Cordialement,<br>
    {{ config('app.name') }}
</x-mail::message>