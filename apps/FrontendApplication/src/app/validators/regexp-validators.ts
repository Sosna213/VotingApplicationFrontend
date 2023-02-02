import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function RegexValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): { [p: string]: boolean } | null => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : error;
  };
}
