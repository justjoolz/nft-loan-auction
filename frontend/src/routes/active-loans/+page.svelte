<script lang="ts">
	import LoanCard from '$lib/components/Cards/LoanCard.svelte';
	import { loanAuctions, type LoanAuction } from '../../lib/flow/stores';
	let activeLoanAuctions: LoanAuction[] = [];
	$: activeLoanAuctions = $loanAuctions.filter((loan) => loan.startTime !== null); // Loan ledger is set when the borrower accepts the loan offer.
</script>

<div class="flexColumnCenter w-full p-10 pt-20">
	<div class="flexRowCenter relative w-full">
		<h1 class="h1 font-bold">Active Loans</h1>
	</div>
	<div class="gridDisplay gap-6 pt-10">
		{#each activeLoanAuctions as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
