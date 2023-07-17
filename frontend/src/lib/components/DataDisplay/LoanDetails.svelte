<script lang="ts">
	export let loan: any;
</script>

<div class="flexRowCenter w-full gap-8 text-lg">
	<div>
		<p class="text-left">Loan debt: <b>${loan.debt}</b></p>
		<p class="text-left">Fees incurred {loan.feesIncurred}%</p>
		<p class="text-left">Duration: {loan.duration}Days</p>
	</div>
	<div>
		<p class="text-left">Borrowed amount: ${loan.debt}</p>
		<p class="text-left">Loan Start Date: {loan.startTime}</p>
		<p class="text-left">Yield: ${loan.yield}</p>
	</div>
</div>
