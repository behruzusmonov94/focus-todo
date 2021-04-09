const addForm = document.getElementById('add-form')
const todos = document.querySelector('.todos')




//add todo
const generateTodo = (todo,time) => {
    //get time
    var time = new Date()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var sec = time.getSeconds()
    let html = `
    <label class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex">
        <input class="form-check-input me-1 check" type="checkbox" value="">
        <p class="mx-2">${todo}</p>
        <p class="fst-italic date">${hours}:${minutes}:${sec}</p>
    </div>
    <button class="delete btn btn-sm text-danger fas fa-trash-alt"></button>
    </label>
    `
    return html;
}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    let inpValue = addForm.name.value.trim()
    console.log(inpValue);
    todos.innerHTML += generateTodo(inpValue)
    addForm.reset()

})


//delete todos

const deleteItem = document.getElementById('delete-todo')

todos.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        let conf = confirm('Siz rostan ham o`chirmoqchimisiz?')
        if(conf){
            e.target.parentElement.remove()
        }
        
    }
})

//checked todo

todos.addEventListener('click', (e)=>{
    if(e.target.classList.contains('check')){
        e.target.setAttribute('checked', 'checked')
        e.target.parentElement.parentElement.classList.toggle('checked-item')
    }
    
})
