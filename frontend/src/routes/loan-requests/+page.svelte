<script lang="ts">
	import LoanCard from '$lib/components/Cards/LoanCard.svelte';
	import { loanAuctions, type LoanAuction } from '../../lib/flow/stores';
	let loanRequests: LoanAuction[] = [];
	$: loanRequests = $loanAuctions.filter((loan) => loan.startTime === null) // Loan ledger is set when the borrower accepts the loan offer.
</script>

<div class="flexColumnCenter w-full p-4 md:p-6 lg:p-10 !pt-20">
	<div class="flexRowCenter relative w-full">
		<h1 class="h1 font-bold">Loan Requests</h1>
	</div>
	<div class="gridDisplay gap-6 pt-10">
		{#each loanRequests as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
