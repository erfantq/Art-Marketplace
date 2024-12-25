<?php

namespace App\Notifications;

use App\Models\Arts;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Session;

class BiddingLoserNotification extends Notification
{
    use Queueable;

    protected $bidding;
    protected $loserUsername;
    /**
     * Create a new notification instance.
     */
    public function __construct($bidding, $loserUsername)
    {
        $this->bidding = $bidding;
        $this->loserUsername = $loserUsername;
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
        $winner = $this->bidding['winner'];
        return [
            'bidding_id' => $this->bidding['_id'],
            'item_name' => $itemName,
            'username' => Session::get('user')['username'],  //
            'end_time' => $this->bidding['end_time'],
            'message' => "Oh no! The user {$winner} has suggested
                           a more price than you for bidding {$itemName}. Your wallet is recharged.",
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
