import { TestBed } from '@angular/core/testing';

import { ImageBotService } from './image-bot.service';

describe('ImageBotService', () => {
  let service: ImageBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
