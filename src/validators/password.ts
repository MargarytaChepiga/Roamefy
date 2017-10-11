import { FormControl, AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static isValid(control: FormControl){
    const re = /^([a-zA-Z0-9]{8,})$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidPassword": true
    };

  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }
}