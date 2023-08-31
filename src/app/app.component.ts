import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'My To Do List';
 
  newTask: string='';
  list:string[]=[];
  error:string='';

  AddTask()
  {
    const trimlist = this.newTask.trim();

    if (trimlist.length < 4 || trimlist.length > 200) 
    {
      this.error = 'Task must be between 4 and 200 characters';
      return;
    }
    
    else if (!/^[a-zA-Z0-9\s]*$/.test(trimlist)) 
    {
      this.error = 'Special characters are not allowed';
      return;
    }

    this.error = '';
    this.list.push(trimlist);
    this.newTask = '';
    this.saveTasksInLocalStorage();
  }

 

  RemoveTask(index: number)
  {
    this.list.splice(index, 1);
    this.saveTasksInLocalStorage();
  }

 saveTasksInLocalStorage() 
  {
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }
  
  loadTasksFromLocalStorage() 
  {
    const savedTasks = localStorage.getItem('list');
    if (savedTasks) {
      this.list = JSON.parse(savedTasks);
    }
  }


}
