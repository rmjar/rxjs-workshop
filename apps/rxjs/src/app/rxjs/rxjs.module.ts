import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './rxjs-routing.module';
import { RxjsComponent } from './rxjs.component';
import { CallbackComponent } from './basic/callbacks.component';
import { PromisesComponent } from './basic/promises.component';
import { BasicIntroComponent } from './basic/intro.component';
import { OperatorsComponent } from './basic/operators.component';
import { RouteS2aPipe } from '../route-s2a.pipe';
import { ObservableComponent } from './basic/observable.component';
import { DragAndDropComponent } from './example/drag-and-drop.component';
import { ListComponent } from '../shared/list/list.component';
import { AutocompleteComponent } from './example/autocomplete.component';
import { PipeComponent } from './basic/pipe.component';
import { CreateComponent } from './basic/create.component';
import { SubjectComponent } from './basic/subject.component';
import { NgrxComponent } from './example/ngrx.component';
import { GesturesComponent } from './example/gestures.component';

@NgModule({
  declarations: [
    RxjsComponent,
    CallbackComponent,
    PromisesComponent,
    BasicIntroComponent,
    OperatorsComponent,
    RouteS2aPipe,
    ObservableComponent,
    DragAndDropComponent,
    ListComponent,
    AutocompleteComponent,
    PipeComponent,
    CreateComponent,
    SubjectComponent,
    GesturesComponent
  ],
  imports: [CommonModule, RxjsRoutingModule]
})
export class RxjsModule { }
