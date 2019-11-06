/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ExampleSearchTestModule } from '../../../test.module';
import { PhoneUpdateComponent } from 'app/entities/phone/phone-update.component';
import { PhoneService } from 'app/entities/phone/phone.service';
import { Phone } from 'app/shared/model/phone.model';

describe('Component Tests', () => {
  describe('Phone Management Update Component', () => {
    let comp: PhoneUpdateComponent;
    let fixture: ComponentFixture<PhoneUpdateComponent>;
    let service: PhoneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExampleSearchTestModule],
        declarations: [PhoneUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PhoneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PhoneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhoneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Phone(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Phone();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
