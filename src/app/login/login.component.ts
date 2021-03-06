import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    @Input() user: User;

    inputNameId = 'inputName';
    inputPassId = 'inputPass';
    borderStyle = '1px solid #f00';

    error: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.user = new User();
    }

    login() {
      this.authenticationService.loginUser(this.user).subscribe(user => this.redirect(user));
    }

    redirect(data: any) {
        if (typeof data[0] !== 'undefined') {
            this.authenticationService.setValid(true);
            this.redirectTo('queries', '');
        } else {
            this.changeElementStyleById(this.inputNameId);
            this.changeElementStyleById(this.inputPassId);
            this.redirectTo('login', 'Wrong Login');
        }
    }

    changeElementStyleById(id: string) {
        const element = document.getElementById(id);
        element.style.border = this.borderStyle;
    }

    redirectTo(routeString: string, message: string) {
        this.router.navigate([routeString]);
        this.messageService.info(message);
    }
}
