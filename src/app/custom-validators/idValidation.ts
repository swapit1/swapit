import { AbstractControl } from "@angular/forms";
import isIsraeliIdValid from 'israeli-id-validator';
import { LoginService } from 'src/app/services/login.service';
import { ClientsService } from 'src/app/services/clients.service';

import { Injector } from "@angular/core";


export function IdValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!isIsraeliIdValid(control.value)) {
        return ({ "id": true })
    }
    else {
        return null;
    }
}

class isIdExist {
    constructor(private loginService: LoginService, private clientService: ClientsService) {
    }
    checkIfIdExist(val) {
        if (this.loginService.getCurrentUser())
            return false;
        return this.clientService.checkIfIdExist(val).subscribe(success => {
            return success;
        });
    }
}