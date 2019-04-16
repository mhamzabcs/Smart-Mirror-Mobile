import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReminderPage } from './edit-reminder.page';

describe('EditReminderPage', () => {
  let component: EditReminderPage;
  let fixture: ComponentFixture<EditReminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReminderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
