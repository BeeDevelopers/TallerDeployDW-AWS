<script>
	import StyledText from "./StyledText.svelte";

	let text
	let promise = getMessages();
	let messages = []
	
	async function addMessage() {
		
		const res = await fetch('http://localhost:3000/message',
			{ method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({content: text})
		});
		// messages = [...messages, text]
		text = ""
		if (res.ok) {
			alert("Message added")
			messages = await getMessages()
			return true
		} else {
			throw new Error("Error" + res.status);
		}
		
	}

	async function getMessages() {
        const res = await fetch('http://localhost:3000/messages');
		if (res.ok) {
			// messages = await res.json();
			return await res.json()
		} else {
			throw new Error("Error" + res.status);
		}
	}

	// onMount(async () => await getMessages()	)

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
		{#each messages as message}
			<ul><h1>{message.content}</h1></ul>
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