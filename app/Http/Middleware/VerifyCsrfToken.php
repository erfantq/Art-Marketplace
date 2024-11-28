<?php
namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class VerifyCsrfToken extends Middleware
{

    protected $except = [
        '/register',
    ];

}
