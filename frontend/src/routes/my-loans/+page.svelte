<script lang="ts">
	import LoanCard from '$lib/components/Cards/LoanCard.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { loanAuctions, type LoanAuction, user } from '$lib/flow/stores';

	let tabSet: number = 0;

	let loans: LoanAuction[] = [];
	let activeLoans: LoanAuction[] = [];
	let offers: LoanAuction[] = [];
	let requests: LoanAuction[] = [];
	$: loans = $loanAuctions.filter((loan) => loan.ownersAddress === $user?.addr);
	$: activeLoans = loans.filter((loan) => loan.offer !== null);
	$: offers = $loanAuctions.filter((loan) => loan.offeringAddress === $user?.addr);
	$: requests = loans.filter((loan) => loan.offer === null);	
</script>

<div class="flexColumnCenter w-full px-10 py-20">
	<div class="flexRowCenter relative w-full">
		<h1 class="h1 font-bold">My Loans</h1>
	</div>
	<div class="w-full mt-12 border-primary-800 border-2 font-bold">
		<TabGroup
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none"
			rounded=""
			border=""
			class="bg-surface-100-800-token w-full"
		>
			<Tab bind:group={tabSet} name="tab1" padding="p-[6px]" value={0}>
				<span class="text-xs sm:text-base lg:px-16">Active Loans</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" padding="p-[6px]" value={1}><span class="text-xs sm:text-base lg:px-16">Offers</span></Tab>
			<Tab bind:group={tabSet} name="tab3" padding="p-[6px]" value={2}><span class="text-xs sm:text-base lg:px-16">Requests</span></Tab>
		</TabGroup>
	</div>

	<div class="gridDisplay gap-6 pt-10">
		{#if tabSet === 0}
			{#each activeLoans as loan}
				<LoanCard {loan} />
			{/each}
		{:else if tabSet === 1}
			{#each offers as loan}
				<LoanCard {loan} />
			{/each}
		{:else if tabSet === 2}
			{#each requests as loan}
				<LoanCard {loan} />
			{/each}
		{/if}
	</div>
</div>
