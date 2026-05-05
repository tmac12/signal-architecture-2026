import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObservableInput } from '../observable-input/observable-input';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-observable-input-wrapper',
  imports: [ObservableInput, AsyncPipe],
  templateUrl: './observable-input-wrapper.html',
  styleUrl: './observable-input-wrapper.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableInputWrapper {
  private userdId = new BehaviorSubject<number>(1);
  protected userId$ = this.userdId.asObservable();

  updateUserId(id: number) {
    this.userdId.next(id);
  }
}
