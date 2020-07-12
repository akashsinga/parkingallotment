import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageparkingsComponent } from './manageparkings.component';

describe('ManageparkingsComponent', () => {
  let component: ManageparkingsComponent;
  let fixture: ComponentFixture<ManageparkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageparkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageparkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
