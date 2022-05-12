import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadFieldComponent } from './thread-field.component';

describe('ThreadFieldComponent', () => {
  let component: ThreadFieldComponent;
  let fixture: ComponentFixture<ThreadFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
