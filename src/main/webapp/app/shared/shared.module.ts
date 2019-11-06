import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExampleSearchSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ExampleSearchSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ExampleSearchSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleSearchSharedModule {
  static forRoot() {
    return {
      ngModule: ExampleSearchSharedModule
    };
  }
}
