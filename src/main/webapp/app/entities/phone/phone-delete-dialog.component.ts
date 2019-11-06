import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhone } from 'app/shared/model/phone.model';
import { PhoneService } from './phone.service';

@Component({
  selector: 'jhi-phone-delete-dialog',
  templateUrl: './phone-delete-dialog.component.html'
})
export class PhoneDeleteDialogComponent {
  phone: IPhone;

  constructor(protected phoneService: PhoneService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.phoneService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'phoneListModification',
        content: 'Deleted an phone'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-phone-delete-popup',
  template: ''
})
export class PhoneDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ phone }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PhoneDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.phone = phone;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/phone', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/phone', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
