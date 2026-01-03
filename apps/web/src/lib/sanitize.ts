/**
 * Input Sanitization Utilities
 * XSS and injection prevention
 * 
 * Girdi Temizleme Yardımcıları
 * XSS ve injection önleme
 */

/**
 * Sanitizes HTML to prevent XSS attacks
 * XSS saldırılarını önlemek için HTML'yi temizler
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  // Basic HTML escape
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes user input for safe display
 * Güvenli görüntüleme için kullanıcı girdisini temizler
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove script tags and dangerous patterns
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '');
  
  return sanitized.trim();
}

/**
 * Validates and sanitizes file names
 * Dosya isimlerini doğrular ve temizler
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return '';
  
  // Remove path traversal attempts
  let sanitized = fileName
    .replace(/\.\./g, '')
    .replace(/[\/\\]/g, '')
    .replace(/[<>:"|?*]/g, '');
  
  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.split('.').pop();
    const name = sanitized.substring(0, 250);
    sanitized = ext ? `${name}.${ext}` : name;
  }
  
  return sanitized;
}

/**
 * Validates URL to prevent open redirect
 * Açık yönlendirmeyi önlemek için URL'yi doğrular
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  // Only allow http(s) and relative URLs
  if (url.startsWith('/')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsedUrl = new URL(url);
      // Only allow specific domains
      const allowedDomains = ['basis.com', 'localhost'];
      if (allowedDomains.some(domain => parsedUrl.hostname.includes(domain))) {
        return url;
      }
    } catch {
      return '';
    }
  }
  
  return '';
}

/**
 * Validates SQL-like inputs (extra safety layer)
 * SQL benzeri girdileri doğrular (ekstra güvenlik katmanı)
 */
export function detectSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(--|\*|;|\/\*|\*\/)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}
















