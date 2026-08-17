// JUMO UEOS — Authoritative AI URL Resolution & Validation Utility
// Ensures all AI provider requests resolve to absolute URLs and prevents relative fetch failures.

export class JumoAIUrlResolver {
  /**
   * Resolves an absolute URL from a base and a path.
   * Ensures the resulting URL is valid and absolute.
   * Throws a descriptive error if resolution fails.
   */
  public static resolve(base: string | null | undefined, path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    
    // If path is already absolute, return it
    if (this.isAbsolute(path)) {
      return path;
    }

    if (!base || base.trim().length === 0) {
      throw new Error(`AI_PROVIDER_CONFIGURATION_INVALID: Cannot resolve absolute URL for path '${normalizedPath}' because the provider base URL is missing or empty.`);
    }

    try {
      // Handle base URLs that might have trailing slashes
      const baseUrl = base.endsWith("/") ? base.slice(0, -1) : base;
      const fullUrl = `${baseUrl}${normalizedPath}`;
      
      // Final validation
      if (!this.isAbsolute(fullUrl)) {
        throw new Error(`AI_PROVIDER_CONFIGURATION_INVALID: Resolved URL '${fullUrl}' is not absolute. Base: '${base}', Path: '${path}'`);
      }
      
      return fullUrl;
    } catch (err: any) {
      if (err.message.startsWith("AI_PROVIDER_CONFIGURATION_INVALID")) throw err;
      throw new Error(`AI_PROVIDER_CONFIGURATION_INVALID: Failed to construct absolute AI URL. ${err.message}`);
    }
  }

  /**
   * Checks if a URL string is absolute.
   */
  public static isAbsolute(url: string): boolean {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return !!parsed.protocol && !!parsed.host;
    } catch {
      // Fallback for Node.js environments or malformed URLs
      return url.startsWith("http://") || url.startsWith("https://");
    }
  }

  /**
   * Validates a provider endpoint configuration.
   */
  public static validateEndpoint(providerId: string, endpoint: string | null | undefined): void {
    if (!endpoint || endpoint.trim().length === 0) {
      throw new Error(`AI_PROVIDER_CONFIGURATION_INVALID: Provider '${providerId}' base URL is not configured.`);
    }
    if (!this.isAbsolute(endpoint)) {
      throw new Error(`AI_PROVIDER_CONFIGURATION_INVALID: Provider '${providerId}' base URL '${endpoint}' is not a valid absolute URL.`);
    }
  }
}
