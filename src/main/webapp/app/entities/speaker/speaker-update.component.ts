import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISpeaker, Speaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';

@Component({
  selector: 'jhi-speaker-update',
  templateUrl: './speaker-update.component.html'
})
export class SpeakerUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    company: [],
    model: [],
    waterProof: []
  });

  constructor(protected speakerService: SpeakerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ speaker }) => {
      this.updateForm(speaker);
    });
  }

  updateForm(speaker: ISpeaker) {
    this.editForm.patchValue({
      id: speaker.id,
      company: speaker.company,
      model: speaker.model,
      waterProof: speaker.waterProof
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const speaker = this.createFromForm();
    if (speaker.id !== undefined) {
      this.subscribeToSaveResponse(this.speakerService.update(speaker));
    } else {
      this.subscribeToSaveResponse(this.speakerService.create(speaker));
    }
  }

  private createFromForm(): ISpeaker {
    return {
      ...new Speaker(),
      id: this.editForm.get(['id']).value,
      company: this.editForm.get(['company']).value,
      model: this.editForm.get(['model']).value,
      waterProof: this.editForm.get(['waterProof']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpeaker>>) {
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
