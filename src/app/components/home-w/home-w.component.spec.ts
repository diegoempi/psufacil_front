import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWComponent } from './home-w.component';

describe('HomeWComponent', () => {
  let component: HomeWComponent;
  let fixture: ComponentFixture<HomeWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
