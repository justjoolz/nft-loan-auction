<script lang="ts">
	export let loan: any = {};
</script>

<div class="flexColumnCenter w-full">
	<div>
		<p class="text-left">Minimum Loan amount: ${loan.minimumLoanAmount}</p>
		<p class="text-left">Minimum Loan duration: {loan.minimumLoanDuration} Days</p>
		<p class="text-left">Requested Date: {loan.requestDate}</p>
	</div>
</div>
