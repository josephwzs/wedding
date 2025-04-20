import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBackgroundComponent } from './video-background.component';

describe('VideoSliderComponent', () => {
  let component: VideoBackgroundComponent;
  let fixture: ComponentFixture<VideoBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VideoBackgroundComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
