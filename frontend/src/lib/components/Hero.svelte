<script lang="ts">
	import { getUsersNFTs } from '$lib/flow/actions';
	import { user } from '$lib/flow/stores';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { logIn } from '$lib/flow/actions';

	function modalComponentCreateLoan(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'createLoan'
		};
		modalStore.trigger(modal);
		getUsersNFTs($user.addr);
	}

	function handleCreateLoan(): void {
		if ($user.loggedIn) {
			modalComponentCreateLoan();
		} else {
			logIn().then(() => {
				modalComponentCreateLoan();
			});
		}
	}
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
			><button class="btn variant-filled-primary font-bold" on:click={handleCreateLoan}
				>Create New Loan Request</button
			></a
		>
	</div>
</div>
