import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1WComponent } from './form1-w.component';

describe('Form1WComponent', () => {
  let component: Form1WComponent;
  let fixture: ComponentFixture<Form1WComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form1WComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1WComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
