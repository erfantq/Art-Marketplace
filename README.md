<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# ArtMarketPlace

ArtMarketPlace is a web application where artists can sell their artwork, and buyers can browse and purchase. It features bidding, artist verification, and order tracking.

## Features
- **Artist Profiles**: Store detailed information about artists.
- **Artwork Listings**: Display artwork details for buyers.
- **Transaction Records**: Keep track of all purchases.
- **User Reviews**: Allow users to review artists and artworks.
- **Bidding System**: Enable competitive buying.
- **Artist Verification**: Ensure authenticity of artists.
- **Order Tracking**: Provide real-time updates on orders.

## Technology Stack
- **Backend**: PHP Laravel with MongoDB for database management.
- **Frontend**: React.js for a dynamic user interface.
- **Integration**: Inertia.js for seamless backend/frontend communication without the need for APIs.

## Installation

### 1. Install Dependencies
Run the following commands to install the required dependencies:
```bash
composer require mongodb/mongodb
composer require jenssegers/mongodb
composer install
npm install
```
### 2. Set Up the Database 
Migrate the database and seed it with initial data:
```bash
php artisan migrate
php artisan db:seed
```
### 3. Run the Application
To start the application, follow these steps:
1. Open two terminals in the project directory.
2. In the first terminal, run
```bash
php artisan serve
```
3. In the second terminal, run:
```bash
npm run dev
```
4. Access the application at http://localhost:8000 .


