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
  public editorActive!: BehaviorSubject<boolean>;

  constructor() {
    this.threadView = new BehaviorSubject<boolean>(false);
    this.threadSelect = new BehaviorSubject<string>('');
    this.threadObject = new BehaviorSubject<object>({});
    this.channelSelect = new BehaviorSubject<string>('');
    this.editorActive = new BehaviorSubject<boolean>(false);
  }

  // --- Getter and setter for threadView ---
  getThreadView(): Observable<boolean> {
    return this.threadView.asObservable();
  }
  setThreadView(boolValue: boolean) {
    this.threadView.next(boolValue);
  }

  // --- Getter and setter for threadSelect ---
  getThread(): Observable<string> {
    return this.threadSelect.asObservable();
  }
  setThread(string: string) {
    this.threadSelect.next(string);
  }

  // --- Getter and setter for threadObject ---
  getObject(): Observable<object> {
    return this.threadObject.asObservable();
  }
  setObject(obj: any) {
    this.threadObject.next(obj);
  }

  // --- Getter and setter for channelSelect ---
  getChannel(): Observable<string> {
    return this.channelSelect.asObservable();
  }
  setChannel(string: string): void {
    this.channelSelect.next(string);
  }

  // --- Getter and setter for editorActive ---
  getEditor(): Observable<boolean> {
    return this.editorActive.asObservable();
  }
  setEditor(boolValue: boolean): void {
    this.editorActive.next(boolValue);
  }








}
