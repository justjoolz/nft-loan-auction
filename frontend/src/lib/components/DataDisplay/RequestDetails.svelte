<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import type { LoanAuction } from '../../flow/stores';

	export let loan: LoanAuction;
</script>

<div class="flexRowCenter w-full gap-8 text-lg">
	<div>
		<p class="text-left">
			Minimum Loan duration: <b>{(parseFloat(loan.duration) / 60 / 60 / 24).toFixed(2)}</b> Days
		</p>
	</div>
	<p class="text-left">Yield: <b>{parseFloat(loan.yield) * 100}%</b></p>
</div>
