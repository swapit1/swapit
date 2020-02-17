import { AbstractControl } from "@angular/forms";
import isIsraeliIdValid from 'israeli-id-validator';


export function IdValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if(!isIsraeliIdValid(control.value)){
        return ({ "id": true })
    }
    else{
        return null;
    }
}