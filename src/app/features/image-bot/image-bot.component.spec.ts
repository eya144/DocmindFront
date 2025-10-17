import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBotComponent } from './image-bot.component';

describe('ImageBotComponent', () => {
  let component: ImageBotComponent;
  let fixture: ComponentFixture<ImageBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
