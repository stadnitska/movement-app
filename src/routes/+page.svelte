<script>
  import { onMount } from 'svelte';
  let todos = [];
  let newTodo = '';

  onMount(() => {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
  });

  function addTodo() {
    if (!newTodo.trim()) return;
    todos = [...todos, { text: newTodo, done: false }];
    localStorage.setItem('todos', JSON.stringify(todos));
    newTodo = '';
  }

  function toggle(todo) {
    todo.done = !todo.done;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
</script>

<h1>Todo list</h1>

<form on:submit|preventDefault={addTodo}>
  <input type="text" bind:value={newTodo} />
  <button type="submit">Add</button>
</form>

<ul>
  {#each todos as todo, i}
    <li on:click={() => toggleTodo(i)}>
      {todo.text} ({todo.done ? 'done' : 'not done'})
    </li>
  {/each}
</ul>

