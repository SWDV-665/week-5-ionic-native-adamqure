import { Component } from '@angular/core';
import { Grocery } from './grocery';
import { IonItem, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { IonItemSliding } from '@ionic/angular';
import { Directive, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {
  groceries: BehaviorSubject<Array<Grocery>> = new BehaviorSubject(new Array<Grocery>())
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {}

  ngOnInit() {
    this.setDefaultGroceryList();
  }

  setDefaultGroceryList() {
    this.groceries.next([
      new Grocery("Banana", 12),
      new Grocery("Pineapple", 1),
      new Grocery("Orange", 6),
      new Grocery("Box of Kiwis", 2),
      new Grocery("Box of Strawberries", 3)
    ])
  }

  async removeItem(grocery: Grocery, index: number) {
    console.log("Removing Item - ", grocery);
    var groceryList = this.groceries.getValue();
    groceryList.splice(index, 1);
    this.groceries.next(groceryList);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + grocery.name + " ...",
      duration: 3000
    });
    await toast.present();
  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  close(listInput: IonItemSliding) {
    console.log("Closing item...")
    listInput.close();
  }

  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Item',
      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'count',
          placeholder: 'Count'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            var groceryList = this.groceries.getValue();
            groceryList.push(new Grocery(item.name, item.count));
            this.groceries.next(groceryList);
          }
        }
      ]
    });
    await prompt.present();
  }
}