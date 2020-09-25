<script>
	import { onMount } from 'svelte';
	import StyledText from "./StyledText.svelte";

	let messages = [];
	let text
	let promise = getMessages();
	// function addMessage() {
	// 	messages = [...messages, text]
	// 	text = ""
	// }
	
	async function addMessage() {
		const res = await fetch('https://5f6ce7a060cf97001641a69c.mockapi.io/api/messages', { method: 'POST', body: {content: text} });
		// messages = [...messages, text]
		text = ""
		if (res.ok) {
			alert("Message added")
		} else {
			throw new Error("Error" + res.status);
		}
		messages = await getMessages()
	}

	async function getMessages() {
		const res = await fetch('https://5f6ce7a060cf97001641a69c.mockapi.io/api/messages');
		if (res.ok) {
			// messages = await res.json();
			return await res.json()
		} else {
			throw new Error("Error" + res.status);
		}
	}

	// onMount(async () => {
	// 	const res = fetch('https://5f6ce7a060cf97001641a69c.mockapi.io/api/messages');
	// 	alert(res.json()) 
	// 	messages = await res.json();
	// })

</script>

<main>
	<StyledText content={"DevWeek"}/>

	<input bind:value={text}>
	<!-- <button on:click={addMessage}>Add</button>
	{#each messages as message}
		<ul><h1>{message}</h1></ul>
	{/each} -->
	<button on:click={addMessage}>Add</button>
	{#await promise}
	<p>...waiting</p>
	{:then mess}
		{#each mess as message}
			<ul><h1>{message.content}</h1></ul>
			<!-- <StyledText content={message.content} ></StyledText> -->
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
	
</main>

<style>
	:global(body) {
		background-color: rgb(39, 39, 43);
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #fafafa;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>