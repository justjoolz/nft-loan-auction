<script lang="ts">
	export let loan: any = {};
</script>

<div class="flexColumnCenter w-full">
	<div>
		<p class="text-left ">Loan amount: ${loan.loanAmount}</p>
		<p class="text-left ">Interest: {loan.loanInterest}%</p>
		<p class="text-left ">Loan duration: {loan.loanDuration} Days</p>
		<p class="text-left ">Borrowed amount: ${loan.borrowedAmount}</p>
		<p class="text-left ">Loan Start Date: {loan.loanDate}</p>
		<p class="text-left ">Outstanding Balance: ${loan.outstandingAmount}</p>
	</div>
</div>
