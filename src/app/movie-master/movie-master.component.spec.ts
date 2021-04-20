import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMasterComponent } from './movie-master.component';

describe('MovieMasterComponent', () => {
  let component: MovieMasterComponent;
  let fixture: ComponentFixture<MovieMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
