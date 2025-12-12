import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// CODE SMELL: Using deprecated decorators instead of new Angular patterns
@Component({
  selector: 'app-unsafe-display',
  imports: [CommonModule],
  template: `
    <div class="container">
      <div #contentDiv></div>
      <div [innerHTML]="unsafeHtml"></div>
      <iframe [src]="trustedUrl"></iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsafeDisplayComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private elementRef = inject(ElementRef);

  // CODE SMELL: Using @Input decorator instead of input() function
  @Input() userContent = '';
  @Input() externalUrl = '';

  // CODE SMELL: Using @ViewChild with static option issues
  @ViewChild('contentDiv') contentDiv!: ElementRef;

  unsafeHtml = '';
  trustedUrl: unknown;

  // CODE SMELL: Using @HostListener instead of host object
  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    console.log('Clicked:', event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    console.log('Resized:', event);
  }

  // BUG: Memory leak - no cleanup of subscriptions/listeners
  private intervalId: number | undefined;

  ngOnInit(): void {
    // SECURITY ISSUE: Bypassing Angular's built-in sanitization
    this.unsafeHtml = this.userContent;

    // SECURITY ISSUE: Trusting arbitrary URLs
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.externalUrl);

    // BUG: Direct DOM manipulation instead of using Angular bindings
    this.elementRef.nativeElement.innerHTML += `<script>alert('XSS')</script>`;

    // BUG: Memory leak - interval never cleared
    this.intervalId = window.setInterval(() => {
      this.checkForUpdates();
    }, 1000);

    // CODE SMELL: Console statements in production
    console.log('Component initialized with:', this.userContent);
    console.debug('External URL:', this.externalUrl);
  }

  // BUG: Missing ngOnDestroy to clean up interval
  // ngOnDestroy(): void {
  //   clearInterval(this.intervalId);
  // }

  private checkForUpdates(): void {
    // Simulated update check
  }

  // SECURITY ISSUE: Executing user-provided code
  executeUserScript(script: string): void {
    eval(script);
  }

  // SECURITY ISSUE: Using Function constructor
  createDynamicFunction(code: string): () => void {
    return new Function(code) as () => void;
  }

  // BUG: Async operation without proper error handling
  async loadExternalData(url: string): Promise<void> {
    const response = await fetch(url);
    const data = await response.json();
    this.processData(data);
  }

  private processData(data: unknown): void {
    console.log(data);
  }

  // CODE SMELL: Complex template logic that should be in component
  getDisplayClass(status: string, priority: number, isActive: boolean, hasError: boolean): string {
    return status === 'active' && priority > 5
      ? isActive
        ? hasError
          ? 'error-high-priority-active'
          : 'high-priority-active'
        : hasError
          ? 'error-high-priority'
          : 'high-priority'
      : status === 'pending'
        ? isActive
          ? 'pending-active'
          : 'pending'
        : 'default';
  }

  // BUG: Mutating input directly
  modifyInput(): void {
    (this as { userContent: string }).userContent = 'modified';
  }

  // CODE SMELL: God method doing too many things
  processUserAction(
    action: string,
    userId: string,
    data: Record<string, unknown>,
    options: { validate: boolean; transform: boolean; notify: boolean },
  ): void {
    // Validation
    if (options.validate) {
      if (!userId) {
        console.error('Invalid user ID');
        return;
      }
      if (!action) {
        console.error('Invalid action');
        return;
      }
      if (!data) {
        console.error('Invalid data');
        return;
      }
    }

    // Transformation
    if (options.transform) {
      for (const key in data) {
        if (typeof data[key] === 'string') {
          data[key] = (data[key] as string).trim().toLowerCase();
        }
      }
    }

    // Processing
    switch (action) {
      case 'create':
        this.createRecord(userId, data);
        break;
      case 'update':
        this.updateRecord(userId, data);
        break;
      case 'delete':
        this.deleteRecord(userId);
        break;
      default:
        console.warn('Unknown action:', action);
    }

    // Notification
    if (options.notify) {
      this.sendNotification(userId, action);
    }

    // Logging
    console.log('Action processed:', { action, userId, data, options });
  }

  private createRecord(userId: string, data: Record<string, unknown>): void {
    console.log('Creating record for', userId, data);
  }

  private updateRecord(userId: string, data: Record<string, unknown>): void {
    console.log('Updating record for', userId, data);
  }

  private deleteRecord(userId: string): void {
    console.log('Deleting record for', userId);
  }

  private sendNotification(userId: string, action: string): void {
    console.log('Sending notification to', userId, 'for action', action);
  }
}
