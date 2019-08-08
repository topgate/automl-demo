import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FUNCTIONS_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {
  private situation: Situation;
  private response = [];

  constructor(private http: HttpClient) {}

  getSituation() {
    return this.situation;
  }

  setSituation(situation: Situation) {
    this.situation = situation;
  }

  getResponse() {
    return this.response;
  }

  setResponse(response) {
    this.response = response;
  }

  post(param: Payload) {
    return this.http.post(FUNCTIONS_URL, param).pipe(map((res: any) => res.payload[0].tables.value));
  }
}

export interface Place {
  location: string;
  city: string;
  station: string;
  minutes: string | number;
}

export interface Situation extends Place {
  caseNum: string;
  year: number;
}

/**
 * AutoML Tables APIのpayload
 */
export interface Payload {
  payload: {
    row: {
      values: Values;
      columnSpecIds?: Array<string>;
    };
  };
}

/**
 * payload.row.valuesの要素数が一致してないとエラーになるため
 */
type Values = [string, string, string, string, string, string, string, string];

/**
 * AutoML Tablesのオンライン予測API利用時に必須となるAPI
 * 設計によってはCloud Functionsの処理で付加してもよい
 */
export const COLUMN_SPEC_IDS = [
  '1234567890123456789',
  '2345678901234567890',
  '3456789012345678901',
  '4567890123456789012',
  '5678901234567890123',
  '6789012345678901234',
  '7890123456789012345',
  '890123456789012345'
];
