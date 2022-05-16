import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFieldThreadComponent } from './message-field-thread.component';

describe('MessageFieldThreadComponent', () => {
  let component: MessageFieldThreadComponent;
  let fixture: ComponentFixture<MessageFieldThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageFieldThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFieldThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
