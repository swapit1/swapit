import { AbstractControl, FormBuilder } from "@angular/forms";
import { Builder } from "protractor";


export function ConfirmPassword(group:FormBuilder): { [key: string]: boolean } | null {
  let pass=group.control('password');
  let con=group.control('verifyPassword');
    if(pass==con)
  return({"verifyPassword":true})
    return null;
}