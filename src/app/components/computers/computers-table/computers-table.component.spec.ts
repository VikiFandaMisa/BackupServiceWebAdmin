import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersTableComponent } from './computers-table.component';

describe('ComputersTableComponent', () => {
  let component: ComputersTableComponent;
  let fixture: ComponentFixture<ComputersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
