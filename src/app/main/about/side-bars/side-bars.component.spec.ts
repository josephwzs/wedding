import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarsComponent } from './side-bars.component';

describe('SideBarsComponent', () => {
  let component: SideBarsComponent;
  let fixture: ComponentFixture<SideBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
