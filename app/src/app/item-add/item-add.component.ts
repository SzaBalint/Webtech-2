import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../services/item';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent {
  public successMsg: string = "";
  public errorMsg: string = "";
  public name: string  = "";
  public quantity!: number;
  public price!: number;
  public category: string  = "";

  categories = [
    { catid: 1, value: 'Tejtermék' },
    { catid: 2, value: 'Édesség' },
    { catid: 3, value: 'Pékárú' },
    { catid: 4, value: 'Üdítő' }
  ];

  constructor(private itemService: ItemService, private dialogRef: MatDialogRef<Item>) { }

  ngOnInit(): void { }

  createItem() {
    this.successMsg = '';
    this.errorMsg = '';
    this.itemService.createItem(this.name, this.quantity, this.price, this.category)
      .subscribe((createdItem: Item) => {
        this.name = '';
        this.quantity = 0;
        this.price = 0;
        this.category = '';
        this.successMsg = 'Item successfully added!'
        this.ngOnInit();
        this.onClose();
      }),
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      }
  }

  onClose(){
    this.dialogRef.close();
  }
}
