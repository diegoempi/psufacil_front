import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2WComponent } from './form2-w.component';

describe('Form2WComponent', () => {
  let component: Form2WComponent;
  let fixture: ComponentFixture<Form2WComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form2WComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form2WComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
