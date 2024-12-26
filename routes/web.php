    <?php

use App\Http\Controllers\ArtsController;
use App\Http\Controllers\ArtsCotroller;
use App\Http\Controllers\BiddingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RatingsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\User\ArtistController;
use App\Http\Controllers\User\BaseNormalUserAdminController;
use App\Http\Controllers\User\BaseUserController;
use App\Http\Controllers\User\NormalUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationCotroller;
use App\Http\Controllers\WalletController;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Middleware\VerifyCsrfToken;
use App\Models\Ratings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Types\Relations\Role;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use function Laravel\Prompts\alert;

   
    Route::get('/register', function () {
        return Inertia::render('components/Register');
    })->name('register');
    Route::post('/register', [BaseUserController::class, 'register']);
    
    Route::get('/login', function () {
        return Inertia::render('components/Login');
    })->name('login');
    Route::post('/login', [BaseUserController::class, 'login']);

    Route::get('/', [HomeController::class, 'index']);
    
    Route::prefix('/product')->group(function () {
        Route::get('/{productId}', [HomeController::class, 'showSelectedArt'])->middleware(RoleMiddleware::class.':user');
        Route::post('/{productId}/comment', [RatingsController::class, 'store']);
        Route::post('{productId}/delcomment', [RatingsController::class, 'destory']);
    });

    Route::post('/purchase', [TransactionsController::class, 'purchase']);

    Route::middleware(AuthMiddleware::class)->group(function () {
        Route::get('/user/{username}/profile', [NormalUserController::class, 'show'])->middleware(RoleMiddleware::class.':user');
        Route::get('/admin/{username}/profile', [AdminController::class, 'show'])->middleware(RoleMiddleware::class.':admin');
        Route::get('/artist/{username}/profile', [ArtistController::class, 'show'])->middleware(RoleMiddleware::class.':artist');

        Route::prefix('/{username}/profile')->group(function () {
            Route::get('/update', [BaseUserController::class, 'showUpdate']);
            Route::post('/update', [BaseUserController::class, 'updateUserInfo']);
        });

        Route::resource('{username}/arts', ArtsController::class)->middleware(RoleMiddleware::class.':artist');
        
        Route::get('{username}/walletcharge', [BaseUserController::class, 'showWallet'])->middleware(RoleMiddleware::class.':admin,user');
        Route::post('{username}/walletcharge', [BaseNormalUserAdminController::class, 'updateWallet'])->middleware(RoleMiddleware::class.':admin,user');

        Route::get('/notifications', [NotificationController::class, 'index']);

        Route::prefix('/bidding')->group(function () {
            Route::get('/add', [BiddingController::class, 'showAdd'])->middleware(RoleMiddleware::class.':artist');
            Route::post('/add', [BiddingController::class, 'add'])->middleware(RoleMiddleware::class.':artist');
            Route::post('/suggest', [BiddingController::class, 'suggestNewPrice'])->middleware(RoleMiddleware::class.':user');
        });
    });

    Route::get('/inactiveusers', [AdminController::class, 'inactiveUsers'])->middleware(RoleMiddleware::class.':admin');
    
    Route::get('/makeactive/{username}', [AdminController::class, 'makeActive'])->middleware(RoleMiddleware::class.':admin');
    
    Route::get('/orders', [BaseUserController::class, 'getPurchases'])->middleware(RoleMiddleware::class.':user,artist');

    Route::get('/logout', [BaseUserController::class, 'logout']);

    


  
    // Route::prefix('home')->group(function () {
    //     Route::post('/{artId}/comment', [RatingsController::class, 'store']);
    //     Route::get('/arts/{artId}', [HomeController::class, 'showSelectedArt']);
    //     Route::post('/{artId}/delcomment', [RatingsController::class, 'destroy']);
    // });

    // Route::prefix('/user/{username}/profile')->group(function () {
    //     Route::get('/', [UserController::class, 'show']);
    //     Route::get('/update', [UserController::class, 'showUpdate']);
    //     Route::post('/update', [UserController::class, 'updateUserInfo']);
    // });







    // Route::get('session', function() {
    //     return var_dump(session('user'));
    // });
    

    // Route::middleware([
    //     VerifyCsrfToken::class,
    //     EnsureFrontendRequestsAreStateful::class, 
    // ])->group(function () {
    //     Route::post('/register', [UserController::class, 'register']);
    //     Route::get('/csrf-token', function () {
    //         return response()->json(['csrfToken' => csrf_token()]);
    //     });
    // });


