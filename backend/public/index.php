<?php
declare(strict_types=1);

// Force PHP to treat all strings as UTF-8 internally
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// ── CORS headers — set in PHP so they work regardless of Apache mod_headers ───
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=UTF-8');

// Return immediately for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
define('BASE_PATH', dirname(__DIR__));

require_once BASE_PATH . '/config/database.php';
require_once BASE_PATH . '/src/Middleware/Auth.php';
require_once BASE_PATH . '/src/Controllers/AuthController.php';
require_once BASE_PATH . '/src/Controllers/ScanController.php';
require_once BASE_PATH . '/src/Controllers/ArticleController.php';
require_once BASE_PATH . '/src/Controllers/CommentController.php';
require_once BASE_PATH . '/src/Controllers/SettingsController.php';

// ── Parse URI ─────────────────────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];
$uri    = strtok($_SERVER['REQUEST_URI'], '?');
$uri    = '/' . trim($uri, '/');

// Accept both /api/scans and /scans
if (str_starts_with($uri, '/api')) {
    $uri = '/' . ltrim(substr($uri, 4), '/');
}

$segments = array_values(array_filter(explode('/', $uri)));
$resource = $segments[0] ?? '';
$param    = $segments[1] ?? null;
$action   = $segments[2] ?? null;

// ── Router ────────────────────────────────────────────────────────────────────
try {
    $response = match(true) {
        // Auth
        $resource === 'auth' && $param === 'login'  && $method === 'POST' =>
            (new Controllers\AuthController())->login(),
        $resource === 'auth' && $param === 'logout' && $method === 'POST' =>
            (new Controllers\AuthController())->logout(),
        $resource === 'auth' && $param === 'me'     && $method === 'GET'  =>
            (new Controllers\AuthController())->me(),

        // Scans
        $resource === 'scans' && !$param && $method === 'GET'    =>
            (new Controllers\ScanController())->index(),
        $resource === 'scans' && !$param && $method === 'POST'   =>
            (new Controllers\ScanController())->store(),
        $resource === 'scans' && $param  && $method === 'GET'    =>
            (new Controllers\ScanController())->show($param),
        $resource === 'scans' && $param  && $method === 'PUT'    =>
            (new Controllers\ScanController())->update($param),
        $resource === 'scans' && $param  && $method === 'DELETE' =>
            (new Controllers\ScanController())->delete($param),

        // Articles
        $resource === 'articles' && !$param && $method === 'GET'    =>
            (new Controllers\ArticleController())->index(),
        $resource === 'articles' && !$param && $method === 'POST'   =>
            (new Controllers\ArticleController())->store(),
        $resource === 'articles' && $param  && $method === 'GET'    =>
            (new Controllers\ArticleController())->show($param),
        $resource === 'articles' && $param  && $method === 'PUT'    =>
            (new Controllers\ArticleController())->update($param),
        $resource === 'articles' && $param  && $method === 'DELETE' =>
            (new Controllers\ArticleController())->delete($param),

        // Comments
        $resource === 'comments' && !$param && $method === 'GET'  =>
            (new Controllers\CommentController())->index(),
        $resource === 'comments' && !$param && $method === 'POST' =>
            (new Controllers\CommentController())->store(),
        $resource === 'comments' && $param && $action === 'approve' && $method === 'PUT' =>
            (new Controllers\CommentController())->approve((int)$param),
        $resource === 'comments' && $param && $method === 'DELETE' =>
            (new Controllers\CommentController())->delete((int)$param),

        // Settings
        $resource === 'settings' && $method === 'GET' =>
            (new Controllers\SettingsController())->index(),
        $resource === 'settings' && $method === 'PUT' =>
            (new Controllers\SettingsController())->update(),

        // Health check
        $resource === 'health' && $method === 'GET' =>
            ['status' => 'ok', 'time' => date('c'), 'php' => PHP_VERSION],

        // 404
        default => (function () {
            http_response_code(404);
            return ['success' => false, 'message' => 'مسیر یافت نشد'];
        })()
    };

    // JSON_UNESCAPED_UNICODE keeps Persian text as-is instead of \uXXXX escapes.
    // JSON_UNESCAPED_SLASHES keeps URLs readable.
    echo json_encode(
        $response,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
    );

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'خطای سرور داخلی',
        'detail'  => getenv('APP_ENV') === 'development' ? $e->getMessage() : null,
    ], JSON_UNESCAPED_UNICODE);
}
