import { Component } from '@angular/core';
import { Grocery } from './grocery';

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {

  groceries: Array<Grocery> = [];
  constructor() {}

  ngOnInit() {
    this.setDefaultGroceryList();
  }

  setDefaultGroceryList() {
    this.groceries = [
      new Grocery("Banana", 0.49, 12),
      new Grocery("Pineapple", 1.99, 1),
      new Grocery("Orange", 0.69, 6),
      new Grocery("Box of Kiwis", 4.99, 2),
      new Grocery("Box of Strawberries", 3.99, 3)
    ];
  }
}
