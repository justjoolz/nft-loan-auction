<script lang="ts">
	export let loan: any = {};
</script>

<div class="flexColumnCenter w-full font-bold">
	<p class="text-left w-1/2">Loan amount: ${loan.loanAmount}</p>
	<p class="text-left w-1/2">Interest: {loan.loanInterest}%</p>
	<p class="text-left w-1/2">Loan duration: {loan.loanDuration} Days</p>
	<p class="text-left w-1/2">Borrowed amount: ${loan.borrowedAmount}</p>
	<p class="text-left w-1/2">Loan Start Date: {loan.loanDate}</p>
	<p class="text-left w-1/2">Outstanding Balance: ${loan.outstandingAmount}</p>
</div>
