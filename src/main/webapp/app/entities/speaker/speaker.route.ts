import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Speaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerUpdateComponent } from './speaker-update.component';
import { SpeakerDeletePopupComponent } from './speaker-delete-dialog.component';
import { ISpeaker } from 'app/shared/model/speaker.model';

@Injectable({ providedIn: 'root' })
export class SpeakerResolve implements Resolve<ISpeaker> {
  constructor(private service: SpeakerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISpeaker> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Speaker>) => response.ok),
        map((speaker: HttpResponse<Speaker>) => speaker.body)
      );
    }
    return of(new Speaker());
  }
}

export const speakerRoute: Routes = [
  {
    path: '',
    component: SpeakerComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SpeakerDetailComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SpeakerUpdateComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SpeakerUpdateComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const speakerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SpeakerDeletePopupComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
