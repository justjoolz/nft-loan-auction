<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { lendFunds } from '../../flow/actions';
	import { usersNFTs } from '$lib/flow/stores';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
	const cImage = 'max-w-[90%] max-h-[90%] rounded-container-token overflow-hidden shadow-xl';

	let amount = 0;
	const clickHandler = () => {
		const auctionId = 0;

		const ftContractName = 'FlowToken'; // 'Basket';
		const ftContractAddress = '0x7e60df042a9c0868'; // mainnet = 0x1654653399040a61
		const ftVaultStoragePath = '/storage/flowTokenVault';

		const collectionPublicPath = '/public/BasketCollection';
		const ftReceiverPublicPath = '/public/flowTokenReceiver';

		if (amount <= 0) {
			alert('Please enter a valid amount');
			return;
		}

		console.log({
			auctionId,
			amount,
			ftContractName,
			ftVaultStoragePath,
			collectionPublicPath,
			ftReceiverPublicPath
		});

		lendFunds(
			auctionId,
			amount,
			ftContractName,
			ftContractAddress,
			ftVaultStoragePath,
			collectionPublicPath,
			ftReceiverPublicPath
		);
	};
</script>

{#if $modalStore[0]}
	<!-- Button -->
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>×</button>
	<!-- Image -->
	<!-- <p>{$modalStore[0].meta.content}</p> -->
	<p>Enter the amount of tokens you want to lend</p>
	<input type="number" class="input mb-4" placeholder="Amount" bind:value={amount} />

	<button on:click={clickHandler}>Lend Funds</button>
{/if}
