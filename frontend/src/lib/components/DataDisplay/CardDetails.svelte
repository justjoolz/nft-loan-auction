<script lang="ts">
	export let loan: any = {};
	export let type: string = 'active' || 'request';
</script>

<div class="flexRowCenter w-full gap-8 text-lg">
	<div>
		<p class="text-left">
			{type === 'active' ? '' : `Minimum `}Loan amount:
			<b>${type === 'active' ? loan.loanAmount : loan.minimumLoanAmount}</b>
		</p>
	</div>
	<div>
		<p class="text-left">Loan Currency: USDC</p>
	</div>
</div>
