import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
// PrimeNG Imports
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { Contact } from '../../../../core/models';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);

  visible = input<boolean>(false);
  selectedContact = input<Contact | null>(null);

  dialogHide = output<void>();
  contactSave = output<Partial<Contact>>();

  contactForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    company: [''],
    position: [''],
    notes: [''],
  });

  constructor() {
    // Update form when selectedContact changes
    effect(() => {
      const contact = this.selectedContact();
      if (contact) {
        this.contactForm.patchValue({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone || '',
          company: contact.company || '',
          position: contact.position || '',
          notes: contact.notes || '',
        });
      } else {
        this.contactForm.reset();
      }
    });
  }

  onDialogHide() {
    this.dialogHide.emit();
    this.contactForm.reset();
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
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      const contactData: Partial<Contact> = {
        ...formValue,
        // Include ID if editing existing contact
        ...(this.selectedContact() && { $id: this.selectedContact()!.$id }),
      };

      this.contactSave.emit(contactData);
      this.onDialogHide();
    }
  }
}
