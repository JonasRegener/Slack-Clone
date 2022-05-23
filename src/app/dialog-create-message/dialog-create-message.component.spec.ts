import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateMessageComponent } from './dialog-create-message.component';

describe('DialogCreateMessageComponent', () => {
  let component: DialogCreateMessageComponent;
  let fixture: ComponentFixture<DialogCreateMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
