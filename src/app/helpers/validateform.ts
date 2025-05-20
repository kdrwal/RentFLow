import { FormControl, FormGroup, AbstractControl } from "@angular/forms";

export default class ValidateForm {
    static validateAllFormFields(formGroup: FormGroup): void {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field)!;
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else if (control instanceof FormControl) {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
    }
  }