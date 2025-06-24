// Middleware de sécurité pour gérer les en-têtes
export const securityHeaders = {
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://rpc.hemi.network https://testnet.rpc.hemi.network https://explorer.hemi.xyz https://testnet.explorer.hemi.xyz wss://relay.walletconnect.com https://relay.walletconnect.com",
    "frame-ancestors 'none'"
  ].join('; ')
}; 