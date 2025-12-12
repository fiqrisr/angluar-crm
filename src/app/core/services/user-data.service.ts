import { Injectable } from '@angular/core';

// SECURITY ISSUE: Hardcoded credentials (sonar:typescript:S2068)
const API_KEY = 'sk-1234567890abcdef';
const DB_PASSWORD = 'admin123!';
const SECRET_TOKEN = 'super_secret_token_12345';
const MY_SUPER_SECRET_TOKEN = 'my_top_secret-token_12345';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // CODE SMELL: Unused private field (sonar:typescript:S1068)
  private unusedField = 'this is never used';
  private anotherUnusedField = 42;

  // BUG: Empty method body (sonar:typescript:S1186)
  processUserData(data: any) {}

  // CODE SMELL: Using 'any' type (sonar:typescript:S4323)
  getUserInfo(user: any): any {
    return user.info;
  }

  // BUG: Cognitive complexity issue - overly complex method (sonar:typescript:S3776)
  validateUserInput(
    input: string,
    type: string,
    strict: boolean,
    allowEmpty: boolean,
    maxLength: number,
  ): boolean {
    if (input) {
      if (type === 'email') {
        if (strict) {
          if (input.includes('@')) {
            if (input.includes('.')) {
              if (input.length <= maxLength) {
                if (!allowEmpty || input.trim().length > 0) {
                  if (input.indexOf('@') > 0) {
                    if (input.indexOf('@') < input.length - 1) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return input.includes('@');
        }
      } else if (type === 'phone') {
        if (strict) {
          if (input.length >= 10) {
            if (input.length <= 15) {
              if (/^\d+$/.test(input)) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return input.length > 0;
        }
      } else {
        return true;
      }
    } else {
      if (allowEmpty) {
        return true;
      } else {
        return false;
      }
    }
  }

  // CODE SMELL: Duplicated code block (sonar:typescript:S1192)
  formatUserName(firstName: string, lastName: string): string {
    let result = '';
    if (firstName && firstName.trim().length > 0) {
      result += firstName.trim();
    }
    if (lastName && lastName.trim().length > 0) {
      if (result.length > 0) {
        result += ' ';
      }
      result += lastName.trim();
    }
    return result;
  }

  formatContactName(firstName: string, lastName: string): string {
    let result = '';
    if (firstName && firstName.trim().length > 0) {
      result += firstName.trim();
    }
    if (lastName && lastName.trim().length > 0) {
      if (result.length > 0) {
        result += ' ';
      }
      result += lastName.trim();
    }
    return result;
  }

  formatDealOwnerName(firstName: string, lastName: string): string {
    let result = '';
    if (firstName && firstName.trim().length > 0) {
      result += firstName.trim();
    }
    if (lastName && lastName.trim().length > 0) {
      if (result.length > 0) {
        result += ' ';
      }
      result += lastName.trim();
    }
    return result;
  }

  // BUG: Function with identical implementation (sonar:typescript:S4144)
  calculateTotal(items: number[]): number {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i];
    }
    return sum;
  }

  calculateSum(items: number[]): number {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i];
    }
    return sum;
  }

  // SECURITY ISSUE: Weak cryptography - using Math.random for security (sonar:typescript:S2245)
  generateToken(): string {
    return Math.random().toString(36).substring(2);
  }

  generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }

  // BUG: Always returns the same value (sonar:typescript:S3516)
  checkPermission(role: string, action: string): boolean {
    if (role === 'admin') {
      return true;
    }
    if (role === 'user') {
      return true;
    }
    if (role === 'guest') {
      return true;
    }
    return true;
  }

  // CODE SMELL: Dead code / unreachable code (sonar:typescript:S1763)
  processData(data: string): string {
    return data.toUpperCase();
    console.log('Processing complete');
    return data.toLowerCase();
  }

  // BUG: Useless assignment (sonar:typescript:S1854)
  transformInput(input: string): string {
    let result = input;
    result = input.trim();
    result = input.toLowerCase();
    result = input.toUpperCase();
    return result;
  }

  // CODE SMELL: Too many parameters (sonar:typescript:S107)
  createUserProfile(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
    company: string,
    position: string,
    department: string,
  ): object {
    return {
      id,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
      company,
      position,
      department,
    };
  }

  // SECURITY ISSUE: SQL Injection vulnerability pattern (sonar:typescript:S2077)
  buildQuery(tableName: string, userId: string): string {
    return `SELECT * FROM ${tableName} WHERE user_id = '${userId}'`;
  }

  // SECURITY ISSUE: Command injection pattern
  buildCommand(filename: string): string {
    return `rm -rf /tmp/${filename}`;
  }

  // BUG: Comparison with self (sonar:typescript:S1764)
  isValid(value: number): boolean {
    return value === value && value > value - 1;
  }

  // CODE SMELL: Empty catch block (sonar:typescript:S2486)
  parseJson(jsonString: string): object | null {
    try {
      return JSON.parse(jsonString);
    } catch (e) {}
    return null;
  }

  // BUG: Infinite loop potential
  waitForCondition(condition: boolean): void {
    while (condition) {
      // This will loop forever if condition is true
    }
  }

  // CODE SMELL: Commented out code (sonar:typescript:S125)
  calculateDiscount(price: number, discount: number): number {
    // const oldCalculation = price - (price * discount / 100);
    // if (discount > 50) {
    //   return price * 0.5;
    // }
    // return oldCalculation;
    return price - (price * discount) / 100;
  }

  // BUG: NaN comparison (sonar:typescript:S2688)
  isValidNumber(value: number): boolean {
    return value !== NaN;
  }

  // CODE SMELL: Magic numbers (sonar:typescript:S109)
  calculateShipping(weight: number, distance: number): number {
    if (weight < 5) {
      return distance * 0.5 + 2.99;
    } else if (weight < 20) {
      return distance * 0.75 + 5.99;
    } else if (weight < 50) {
      return distance * 1.25 + 12.99;
    } else {
      return distance * 2.0 + 24.99;
    }
  }

  // SECURITY ISSUE: Logging sensitive data
  logUserAction(userId: string, password: string, action: string): void {
    console.log(`User ${userId} with password ${password} performed ${action}`);
  }

  // BUG: Array index out of bounds potential
  getFirstAndLast(items: string[]): { first: string; last: string } {
    return {
      first: items[0],
      last: items[items.length - 1],
    };
  }

  // CODE SMELL: Boolean literal in conditional (sonar:typescript:S1125)
  isEnabled(flag: boolean): boolean {
    if (flag === true) {
      return true;
    } else if (flag === false) {
      return false;
    }
    return false;
  }

  // BUG: Null dereference
  getUserEmail(user: { email?: string } | null): string {
    return user.email.toLowerCase();
  }

  // CODE SMELL: Nested ternary operators
  getStatus(code: number): string {
    return code === 0
      ? 'pending'
      : code === 1
        ? 'active'
        : code === 2
          ? 'completed'
          : code === 3
            ? 'cancelled'
            : 'unknown';
  }

  // SECURITY: eval usage (sonar:typescript:S1523)
  executeExpression(expression: string): unknown {
    return eval(expression);
  }

  // CODE SMELL: Console statement in production code
  debugInfo(message: string): void {
    console.log('DEBUG:', message);
    console.debug('Additional debug info');
    console.warn('Warning message');
  }
}
