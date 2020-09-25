<script>

	let messages = [];
	let text
	
	async function addMessage() {
		messages = [...messages, text]
		text = ""
		
	}

</script>

<main>
	<StyledText content={"DevWeek"}/>

	<input bind:value={text}>

	<button on:click={addMessage}>Add</button>
	
    {#each messages as message}
        <ul><h1>{message}</h1></ul>
    {/each}

	
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