import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExampleSearchSharedModule } from 'app/shared';
import {
  PhoneComponent,
  PhoneDetailComponent,
  PhoneUpdateComponent,
  PhoneDeletePopupComponent,
  PhoneDeleteDialogComponent,
  phoneRoute,
  phonePopupRoute
} from './';

const ENTITY_STATES = [...phoneRoute, ...phonePopupRoute];

@NgModule({
  imports: [ExampleSearchSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PhoneComponent, PhoneDetailComponent, PhoneUpdateComponent, PhoneDeleteDialogComponent, PhoneDeletePopupComponent],
  entryComponents: [PhoneComponent, PhoneUpdateComponent, PhoneDeleteDialogComponent, PhoneDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleSearchPhoneModule {}
