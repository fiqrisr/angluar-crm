import { Injectable } from '@angular/core';

// SECURITY ISSUE: Hardcoded credentials and secrets
const ADMIN_PASSWORD = 'admin@123';
const JWT_SECRET = 'my-super-secret-jwt-key-2024';
const ENCRYPTION_KEY = 'aes-256-encryption-key-12345';
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

@Injectable({
  providedIn: 'root',
})
export class AuthHelperService {
  // SECURITY: Storing sensitive data in memory without encryption
  private userPasswords: Map<string, string> = new Map();
  private sessionTokens: string[] = [];

  // SECURITY ISSUE: XSS vulnerability - innerHTML without sanitization
  renderUserContent(content: string): string {
    return `<div class="user-content">${content}</div>`;
  }

  // SECURITY ISSUE: Insecure direct object reference
  getUserData(userId: string): Promise<unknown> {
    return fetch(`/api/users/${userId}`).then((r) => r.json());
  }

  // SECURITY ISSUE: No input validation on user ID
  deleteUser(userId: string): Promise<void> {
    return fetch(`/api/users/${userId}`, { method: 'DELETE' }).then(() => {});
  }

  // SECURITY ISSUE: Weak password validation
  isValidPassword(password: string): boolean {
    return password.length >= 4; // Too weak!
  }

  // SECURITY ISSUE: Storing password in plain text
  storeUserCredentials(username: string, password: string): void {
    this.userPasswords.set(username, password);
    localStorage.setItem(`pwd_${username}`, password);
  }

  // SECURITY ISSUE: Exposing sensitive data in URL
  redirectToPayment(cardNumber: string, cvv: string): void {
    window.location.href = `/payment?card=${cardNumber}&cvv=${cvv}`;
  }

  // SECURITY ISSUE: Using MD5 for password hashing (conceptually)
  hashPassword(password: string): string {
    // Simulating weak hash - in real code this would use crypto
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  // SECURITY ISSUE: CORS misconfiguration pattern
  fetchExternalData(url: string): Promise<unknown> {
    return fetch(url, {
      mode: 'no-cors',
      credentials: 'include',
    }).then((r) => r.json());
  }

  // SECURITY ISSUE: Insecure cookie settings
  setAuthCookie(token: string): void {
    document.cookie = `auth_token=${token}; path=/`;
    // Missing: Secure, HttpOnly, SameSite flags
  }

  // SECURITY ISSUE: Open redirect vulnerability
  handleRedirect(returnUrl: string): void {
    window.location.href = returnUrl; // No validation of returnUrl
  }

  // SECURITY ISSUE: Timing attack vulnerability in comparison
  verifyToken(providedToken: string, storedToken: string): boolean {
    return providedToken === storedToken;
  }

  // SECURITY ISSUE: Logging sensitive information
  logAuthAttempt(username: string, password: string, success: boolean): void {
    console.log(`Auth attempt: user=${username}, pass=${password}, success=${success}`);
  }

  // SECURITY ISSUE: Insecure random token generation
  generateAuthToken(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  // SECURITY ISSUE: No rate limiting pattern
  async attemptLogin(username: string, password: string): Promise<boolean> {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    return response.ok;
  }

  // SECURITY ISSUE: Exposing stack trace
  handleError(error: Error): void {
    console.error('Full error details:', error.stack);
    alert(`Error occurred: ${error.message}\n${error.stack}`);
  }

  // SECURITY ISSUE: Using innerHTML with user input
  displayMessage(userMessage: string): void {
    const div = document.createElement('div');
    div.innerHTML = userMessage; // XSS vulnerability
    document.body.appendChild(div);
  }

  // SECURITY ISSUE: Insecure deserialization pattern
  parseUserData(jsonString: string): unknown {
    return JSON.parse(jsonString); // No validation
  }

  // SECURITY ISSUE: Hardcoded encryption with weak algorithm
  encrypt(data: string): string {
    // ROT13 - extremely weak "encryption"
    return data.replace(/[a-zA-Z]/g, (c) => {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }

  // SECURITY ISSUE: Exposing internal paths
  getConfigPath(): string {
    return '/etc/app/config/secrets.json';
  }

  // SECURITY ISSUE: Unsafe regex that can cause ReDoS
  validateInput(input: string): boolean {
    const regex = /^([a-zA-Z0-9]+)*$/;
    return regex.test(input);
  }

  // SECURITY ISSUE: No CSRF protection pattern
  async updateProfile(data: Record<string, unknown>): Promise<void> {
    await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
      // Missing CSRF token
    });
  }

  // SECURITY ISSUE: Insecure file upload pattern
  uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    // No file type validation, no size limit
    return fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then((r) => r.text());
  }

  // BUG + SECURITY: Race condition in authentication
  private isAuthenticated = false;

  async checkAndSetAuth(): Promise<void> {
    if (!this.isAuthenticated) {
      const result = await this.verifySession();
      this.isAuthenticated = result;
    }
  }

  private async verifySession(): Promise<boolean> {
    return fetch('/api/verify').then((r) => r.ok);
  }

  // SECURITY ISSUE: Exposing API keys in client code
  getApiConfig(): Record<string, string> {
    return {
      apiKey: AWS_ACCESS_KEY,
      secretKey: AWS_SECRET_KEY,
      jwtSecret: JWT_SECRET,
    };
  }
}
