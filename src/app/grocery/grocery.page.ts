import { Component } from '@angular/core';
import { Grocery } from './grocery';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroceriesService } from '../services/groceries.service';
import { InputDialogService } from '../services/input-dialog.service';

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {
  groceries: Observable<Grocery[]> = new Observable()

  constructor(public dataService: GroceriesService, public inputDialogService: InputDialogService) {
    this.groceries = this.dataService.getItems().asObservable();
  }

  async editItem(grocery: Grocery, index: number, listInput: IonItemSliding) {
    let newGrocery = await this.inputDialogService.showItemPrompt('Edit Item', 'Please enter item...', grocery)
    this.dataService.editItem(newGrocery, index, listInput);
  }

  async removeItem(grocery: Grocery, index: number, listInput: IonItemSliding) {
    this.dataService.removeItem(grocery, index, listInput);
  }

  async addItem() {
    let newGrocery = await this.inputDialogService.showItemPrompt('Add Item', 'Please enter item...');
    this.dataService.addItem(newGrocery);
  }
}