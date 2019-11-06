import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPhone, Phone } from 'app/shared/model/phone.model';
import { PhoneService } from './phone.service';

@Component({
  selector: 'jhi-phone-update',
  templateUrl: './phone-update.component.html'
})
export class PhoneUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    model: [],
    company: [],
    price: [],
    memory: []
  });

  constructor(protected phoneService: PhoneService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ phone }) => {
      this.updateForm(phone);
    });
  }

  updateForm(phone: IPhone) {
    this.editForm.patchValue({
      id: phone.id,
      model: phone.model,
      company: phone.company,
      price: phone.price,
      memory: phone.memory
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const phone = this.createFromForm();
    if (phone.id !== undefined) {
      this.subscribeToSaveResponse(this.phoneService.update(phone));
    } else {
      this.subscribeToSaveResponse(this.phoneService.create(phone));
    }
  }

  private createFromForm(): IPhone {
    return {
      ...new Phone(),
      id: this.editForm.get(['id']).value,
      model: this.editForm.get(['model']).value,
      company: this.editForm.get(['company']).value,
      price: this.editForm.get(['price']).value,
      memory: this.editForm.get(['memory']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhone>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
