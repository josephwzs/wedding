import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModelComponent } from './image-model.component';

describe('ImageModelComponent', () => {
  let component: ImageModelComponent;
  let fixture: ComponentFixture<ImageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ImageModelComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
