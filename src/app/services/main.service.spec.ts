import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainService } from './main.service';

describe('MainService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [MainService]

    });
    service = TestBed.inject(MainService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  

});
