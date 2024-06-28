import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntretientComponent } from './add-entretient.component';

describe('AddEntretientComponent', () => {
  let component: AddEntretientComponent;
  let fixture: ComponentFixture<AddEntretientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEntretientComponent]
    });
    fixture = TestBed.createComponent(AddEntretientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
