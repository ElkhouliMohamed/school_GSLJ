<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-scheme" content="light dark">
    <title>{{ config('app.name') }}</title>

    <style type="text/css">
        /* Reset */
        body,
        table,
        td,
        a {
            margin: 0;
            padding: 0;
            border: 0;
        }

        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            height: 100% !important;
        }

        /* Base */
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            line-height: 1.65;
            font-size: 16px;
        }

        table {
            border-collapse: collapse;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            max-width: 100%;
            display: block;
        }

        a {
            color: #7c3aed;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Layout */
        .wrapper {
            background-color: #f8fafc;
            padding: 48px 20px;
            width: 100%;
        }

        .container {
            max-width: 620px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow:
                0 20px 25px -5px rgba(0, 0, 0, 0.08),
                0 8px 10px -6px rgba(0, 0, 0, 0.04);
        }

        /* Header */
        .header {
            background-color: #ffffff;
            padding: 48px 40px 32px;
            text-align: center;
        }

        .logo {
            max-height: 72px;
            width: auto;
            margin: 0 auto;
        }

        /* Content */
        .body {
            padding: 40px;
            background-color: #ffffff;
        }

        .body h1,
        .body h2,
        .body h3 {
            color: #0f172a;
            margin: 0 0 20px;
            line-height: 1.3;
        }

        .body h1 {
            font-size: 28px;
            font-weight: 700;
        }

        .body h2 {
            font-size: 22px;
            font-weight: 600;
        }

        .body p {
            margin: 0 0 24px;
        }

        /* Button */
        .btn {
            display: inline-block;
            background-color: #7c3aed;
            color: white !important;
            padding: 14px 32px;
            font-weight: 600;
            font-size: 16px;
            line-height: 1;
            text-align: center;
            text-decoration: none;
            border-radius: 10px;
            margin: 16px 0 24px;
        }

        .btn:hover {
            background-color: #6d28d9;
        }

        /* Info table */
        .info-table {
            width: 100%;
            margin: 32px 0;
            background-color: #f8fafc;
            border-radius: 12px;
            overflow: hidden;
        }

        .info-table td {
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }

        .info-table tr:last-child td {
            border-bottom: 0;
        }

        .label {
            font-weight: 600;
            color: #475569;
            width: 140px;
            padding-right: 16px;
        }

        .value {
            color: #0f172a;
        }

        /* Footer */
        .footer {
            background-color: #f1f5f9;
            padding: 40px 40px 32px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
        }

        .footer a {
            color: #64748b;
        }

        .footer a:hover {
            color: #7c3aed;
            text-decoration: underline;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #0f172a;
                color: #e2e8f0;
            }

            .wrapper {
                background-color: #0f172a;
            }

            .container {
                background-color: #1e293b;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            }

            .header,
            .body {
                background-color: #1e293b;
            }

            .footer {
                background-color: #111827;
                color: #94a3b8;
            }

            .info-table {
                background-color: #111827;
            }

            .info-table td {
                border-bottom-color: #334155;
            }

            .label {
                color: #94a3b8;
            }

            .value {
                color: #e2e8f0;
            }

            h1,
            h2,
            h3,
            .body p {
                color: #f1f5f9;
            }
        }

        /* Mobile */
        @media only screen and (max-width: 620px) {
            .wrapper {
                padding: 24px 10px !important;
            }

            .container {
                border-radius: 0 !important;
            }

            .header {
                padding: 40px 24px 28px !important;
            }

            .body {
                padding: 32px 24px !important;
            }

            .footer {
                padding: 32px 24px !important;
            }

            .btn {
                width: 100% !important;
                box-sizing: border-box;
            }

            .label {
                display: block;
                width: 100%;
                padding-bottom: 4px;
            }
        }
    </style>
</head>

<body>
    <div class="wrapper" style="background-color: #f8fafc; padding: 48px 20px; width: 100%;">
        <div class="container"
            style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);">

            <!-- Header -->
            <div class="header" style="background-color: #ffffff; padding: 48px 40px 32px; text-align: center;">
                @php
                    $logoSetting = \App\Models\Setting::where('key', 'site_logo')->first();
                    $logoUrl = asset('images/gslj/logo.jpg'); // Default fallback

                    if ($logoSetting) {
                        // Spatie Translatable automatically handles JSON decoding and locale selection
                        // when accessing the attribute, but only if the model is instantiated.
                        // However, accessing ->value could return the string if current locale matches,
                        // or we might need to be explicit if validation failed upstream or structure varies.
                        // safest is to trust the accessor if generic, or manually decode if raw.
                        // Given Setting model uses HasTranslations, $logoSetting->value should be the translated string (path).

                        $logoPath = $logoSetting->value;
                        if ($logoPath) {
                            $logoUrl = asset($logoPath);
                        }
                    }
                @endphp
                <img src="{{ $logoUrl }}" alt="{{ config('app.name') }}" class="logo"
                    style="max-height: 72px; width: auto; margin: 0 auto; display: block; border: 0; outline: none; text-decoration: none;">
            </div>

            <!-- Main Content -->
            <div class="body" style="padding: 40px; background-color: #ffffff;">
                @yield('content')
            </div>

            <!-- Footer -->
            <div class="footer"
                style="background-color: #f1f5f9; padding: 40px 40px 32px; text-align: center; font-size: 14px; color: #64748b;">
                <p>© {{ date('Y') }} {{ config('app.name') }}. {{ __('All rights reserved.') }}</p>

                @php
                    $address = \App\Models\Setting::where('key', 'site_address')->value('value');
                    if ($address) {
                        // Manual decode because ->value('value') returns raw JSON string for translatable columns in some contexts
                        // But wait, ->value('value') executes a query "select value from settings ... limit 1".
                        // Use the Model instance method to be consistent with logo logic above.
                        $addressSetting = \App\Models\Setting::where('key', 'site_address')->first();
                        $address = $addressSetting ? $addressSetting->value : null;
                    }
                @endphp

                @if($address)
                    <p style="margin-top: 12px;">{{ $address }}</p>
                @endif

                <!-- Optional: unsubscribe / links -->
                <!-- <p style="margin-top: 16px;"><a href="#">Unsubscribe</a> • <a href="#">Privacy Policy</a></p> -->
            </div>

        </div>
    </div>
</body>

</html>