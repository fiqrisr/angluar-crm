import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
// PrimeNG Imports
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { Deal } from '../../../../core/models';

@Component({
  selector: 'app-deal-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './deal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealFormComponent {
  private fb = inject(FormBuilder);

  visible = input<boolean>(false);
  selectedDeal = input<Deal | null>(null);

  dialogHide = output<void>();
  dealSave = output<Partial<Deal>>();

  dealForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    value: [0, [Validators.required, Validators.min(0)]],
    stage: ['lead', [Validators.required]],
    expectedCloseDate: [''],
  });

  constructor() {
    // Update form when selectedDeal changes
    effect(() => {
      const deal = this.selectedDeal();
      if (deal) {
        this.dealForm.patchValue({
          title: deal.title,
          description: deal.description || '',
          value: deal.value,
          stage: deal.stage,
          expectedCloseDate: deal.expectedCloseDate
            ? new Date(deal.expectedCloseDate).toISOString().split('T')[0]
            : '',
        });
      } else {
        this.dealForm.reset({
          title: '',
          description: '',
          value: 0,
          stage: 'lead',
          expectedCloseDate: '',
        });
      }
    });
  }

  onDialogHide() {
    this.dialogHide.emit();
    this.dealForm.reset({
      title: '',
      description: '',
      value: 0,
      stage: 'lead',
      expectedCloseDate: '',
    });
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
    if (this.dealForm.valid) {
      const formValue = this.dealForm.value;
      const dealData: Partial<Deal> = {
        ...formValue,
        expectedCloseDate: formValue.expectedCloseDate
          ? new Date(formValue.expectedCloseDate).toISOString()
          : null,
        // Include ID if editing existing deal
        ...(this.selectedDeal() && { $id: this.selectedDeal()!.$id }),
      };

      this.dealSave.emit(dealData);
      this.onDialogHide();
    }
  }
}
