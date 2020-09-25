import App from './App.svelte';
import Offline from './Offline.svelte';
import Server from './Server.svelte';


// const app = new App({
// 	target: document.body,
// });

// const app = new Offline({
// 	target: document.body,
// });

const app = new Server({
	target: document.body,
});

export default app;