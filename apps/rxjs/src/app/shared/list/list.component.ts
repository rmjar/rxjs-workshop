import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items: any[] = [];
  add: (...args: any) => void;

  constructor() {
    this.add = (...args: any) => {
      console.log(this.items.length + 1, ...args);
      let item;
      if (args.length === 1) {
        item = {
          label: '',
          item: args[0]
        };
      } else {
        item = {
          label: args[0],
          item: args[1]
        };
      }
      this.items.unshift(item);
    };
  }

  ngOnInit() {}
}
