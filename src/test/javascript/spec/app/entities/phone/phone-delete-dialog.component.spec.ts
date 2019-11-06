/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ExampleSearchTestModule } from '../../../test.module';
import { PhoneDeleteDialogComponent } from 'app/entities/phone/phone-delete-dialog.component';
import { PhoneService } from 'app/entities/phone/phone.service';

describe('Component Tests', () => {
  describe('Phone Management Delete Component', () => {
    let comp: PhoneDeleteDialogComponent;
    let fixture: ComponentFixture<PhoneDeleteDialogComponent>;
    let service: PhoneService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExampleSearchTestModule],
        declarations: [PhoneDeleteDialogComponent]
      })
        .overrideTemplate(PhoneDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhoneDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhoneService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
