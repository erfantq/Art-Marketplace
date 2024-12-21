<?php

namespace App\Jobs;

use App\Services\TransactionsService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ApproveTransactionJob implements ShouldQueue
{
    use Queueable;

    protected $transactionId;
    protected $transactionService;


    /**
     * Create a new job instance.
     */
    public function __construct($transactionId)
    {
        $this->transactionId = $transactionId;
        $this->transactionService = new TransactionsService();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $this->transactionService->changeOrderStatus($this->transactionId, 2);
        } catch (\Exception $e) {
            throw new \Exception("Database error: " . $e->getMessage());
        }

    }
}
