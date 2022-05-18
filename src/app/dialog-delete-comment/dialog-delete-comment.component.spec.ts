import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteCommentComponent } from './dialog-delete-comment.component';

describe('DialogDeleteCommentComponent', () => {
  let component: DialogDeleteCommentComponent;
  let fixture: ComponentFixture<DialogDeleteCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
