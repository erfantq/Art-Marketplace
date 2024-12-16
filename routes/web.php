    <?php

use App\Http\Controllers\ArtsCotroller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RatingsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationCotroller;
use App\Http\Controllers\WalletController;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckUserRole;
use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;
    use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
    use App\Http\Middleware\VerifyCsrfToken;
    use Illuminate\Http\Request;
    use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

    use function Laravel\Prompts\alert;

    Route::get('/login', function () {
        return Inertia::render('Index');
    })->name('login');
    Route::post('/login', [UserController::class, 'login']);


    // Route::get('/csrf-token', function () {
    //     return response()->json(['csrfToken' => csrf_token()]);
    // });

    Route::get('/register', function () {
        return Inertia::render('RegisterApp');
    })->name('register');
    Route::post('/register', [UserController::class, 'register']);
    // Route::post('/register', function (Request $request) {
    //     return $request->username;
    //     // die();

    //     // dd($request->all());
    // });


    // Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

    // Route::get('home');

    Route::post('purchase', [TransactionsController::class, 'purchase']);

    Route::prefix('home')->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/arts/{artId}', [HomeController::class, 'showSelectedArt']);
        Route::post('/{artId}/comment', [RatingsController::class, 'store']);
        Route::post('/{artId}/delcomment', [RatingsController::class, 'destroy']);
    });

    Route::prefix('{username}/profile')->group(function () {
        Route::get('/', [UserController::class, 'show']);
        Route::get('/update', [UserController::class, 'showUpdate']);
        Route::post('/update', [UserController::class, 'updateUserInfo']);
    });

    Route::resource('{username}/arts', ArtsCotroller::class)->middleware(CheckUserRole::class);

    Route::get('{username}/walletcharge', [UserController::class, 'showWallet']);

    Route::post('{username}/walletcharge', [UserController::class, 'updateWallet']);

    Route::get('inactiveusers', [UserController::class, 'inactiveUsers'])->middleware(CheckAdmin::class);
    Route::get('makeactive/{username}', [UserController::class, 'makeActive'])->middleware(CheckAdmin::class);

    Route::get('/orders', [UserController::class, 'getPurchasess']);

    Route::get('logout', [UserController::class, 'logout']);

    // Route::middleware([
    //     VerifyCsrfToken::class,
    //     EnsureFrontendRequestsAreStateful::class, 
    // ])->group(function () {
    //     Route::post('/register', [UserController::class, 'register']);
    //     Route::get('/csrf-token', function () {
    //         return response()->json(['csrfToken' => csrf_token()]);
    //     });
    // });


