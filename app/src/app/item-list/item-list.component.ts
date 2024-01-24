import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../services/item';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { mergeMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { ItemAddComponent } from '../item-add/item-add.component';
// import { ItemUpdateComponent } from '../item-update/item-update.component';
import { ItemService } from '../services/item.service';
import { MatFormField } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ItemAddComponent } from '../item-add/item-add.component';
import { ItemUpdateComponent } from '../item-update/item-update.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {

  public loading = true;
  public errorMsg: string = "";
  public successMsg: string = "";
  public items: Item[] = [];
  public oneItem: Item | undefined;
  public columns =['name','quantity','price','category','update','delete'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort | null;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  listData = new MatTableDataSource<any>([]);
  updateItemId: string = "";
  public category: string  = "";
  categories = [
    { catid: 1, value: ' ' },
    { catid: 2, value: 'Tejtermék' },
    { catid: 3, value: 'Édesség' },
    { catid: 4, value: 'Pékárú' },
    { catid: 5, value: 'Üdítő' }
  ];

  constructor(private itemService: ItemService, private dialog: MatDialog) { }

  filter(event: any){
    this.listData.filter = event.value.trim().toLowerCase();
  }

  onCategoryChange(event:any){
    this.listData.filter = event.value;
  }

  ngOnInit(): void{

    this.itemService.refreshNeeded
      .subscribe(() => {
        this.getAllItems();
      });

    this.getAllItems();
    //this.listData.sort = this.sort;
    //this.listData.paginator = this.paginator;
    /*this.sort.sortChange.subscribe((res:any) =>{
      this.page=0;
      this.SortByField=res.active;
      this.SortByOrder=res.directon;
      if(res.direction==='asc'){
        this.SortByOrder=1;
      } else {
        this.SortByOrder=-1;
      }
    });*/
    /*this.getAllItems();
    this.listData.sort = this.sort;
    this.itemService.refreshNeeded
      .subscribe(() => {
        this.getAllItems();
      });
    this.getAllItems();
    this.itemService.getItems()
      .subscribe((items: Item[]) => {
        this.items = items;
        this.listData = new MatTableDataSource<Item>(this.items);
        this.listData.sort = this.sort;
        this.loading = false;
    });*/
  }

  private getAllItems(){
    this.itemService.getItems().subscribe((res:any) => {
      this.listData=new MatTableDataSource(res);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id)
      .pipe(
        mergeMap(() => this.itemService.getItems())
      )
      .subscribe((items: Item[]) => {
        this.items = items;
        this.successMsg = 'Item succesfully deleted'
      }),
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      }
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ItemAddComponent,dialogConfig);
  }

  getOneItem(id: string){
    this.itemService.getItemById(id)
    .subscribe((res:any) => {
      this.oneItem = res;
      //console.log(res);
    });
    //return this.itemService.getItemById(id);
  }

  onEdit(id: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.getOneItem(id);
    this.dialog.open(ItemUpdateComponent,dialogConfig);
    this.itemService.populateForm(id);
  }
}
