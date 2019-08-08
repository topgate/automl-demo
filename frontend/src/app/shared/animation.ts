import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('A => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))], {
        optional: true
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))], {
        optional: true
      })
    ])
  ]),
  transition('B => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))], {
        optional: true
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))], {
        optional: true
      })
    ])
  ]),
  transition('A => B', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))], {
        optional: true
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))], {
        optional: true
      })
    ])
  ]),
  transition('B => A', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))], {
        optional: true
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))], {
        optional: true
      })
    ])
  ])
]);

export const ngIfAnimation = trigger('myInsertRemoveTrigger', [
  transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))]),
  transition(':leave', [animate('1s', style({ opacity: 0 }))])
]);
