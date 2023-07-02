<script lang="ts">
	export let loan: any = {};
</script>

<div class="flexColumnCenter w-full font-bold">
	<p class="text-left w-1/2">Minimum Loan amount: ${loan.minimumLoanAmount}</p>
	<p class="text-left w-1/2">Minimum Loan duration: {loan.minimumLoanDuration} Days</p>
	<p class="text-left w-1/2">Requested Date: {loan.requestDate}</p>
</div>
