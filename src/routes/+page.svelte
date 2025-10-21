<script>
  import { onMount } from 'svelte';

  let todos = [];
  let newTodo = '';

  // загружаем из localStorage при старте
  onMount(() => {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
  });

  // сохраняем каждый раз при изменении списка
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

<h1>Todo app</h1>

<form on:submit|preventDefault={addTodo}>
  <input type="text" bind:value={newTodo} placeholder="Add todo" />
  <input type="submit" value="Add" />
</form>

<ul>
  {#each todos as todo, i}
    <!-- важно: ВНУТРИ <li> только текст, без span/label -->
    <li on:click={() => toggleTodo(i)}>
      {@html `${todo.text} (${todo.done ? 'done' : 'not done'})`}
    </li>
  {/each}
</ul>
