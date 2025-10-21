<script>
  import { onMount } from 'svelte';

  // список задач и текущее значение инпута
  let todos = [];
  let newTodo = '';

  // загрузка из localStorage при запуске
  onMount(() => {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
  });

  // сохраняем при каждом изменении
  $: localStorage.setItem('todos', JSON.stringify(todos));

  // добавление новой задачи
  function addTodo() {
    const text = newTodo.trim();
    if (!text) return;

    todos = [...todos, { text, done: false }];
    newTodo = '';
  }

  // переключение статуса задачи
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
    <li on:click={() => toggleTodo(i)}>
      {@html `${todo.text} (${todo.done ? 'done' : 'not done'})`}
    </li>
  {/each}
</ul>
