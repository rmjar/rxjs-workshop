import { Routes } from '@angular/router';
import { CallbackComponent } from './basic/callbacks.component';
import { PromisesComponent } from './basic/promises.component';
import { ObservableComponent } from './basic/observable.component';
import { CreateComponent } from './basic/create.component';
import { PipeComponent } from './basic/pipe.component';
import { OperatorsComponent } from './basic/operators.component';
import { SubjectComponent } from './basic/subject.component';
import { DragAndDropComponent } from './example/drag-and-drop.component';
import { AutocompleteComponent } from './example/autocomplete.component';
import { NgrxComponent } from './example/ngrx.component';
import { BasicIntroComponent } from './basic/intro.component';
import { GesturesComponent } from './example/gestures.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'observable',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    component: BasicIntroComponent
  },
  {
    path: 'callbacks',
    component: CallbackComponent
  },
  {
    path: 'promises',
    component: PromisesComponent
  },
  {
    path: 'observable',
    component: ObservableComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'pipe',
    component: PipeComponent
  },
  {
    path: 'operators',
    component: OperatorsComponent
  },
  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    path: 'drag-and-drop',
    component: DragAndDropComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  },
  {
    path: 'gestures',
    component: GesturesComponent
  }
];
