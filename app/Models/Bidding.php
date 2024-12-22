<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MongoDB\BSON\ObjectId;


class Bidding extends Model
{
    protected $fillable = [
        'art_id',
        'base_price',
        'highest_price',
        'current_user',
    ];

    

    


}
