import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private itemService : ItemService) { }

  public items = [];

  ngOnInit() {
    this.itemService.getItems().subscribe( res => this.items = res);
  }

}
