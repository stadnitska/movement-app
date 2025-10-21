<script>
  import { onMount } from 'svelte';

  let todos = [];
  let newTodo = '';

  onMount(() => {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
  });

  $: localStorage.setItem('todos', JSON.stringify(todos));

  function addTodo() {
    const text = newTodo.trim();
    if (!text) return;
    todos = [...todos, { text, done: false }];
    newTodo = '';
  }

  function toggleTodo(i) {
    todos[i].done = !todos[i].done;
    todos = [...todos];
  }
</script>

<main>
  <h1>Todo App</h1>

  <section>
    <h2>Add a new todo:</h2>
    <form on:submit|preventDefault={addTodo}>
      <input type="text" bind:value={newTodo} placeholder="e.g. Oranges" />
      <input type="submit" value="Add" />
    </form>
  </section>

  <section>
    <h2>Todos:</h2>
    <ul>
      {#each todos as todo, i}
        <li on:click={() => toggleTodo(i)}>
          {@html `${todo.text} (${todo.done ? 'done' : 'not done'})`}
        </li>
      {/each}
    </ul>
  </section>
</main>
