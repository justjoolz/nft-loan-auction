<script lang="ts">
	import LoanCard from './LoanCard.svelte';
	import type { LoanAuction } from '../../flow/stores';

	export let loans: LoanAuction[] = [];
	export let title: string;
	let slug = title.toLowerCase().replace(' ', '-');

	let firstSixLoans: LoanAuction[] = [];
	$: firstSixLoans = loans.slice(0, 6);
</script>

<div class="flexColumnCenter w-full p-10 pt-20">
	<div class="flexRowCenter relative w-full">
		<h2 class="h2 font-bold border-b-2 border-primary-800">{title}</h2>
		{#if loans.length > 6}
			<a href={slug}
				><button class="btn variant-ringed-primary font-bold absolute right-0">See All</button></a
			>
		{/if}
	</div>
	<div class="gridDisplay gap-4 pt-10">
		{#each firstSixLoans as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
