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
      // Call the method and subscribe a result handler
      heroService.getHero(123).subscribe(data => {
        expect(data).toEqual({id: 125, name: "One-Two-Five"});
        const messages = TestBed.get(MessageService).messages;
        expect(messages[messages.length-1]).toEqual(`HeroService: fetched hero id=123`);

        // indicate this async test is finished
        done();
      });

      // specify and stub the HTTP request that we expect to be performed
      const req = http.expectOne('api/heroes/123');
      // mock response data that should be returned
      req.flush({id: 125, name: "One-Two-Five"});

      // verify that no other HTTP requests were performed
      http.verify();
    });
  });
});
;