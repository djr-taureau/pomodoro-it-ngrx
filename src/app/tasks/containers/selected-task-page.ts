import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AddPomo } from './../actions/task';
import { PomoTimerService } from './../../core/services/pomo-timer';
import { PomoQueryService } from './../../core/services/pomo-query-service';
import { Component, ViewEncapsulation,
  OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, Output, Input,
  EventEmitter, Inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AsyncPipe, formatDate } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as fromTasks from '../reducers';
import * as collection from '../actions/collection';
import * as taskPomo from '../actions/task';
import { Task } from '../models/task';
import { Pomo } from '../models/pomo';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { empty } from 'rxjs/observable/empty';
import { switchMap, concatMap, scan, takeWhile, catchError,
  startWith, mapTo, map, filter, last } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
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
      (addPomo)="addPomoToTask($event)"
      (remove)="removeFromCollection($event)"
      (resumeClicked)="resumeClicked($event)"
      (pauseClicked)="resumeClicked($event)"
      (reset)="resumeClicked($event)">
    </app-task-detail>
    <app-pomo-tracker></app-pomo-tracker>
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
  pomo;
  snapshot;

  constructor(private dialog: MatDialog,
              public pomoTimerService: PomoTimerService,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute,
              public pomoQuery: PomoQueryService,
              private store: Store<fromTasks.State>) {
    this.task$ = store.pipe(select(fromTasks.getSelectedTask));
    this.snapshot = route.snapshot;
    // this.pomos$ = this.pomoQuery.getTaskPomos();
    // this.pomos$.subscribe(((pomos) => console.log('constructor', pomos)));
    this.isSelectedTaskInCollection$ = store.pipe(
      select(fromTasks.isSelectedTaskInCollection)
    );
    this.pomoTimerService.timerSource$ = this.timerSource;
    // this.pomos$.pipe(concatMap(pomos => this.pomos = pomos));
    // this.pomos$.subscribe(pomos => console.log('these are the pomos', pomos));
    // this.pomos$.pipe(concatMap(pomos => this.pomos)).subscribe(pomos => console.log(pomos));
    // this.pomos = this.pomos$.pipe(
    //   map(pomos => [this.pomos]),
    //   startWith([]),
    //   scan((acc, value) => acc.concat(value)));
    //   console.log('this should be an array', this.pomos$);

      // this.pomos = this.pomos$.pipe(
      //   scan((acc: Pomo[], value) => {
      //     acc.push(...value);
      //     return acc;
      //   })
      // );
      // console.log('pomos to array' , this.pomos);
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

    // this.pomos$ = this.pomoQuery.getTaskPomos();

    // this.pomos$.subscribe(pomos => console.log('onInit', pomos));

    // this.pomos$.pipe(map(pomos => {
    //   console.log('these are the pomos from NgOnInit' , pomos),
    //   this.pomos = pomos;
    // }));

    // this.pomos$.pipe(concatMap(pomos => this.pomos));
    // this.pomos$.pipe(map(pomos => this.pomos = pomos));
    // // this.pomos$.pipe(concatMap(pomos => this.pomos = pomos));
    // this.pomos$.subscribe(pomos => console.log('these are the pomos', pomos));
  }

  ngAfterViewInit() {
  //
  }

  // openSnackBar(action: string) {
  //   this.snackBar.openFromComponent(TaskSnackbarMessageComponent, {
  //     duration: 500,
  //     data: action,
  //   });
  // }

  addToCollection(task: Task) {
    this.store.dispatch(new collection.AddTask(task));
    // this.openSnackBar('added');
  }

  addPomoToTask(pomo: Pomo) {
    this.store.dispatch(new taskPomo.AddPomo(pomo));
  }

  removeFromCollection(task: Task) {
    this.store.dispatch(new collection.RemoveTask(task));
    // this.openSnackBar('removed');
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
    <button class="mat-raised-button mat-primary" (click)="save($event)">Save</button>
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




