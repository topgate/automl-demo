import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstimationService, Situation } from '@service/estimation.service';

export const RESULT_VALUES = ['unspecified', 'rectangle', 'square', 'malformed', 'near', 'farAway', 'furtherAway'];

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  isReload = false;
  situation: Situation;
  response = [];
  results: { [RESULT_VALUES: string]: string } = {};

  constructor(private router: Router, private service: EstimationService) {}

  ngOnInit() {
    const res = this.service.getResponse();
    if (res.length === 0) {
      this.isReload = true;
      this.router.navigate(['']);
      return;
    }

    this.situation = this.service.getSituation();

    res.forEach((val, i) => {
      this.results[RESULT_VALUES[i]] = this.formatFloorNumber(val);
    });
  }

  formatFloorNumber(value: number) {
    let str: string = (Math.floor(value / 1000) / 10).toString();
    if (str.indexOf('.') < 0) {
      str += '.0';
    }
    return str;
  }

  onClickBack() {
    this.router.navigate(['']);
  }

  onClickScrollLeft() {
    document.getElementById('resultRail').scrollLeft -= 500;
  }

  onClickScrollRight() {
    document.getElementById('resultRail').scrollLeft += 500;
  }
}
