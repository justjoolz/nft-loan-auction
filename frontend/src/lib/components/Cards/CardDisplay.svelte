<script lang="ts">
	import LoanCard from './LoanCard.svelte';
	import type { LoanAuction } from '../../flow/stores';

	export let loans: LoanAuction[] = [];
	export let title: string;
</script>

<div class="flexColumnCenter w-full p-10 pt-20">
	<div class="flexRowCenter">
		<h2 class="h2 font-bold border-b-2 border-primary-800">{title}</h2>
	</div>
	<div class="gridDisplay gap-4 pt-10">
		{#each loans as loan}
			<LoanCard {loan} />
		{/each}
	</div>
</div>
