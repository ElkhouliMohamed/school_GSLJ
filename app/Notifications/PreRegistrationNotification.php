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
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Nouvelle Pré-inscription - ' . $this->preRegistration->student_first_name . ' ' . $this->preRegistration->student_last_name)
            ->greeting('Nouvelle Demande de Pré-inscription')
            ->line('Une nouvelle demande de pré-inscription a été soumise.')
            ->line('')
            ->line('**Informations de l\'élève:**')
            ->line('Nom: ' . $this->preRegistration->student_last_name)
            ->line('Prénom: ' . $this->preRegistration->student_first_name)
            ->line('Date de naissance: ' . $this->preRegistration->birth_date->format('d/m/Y'))
            ->line('Classe demandée: ' . $this->preRegistration->requested_class)
            ->line('')
            ->line('**Informations du parent:**')
            ->line('Nom et prénom: ' . $this->preRegistration->parent_name)
            ->line('Téléphone: ' . $this->preRegistration->phone)
            ->line('')
            ->when($this->preRegistration->message, function ($mail) {
                return $mail->line('**Message:**')
                    ->line($this->preRegistration->message)
                    ->line('');
            })
            ->action('Voir dans le panneau d\'administration', url('/admin/pre-registrations'))
            ->line('Merci de traiter cette demande rapidement.');
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
