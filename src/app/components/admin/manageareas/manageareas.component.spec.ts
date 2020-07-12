import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageareasComponent } from './manageareas.component';

describe('ManageareasComponent', () => {
  let component: ManageareasComponent;
  let fixture: ComponentFixture<ManageareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
