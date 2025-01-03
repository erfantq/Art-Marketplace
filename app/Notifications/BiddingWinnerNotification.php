<?php

namespace App\Notifications;

use App\Models\Arts;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BiddingWinnerNotification extends Notification
{
    use Queueable;

    protected $bidding;
    /**
     * Create a new notification instance.
     */
    public function __construct($bidding)
    {
        $this->bidding = $bidding;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    // The data stored in the database
    public function toDatabase($notifiable)
    {
        $artIdString = (string) $this->bidding['art_id'];
        $itemName = Arts::getArt($artIdString)['name'];
        return [
            'bidding_id' => $this->bidding['_id'],
            'item_name' => $itemName,
            'username' => $this->bidding['winner'],
            'end_time' => $this->bidding['end_time'],
            'message' => "Congratulations! You've won the bidding for {$this->bidding->item_name}.",
        ];
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
