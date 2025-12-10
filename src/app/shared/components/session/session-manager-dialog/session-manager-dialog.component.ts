import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
// PrimeNG Imports
import { DialogModule } from 'primeng/dialog';

// Local Interfaces
import { Session, SessionList } from '../../../interfaces/session.interface';
// Local Components
import { CurrentSessionInfoComponent } from '../current-session-info/current-session-info.component';
import { SessionsListComponent } from '../sessions-list/sessions-list.component';

@Component({
  selector: 'app-session-manager-dialog',
  imports: [CommonModule, DialogModule, CurrentSessionInfoComponent, SessionsListComponent],
  templateUrl: './session-manager-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionManagerDialogComponent {
  visible = input<boolean>(false);
  currentSession = input<Session | null>(null);
  allSessions = input<SessionList | null>(null);

  dialogHide = output<void>();
  refreshSession = output<void>();
  deleteSession = output<string>();
  deleteAllOtherSessions = output<void>();

  onVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialogHide.emit();
    }
  }
}
