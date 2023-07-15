<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { loans } from '$lib/utils/loanData';
	import { requests } from '$lib/utils/requestData';
	import Hero from '$lib/components/Hero.svelte';
	import CardDisplay from '$lib/components/Cards/CardDisplay.svelte';
	import { getAllLoanAuctionMeta } from '../lib/flow/actions';
	import { loanAuctions, type LoanAuction } from '../lib/flow/stores';

	let activeLoanAuctions: LoanAuction[] = [];
	$: activeLoanAuctions = $loanAuctions.filter((loan) => loan.ledger.length > 0);
</script>

<div class="h-full mx-auto flex justify-center items-center">
	<div class="w-full">
		<Hero />
		<CardDisplay title={'Active Loans'} loans={activeLoanAuctions} />
		<CardDisplay title={'Loan Requests'} loans={$loanAuctions} />
	</div>
</div>
