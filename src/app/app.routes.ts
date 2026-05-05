import { Routes } from '@angular/router';
import { Example1 } from './components/example1/example1';
import { Example2 } from './components/example2/example2';
import { RxResourceDemo } from './components/rx-resource-demo/rx-resource-demo';
import { ObservableMultiple } from './components/observable-multiple/observable-multiple';
import { ObservableRoutePar } from './components/observable-route-par/observable-route-par';
import { ObservableInputWrapper } from './components/observable-input-wrapper/observable-input-wrapper';
import { SignalInputWrapper } from './components/signal-input-wrapper/signal-input-wrapper';
import { SignalRoutePar } from './components/signal-route-par/signal-route-par';

export const routes: Routes = [
  { path: 'example1', component: Example1 },
  { path: 'example2', component: Example2 },
  { path: 'rx-resource-demo', component: RxResourceDemo },
  { path: 'observable-multiple', component: ObservableMultiple },
  { path: 'observable-input-wrapper', component: ObservableInputWrapper },
  { path: 'observable-route-param/:idUser', component: ObservableRoutePar },
  { path: 'signal-input-wrapper', component: SignalInputWrapper },
  { path: 'signal-route-param/:userId', component: SignalRoutePar },
];
