<x-mail::message>
    # Confirmation de demande de contact

    Bonjour {{ $data['firstName'] }} {{ $data['lastName'] }},

    Merci de nous avoir contactés.

    Votre demande est en attente, nous vous contacterons bientôt.

    Cordialement,<br>
    {{ config('app.name') }}
</x-mail::message>