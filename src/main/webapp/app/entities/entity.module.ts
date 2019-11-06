import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'phone',
        loadChildren: () => import('./phone/phone.module').then(m => m.ExampleSearchPhoneModule)
      },
      {
        path: 'speaker',
        loadChildren: () => import('./speaker/speaker.module').then(m => m.ExampleSearchSpeakerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleSearchEntityModule {}
