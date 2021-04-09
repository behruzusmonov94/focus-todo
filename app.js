const addForm = document.getElementById('add-form')
const todos = document.querySelector('.todos')





const generateTodo = (todo,time) => {
    //get time
    var time = new Date()
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var sec = time.getSeconds()
    let html = `
    <label class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex">
        <input class="form-check-input me-1" type="checkbox" value="">
        <p class="mx-2">${todo}</p>
        <p class="fst-italic date">${hours}:${minutes}:${sec}</p>
    </div>
    <button class="btn btn-danger btn-sm" id="delete-todo"><i class="fas fa-trash-alt"></i></button>
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