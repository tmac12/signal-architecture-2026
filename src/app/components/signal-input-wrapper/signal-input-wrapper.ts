import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SignalInput } from '../signal-input/signal-input';

@Component({
  selector: 'app-signal-input-wrapper',
  imports: [SignalInput],
  templateUrl: './signal-input-wrapper.html',
  styleUrl: './signal-input-wrapper.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalInputWrapper {
  protected userId = signal(1);

  updateUserId(id: number) {
    this.userId.set(id);
  }
}
