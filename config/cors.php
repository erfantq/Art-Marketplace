<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '/csrf-token', '*'], // Add your routes here
    'allowed_methods' => ['*'], // Allow all methods (GET, POST, etc.)
    'allowed_origins' => ['http://localhost:8000', 'http://127.0.0.1:8000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Set true if you need cookies or authentication headers
];
