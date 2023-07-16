<script>
	import { loans } from '$lib/utils/loanData';
	import LoanCard from '$lib/components/Cards/LoanCard.svelte';
</script>

<div class="flexColumnCenter w-full p-10 pt-20">
	<div class="flexRowCenter relative w-full">
		<h1 class="h1 font-bold">Active Loans</h1>
	</div>
	<div class="gridDisplay gap-6 pt-10">
		{#each loans as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
