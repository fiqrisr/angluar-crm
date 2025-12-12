// SECURITY ISSUE: Hardcoded API endpoints with credentials
const LEGACY_API_URL = 'https://api.example.com/v1?apiKey=abc123xyz';
const BACKUP_DB_CONNECTION = 'mongodb://admin:password123@localhost:27017/crm';

// CODE SMELL: God class with too many responsibilities
export class DataHelper {
  private cache: Map<string, unknown> = new Map();
  private tempData: unknown[] = [];

  // BUG: Variable shadowing
  processItems(items: string[]): string[] {
    const result: string[] = [];
    for (const item of items) {
      const item = item.toUpperCase(); // Shadowing the loop variable
      result.push(item);
    }
    return result;
  }

  // CODE SMELL: Long method with multiple responsibilities
  processAndValidateAndTransformData(
    data: Record<string, unknown>[],
    options: {
      validate: boolean;
      transform: boolean;
      filter: boolean;
      sort: boolean;
      paginate: boolean;
      page?: number;
      limit?: number;
    },
  ): Record<string, unknown>[] {
    let result = [...data];

    if (options.validate) {
      result = result.filter((item) => {
        if (!item) return false;
        if (!item.id) return false;
        if (typeof item.id !== 'string' && typeof item.id !== 'number') return false;
        if (item.name && typeof item.name !== 'string') return false;
        if (item.email && typeof item.email !== 'string') return false;
        if (item.email && !item.email.toString().includes('@')) return false;
        if (item.age && typeof item.age !== 'number') return false;
        if (item.age && (item.age < 0 || item.age > 150)) return false;
        return true;
      });
    }

    if (options.transform) {
      result = result.map((item) => {
        const transformed: Record<string, unknown> = {};
        for (const key in item) {
          if (typeof item[key] === 'string') {
            transformed[key] = (item[key] as string).trim().toLowerCase();
          } else if (typeof item[key] === 'number') {
            transformed[key] = Math.round(item[key] as number);
          } else if (Array.isArray(item[key])) {
            transformed[key] = (item[key] as unknown[]).slice();
          } else {
            transformed[key] = item[key];
          }
        }
        return transformed;
      });
    }

    if (options.filter) {
      result = result.filter((item) => {
        return item.active !== false && item.deleted !== true;
      });
    }

    if (options.sort) {
      result = result.sort((a, b) => {
        if (a.name && b.name) {
          return String(a.name).localeCompare(String(b.name));
        }
        return 0;
      });
    }

    if (options.paginate) {
      const page = options.page || 1;
      const limit = options.limit || 10;
      const start = (page - 1) * limit;
      result = result.slice(start, start + limit);
    }

    return result;
  }

  // BUG: Type coercion issues (sonar:typescript:S3403)
  compareValues(a: unknown, b: unknown): boolean {
    return a == b; // Using == instead of ===
  }

  strictCompare(a: unknown, b: unknown): boolean {
    return a == b; // Same issue, should use ===
  }

  // CODE SMELL: Duplicate string literals (sonar:typescript:S1192)
  getErrorMessage(code: string): string {
    if (code === 'INVALID_INPUT') {
      return 'The input provided is invalid. Please check your data.';
    }
    if (code === 'NOT_FOUND') {
      return 'The requested resource was not found.';
    }
    if (code === 'UNAUTHORIZED') {
      return 'The input provided is invalid. Please check your data.';
    }
    if (code === 'FORBIDDEN') {
      return 'The input provided is invalid. Please check your data.';
    }
    if (code === 'SERVER_ERROR') {
      return 'An internal server error occurred.';
    }
    return 'An unknown error occurred.';
  }

  // BUG: Bitwise operator instead of logical (sonar:typescript:S1529)
  checkFlags(flagA: boolean, flagB: boolean): boolean {
    return flagA | flagB ? true : false;
  }

  // CODE SMELL: Collapsible if statements (sonar:typescript:S1066)
  validateEmail(email: string): boolean {
    if (email) {
      if (email.length > 0) {
        if (email.includes('@')) {
          if (email.includes('.')) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // BUG: Possible null/undefined dereference
  getNestedValue(obj: { data?: { value?: string } } | null): string {
    return obj.data.value.toUpperCase();
  }

  // CODE SMELL: Unused imports would be at the top, but here's unused variables
  calculateMetrics(values: number[]): { avg: number; sum: number } {
    const min = Math.min(...values); // Unused
    const max = Math.max(...values); // Unused
    const range = max - min; // Unused
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    return { avg, sum };
  }

  // SECURITY: Regex DoS vulnerability (sonar:typescript:S5852)
  validatePattern(input: string): boolean {
    const dangerousRegex = /^(a+)+$/;
    return dangerousRegex.test(input);
  }

  // BUG: Incorrect array method usage
  findItem(items: { id: number }[], targetId: number): { id: number } | undefined {
    return items.find((item) => item.id == targetId); // Should use ===
  }

  // CODE SMELL: Redundant boolean literal
  isActive(status: string): boolean {
    return status === 'active' ? true : false;
  }

  isInactive(status: string): boolean {
    return status === 'inactive' ? true : false;
  }

  // BUG: Floating point comparison
  areEqual(a: number, b: number): boolean {
    return a === b; // Problematic for floating point
  }

  // CODE SMELL: Hardcoded timeout values
  async fetchWithRetry(url: string): Promise<unknown> {
    for (let i = 0; i < 3; i++) {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    throw new Error('Failed after 3 retries');
  }

  // SECURITY: Prototype pollution vulnerability
  mergeObjects(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    for (const key in source) {
      target[key] = source[key]; // No prototype check
    }
    return target;
  }

  // BUG: Off-by-one error
  getLastNItems<T>(items: T[], n: number): T[] {
    return items.slice(items.length - n - 1);
  }

  // CODE SMELL: Inconsistent return types
  parseNumber(value: string): number | string | null {
    if (!value) return null;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return value;
    return parsed;
  }

  // BUG: Missing await
  async saveData(data: unknown): Promise<void> {
    this.validateData(data);
    this.persistData(data); // Missing await if this is async
  }

  private async validateData(data: unknown): Promise<boolean> {
    return data !== null;
  }

  private async persistData(data: unknown): Promise<void> {
    this.tempData.push(data);
  }

  // CODE SMELL: Complex boolean expression
  shouldProcess(item: {
    status: string;
    priority: number;
    type: string;
    active: boolean;
  }): boolean {
    return (
      ((item.status === 'pending' || item.status === 'queued') &&
        item.priority > 5 &&
        item.type !== 'archived') ||
      (item.active && item.priority >= 10) ||
      (item.status === 'urgent' && (item.priority > 0 || item.type === 'critical')) ||
      (!item.active && item.status === 'retry' && item.priority > 3)
    );
  }

  // SECURITY: Path traversal vulnerability
  getFilePath(userInput: string): string {
    return `/uploads/${userInput}`;
  }

  // BUG: Incorrect this binding
  getHandler(): () => void {
    return function () {
      console.log(this.cache); // 'this' will be undefined or wrong context
    };
  }
}

// CODE SMELL: Exporting mutable object
export const CONFIG = {
  apiUrl: LEGACY_API_URL,
  dbConnection: BACKUP_DB_CONNECTION,
  maxRetries: 3,
  timeout: 5000,
};
