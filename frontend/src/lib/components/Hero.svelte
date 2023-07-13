<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { createAuction } from '../../flow/actions';

	function modalComponentCreateLoan(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'createLoan'
		};
		modalStore.trigger(modal);
		let nftId: number,
			duration: number,
			_yield: number,
			minimumLoanValueRequested: number,
			rollingContract: boolean;

		createAuction(0, 100, 0.1, 1000, true);
	}
	// createAuction(nftId, duration, _yield, minimumLoanValueRequested, rollingContract);
</script>

<div
	class="flex flex-col justify-center items-center w-full min-h-[94vh] bg-no-repeat bg-cover bg-center bg-surface-50 bg-[url('$lib/assets/hero-back.jpeg')]"
>
	<div class="flex flex-col w-2/3 h-[500px] gap-y-4">
		<h1 class="text-8xl font-[800] -ml-1">LoanAuction</h1>
		<p class="text-lg">
			LoanAuction is a platform for lenders to auction their loans to the highest bidder.
		</p>
		<a href="/"
			><button class="btn variant-filled-primary font-bold" on:click={modalComponentCreateLoan}
				>Create New Loan Request</button
			></a
		>
	</div>
</div>
