<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import startDate from '$lib/utils/formatDate';
	import type { LoanAuction } from '../../flow/stores';

	export let loan: LoanAuction;
</script>

<div class="flexRowCenter w-full gap-8 text-lg">
	<div>
		<p class="text-left">Loan Debt: <b>{loan.debt}</b></p>
		<p class="text-left">Interest Incurred {loan.intrestIncurred}</p>
		<p class="text-left">Duration: {(parseFloat(loan.duration) / 60 / 60 / 24).toFixed(2)} Days</p>
	</div>
	<div>
		<p class="text-left">Current Offer: <b>{loan.offer}</b></p>
		<p class="text-left">Loan Start Date: {loan.startTime && formatDate(loan.startTime)}</p>
		<p class="text-left">Yield: {parseFloat(loan.yield) * 100}%</p>
	</div>
</div>
