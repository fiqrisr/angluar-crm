import { Injectable } from '@angular/core';

// SECURITY ISSUE: Hardcoded credentials (sonar:typescript:S2068)
const API_KEY = 'sk-1234567890abcdef';
const DB_PASSWORD = 'admin123!';
const SECRET_TOKEN = 'super_secret_token_12345';
const MY_SUPER_SECRET_TOKEN = 'my_top_secret-token_12345';

// SECURITY ISSUE: GitHub token exposed (for PR check demo)
const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy...
-----END RSA PRIVATE KEY-----`;

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

  // ============================================================
  // ADDITIONAL BUGS AND CODE SMELLS FOR PR CHECK DEMO
  // ============================================================

  // BUG: Division by zero potential (sonar:typescript:S3518)
  calculateAverage(numbers: number[]): number {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length; // Will return Infinity if array is empty
  }

  // BUG: Incorrect equality check for objects
  areObjectsEqual(obj1: object, obj2: object): boolean {
    return obj1 === obj2; // Reference comparison, not value comparison
  }

  // CODE SMELL: Redundant type casting
  convertToString(value: string): string {
    return String(value) as string;
  }

  // BUG: Incorrect array mutation in loop
  removeNegatives(numbers: number[]): number[] {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] < 0) {
        numbers.splice(i, 1); // BUG: Modifying array while iterating
      }
    }
    return numbers;
  }

  // CODE SMELL: Deeply nested callbacks (callback hell)
  fetchAllData(userId: string): void {
    fetch(`/api/user/${userId}`).then((response) => {
      response.json().then((user) => {
        fetch(`/api/orders/${user.id}`).then((orderResponse) => {
          orderResponse.json().then((orders) => {
            fetch(`/api/payments/${orders[0].id}`).then((paymentResponse) => {
              paymentResponse.json().then((payment) => {
                fetch(`/api/invoices/${payment.invoiceId}`).then((invoiceResponse) => {
                  invoiceResponse.json().then((invoice) => {
                    console.log('Invoice:', invoice);
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  // BUG: Promise not returned
  async saveUserAsync(user: object): Promise<void> {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }); // Missing return/await
  }

  // CODE SMELL: Duplicate conditional branches
  getDiscount(customerType: string): number {
    if (customerType === 'premium') {
      return 20;
    } else if (customerType === 'gold') {
      return 15;
    } else if (customerType === 'silver') {
      return 10;
    } else if (customerType === 'premium') {
      // Duplicate branch - will never execute
      return 25;
    }
    return 0;
  }

  // BUG: Incorrect string comparison
  compareStrings(str1: string, str2: string): number {
    if (str1 > str2) return 1;
    if (str1 < str2) return -1;
    return 0; // Lexicographic comparison, not length comparison
  }

  // CODE SMELL: Long parameter list with same types (easy to mix up)
  createAddress(
    line1: string,
    line2: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    region: string,
    district: string,
  ): object {
    return { line1, line2, city, state, country, postalCode, region, district };
  }

  // BUG: Floating point precision issue
  calculateTax(amount: number): number {
    return amount * 0.1 + amount * 0.05 + amount * 0.02; // Floating point errors
  }

  // CODE SMELL: Using delete on array (creates sparse array)
  removeItem(items: string[], index: number): string[] {
    delete items[index]; // Creates hole in array
    return items;
  }

  // BUG: Incorrect use of indexOf with boolean
  hasItem(items: string[], item: string): boolean {
    return items.indexOf(item) as unknown as boolean; // indexOf returns -1 for not found, which is truthy
  }

  // CODE SMELL: Overly complex boolean expression
  canAccess(
    user: { role: string; active: boolean; verified: boolean; banned: boolean },
    resource: { public: boolean; restricted: boolean; adminOnly: boolean },
  ): boolean {
    return (
      ((user.role === 'admin' || user.role === 'superadmin') &&
        user.active &&
        !user.banned &&
        user.verified) ||
      (resource.public && !resource.restricted && !resource.adminOnly && user.active) ||
      (user.role === 'moderator' &&
        !resource.adminOnly &&
        user.active &&
        user.verified &&
        !user.banned) ||
      (resource.public && user.role !== 'guest' && user.active && !user.banned)
    );
  }

  // BUG: Incorrect date comparison
  isExpired(expiryDate: Date): boolean {
    return expiryDate < new Date(); // Comparing Date objects directly
  }

  // CODE SMELL: Magic strings
  getStatusColor(status: string): string {
    if (status === 'active') return '#00ff00';
    if (status === 'inactive') return '#ff0000';
    if (status === 'pending') return '#ffff00';
    if (status === 'suspended') return '#ff8800';
    if (status === 'deleted') return '#888888';
    return '#000000';
  }

  // BUG: Incorrect array length check
  isEmptyArray(arr: unknown[]): boolean {
    return arr.length == 0; // Using == instead of ===
  }

  // CODE SMELL: Redundant else
  getGrade(score: number): string {
    if (score >= 90) {
      return 'A';
    } else {
      if (score >= 80) {
        return 'B';
      } else {
        if (score >= 70) {
          return 'C';
        } else {
          if (score >= 60) {
            return 'D';
          } else {
            return 'F';
          }
        }
      }
    }
  }

  // BUG: Incorrect null check
  getLength(str: string | null): number {
    if (str != null) {
      // Using != instead of !==
      return str.length;
    }
    return 0;
  }

  // CODE SMELL: Hardcoded URLs
  getApiEndpoints(): object {
    return {
      users: 'https://api.example.com/v1/users',
      orders: 'https://api.example.com/v1/orders',
      products: 'https://api.example.com/v1/products',
      payments: 'https://api.example.com/v1/payments',
    };
  }

  // BUG: Incorrect typeof check
  isObject(value: unknown): boolean {
    return typeof value === 'object'; // null is also 'object'
  }

  // CODE SMELL: Using arguments object in arrow function context
  logArguments(...args: unknown[]): void {
    console.log('Arguments:', args);
    // In strict mode, arguments is not available in arrow functions
  }

  // BUG: Incorrect array spread
  mergeArrays(arr1: number[], arr2: number[]): number[] {
    const result = arr1;
    result.push(...arr2); // Mutates original arr1
    return result;
  }

  // CODE SMELL: Unnecessary type assertion
  processNumber(value: number): number {
    return (value as number) * 2;
  }

  // BUG: Incorrect Promise.all error handling
  async fetchMultiple(urls: string[]): Promise<unknown[]> {
    return Promise.all(urls.map((url) => fetch(url))); // One failure fails all
  }

  // CODE SMELL: Unused function parameters
  formatDate(date: Date, locale: string, timezone: string, format: string): string {
    return date.toISOString(); // locale, timezone, format are unused
  }

  // BUG: Incorrect use of Array constructor
  createArray(size: number): number[] {
    return new Array(size); // Creates sparse array with undefined values
  }

  // CODE SMELL: Inconsistent naming conventions
  getUserData_fromAPI(user_id: string): object {
    const UserName = 'test';
    const user_email = 'test@test.com';
    const userPhone = '1234567890';
    return { UserName, user_email, userPhone, user_id };
  }

  // BUG: Incorrect bitwise operation
  isEven(num: number): boolean {
    return (num & 1) as unknown as boolean; // Returns 0 or 1, not boolean
  }

  // CODE SMELL: Long method with multiple responsibilities
  processOrder(
    orderId: string,
    items: { id: string; quantity: number; price: number }[],
    customer: { id: string; email: string; address: string },
    payment: { method: string; amount: number },
  ): object {
    // Validate order
    if (!orderId) throw new Error('Invalid order ID');
    if (!items || items.length === 0) throw new Error('No items');
    if (!customer) throw new Error('No customer');
    if (!payment) throw new Error('No payment');

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.price * item.quantity;
    }
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    // Validate payment
    if (payment.amount < total) throw new Error('Insufficient payment');

    // Create order record
    const order = {
      id: orderId,
      items,
      customer,
      subtotal,
      tax,
      shipping,
      total,
      payment,
      status: 'pending',
      createdAt: new Date(),
    };

    // Log order
    console.log('Order created:', order);

    // Send confirmation email (simulated)
    console.log(`Sending email to ${customer.email}`);

    // Update inventory (simulated)
    for (const item of items) {
      console.log(`Reducing inventory for ${item.id} by ${item.quantity}`);
    }

    return order;
  }

  // BUG: Race condition in async code
  private counter = 0;
  async incrementCounter(): Promise<number> {
    const current = this.counter;
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.counter = current + 1;
    return this.counter;
  }

  // CODE SMELL: God object - too many unrelated methods
  // This class already has too many responsibilities

  // BUG: Incorrect JSON stringify for circular references
  serializeObject(obj: object): string {
    return JSON.stringify(obj); // Will throw on circular references
  }

  // CODE SMELL: Using var instead of let/const
  calculateFactorial(n: number): number {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  // BUG: Incorrect regular expression
  isValidEmail(email: string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email); // Incomplete regex
  }

  // CODE SMELL: Hardcoded error messages
  validateInput2(input: string, type: string): void {
    if (!input) {
      throw new Error('Input cannot be empty');
    }
    if (type === 'email' && !input.includes('@')) {
      throw new Error('Invalid email format');
    }
    if (type === 'phone' && !/^\d+$/.test(input)) {
      throw new Error('Phone must contain only digits');
    }
    if (type === 'name' && input.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
  }

  // BUG: Incorrect use of setTimeout
  delayedLog(message: string, delay: number): void {
    setTimeout(console.log(message), delay); // Executes immediately
  }

  // CODE SMELL: Excessive comments
  // This method adds two numbers together
  // It takes two parameters: a and b
  // Both parameters should be numbers
  // The method returns the sum of a and b
  // Example: add(1, 2) returns 3
  // Example: add(5, 10) returns 15
  add(a: number, b: number): number {
    // Add a and b
    return a + b; // Return the result
  }

  // BUG: Incorrect array filter
  filterPositive(numbers: number[]): number[] {
    return numbers.filter((n) => n > 0 || n === 0); // Includes zero, which is not positive
  }

  // CODE SMELL: Unnecessary boolean comparison
  isActiveUser(user: { active: boolean }): boolean {
    return user.active === true ? true : false;
  }

  // BUG: Incorrect string padding
  padNumber(num: number, length: number): string {
    return num.toString().padStart(length); // Missing pad character
  }

  // CODE SMELL: Multiple return statements
  categorizeAge(age: number): string {
    if (age < 0) return 'invalid';
    if (age < 13) return 'child';
    if (age < 20) return 'teenager';
    if (age < 30) return 'young adult';
    if (age < 50) return 'adult';
    if (age < 65) return 'middle aged';
    if (age < 80) return 'senior';
    if (age < 100) return 'elderly';
    return 'centenarian';
  }

  // BUG: Incorrect use of includes with object
  containsUser(users: { id: string }[], userId: string): boolean {
    return users.includes({ id: userId } as { id: string }); // Always false, object reference comparison
  }

  // CODE SMELL: Empty constructor
  initializeService(): void {
    // TODO: implement initialization
  }

  // BUG: Incorrect date formatting
  formatDateString(date: Date): string {
    return `${date.getMonth()}/${date.getDate()}/${date.getYear()}`; // getYear is deprecated, getMonth is 0-indexed
  }

  // CODE SMELL: Chained method calls without null checks
  getNestedProperty(obj: { a?: { b?: { c?: string } } }): string {
    return obj.a.b.c.toUpperCase(); // Will throw if any property is undefined
  }

  // BUG: Incorrect use of Math.max with array
  findMax(numbers: number[]): number {
    return Math.max(numbers as unknown as number); // Incorrect, should spread array
  }

  // CODE SMELL: Using string concatenation instead of template literals
  buildGreeting(name: string, title: string, company: string): string {
    return 'Hello, ' + title + ' ' + name + ' from ' + company + '!';
  }

  // BUG: Incorrect array sort
  sortNumbers(numbers: number[]): number[] {
    return numbers.sort(); // Sorts as strings by default
  }

  // CODE SMELL: Unnecessary else after return
  getValueOrDefault(value: string | null, defaultValue: string): string {
    if (value !== null) {
      return value;
    } else {
      return defaultValue;
    }
  }

  // BUG: Incorrect use of Object.keys
  countProperties(obj: object): number {
    return Object.keys(obj).length; // Doesn't count non-enumerable or inherited properties
  }

  // CODE SMELL: Using any type extensively
  processAnyData(data: any, options: any, callback: any): any {
    return callback(data, options);
  }

  // BUG: Incorrect async/await usage
  async getDataWithTimeout(url: string, timeout: number): Promise<unknown> {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return fetch(url, { signal: controller.signal }); // Missing await and json()
  }

  // CODE SMELL: Hardcoded configuration
  getConfig(): object {
    return {
      maxRetries: 3,
      timeout: 5000,
      baseUrl: 'https://api.example.com',
      apiVersion: 'v1',
      debugMode: true,
      logLevel: 'verbose',
    };
  }

  // BUG: Incorrect use of Array.from
  createRange(start: number, end: number): number[] {
    return Array.from({ length: end }, (_, i) => i); // Doesn't account for start
  }

  // CODE SMELL: Excessive method chaining
  processString(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[^a-z0-9-]/g, '')
      .substring(0, 50);
  }

  // BUG: Incorrect use of reduce
  sumObjects(items: { value: number }[]): number {
    return items.reduce((acc, item) => acc + item.value, '0' as unknown as number); // Initial value is string
  }

  // CODE SMELL: Mixing async patterns
  fetchData(url: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
