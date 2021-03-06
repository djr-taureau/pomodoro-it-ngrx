import { ActivatedRoute } from '@angular/router';
import { PomoTimerService } from './../../core/services/pomo-timer';
import { PomoQueryService } from './../../core/services/pomo-query-service';
import { PomoTrackerDataSource } from './../pomo-tracker/pomo-tracker-datasource';
import { Component, ViewEncapsulation,
  OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, Input,
  EventEmitter, Inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromTasks from '../reducers';
import * as fromPomos from '../reducers';
import * as collection from '../actions/collection';
import * as taskPomo from '../actions/task';
import { Task } from '../models/task';
import { Pomo } from '../models/pomo';
import { switchMap, flatMap, concatMap, scan, takeWhile, catchError,
  startWith, mapTo, map, filter, last } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-selected-task-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="mdl-grid">
    <app-task-detail
      [task]="task$ | async"
      [inCollection]="isSelectedTaskInCollection$"
      [pomoTitle]="this.pomoTimerService.pomoTitle$"
      [pomoCount]="this.pomoTimerService.pomoCount$"
      [pomosCompleted]="this.pomoTimerService.pomosCompleted$"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
      (resumeClicked)="resumeClicked($event)"
      (pauseClicked)="resumeClicked($event)"
      (reset)="resumeClicked($event)">
    </app-task-detail>
    <app-pomo-tracker
      [pomos]="this.pomos$ | async"
      (addPomo)="addPomoToTask($event);">
    </app-pomo-tracker>
    </div>
  `,
//
})

export class SelectedTaskPageComponent implements OnInit, AfterViewInit {
  task$: Observable<Task>;
  pomos$: Observable<Pomo[]>;
  timeRemaining: any;
  isSelectedTaskInCollection$: Observable<boolean>;
  timerSource = new BehaviorSubject(null);
  pomosSource = new BehaviorSubject(null);
  pomoDialogRef: MatDialogRef<PomoDialogComponent>;
  dialogResult: any;
  dialogRef;
  pomos: Pomo[];
  pomosDataSource: PomoTrackerDataSource;
  pomo;
  taskId;
  paginator;
  sort;
  testPomos;

  constructor(private dialog: MatDialog,
              public pomoTimerService: PomoTimerService,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute,
              public pomoQuery: PomoQueryService,
              public cd: ChangeDetectorRef,
              private store: Store<fromTasks.State>) {
    this.task$ = store.pipe(select(fromTasks.getSelectedTask));
    // TODO Move these to ViewTaskPage for l

    this.pomos$ = store.pipe(select(fromPomos.getSelectedTaskPomos));
    this.taskId = route.snapshot.params.id;
    this.isSelectedTaskInCollection$ = store.pipe(
      select(fromTasks.isSelectedTaskInCollection)
    );
    this.pomoTimerService.timerSource$ = this.timerSource;
  }

  ngOnInit(): void {
   this.pomoTimerService.pomoCount$ = 1;
   this.pomoTimerService.pomosCompleted$ = 0;
   this.pomoTimerService.pomosCycleCompleted$ = 0;
   this.pomoTimerService.notesEntry = true;
   this.pomoTimerService.pomoTitle$ = 'Time to Work';
   this.pomoTimerService.countdownSeconds$ = 6;
   this.timerSource.next(this.pomoTimerService.countdownSeconds$);
   this.timerSource = this.pomoTimerService.timerSource$;
   this.timerSource.pipe().subscribe(val => {
    if (val === 0 && !this.pomoTimerService.timerStarted) {
      this.pomoTimerService.soundAlarm();
      if (this.pomoTimerService.notesEntry) {
          this.openPomoDialog();
        }
      }
    });
  }

  ngAfterViewInit() {
  //
  }

  addToCollection(task: Task) {
    this.store.dispatch(new collection.AddTask(task));
  }

  addPomoToTask(pomo: Pomo) {
    console.log('is this being called');
    this.store.dispatch(new taskPomo.AddPomo(pomo));
  }

  removeFromCollection(task: Task) {
    this.store.dispatch(new collection.RemoveTask(task));
  }

  resumeClicked(event) {
    if (event.currentTarget.attributes.id.nodeValue === 'resume' && !this.pomoTimerService.timerStarted) {
      this.pomoTimerService.timerStarted = true;
      this.pomoTimerService.startTimer();
      this.pomoTimerService.stopSoundAlarm();
      this.pomoTimerService.timerSource$.next(this.pomoTimerService.countdownSeconds$);
    }
    if (event.currentTarget.attributes.id.nodeValue === 'reset') {
      this.pomoTimerService.resetTimer();
    }
  }

  pauseClicked(event) {
    this.pomoTimerService.startTimer();
    this.timerSource.pipe(
    ).subscribe(value => {
    });
    this.pomoTimerService.timerSource$ = this.timerSource;
  }

  generateUUID() {
    return UUID.UUID();
  }

  openPomoDialog () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = {
      id: '',
      content: ''
    };

    this.task$.pipe()
      .subscribe(
        task => {
          dialogConfig.data.id = task.id,
          dialogConfig.data.content = task.content;
        });

    this.dialogRef = this.dialog.open(PomoDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {
      this.dialogResult = data;
      this.pomo = {
        id: this.generateUUID(),
        task_id: data.id,
        notes: data.notes,
        date: data.date
      };
      this.addPomoToTask(this.pomo);
      this.timerSource.next(this.pomoTimerService.countdownSeconds$);
    });
  }
}
@Component({
  selector: 'app-pomo-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h2 mat-dialog-title>{{ content }}</h2>
  <mat-dialog-content [formGroup]="form" connectForm="pomo">
      <input matInput formControlName="id" [disabled]="true" [hidden]="true" value="{{ id }}">
      <input matInput formControlName="date" [disabled]="true" [hidden]="true">
    <mat-form-field>
    <input matInput placeholder="Enter your notes" formControlName="notes">
  </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button class="mat-raised-button" (click)="close()">Close</button>
    <button class="mat-raised-button mat-primary" (keydown.enter)="save($event)" (click)="save($event)">Save</button>
  </mat-dialog-actions>
  `
})

export class PomoDialogComponent implements OnInit {

  @Input() task: Task;
  @Output() savePomo = new EventEmitter<Pomo>();
  form: FormGroup;
  content;
  id;
  pomo;

  constructor(private pomoTimerService: PomoTimerService,
              private store: Store<fromTasks.State>,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<PomoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data
              ) {
                this.form = data;
                this.id = data.id;
                this.content = data.content;
              }

              ngOnInit() {
                this.form = this.fb.group({
                  id: this.id,
                  date: Date.now(),
                  notes: ''
                });
              }

              save($event) {
                this.savePomo.emit(this.pomo);
                this.pomoTimerService.stopSoundAlarm();
                this.dialogRef.close(this.form.value);
              }
              close() {
                this.pomoTimerService.stopSoundAlarm();
                this.dialogRef.close('Cancel');
              }
}




