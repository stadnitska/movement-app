<script>
  import { onMount } from 'svelte';
  let todos = [];
  let text = '';

  onMount(() => {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
  });

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function add(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    todos = [...todos, { text: t, done: false }];
    text = '';
    save();
  }

  function toggle(i) {
    todos[i].done = !todos[i].done;
    todos = [...todos];
    save();
  }

  // helper to return single-string display
  function display(todo) {
    return `${todo.text} (${todo.done ? 'done' : 'not done'})`;
  }
</script>

<main>
  <h1>Todos</h1>
  <form on:submit={add}>
    <input type="text" bind:value={text} placeholder="New todo" />
    <input type="submit" value="Add" />
  </form>

  {#if todos.length === 0}
    <p>No todos added yet.</p>
  {:else}
    <ul>
      {#each todos as todo, i}
        <li>{todo.text} ({todo.done ? 'done' : 'not done'})</li>

      {/each}
    </ul>
  {/if}
</main>

<style>
  main { font-family: system-ui, sans-serif; max-width: 600px; margin: 2rem auto; padding: 1rem; }
  form { margin-bottom: 1rem; display:flex; gap:.5rem; }
  input[type="text"] { flex:1; padding:.5rem; font-size:1rem; }
  input[type="submit"] { padding:.5rem 1rem; font-size:1rem; }
  ul { list-style:none; padding:0; }
  li { padding:.5rem; border:1px solid #ddd; border-radius:.5rem; margin-bottom:.5rem; cursor:pointer; }
</style>
