import { NgModule } from '@angular/core';

import { ExampleSearchSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ExampleSearchSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ExampleSearchSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ExampleSearchSharedCommonModule {}
