/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExampleSearchTestModule } from '../../../test.module';
import { PhoneDetailComponent } from 'app/entities/phone/phone-detail.component';
import { Phone } from 'app/shared/model/phone.model';

describe('Component Tests', () => {
  describe('Phone Management Detail Component', () => {
    let comp: PhoneDetailComponent;
    let fixture: ComponentFixture<PhoneDetailComponent>;
    const route = ({ data: of({ phone: new Phone(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExampleSearchTestModule],
        declarations: [PhoneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PhoneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhoneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.phone).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
