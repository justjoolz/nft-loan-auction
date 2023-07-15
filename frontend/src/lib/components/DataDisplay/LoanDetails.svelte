<script lang="ts">
	import type { LoanAuction } from '../../flow/stores';

	export let loan: LoanAuction;
</script>

<div class="flexColumnCenter w-full font-bold">
	<p class="text-left w-1/2">Loan debt: ${loan.debt}</p>
	<p class="text-left w-1/2">Fees incurred {loan.feesIncurred}%</p>
	<p class="text-left w-1/2">Duration: {loan.duration}%</p>
	<p class="text-left w-1/2">Borrowed amount: ${loan.debt}</p>
	<p class="text-left w-1/2">Loan Start Date: {loan.startTime}</p>
	<p class="text-left w-1/2">Yield: ${loan.yield}</p>
</div>
