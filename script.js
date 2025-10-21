// Todo App with LocalStorage (Final v3)
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const checkbox = document.getElementById('todo-done');
const list = document.getElementById('todo-list');
const STORAGE_KEY = 'todos-v3';

// Load todos
let todos = [];
try {
  todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
} catch {
  todos = [];
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-text';
    if (todo.done) span.classList.add('done');
    span.textContent = `${todo.text} (${todo.done ? 'done' : 'not done'})`;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'delete-btn';
    del.addEventListener('click', () => {
      todos.splice(i, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  const done = checkbox.checked;
  if (!text) return;
  todos.push({ text, done });
  input.value = '';
  checkbox.checked = false;
  saveTodos();
  renderTodos();
});

// Initial render
renderTodos();
