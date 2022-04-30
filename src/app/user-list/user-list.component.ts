import { Component, OnInit } from '@angular/core';
import { Task } from '../model/user';
import { ListusersService } from '../Service/listusers.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  taskObj : Task =new Task();
  taskArr : Task [] = []; // tis to get from serverside..

  addTaskvalue : string = '';

  // after all done for edit we needs to give another variable method for edit task
  // we needs to initial in ng onit as well
  editTaskValue : string ='';



  constructor(private userlistservices: ListusersService) { }



  ngOnInit(): void {
    // we needs to initial in ng onit as well.
    this.editTaskValue = '';
    this.taskObj =new Task();
    // after creating all the task also we need to add the task array with empty.
    this.taskArr = [];


    this.getAllTask();   // once we create this get all task once we click to resove willget defaulr get all task down. in that after removing code we needs to updatto get the items.



  }
  getAllTask() {
    this.userlistservices.getAllTask().subscribe(res =>{
      this.taskArr = res;   // we need to assign the result to get task array after mention err.
    },err =>{
      alert('unable to get list of tasks')
    })
  }

  addTask(){ /// starting we have given etask : Task in brackets then we have removed and we assign to task obj. and in in subscibe we needs to add this.taskobj. 
    this.taskObj.task_name = this.addTaskvalue

    this.userlistservices.addTask(this.taskObj).subscribe(res =>{ 
      this.ngOnInit();  // when ever we get resovle we are calling ng onint method so we needs to defie as weel for task object new method.
      this.addTaskvalue = ''   // we needs to create this in last with empty string to add the values not in the begining.
    }, err => {
      alert (err);
    })
  }

  editTask(){
    // once we create call task we needs to update here with taskobj.task_name
    this.taskObj.task_name = this.editTaskValue;
    this.userlistservices.editTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
    },err =>{
      alert("Failed to update Task");
    })
  }

  deleteTask(etask:Task){  
    this.userlistservices.deleteTask(etask).subscribe(res =>{
      this.ngOnInit();
    }, err =>{
      alert("Failed to delete Task");
    })
  }

  call(etask: Task){  /// this we use to pass the particular value to model object.
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;

  }

}
