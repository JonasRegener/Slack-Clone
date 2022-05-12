import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIconMenuComponent } from './user-icon-menu.component';

describe('UserIconMenuComponent', () => {
  let component: UserIconMenuComponent;
  let fixture: ComponentFixture<UserIconMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIconMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIconMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
