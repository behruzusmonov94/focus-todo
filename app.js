const addForm = document.getElementById('add-form')
const todos = document.querySelector('.todos')




//add todo
const generateTodo = (todo,time) => {
    //get time
    var time = new Date()
    var timeNow = Date.now()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var sec = time.getSeconds()
    let html = `
    <label class="list-group-item d-flex justify-content-between align-items-center" data-key="${timeNow}">
    <div class="d-flex">
        <input class="form-check-input me-1 check" type="checkbox" value="">
        <p class="mx-2">${todo}</p>
        <p class="fst-italic date">${hours}:${minutes}</p>
    </div>
    <button class="delete btn btn-sm text-danger fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteTodos"></button>
    </label>
    `
    return html;
}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    let inpValue = addForm.name.value.trim()
    if(inpValue.length){
        todos.innerHTML += generateTodo(inpValue)
        addForm.reset()
        var time = Date.now()
        localStorage.setItem(time, inpValue)
    }
    

})


//delete todos

const deleteItem = document.getElementById('delete-todo')
const confirmDelete = document.getElementById('confirmDelete')
todos.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        let dataKey = e.target.parentElement.getAttribute('data-key')

        
        confirmDelete.addEventListener('click', () => {
           
            e.target.parentElement.remove()
            localStorage.removeItem(dataKey)
        })
        
    }
})

//checked todo

todos.addEventListener('click', (e)=>{
    if(e.target.classList.contains('check')){
        e.target.setAttribute('checked', 'checked')
        e.target.parentElement.parentElement.classList.toggle('checked-item')
    }
    
})


//generate with localStorage
//add todo
const generateTodoLocalStorage = (name,hours,minutes,dataKey) => {
    //get time
    var time = new Date()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var sec = time.getSeconds()

    let html = `
    <label class="list-group-item d-flex justify-content-between align-items-center" data-key="${dataKey}">
    <div class="d-flex">
        <input class="form-check-input me-1 check" type="checkbox" value="">
        <p class="mx-2">${name}</p>
        <p class="fst-italic date">${hours}:${minutes}</p>
    </div>
    <button class="delete btn btn-sm text-danger fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteTodos"></button>
    </label>
    `
    return html;
}

var dataArr = []

for(let i = 0; i < localStorage.length; i++){
    let dataKey = localStorage.key(i)
    let dataVal = localStorage.getItem(dataKey)
    let getDate = new Date(parseInt(dataKey))
    let getHours = getDate.getHours()
    let getMinutes = getDate.getMinutes()
    // console.log(getHours, getMinutes, dataVal);
    todos.innerHTML += generateTodoLocalStorage(dataVal, getHours, getMinutes, dataKey)
    
}


//clear ALL
const clearAll = document.getElementById('clearAll')

clearAll.addEventListener('click', (e) => {
    confirmDelete.addEventListener('click', () => {  
        localStorage.clear()
        const allItems = document.querySelectorAll('.todos label')
        allItems.forEach(item => {
            item.remove()
        })
    })
})