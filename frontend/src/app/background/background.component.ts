import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ngIfAnimation, slideInAnimation } from '../shared/animation';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  animations: [slideInAnimation, ngIfAnimation]
})
export class BackgroundComponent implements OnInit {
  private ASSETS = '/assets/img/';

  shibuya = this.ASSETS + 'shibuya.webp';
  hongo = this.ASSETS + 'hongo.webp';
  hachioji = this.ASSETS + 'hachioji.webp';
  location = 'shibuya';

  logo = this.ASSETS + 'logo.png';
  copy = this.ASSETS + 'Copy.png';

  constructor(private http: HttpClientModule, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(query => {
      if (query.location) {
        this.location = query.location;
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
