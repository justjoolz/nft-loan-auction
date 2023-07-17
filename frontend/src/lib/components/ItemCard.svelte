<script lang="ts">
	import { createLoanAuction } from '$lib/flow/actions';
	import { selectedCollateralNFT } from '$lib/flow/stores';
	import { type ModalSettings, modalStore } from '@skeletonlabs/skeleton';

	export let nft: any = {};

	// function withdrawFT(id: number, ft: FTCatalogEntry) {
	// 	const storagePath = $ftTokens.find((token) => token.symbol === ft.token)?.path.vault;
	// 	console.log(storagePath, $ftTokens, ft.token);
	// 	if (!storagePath) throw new Error('No storage path found for FT');
	// 	// .storagePath;
	// 	const selectedBasketId = 0;
	// 	const amount = 0.00001;
	// 	basketTxs.withdrawFT(selectedBasketId.toString(), storagePath, amount.toString());
	// }

	let nftArray: number[] = [];

	function convertUrl(url: string) {
		if (url.startsWith('ipfs://')) {
			const ipfsGateway = 'https://ipfs.io';
			return `${ipfsGateway}/ipfs/${url.slice(7)}`;
		}
		return url;
	}
	const handleClick = () => {
		console.log({ nft });
		selectedCollateralNFT.set(nft);
	};
</script>

<button
	class={`flex flex-col items-center justify-start bg-tertiary-900 rounded-md hoverShadow p-4 `}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="flex flex-col h-full justify-between" on:click={handleClick}>
		<div class="flex flex-col items-center w-full">
			<img src={convertUrl(nft.thumbnail)} alt={nft.name} class="h-12" />
			<p class="text-sm pt-3 text-center">{nft.name}</p>
		</div>
		<!-- <button class="font-bold">Deposit</button> -->
	</div>
</button>
