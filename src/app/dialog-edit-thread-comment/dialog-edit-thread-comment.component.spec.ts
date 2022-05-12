import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditThreadCommentComponent } from './dialog-edit-thread-comment.component';

describe('DialogEditThreadCommentComponent', () => {
  let component: DialogEditThreadCommentComponent;
  let fixture: ComponentFixture<DialogEditThreadCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditThreadCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditThreadCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
