import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRemindersPage } from './list-reminders.page';

describe('ListRemindersPage', () => {
  let component: ListRemindersPage;
  let fixture: ComponentFixture<ListRemindersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRemindersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRemindersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
