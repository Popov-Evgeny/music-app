import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function passwordValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstInput = control.get(fields[0]);
    const secondInput = control.get(fields[1]);

    if (firstInput && secondInput && firstInput.value === secondInput.value) {
      return null;
    }
    return {identical: true};
  };
}

@Directive({
  selector: '[appPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatePasswordDirective,
    multi: true
  }]
})

export class ValidatePasswordDirective implements Validator {
  @Input('appPassword') fields: string [] = [];
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordValidator(this.fields)(control);
  }
}
