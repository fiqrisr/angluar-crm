import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import * as AuthActions from '../../../../auth/store/auth.actions';
// Store
import { selectCurrentUser, selectUserTenantId } from '../../../../auth/store/auth.selectors';
import { SessionService } from '../../../../core/services/session.service';
import { Session, SessionList } from '../../../interfaces/session.interface';
import * as NotificationsActions from '../../../store/notifications/notifications.actions';
import { SessionManagerDialogComponent } from '../../session/session-manager-dialog/session-manager-dialog.component';
// Local Components
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, NavbarComponent, SessionManagerDialogComponent],
  templateUrl: './dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent implements OnInit {
  private store = inject(Store);
  private sessionService = inject(SessionService);

  user$ = this.store.select(selectCurrentUser);
  sessionManagerVisible = signal(false);
  currentSession = signal<Session | null>(null);
  allSessions = signal<SessionList | null>(null);

  ngOnInit() {
    // Wait for tenant ID to be available before any operations
    this.store
      .select(selectUserTenantId)
      .pipe(
        filter((tenantId) => !!tenantId),
        take(1),
      )
      .subscribe(() => {
        // Tenant ID is now available, dashboard can operate normally
        console.log('Dashboard layout initialized with tenant ID');
      });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  showSessionManager() {
    this.sessionManagerVisible.set(true);
    this.loadSessions();
  }

  hideSessionManager() {
    this.sessionManagerVisible.set(false);
  }

  async loadSessions() {
    try {
      // Load current session info
      this.currentSession.set(await this.sessionService.getSessionInfo());

      // Load all sessions
      const sessionsData = await this.sessionService.getAllSessions();

      // Mark current session in the list
      const currentSessionData = this.currentSession();

      if (sessionsData?.sessions && currentSessionData) {
        const updatedSessions: SessionList = {
          total: sessionsData.total || sessionsData.sessions.length,
          sessions: sessionsData.sessions.map((session: Session) => ({
            ...session,
            current: session.$id === currentSessionData.$id,
          })),
        };
        this.allSessions.set(updatedSessions);
      } else if (sessionsData) {
        // Ensure we have a proper SessionList structure
        const sessionList: SessionList = {
          total: sessionsData.total || (sessionsData.sessions?.length ?? 0),
          sessions: sessionsData.sessions || [],
        };
        this.allSessions.set(sessionList);
      } else {
        this.allSessions.set(null);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      this.store.dispatch(
        NotificationsActions.addNotification({
          notification: { message: 'Failed to load session information', type: 'error' },
        }),
      );
    }
  }

  refreshSession() {
    this.store.dispatch(AuthActions.refreshSession());
    this.store.dispatch(
      NotificationsActions.addNotification({
        notification: { message: 'Session refreshed successfully', type: 'success' },
      }),
    );
  }

  async deleteSession(sessionId: string) {
    try {
      await this.sessionService.deleteSession(sessionId);
      this.store.dispatch(
        NotificationsActions.addNotification({
          notification: { message: 'Session ended successfully', type: 'success' },
        }),
      );
      // Reload sessions to update the list
      this.loadSessions();
    } catch (error) {
      console.error('Failed to delete session:', error);
      this.store.dispatch(
        NotificationsActions.addNotification({
          notification: { message: 'Failed to end session', type: 'error' },
        }),
      );
    }
  }

  async deleteAllOtherSessions() {
    try {
      await this.sessionService.deleteAllSessions();
      this.store.dispatch(
        NotificationsActions.addNotification({
          notification: { message: 'All other sessions ended successfully', type: 'success' },
        }),
      );
      // Reload sessions to update the list
      this.loadSessions();
    } catch (error) {
      console.error('Failed to delete all other sessions:', error);
      this.store.dispatch(
        NotificationsActions.addNotification({
          notification: { message: 'Failed to end other sessions', type: 'error' },
        }),
      );
    }
  }
}
