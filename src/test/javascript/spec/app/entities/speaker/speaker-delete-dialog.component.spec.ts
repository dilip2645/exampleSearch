/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ExampleSearchTestModule } from '../../../test.module';
import { SpeakerDeleteDialogComponent } from 'app/entities/speaker/speaker-delete-dialog.component';
import { SpeakerService } from 'app/entities/speaker/speaker.service';

describe('Component Tests', () => {
  describe('Speaker Management Delete Component', () => {
    let comp: SpeakerDeleteDialogComponent;
    let fixture: ComponentFixture<SpeakerDeleteDialogComponent>;
    let service: SpeakerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExampleSearchTestModule],
        declarations: [SpeakerDeleteDialogComponent]
      })
        .overrideTemplate(SpeakerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpeakerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpeakerService);
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
