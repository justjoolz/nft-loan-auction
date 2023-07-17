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
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>×</button>
	<div class="card flexRowCenter p-40">
		<ContentDisplay pageTitle="Select NFT to use as collateral" />

		<label for="duration" class="label">Duration (days)</label>
		<input bind:value={duration} type="number" placeholder="Duration" class="input" />

		<label for="yield" class="label">Yield (%)</label>
		<input bind:value={_yield} type="number" placeholder="Yield" class="input" />

		<button class="btn variant-filled-primary font-bold" on:click={handleCreateLoanAuctionClick}
			>Create New Loan Request</button
		>
	</div>
{/if}
