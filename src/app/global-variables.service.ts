import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  public _threadView: Subject<boolean> = new Subject();
  threadView: Observable<boolean> = this._threadView.asObservable();

  public _threadSelect: Subject<string> = new Subject();
  threadSelect: Observable<string> = this._threadSelect.asObservable();

  public _channelSelect: Subject<string> = new Subject();
  channelSelect: Observable<string> = this._channelSelect.asObservable();

  public _threadObject: Subject<Object> = new Subject();
  threadObject: Observable<Object> = this._threadObject.asObservable();

  constructor() { }

  setThreadView(boolValue: boolean) {
    this._threadView.next(boolValue);
  }

  setThread(string: string) {
    this._threadSelect.next(string);
  }

  setChannel(string: string) {
    this._channelSelect.next(string);
  }

  setObject(obj: any) {
    this._threadObject.next(obj);
  }


}
