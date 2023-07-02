<script>
	import { drawerStore, toastStore } from '@skeletonlabs/skeleton';

	const t = {
		message: 'menu closed',
		background: 'variant-filled-success'
	};

	function drawerClose() {
		drawerStore.close();
		toastStore.trigger(t);
	}
</script>

<nav class="list-nav">
	<ul class="flex w-full justify-center items-end gap-x-2">
		<li><a href="/?test=1" on:click={drawerClose}>Active Loans</a></li>
		<li><a href="/?test=2" on:click={drawerClose}>Loan Requests</a></li>
	</ul>
</nav>
