<?php

namespace Middleware;

class Auth
{
    private static string $secretKey = '';

    private static function secret(): string
    {
        if (self::$secretKey === '') {
            self::$secretKey = getenv('JWT_SECRET') ?: 'your-secret-key-change-this';
        }
        return self::$secretKey;
    }

    // ── Decode & validate token from Authorization header ──────────────────────
    public static function user(): ?array
    {
        $headers = getallheaders();
        $header  = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return null;
        }

        $token = substr($header, 7);
        return self::verifyToken($token);
    }

    // ── Require authentication — send 401 and exit if missing/invalid ──────────
    public static function require(): array
    {
        $user = self::user();
        if (!$user) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'دسترسی غیرمجاز'], JSON_UNESCAPED_UNICODE);
            exit;
        }
        return $user;
    }

    // ── Generate HS256 JWT ─────────────────────────────────────────────────────
    public static function generateToken(array $user): string
    {
        $header  = self::b64encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload = self::b64encode(json_encode([
            'user_id'  => $user['id'],
            'username' => $user['username'],
            'role'     => $user['role'],
            'iat'      => time(),
            'exp'      => time() + 7 * 24 * 3600,   // 7 days
        ]));

        $sig = self::b64encode(
            hash_hmac('sha256', "$header.$payload", self::secret(), true)
        );

        return "$header.$payload.$sig";
    }

    // ── Verify & decode JWT ────────────────────────────────────────────────────
    private static function verifyToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;

        [$header, $payload, $sig] = $parts;

        $expectedSig = self::b64encode(
            hash_hmac('sha256', "$header.$payload", self::secret(), true)
        );

        if (!hash_equals($expectedSig, $sig)) return null;

        $data = json_decode(self::b64decode($payload), true);
        if (!$data) return null;

        if (isset($data['exp']) && $data['exp'] < time()) return null;

        return $data;
    }

    private static function b64encode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function b64decode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
