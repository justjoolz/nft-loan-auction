<script lang="ts">
	export let loan: any = {};
</script>

<div class="flexRowCenter w-full gap-8">
	<div>
		<p class="text-left">Minimum Loan amount: <b>${loan.minimumLoanAmount}</b></p>
		<p class="text-left">Minimum Loan duration: {loan.minimumLoanDuration} Days</p>
	</div>
	<div>
		<p class="text-left">Loan Currency: USDC</p>
		<p class="text-left">Requested Date: {loan.requestDate}</p>
	</div>
</div>
