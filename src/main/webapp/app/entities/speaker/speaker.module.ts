import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExampleSearchSharedModule } from 'app/shared';
import {
  SpeakerComponent,
  SpeakerDetailComponent,
  SpeakerUpdateComponent,
  SpeakerDeletePopupComponent,
  SpeakerDeleteDialogComponent,
  speakerRoute,
  speakerPopupRoute
} from './';

const ENTITY_STATES = [...speakerRoute, ...speakerPopupRoute];

@NgModule({
  imports: [ExampleSearchSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SpeakerComponent,
    SpeakerDetailComponent,
    SpeakerUpdateComponent,
    SpeakerDeleteDialogComponent,
    SpeakerDeletePopupComponent
  ],
  entryComponents: [SpeakerComponent, SpeakerUpdateComponent, SpeakerDeleteDialogComponent, SpeakerDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleSearchSpeakerModule {}
