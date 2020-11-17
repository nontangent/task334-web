import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'organisms-top-navigator',
  templateUrl: './top-navigator.organism.html',
  styleUrls: ['./top-navigator.organism.scss']
})
export class TopNavigatorOrganism implements OnInit {

  @Output()
  onSignOutButtonClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
