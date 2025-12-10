import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
// PrimeNG Imports
import { CardModule } from 'primeng/card';

// Local Interfaces
import { Session } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-current-session-info',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './current-session-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentSessionInfoComponent {
  currentSession = input<Session | null>(null);
  refreshSession = output<void>();
}
