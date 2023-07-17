<script lang="ts">	
	import Hero from '$lib/components/Hero.svelte';
	import CardDisplay from '$lib/components/Cards/CardDisplay.svelte';
	import { getAllLoanAuctionMeta } from '../lib/flow/actions';
	import { loanAuctions, type LoanAuction } from '../lib/flow/stores';

	let activeLoanAuctions: LoanAuction[] = [];
	let loanRequests: LoanAuction[] = [];

	$: loanRequests = $loanAuctions.filter((loan) => loan.startTime === null); // Loan startTime is set when the collateral owner borrows offered funds.
	$: activeLoanAuctions = $loanAuctions.filter((loan) => loan.startTime !== null); // Loan ledger is set when the borrower accepts the loan offer.

	$: console.log({ loanRequests });
	$: console.log({ activeLoanAuctions });
</script>

<div class="h-full mx-auto flex justify-center items-center">
	<div class="w-full">
		<Hero />
		<CardDisplay title={'Active Loans'} loans={activeLoanAuctions} />
		<CardDisplay title={'Loan Requests'} loans={loanRequests} />
		<CardDisplay title={'All Loans'} loans={$loanAuctions} />
	</div>
</div>
