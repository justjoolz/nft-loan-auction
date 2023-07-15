<script>
	import { requests } from '$lib/utils/requestData';
	import LoanCard from '$lib/components/Cards/LoanCard.svelte';
</script>

<div class="flexColumnCenter w-full p-10 pt-20">
	<div class="flexRowCenter relative w-full">
		<h2 class="h2 font-bold border-b-2 border-primary-800">Loan Requests</h2>
	</div>
	<div class="gridDisplay gap-6 pt-10">
		{#each requests as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
