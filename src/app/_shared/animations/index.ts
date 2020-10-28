import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('IndexPage => PopUpPage', [
    query(':enter', [
      style({
        top: '0px',
        left: '0px'
      })
    ]),
    query(':enter', [style({ top: '100vh' })]),
    query(':enter', [animate('300ms ease-out', style({ top: '0vh' }))]),
    query(':enter', animateChild()),
  ]),

  transition('PopUpPage => IndexPage', [
      query(':leave', [
        style({
          top: '0px',
          left: '0px'
        })
      ]),
      query(':leave', [style({ top: '0vh' })]),
      query(':leave', [animate('300ms ease-in', style({ top: '100vh' }))]),
      query(':leave', animateChild()),
  ])

]);