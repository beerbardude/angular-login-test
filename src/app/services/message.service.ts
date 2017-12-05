import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  messages: string[] = [];

  constructor(
    //private router: Router
  ) { 
    //router.events.subscribe(event => {
      //if(event instanceof NavigationStart) {
        /* if(this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } 
        else { */
          //this.subject.next();
        //}
      //}
    //})
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message});
  }

  error(message: string) {
    this.messages.push(message);
  }

  info(data: string) {
    this.messages.push(data);
  }

  clear() {
    this.messages = [];
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}