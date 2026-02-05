<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

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