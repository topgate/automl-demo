import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COLUMN_SPEC_IDS, EstimationService, Payload, Place, Situation } from '@service/estimation.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  places: Place[] = [
    { location: 'shibuya', city: '渋谷区', station: '渋谷', minutes: '10' },
    { location: 'hongo', city: '文京区', station: '本郷三丁目', minutes: '10' },
    { location: 'hachioji', city: '八王子市', station: '八王子', minutes: '30' }
  ];
  selectedSituation = 0;

  years = [];
  selectedYear = 1;

  constructor(private router: Router, private service: EstimationService, private route: ActivatedRoute) {}

  ngOnInit() {
    const years = [];
    for (let i = 1; i <= 10; i++) {
      years.push({ value: i });
    }
    this.years = years;

    this.selectedSituation = this.places.findIndex(val => {
      return val.location === this.route.snapshot.queryParams.location;
    });
    if (this.selectedSituation < 0) {
      this.router.navigateByUrl(`/?location=shibuya`);
      this.selectedSituation = 0;
    }
  }

  onClick(event) {
    // situation生成
    const situation: Situation = {
      ...this.places[this.selectedSituation],
      year: this.selectedYear,
      caseNum: this.caseNum(this.selectedSituation)
    };

    // payload作成
    const params: Payload[] = this.getPayloads(situation);

    // リクエスト作成
    const requests = [];
    params.forEach(param => {
      requests.push(this.service.post(param));
    });

    // situationをserviceに保存
    this.service.setSituation(situation);

    // loading画面に遷移
    this.router.navigate(['loading']);

    // リクエスト実行
    forkJoin(requests).subscribe(res => {
      // 成功した場合、resultに遷移
      this.service.setResponse(res);
      this.router.navigate(['result'], { replaceUrl: true });
    });
  }

  caseNum(i: number) {
    return '00' + Number(i + 1);
  }

  belowCase(event) {
    if (this.selectedSituation === 0) {
      this.selectedSituation = this.places.length - 1;
    } else {
      this.selectedSituation--;
    }
    this.router.navigateByUrl(`/?location=${this.places[this.selectedSituation].location}`);
  }

  nextCase(event) {
    if (this.selectedSituation === this.places.length - 1) {
      this.selectedSituation = 0;
    } else {
      this.selectedSituation++;
    }
    this.router.navigateByUrl(`/?location=${this.places[this.selectedSituation].location}`);
  }

  /**
   * サンプルデータ作成
   */
  getPayloads(situation: Situation): Payload[] {
    const req: Array<Payload> = [];

    // 対象地域
    const city = situation.city;
    const station = situation.station;

    // 形指定
    const landShapes = ['長方形', '正方形', '不定形'];

    // 所要時間指定
    const defaultMm = '10';
    const minutes = ['5', '15', '20'];

    // 予想年度
    const date = new Date();
    date.setFullYear(date.getFullYear() + situation.year);
    const targetYear = `${date.getFullYear()}-04-01`;

    // 指定なし
    req.push(this.createPayload(city, '', targetYear, station, defaultMm));

    // 形指定
    landShapes.forEach(shape => {
      req.push(this.createPayload(city, shape, targetYear, station, defaultMm));
    });

    // 所要時間指定
    minutes.forEach(mm => {
      req.push(this.createPayload(city, '', targetYear, station, mm));
    });

    return req;
  }

  createPayload(city, shape, targetYear, station, mm): Payload {
    return {
      payload: {
        row: {
          values: [city, shape, targetYear, '東京都', '90', station, '', mm],
          columnSpecIds: COLUMN_SPEC_IDS
        }
      }
    };
  }
}
