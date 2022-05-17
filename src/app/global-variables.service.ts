import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  public threadView!: BehaviorSubject<boolean>;
  public threadSelect!: BehaviorSubject<string>;
  public threadObject!: BehaviorSubject<object>;
  public channelSelect!: BehaviorSubject<string>;

  constructor() {
    this.threadView = new BehaviorSubject<boolean>(false);
    this.threadSelect = new BehaviorSubject<string>('');
    this.threadObject = new BehaviorSubject<object>({});
    this.channelSelect = new BehaviorSubject<string>('');
  }

  getThreadView(): Observable<boolean> {
    return this.threadView.asObservable();
  }
  setThreadView(boolValue: boolean) {
    this.threadView.next(boolValue);
  }

  getThread(): Observable<string> {
    return this.threadSelect.asObservable();
  }
  setThread(string: string) {
    this.threadSelect.next(string);
  }

  getObject(): Observable<object> {
    return this.threadObject.asObservable();
  }
  setObject(obj: any) {
    this.threadObject.next(obj);
  }

  getChannel(): Observable<string> {
    return this.channelSelect.asObservable();
  }
  setChannel(string: string): void {
    this.channelSelect.next(string);
  }



  

 


}
