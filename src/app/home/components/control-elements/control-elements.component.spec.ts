import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControlElementsComponent } from './control-elements.component';

describe('ControlElementsComponent', () => {
  let component: ControlElementsComponent;
  let fixture: ComponentFixture<ControlElementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
