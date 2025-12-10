import { inject, Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import * as AuthActions from '../../auth/store/auth.actions';
import { selectIsAuthenticated } from '../../auth/store/auth.selectors';
import { SessionList } from '../../shared/interfaces/session.interface';
import { AppwriteService } from './appwrite.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnDestroy {
  private store = inject(Store);
  private appwriteService = inject(AppwriteService);
  private sessionCheckInterval?: Subscription;
  private readonly SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

  constructor() {
    this.startSessionMonitoring();
  }

  ngOnDestroy() {
    this.stopSessionMonitoring();
  }

  private startSessionMonitoring() {
    // Only monitor session if user is authenticated
    this.sessionCheckInterval = this.store
      .select(selectIsAuthenticated)
      .pipe(
        filter((isAuthenticated) => isAuthenticated),
        switchMap(() => interval(this.SESSION_CHECK_INTERVAL)),
      )
      .subscribe(() => {
        this.checkSessionValidity();
      });
  }

  private stopSessionMonitoring() {
    if (this.sessionCheckInterval) {
      this.sessionCheckInterval.unsubscribe();
    }
  }

  private async checkSessionValidity() {
    try {
      const hasSession = await this.appwriteService.hasActiveSession();
      if (!hasSession) {
        this.store.dispatch(AuthActions.sessionExpired());
      }
    } catch (error) {
      console.warn('Session check failed:', error);
      this.store.dispatch(AuthActions.sessionExpired());
    }
  }

  // Manual session refresh
  refreshSession() {
    this.store.dispatch(AuthActions.refreshSession());
  }

  // Get current session info
  async getSessionInfo() {
    try {
      const session = await this.appwriteService.getCurrentSession();
      return session;
    } catch (error) {
      return null;
    }
  }

  // Get all user sessions
  async getAllSessions(): Promise<SessionList> {
    try {
      const sessions = await this.appwriteService.getAllSessions();
      return sessions;
    } catch (error) {
      return { total: 0, sessions: [] };
    }
  }

  // Delete specific session
  async deleteSession(sessionId: string) {
    try {
      await this.appwriteService.deleteSession(sessionId);
      if (sessionId === 'current') {
        this.store.dispatch(AuthActions.logout());
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  }

  // Delete all sessions (logout from all devices)
  async deleteAllSessions() {
    try {
      await this.appwriteService.deleteAllSessions();
      this.store.dispatch(AuthActions.logout());
    } catch (error) {
      console.error('Failed to delete all sessions:', error);
    }
  }
}
