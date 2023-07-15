<script>
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav">
	<ul class="flex w-full justify-center items-end gap-x-2">
		<li><a href="/active-loans" on:click={drawerClose}>Active Loans</a></li>
		<li><a href="/loan-requests" on:click={drawerClose}>Loan Requests</a></li>
	</ul>
</nav>
