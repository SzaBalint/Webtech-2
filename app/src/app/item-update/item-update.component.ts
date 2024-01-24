import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../services/item';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent {
  public successMsg: string = "";
  public errorMsg: string  = "";
  public name: string = "";
  public quantity: number = 0;
  public price: number = 0;
  public category: string = "";
  public id: string = "";
  public item: Item | undefined;
  public updateItem: Item | undefined;

  categories = [
    { catid: 1, value: 'Tejtermék' },
    { catid: 2, value: 'Édesség' },
    { catid: 3, value: 'Pékárú' },
    { catid: 4, value: 'Üdítő' }
  ];

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl('')
  });


  constructor(private itemService: ItemService, private dialogRef: MatDialogRef<Item>) { }

  ngOnInit(): void {
    //console.log(this.itemService.getItemUpdate());
    this.id = this.itemService.getItemUpdate();
    //console.log("ez az id: "+ this.id);
    this.itemService.getItemById(this.itemService.getItemUpdate())
    .subscribe((res:any) => {
      this.form.setValue({
        name: res.name,
        quantity: res.quantity,
        price: res.price,
        category: res.category
      });
      //console.log(res);
    });
    //console.log(this.getOneItem(this.id));
    //this.updateItemInForm();
  }

  updateItemInForm() {
    console.log(this.form.value);
    this.itemService.updateItem(this.id,this.form.value)
      .subscribe((createdItem: Item) => {
        this.onClose();
      }),
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      }
  }

  onClose(){
    this.dialogRef.close();
  }

  getOneItem(id: string){
    this.itemService.getItemById(id).subscribe((res:any) => {
      this.updateItem = res;
    });
  }

  /*onUpdate(id: string){
    console.log(this.itemService.populateForm(this.updateItem));
  }*/
}
