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
        <p class="fst-italic date">${hours}:${minutes}:${sec}</p>
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


//generate from localStorage
//add todo


var dataArr = []

for(let i = 0; i < localStorage.length; i++){
    let dataKey = localStorage.key(i)
    let dataVal = localStorage.getItem(dataKey)
    let getDate = new Date(parseInt(dataKey))
    var hours = getDate.getHours()
    var minutes = getDate.getMinutes()
    var sec = getDate.getSeconds()
    let html = `
    <label class="list-group-item d-flex justify-content-between align-items-center" data-key="${dataKey}">
    <div class="d-flex">
        <input class="form-check-input me-1 check" type="checkbox" value="">
        <p class="mx-2">${dataVal}</p>
        <p class="fst-italic date">${hours}:${minutes}:${sec}</p>
        
    </div>
    <button class="delete btn btn-sm text-danger fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteTodos"></button>
    </label>
    `
    todos.innerHTML += html
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

//search todo
const filterTodos = (term) => {
    Array.from(todos.children)
        .filter((todo) => {
            return !todo.textContent.toLocaleLowerCase().includes(term)
        })
        .forEach((todo) => {
            todo.classList.add('filtered')
        })
    Array.from(todos.children)
        .filter((todo) => {
            return todo.textContent.includes(term)
        })
        .forEach((todo) => {
            todo.classList.remove('filtered')
        })
}



const search = document.querySelector('#search-todo input')
const searchForm = document.getElementById('search-todo')

search.addEventListener('keyup', (e) => {
    console.log(e.target.value);
    const term = search.value.trim().toLocaleLowerCase();
    filterTodos(term)
})

searchForm.addEventListener('submit', e => e.preventDefault())


//sort item

const sortA = document.getElementById('sortA')
const sortZ = document.getElementById('sortZ')


sortA.addEventListener('click', (e)=>{
    const todosList = Array.from(todos.children)
})



//dark mode

const darkMode = document.getElementById('darkMode')
const html = document.querySelector('html')

darkMode.addEventListener('click', (e) => {
    html.classList.toggle('dark-mode')
    if(e.target.classList.contains('fa-moon')){
        e.target.classList.remove('fa-moon')
        e.target.classList.add('fa-sun')
    }else{
        e.target.classList.remove('fa-sun')
        e.target.classList.add('fa-moon')
    }
    
})