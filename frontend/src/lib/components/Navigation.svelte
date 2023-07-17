<script lang="ts">
	import { user } from '$lib/flow/stores';
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
	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
</script>

<button class="block md:hidden btn-icon variant-filled {cButton}" on:click={drawerClose}>X</button>

<nav class="list-nav w-full">
	<ul class="flex md:flex-row flex-col w-full justify-center md:items-end lg:gap-x-2">
		<li><a href="/active-loans" on:click={drawerClose}>Active Loans</a></li>
		<li><a href="/loan-requests" on:click={drawerClose}>Loan Requests</a></li>
		{#if $user.loggedIn}
			<li><a href="/my-loans" on:click={drawerClose}>My Loans</a></li>
		{/if}
	</ul>
</nav>
