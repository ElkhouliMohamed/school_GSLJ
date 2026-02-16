<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\PreRegistration;

class PreRegistrationNotification extends Notification
{
    use Queueable;

    protected $preRegistration;

    /**
     * Create a new notification instance.
     */
    public function __construct(PreRegistration $preRegistration)
    {
        $this->preRegistration = $preRegistration;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Nouvelle Pré-inscription - ' . $this->preRegistration->student_first_name . ' ' . $this->preRegistration->student_last_name)
            ->view('emails.admission.admin_notification', ['preRegistration' => $this->preRegistration]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
