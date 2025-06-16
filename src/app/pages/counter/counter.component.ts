import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  customIncrease,
  decrement,
  decrementByValue,
  increment,
  incrementByValue,
  reset,
  welcome,
} from '../../store/actions/counter.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getCounter } from '../../store/selectors/counter.selector';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DropdownModule, InputTextModule, CardModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  store = inject(Store<{ counter: number, welcome: string }>);
  count = 0;
  value: number = 0;
  selectedOption = 'increase';
  name = '';

  @ViewChild('inputRef') inputElement!: ElementRef;

  // Options for the dropdown
  options = [
    { label: 'Increase', value: 'increase' },
    { label: 'Decrease', value: 'decrease' }
  ];

  actionMap: { [key: string]: any } = {
    increase: incrementByValue,
    decrease: decrementByValue,
  };

  constructor() {
    this.store.select(getCounter).subscribe((data) => {
      this.count = data.counter;
      this.name = data.welcome;
    });
  }

  increase = () => this.store.dispatch(increment());
  decrease = () => this.store.dispatch(decrement());
  reset = () => this.store.dispatch(reset());
  customIncrease = () =>
    this.store.dispatch(customIncrease({ value: this.value }));

  onClick() {
    const action = this.actionMap[this.selectedOption];
    if (action) {
      this.store.dispatch(action({ value: this.value }));
    } else {
      console.error('Invalid action selected');
    }
    this.value = 0;
  }

  onWelcome() {
    this.store.dispatch(welcome({ value: this.name }));
  }
}
