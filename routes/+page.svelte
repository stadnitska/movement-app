<script>
import { onMount } from 'svelte';
let todos = [];
let newTodo = '';

onMount(() => {
  // load from localStorage in browser
  try {
    const raw = localStorage.getItem('todos');
    todos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    todos = [];
  }
});

function save() {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {}
}

function addTodo(e) {
  e.preventDefault();
  const text = newTodo.trim();
  if (!text) return;
  todos = [...todos, { text, done: false }];
  newTodo = '';
  save();
}

function toggle(index) {
  todos[index].done = !todos[index].done;
  // force array copy so Svelte updates
  todos = [...todos];
  save();
}

function remove(index) {
  todos = todos.filter((_, i) => i !== index);
  save();
}
</script>

<style>
main {
  max-width: 640px;
  margin: 3rem auto;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  padding: 1rem;
}
form { display:flex; gap:0.5rem; margin-bottom:1rem; }
input[type="text"] { flex:1; padding:0.5rem; font-size:1rem; }
button { padding:0.5rem 0.8rem; font-size:1rem; border-radius:6px; }
ul { list-style:none; padding:0; margin:0; }
li { padding:0.5rem; border:1px solid #eee; margin-bottom:0.5rem; border-radius:6px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; }
.meta { color:#666; font-size:.9rem; margin-left:1rem; }
.done { text-decoration: line-through; color:#777; }
</style>

<main>
  <h1>Todo app</h1>
  <p>Click an item to toggle done / not done. Items are saved to <code>localStorage</code>.</p>

  <form on:submit={addTodo}>
    <input type="text" placeholder="New todo" bind:value={newTodo} aria-label="New todo" />
    <button type="submit">Add</button>
  </form>

  {#if todos.length === 0}
    <p>No todos yet — add one!</p>
  {:else}
    <ul>
      {#each todos as todo, i}
        <li on:click={() => toggle(i)}>
          <div>
            <span class={todo.done ? 'done' : ''}>{todo.text}</span>
            <span class="meta">({todo.done ? 'done' : 'not done'})</span>
          </div>
          <div>
            <button on:click|stopPropagation={() => remove(i)} aria-label="Remove">🗑</button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>
