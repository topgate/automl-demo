import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstimationService } from '@service/estimation.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor(private router: Router, private service: EstimationService) {}

  ngOnInit() {}
}
