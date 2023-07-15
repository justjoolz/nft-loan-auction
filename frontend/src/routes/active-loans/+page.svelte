<script>
	import { loans } from '$lib/utils/loanData';
	import LoanCard from '$lib/components/Cards/LoanCard.svelte';
</script>

<div class="flexColumnCenter w-full p-10 pt-20">
	<div class="flexRowCenter relative w-full">
		<h2 class="h2 font-bold border-b-2 border-primary-800">Active Loans</h2>
	</div>
	<div class="gridDisplay gap-6 pt-10">
		{#each loans as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
