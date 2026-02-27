<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Groupe Scolaire Privé Bilingue Les Jumelles') }}</title>

    <!-- Primary Meta Tags -->
    <meta name="robots" content="index, follow">
    <meta name="author" content="Groupe Scolaire Privé Bilingue Les Jumelles">
    <meta name="keywords"
        content="école bilingue Dakar, groupe scolaire Sénégal, Les Jumelles, GSPB, enseignement français Sénégal, maternelle lycée Dakar, Yeumbeul Comico">

    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/svg+xml" href="/logo.svg">
    <link rel="apple-touch-icon" href="/logo.svg">

    <!-- Canonical -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="Groupe Scolaire Privé Bilingue Les Jumelles">
    <meta property="og:locale" content="{{ str_replace('-', '_', app()->getLocale()) }}">
    <meta property="og:image" content="{{ asset('logo.svg') }}">
    <meta property="og:image:type" content="image/svg+xml">
    <meta property="og:image:alt" content="Groupe Scolaire Privé Bilingue LES JUMELLES Logo">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@LesjumellesSn">
    <meta name="twitter:image" content="{{ asset('logo.svg') }}">
    <meta name="twitter:image:alt" content="Groupe Scolaire Privé Bilingue LES JUMELLES Logo">

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "School",
        "name": "Groupe Scolaire Privé Bilingue Les Jumelles",
        "alternateName": "GSPB Les Jumelles",
        "url": "{{ config('app.url') }}",
        "logo": "{{ asset('logo.svg') }}",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yeumbeul Comico 4",
            "addressLocality": "Dakar",
            "addressCountry": "SN"
        },
        "description": "École privée bilingue à Dakar offrant un enseignement d'excellence de la maternelle au lycée."
    }
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh

    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    <style>
        :root {
            --theme-color:
                {{ $themeColor ?? '#7c3aed' }}
            ;
            --theme-color-rgb:
                {{ $themeColorRgb ?? '124, 58, 237' }}
            ;
        }
    </style>
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>