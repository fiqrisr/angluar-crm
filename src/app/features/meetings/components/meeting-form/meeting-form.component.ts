import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
// PrimeNG Imports
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { Meeting } from '../../../../core/models';

@Component({
  selector: 'app-meeting-form',
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './meeting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingFormComponent {
  private fb = inject(FormBuilder);

  visible = input<boolean>(false);
  selectedMeeting = input<Meeting | null>(null);

  dialogHide = output<void>();
  meetingSave = output<Partial<Meeting>>();

  meetingForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    startDateTime: ['', [Validators.required]],
    endDateTime: ['', [Validators.required]],
    location: [''],
  });

  constructor() {
    // Update form when selectedMeeting changes
    effect(() => {
      const meeting = this.selectedMeeting();
      if (meeting) {
        this.meetingForm.patchValue({
          title: meeting.title,
          description: meeting.description || '',
          startDateTime: this.formatDateTimeForInput(meeting.startDateTime),
          endDateTime: this.formatDateTimeForInput(meeting.endDateTime),
          location: meeting.location || '',
        });
      } else {
        this.meetingForm.reset();
      }
    });
  }

  private formatDateTimeForInput(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 16);
  }

  onDialogHide() {
    this.dialogHide.emit();
    this.meetingForm.reset();
  }

  onVisibleChange(visible: boolean) {
    if (!visible) {
      this.onDialogHide();
    }
  }

  onCancel() {
    this.onDialogHide();
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      const formValue = this.meetingForm.value;
      const meetingData: Partial<Meeting> = {
        ...formValue,
        startDateTime: new Date(formValue.startDateTime).toISOString(),
        endDateTime: new Date(formValue.endDateTime).toISOString(),
        // Include ID if editing existing meeting
        ...(this.selectedMeeting() && { $id: this.selectedMeeting()!.$id }),
      };

      this.meetingSave.emit(meetingData);
      this.onDialogHide();
    }
  }
}
