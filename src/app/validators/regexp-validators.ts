import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function RegexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      // @ts-ignore
      return null;
    }
    const valid = regex.test(control.value);
    // @ts-ignore
    return valid ? null : error;
  };
}
