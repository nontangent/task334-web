import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@animations';

@Component({
  selector: 'frames-overlay',
  templateUrl: './overlay.frame.html',
  styleUrls: ['./overlay.frame.scss'],
  animations: [slideInAnimation]
})
export class OverlayFrame implements OnInit {

  @Input()
  outlet: RouterOutlet = null;

  @Input()
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }

}
