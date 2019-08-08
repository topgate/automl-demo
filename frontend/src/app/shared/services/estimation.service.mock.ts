import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { EstimationService, Payload } from './estimation.service';
import { of } from 'rxjs';

@Injectable()
export class EstimationServiceMock extends EstimationService {
  constructor(http: HttpClient) {
    super(http);
  }

  post(param: Payload) {
    const max = 9999999;
    const min = 100000;
    const rand = Math.random() * (max - min) + min;
    return of(rand).pipe(delay(Math.floor(rand / 1000)));
  }
}
