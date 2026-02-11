<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            $themeColor = '#7c3aed';
            $themeColorRgb = '124, 58, 237';

            if (class_exists(\App\Models\Setting::class)) {
                $setting = \App\Models\Setting::where('key', 'theme_color')->first();
                if ($setting) {
                    $val = $setting->value;
                    if (is_array($val) || is_object($val)) {
                        $val = (array) $val;
                        $themeColor = $val['en'] ?? reset($val) ?? $themeColor;
                    } elseif (is_string($val) && !empty($val)) {
                        $themeColor = $val;
                    }
                }

                // Mail Settings
                $mailSettings = \App\Models\Setting::whereIn('key', [
                    'mail_mailer',
                    'mail_host',
                    'mail_port',
                    'mail_username',
                    'mail_password',
                    'mail_encryption',
                    'mail_from_address',
                    'mail_from_name'
                ])->get()->pluck('value', 'key');

                if ($mailSettings->has('mail_mailer')) {
                    config(['mail.default' => $mailSettings['mail_mailer']]);
                }

                if ($mailSettings->has('mail_host')) {
                    config(['mail.mailers.smtp.host' => $mailSettings['mail_host']]);
                }

                if ($mailSettings->has('mail_port')) {
                    config(['mail.mailers.smtp.port' => $mailSettings['mail_port']]);
                }

                if ($mailSettings->has('mail_username')) {
                    config(['mail.mailers.smtp.username' => $mailSettings['mail_username']]);
                }

                if ($mailSettings->has('mail_password')) {
                    config(['mail.mailers.smtp.password' => $mailSettings['mail_password']]);
                }

                if ($mailSettings->has('mail_encryption')) {
                    config(['mail.mailers.smtp.encryption' => $mailSettings['mail_encryption']]);
                }

                if ($mailSettings->has('mail_from_address')) {
                    config(['mail.from.address' => $mailSettings['mail_from_address']]);
                }

                if ($mailSettings->has('mail_from_name')) {
                    config(['mail.from.name' => $mailSettings['mail_from_name']]);
                }
            }

            // Sanitize Hex
            if (!preg_match('/^#[a-f0-9]{6}$/i', $themeColor)) {
                $themeColor = '#7c3aed';
            }

            // Hex to RGB
            $hex = ltrim($themeColor, '#');
            if (strlen($hex) == 6) {
                $r = hexdec(substr($hex, 0, 2));
                $g = hexdec(substr($hex, 2, 2));
                $b = hexdec(substr($hex, 4, 2));
                $themeColorRgb = "$r, $g, $b";
            }

            \Illuminate\Support\Facades\View::share('themeColor', $themeColor);
            \Illuminate\Support\Facades\View::share('themeColorRgb', $themeColorRgb);
        } catch (\Exception $e) {
            // Fallback
            \Illuminate\Support\Facades\View::share('themeColor', '#7c3aed');
            \Illuminate\Support\Facades\View::share('themeColorRgb', '124, 58, 237');
        }
    }
}
