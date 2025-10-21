<script>
  import { onMount } from 'svelte';

  let todos = [];
  let newTodo = '';

  // Загружаем из localStorage при запуске
  onMount(() => {
    const stored = localStorage.getItem('todos');
    todos = stored ? JSON.parse(stored) : [];
  });

  // Сохраняем в localStorage при каждом изменении
  $: localStorage.setItem('todos', JSON.stringify(todos));

  function addTodo() {
    if (newTodo.trim() === '') return;
    todos = [...todos, { text: newTodo.trim(), done: false }];
    newTodo = '';
  }

  function toggleTodo(index) {
    todos[index].done = !todos[index].done;
    todos = [...todos]; // заставляем Svelte перерендерить
  }

  function clearTodos() {
    todos = [];
  }
</script>

<h1>Todo app</h1>

<form on:submit|preventDefault={addTodo}>
  <input type="text" bind:value={newTodo} placeholder="Add todo" />
  <input type="submit" value="Add" />
</form>

<ul>
  {#each todos as todo, i}
    <li on:click={() => toggleTodo(i)}>
      {todo.text} ({todo.done ? 'done' : 'not done'})
    </li>
  {/each}
</ul>

<button on:click={clearTodos}>Clear all</button>
