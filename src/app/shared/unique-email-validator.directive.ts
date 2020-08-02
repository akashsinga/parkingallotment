import { Directive } from '@angular/core';
import { AsyncValidator, ValidationErrors,NG_ASYNC_VALIDATORS,AbstractControl, AsyncValidatorFn} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { map } from 'rxjs/operators';


export function uniqueEmailValidator(authService:AuthService):AsyncValidatorFn{
    return (control:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return authService.checkEmailExists(control.value).pipe(
            map(data=>{
                return data['response']==="true" ? {notunique:true}:null;
            })
        );
    };
}
@Directive({
    selector:'[uniqueEmailValidator]',
    providers:[{provide:NG_ASYNC_VALIDATORS, useExisting:UniqueEmailValidatorDirective,multi:true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator{

    constructor(private authService:AuthService)
    {
    }
    validate(control:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
    {
        return this.authService.checkEmailExists(control.value).pipe(map(data=>
            {
                return data['response']==="true" ? {notunique:true}:null;
            }
        ));
    }
}