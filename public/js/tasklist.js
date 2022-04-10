function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

// const arr = ["a","b","c","d"];

// console.log(arr);

// const index = arr.indexOf("c");
// console.log(index);
// if (index > -1) {
//   array.splice(index, 1); // 2nd parameter means remove one item only
// }

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#new-task-form");
    const deleteAll = document.querySelector("#deleteTasks");
    const taskInput = document.querySelector("#new-task-input");
    const dateInput = document.querySelector("#new-date-input");
    
    const list_el = document.querySelector("#tasks");
    var listOfTasks = localStorage.getItem("task-list")
        ? JSON.parse(localStorage.getItem("task-list"))
        : [];

    deleteAll.addEventListener('click', (event) => {
        if(listOfTasks.length === 0){
            alert("There are no tasks to delete");
        } else if(confirm("Are you sure you want to delete all tasks?")){
            listOfTasks = [];
            localStorage.removeItem("task-list");
            location.reload();
        } else {
            console.log("that");
        }
    })

    if(listOfTasks){
        listOfTasks.forEach((task, index) => {
            const task_el = document.createElement("div");
            task_el.classList.add("task");

            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");

            task_el.appendChild(task_content_el);
            task_el.classList.add("shadow-lg");
  
            const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.classList.add("form-control");
            task_input_el.classList.add("no-border");
            task_input_el.classList.add("text-light");
            task_input_el.type = "text";
            task_input_el.value = task.taskName;
            task_input_el.setAttribute("readonly", "readonly");

            const date_input_el = document.createElement("input");
            date_input_el.classList.add("date");
            date_input_el.classList.add("form-control");
            date_input_el.classList.add("no-border");
            date_input_el.classList.add("text-light");
            date_input_el.type = "date";
            date_input_el.value = task.taskDate;
            date_input_el.setAttribute("readonly", "readonly");
        
            task_content_el.appendChild(task_input_el);
            task_content_el.appendChild(date_input_el);
        
            const task_actions_el = document.createElement("div");
            task_actions_el.classList.add("actions");
        
            // const task_edit_el = document.createElement("button");
            // task_edit_el.classList.add("edit");
            // task_edit_el.innerHTML = "Edit";
        
            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "Delete";
        
            // task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
        
            task_el.appendChild(task_actions_el);
        
            list_el.appendChild(task_el);
  
            task_delete_el.addEventListener('click',()=>{
                console.log(task_el.firstElementChild.firstElementChild.id);
                list_el.removeChild(task_el);
                localStorage.setItem("task-list",JSON.stringify(listOfTasks.slice(task_el.firstElementChild.firstElementChild.id,1)));

                // listOfTasks = listOfTasks.length === 1 ? [] : listOfTasks.slice(ind, 1);
                // localStorage.setItem("task-list",JSON.stringify(listOfTasks));
            })
        })
      }
  
  
    form.addEventListener('submit',(e) =>{
      e.preventDefault();
  
      const task = {taskName: taskInput.value,
        taskDate: dateInput.value};

      if (!task) {
        alert("Please add a task!");
        return;
      }

      const task_el = document.createElement("div");
      task_el.classList.add("task");
  
      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");
      // task_content_el.innerText = task;
  
      task_el.appendChild(task_content_el);
  
      const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.classList.add("form-control");
            task_input_el.classList.add("no-border");
            task_input_el.classList.add("text-light");
            task_input_el.type = "text";
            task_input_el.value = task.taskName;
            task_input_el.setAttribute("readonly", "readonly");

            const date_input_el = document.createElement("input");
            date_input_el.classList.add("date");
            date_input_el.classList.add("form-control");
            date_input_el.classList.add("no-border");
            date_input_el.classList.add("text-light");
            date_input_el.type = "date";
            date_input_el.value = task.taskDate;
            date_input_el.setAttribute("readonly", "readonly");
        
            task_content_el.appendChild(task_input_el);
            task_content_el.appendChild(date_input_el);

      listOfTasks.push(task);
      localStorage.setItem("task-list",JSON.stringify(listOfTasks));
  
      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");
  
    //   const task_edit_el = document.createElement("button");
    //   task_edit_el.classList.add("edit");
    //   task_edit_el.innerHTML = "Edit";
  
      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = "Delete";
  
    //   task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
  
      task_el.appendChild(task_actions_el);
  
      list_el.appendChild(task_el);
  
      taskInput.value = "";
  
    //   task_edit_el.addEventListener('click', () => {
    //       console.log("we edit");
    //     if(task_edit_el.innerText.toLowerCase() == "edit"){
    //       task_input_el.removeAttribute("readonly");
    //       task_input_el.focus();
    //       task_edit_el.innerText = "Save";
    //     } else{
    //       task_input_el.setAttribute("readonly", "readonly");
    //       task_edit_el.innerText = "Edit";
    //     }
    //   });
  
      task_delete_el.addEventListener('click',()=>{
                console.log(task_el.firstElementChild.firstElementChild.id);
                list_el.removeChild(task_el);
                localStorage.setItem("task-list",JSON.stringify(listOfTasks.slice(task_el.firstElementChild.firstElementChild.id,1)));
                // listOfTasks = listOfTasks.length === 1 ? [] : listOfTasks.slice(ind, 1);
                // localStorage.setItem("task-list",JSON.stringify(listOfTasks));
      })
    })
  })
  