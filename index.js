const todo = document.querySelector('.todo-list-elem');
const input = document.getElementById('input');

const getTodoList = () => {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    if (Array.isArray(todoList) && todoList.length > 0) {
        todoList = todoList.filter(item => item.trim() !== '');
    } else {
        todoList = [];
    }

    return todoList;
}

let localTodo = getTodoList() || [];

const addTodoListLocalStorage = (localTodo) => {
    return localStorage.setItem("todoList", JSON.stringify(localTodo))
}


const addTodoDynamic = (currentElem) => {
    const todoVal = input.value.trim();
    if (currentElem !== '') {
        localTodo.push(todoVal);
        localTodo = [... new Set(localTodo)];
        console.log(localTodo)
        localStorage.setItem('todoList', JSON.stringify(localTodo))
        const divElem = document.createElement('div');
        divElem.classList.add('main-todo-div');
        divElem.innerHTML = `<li type="circle">${currentElem}</li>
    <button class="delete-btn">Delete</button>`
        todo.append(divElem);
    }
    else if (todoVal == '') {
        alert("Add something to the list!")
    }
    else {
        alert("Add something else to the list!")
    }
}

const addTodoList = (e) => {
    e.preventDefault()
    const todoVal = input.value.trim();
    if (!localTodo.includes(todoVal)) {
        localTodo.push(todoVal);
        localTodo = [... new Set(localTodo)];
        console.log(localTodo)
        localStorage.setItem('todoList', JSON.stringify(localTodo))
        addTodoDynamic(todoVal);
    }
    else if (todoVal == '') {
        alert("Add something to the list!")
    }
    else {
        alert("This data is already present in the Todo List")
    }
}
const showTodo = () => {
    localTodo.forEach((currentElem) => {
        addTodoDynamic(currentElem);
        console.log(localTodo);
    });
}
showTodo();

const removeTodoElem = (e) => {
    let todoRemove = e.target;
    let todoListContent = todoRemove.previousElementSibling.innerText;
    let parentElem = todoRemove.parentElement;
    localTodo = localTodo.filter((currentTodo) => {
        return currentTodo !== todoListContent.toLowerCase();
    });
    addTodoListLocalStorage(localTodo);
    parentElem.remove();
}

document.querySelector('.btn').addEventListener('click', (e) => {
    addTodoList(e);
    input.value = '';

});

todo.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('delete-btn')) {
        removeTodoElem(e);

    }
})