<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import NftCard from './NFTCard.svelte';
	import FtCard from './FTCard.svelte';
	import LoanDetails from '../DataDisplay/LoanDetails.svelte';
	import RequestDetails from '../DataDisplay/RequestDetails.svelte';

	export let loan: any = {};
	function modalComponentImage(loan: any): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'card',
			meta: loan
		};
		modalStore.trigger(modal);
	}
	console.log(loan);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card p-6 variant-ghost-tertiary flex flex-col justify-between gap-4 relative cursor-pointer hoverShadow"
	on:click={() => modalComponentImage(loan)}
>
	<div class="flex flex-col gap-2">
		{#if loan?.nftType}
			<!-- {#if loan.items[0].nfts.length > 0} -->
			<div class="flexRowCenter pt-2">
				<p class="font-bold">Non Fungible Tokens</p>
			</div>
			<div class="gridDisplay2 gap-2">
				<!-- {#each loan.items[0].nfts as nft} -->
				<NftCard nft={loan.nftType} />
				<!-- {/each} -->
			</div>
		{/if}

		<!-- {#if loan.items[1].fts.length > 0}
			<div class="flexRowCenter pt-2">
				<p class="font-bold">Fungible Tokens</p>
			</div>
			<div class="gridDisplay2 gap-2">
				{#each loan.items[1].fts as ft}
					<FtCard {ft} />
				{/each}
			</div>
		{/if} -->
	</div>

	<div class="flexColumnCenter pt-3">
		{#if loan.offer === null}
			<LoanDetails {loan} />
		{:else if loan.type === 'request'}
			<RequestDetails {loan} />
		{/if}
	</div>
</div>
