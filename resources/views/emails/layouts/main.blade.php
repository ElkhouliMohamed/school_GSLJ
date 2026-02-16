<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            width: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
            width: 100%;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        .wrapper {
            width: 100%;
            background-color: #f3f4f6;
            padding: 40px 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .header {
            background-color: #7c3aed;
            /* Violet 600 */
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
            font-weight: 700;
        }

        .body {
            padding: 40px 30px;
            color: #374151;
            /* Gray 700 */
            line-height: 1.6;
            font-size: 16px;
        }

        .footer {
            background-color: #f9fafb;
            /* Gray 50 */
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            color: #9ca3af;
            /* Gray 400 */
            font-size: 12px;
            margin: 0;
        }

        .btn {
            display: inline-block;
            background-color: #7c3aed;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 20px;
        }

        .btn:hover {
            background-color: #6d28d9;
        }

        .info-table {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .info-table td {
            padding: 8px 0;
            vertical-align: top;
        }

        .label {
            font-weight: 600;
            color: #4b5563;
            width: 140px;
        }

        .value {
            color: #111827;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>{{ config('app.name') }}</h1>
            </div>

            <!-- Body -->
            <div class="body">
                @yield('content')
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>&copy; {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.</p>
                <p style="margin-top: 5px;">
                    @php
                        $address = \App\Models\Setting::where('key', 'site_address')->value('value');
                        if ($address) {
                            $decoded = json_decode($address, true);
                            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                                $address = $decoded['fr'] ?? $decoded['en'] ?? $address;
                            }
                        }
                    @endphp
                    {{ $address ?? 'GSLJ School' }}
                </p>
            </div>
        </div>
    </div>
</body>

</html>