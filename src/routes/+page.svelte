const list = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.querySelector('input[type="text"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = `${text} (not done)`;
  li.addEventListener('click', () => {
    li.textContent = li.textContent.includes('(not done)')
      ? `${text} (done)`
      : `${text} (not done)`;
  });

  list.appendChild(li);
  input.value = '';
  saveTodos();
});

function saveTodos() {
  const items = Array.from(list.children).map(li => li.textContent);
  localStorage.setItem('todos', JSON.stringify(items));
}

function loadTodos() {
  const items = JSON.parse(localStorage.getItem('todos') || '[]');
  items.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.addEventListener('click', () => {
      const base = text.split(' (')[0];
      li.textContent = li.textContent.includes('(not done)')
        ? `${base} (done)`
        : `${base} (not done)`;
      saveTodos();
    });
    list.appendChild(li);
  });
}

loadTodos();
