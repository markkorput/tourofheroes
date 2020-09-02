import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HEROES } from './mock-heroes';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { doesNotReject } from 'assert';

describe('HeroService', () => {
  let heroService : HeroService;
  let http : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService]
    });

    heroService = TestBed.get(HeroService);
    http = TestBed.get(HttpTestingController);
  });

  describe('getHero', () => {
    it ('should fetch hero details', (done) => {
    
      heroService.getHero(123).subscribe(data => {
        expect(data).toEqual({id: 123, name: "One-Two-Three"});
        done();
      });
    
      const req = http.expectOne('api/heroes/123');
      req.flush({id: 123, name: "One-Two-Three"});

      http.verify();
    });
  });
});
;