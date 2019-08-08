import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoadingComponent } from './loading/loading.component';
import { ResultComponent } from './result/result.component';
import { BackgroundComponent } from './background/background.component';

const routes: Routes = [
  {
    path: '',
    component: BackgroundComponent,
    children: [
      {
        path: '',
        component: FormComponent,
        data: { animation: 'form' }
      },
      {
        path: 'loading',
        component: LoadingComponent,
        data: { animation: 'loading' }
      },
      {
        path: 'result',
        component: ResultComponent,
        data: { animation: 'result' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
