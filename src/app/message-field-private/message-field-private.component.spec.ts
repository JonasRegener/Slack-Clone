import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFieldPrivateComponent } from './message-field-private.component';

describe('MessageFieldPrivateComponent', () => {
  let component: MessageFieldPrivateComponent;
  let fixture: ComponentFixture<MessageFieldPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageFieldPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFieldPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
