import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Phone } from 'app/shared/model/phone.model';
import { PhoneService } from './phone.service';
import { PhoneComponent } from './phone.component';
import { PhoneDetailComponent } from './phone-detail.component';
import { PhoneUpdateComponent } from './phone-update.component';
import { PhoneDeletePopupComponent } from './phone-delete-dialog.component';
import { IPhone } from 'app/shared/model/phone.model';

@Injectable({ providedIn: 'root' })
export class PhoneResolve implements Resolve<IPhone> {
  constructor(private service: PhoneService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPhone> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Phone>) => response.ok),
        map((phone: HttpResponse<Phone>) => phone.body)
      );
    }
    return of(new Phone());
  }
}

export const phoneRoute: Routes = [
  {
    path: '',
    component: PhoneComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Phones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PhoneDetailComponent,
    resolve: {
      phone: PhoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Phones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PhoneUpdateComponent,
    resolve: {
      phone: PhoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Phones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PhoneUpdateComponent,
    resolve: {
      phone: PhoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Phones'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const phonePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PhoneDeletePopupComponent,
    resolve: {
      phone: PhoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Phones'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
