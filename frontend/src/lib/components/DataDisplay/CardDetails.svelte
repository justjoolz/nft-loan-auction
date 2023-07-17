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

<div class="flex gap-8 text-lg w-1/2">
	<div class="">
		{#if isActive}
			<div class="text-left">
				<p>Current Borrowed Debt:</p>
				<p>
					<b>{`${loan.debt}`}</b>
					({utilizationPercentage}%)
				</p>
			</div>
		{/if}
	</div>
</div>
