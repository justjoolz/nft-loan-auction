<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let slug = '';

	onMount(() => {
		updateSlug();
		window.addEventListener('popstate', updateSlug);
	});
	function updateSlug() {
		const pathParts = window.location.pathname.split('/');
		const slugIndex = 2; // Adjust this value based on the position of the "slug" in the URL

		// Update the slug variable
		slug = pathParts[slugIndex];
	}

	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav">
	<ul class="flex w-full justify-center items-end gap-x-2">
		<li><a href="/?test=1" on:click={drawerClose}>Active Loans</a></li>
		<li><a href="/?test=2" on:click={drawerClose}>Loan Requests</a></li>
	</ul>
</nav>
