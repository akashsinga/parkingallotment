import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manageareas',
  templateUrl: './manageareas.component.html',
  styleUrls: ['./manageareas.component.scss']
})
export class ManageareasComponent implements OnInit {
  addForm:FormGroup;
  tableData:[];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit():void{

  }

}
