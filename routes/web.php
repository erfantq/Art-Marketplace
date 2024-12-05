    <?php

    use App\Http\Controllers\UserController;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;
    use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
    use App\Http\Middleware\VerifyCsrfToken;
    use Illuminate\Http\Request;
    use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

    use function Laravel\Prompts\alert;

    Route::get('/', function () {
        return Inertia::render('Index');
    });

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

    Route::post('/login', [UserController::class, 'login']);

    // Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

    Route::get('/home', function(Request $request) {
        $username = session('username');
        return Inertia::render('HomeApp', compact('username'));
    })->name('home');

    // Route::middleware([
    //     VerifyCsrfToken::class,
    //     EnsureFrontendRequestsAreStateful::class, 
    // ])->group(function () {
    //     Route::post('/register', [UserController::class, 'register']);
    //     Route::get('/csrf-token', function () {
    //         return response()->json(['csrfToken' => csrf_token()]);
    //     });
    // });


