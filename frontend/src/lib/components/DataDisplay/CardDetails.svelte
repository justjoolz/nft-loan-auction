<script lang="ts">
	import type { LoanAuction } from '$lib/flow/stores';

	export let loan: LoanAuction;
	let amountToBorrow: number = 0;
	let isActive = loan.startTime !== null;

	let utilizationPercentage = (
		(parseFloat(loan.debt) / parseFloat(loan.offer ?? '1')) *
		100
	).toFixed(2);
</script>

<div class="flexRowCenter w-full gap-8 text-lg">
	<div>
		<p class="text-left">
			Current Borrowed Debt
			{#if isActive}
				<b>${`${loan.debt}/${loan.offer}`}</b>
				${utilizationPercentage}%
			{:else}
				Current Offer
			{/if}
		</p>
	</div>
	<div>
		<p class="text-left">Loan Currency: USDC</p>
	</div>
</div>
