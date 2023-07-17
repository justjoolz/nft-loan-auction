<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { selectedCollateralNFT } from '$lib/flow/stores';
	import { createLoanAuction } from '$lib/flow/actions';
	import ContentDisplay from '../ContentDisplay.svelte';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';

	let nftId: number = 0,
		duration: number = 1,
		_yield: number = 0.1,
		minimumLoanValueRequested: number = 0,
		rollingContract: boolean = true;

	const handleCreateLoanAuctionClick = () => {
		if (!parseInt($selectedCollateralNFT.id)) {
			alert('Please select a NFT');
			return;
		}

		const contractName = $selectedCollateralNFT.privateLinkedType.type.typeID.split('.')[2]; //
		const importAddress = '0x' + $selectedCollateralNFT.privateLinkedType.type.typeID.split('.')[1];
		const collectionStoragePath = '/storage/' + $selectedCollateralNFT.storagePath.identifier;
		const collectionPublicPath = '/public/' + $selectedCollateralNFT.publicPath.identifier;
		const ftReceiverPublicPath = '/public/flowTokenReceiver'; // HARDCODED TO USE FLOW TOKEN

		createLoanAuction(
			parseInt($selectedCollateralNFT.id),
			duration * 60 * 60 * 24,
			_yield,
			minimumLoanValueRequested,
			rollingContract,
			contractName,
			importAddress,
			collectionStoragePath,
			collectionPublicPath,
			ftReceiverPublicPath
		);
	};

	$: console.log($selectedCollateralNFT);
</script>

{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>X</button>
	<div
		class="card p-6 md:p-10 variant-filled-tertiary min-w-[90%] md:min-w-4/5 min-h-[90%] md:min-h-4/5 flex items-center justify-center gap-4"
	>
		<ContentDisplay pageTitle="Select NFT to use as collateral" />

		<div class="flex flex-col w-1/3 gap-6">
			<div class="flex flex-col w-full">
				<label for="duration" class="font-bold pb-2">Duration (days)</label>
				<input
					type="number"
					id="duration"
					class="input w-full"
					placeholder="Duration"
					bind:value={duration}
					tabindex="0"
				/>
			</div>
			<div class="flex flex-col w-full">
				<label for="yield" class="font-bold pb-2">Pay back USDC</label>
				<input
					type="number"
					id="yield"
					class="input w-full"
					placeholder="Yield"
					bind:value={_yield}
					tabindex="0"
				/>
			</div>
			<button class="btn variant-filled-primary font-bold" on:click={handleCreateLoanAuctionClick}
				>Create New Loan Request</button
			>
		</div>
	</div>
{/if}
