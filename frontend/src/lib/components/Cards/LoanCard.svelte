<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import NftCard from './NFTCard.svelte';
	import FtCard from './FTCard.svelte';
	import { currentUser } from '@onflow/fcl';
	import CardDetails from '../DataDisplay/CardDetails.svelte';
	import { getAllLoanAuctionMeta } from '$lib/flow/actions';

	export let loan: any = {};

	function modalComponentImage(loan: any): void {
		const modal: ModalSettings = {
			type: 'component',
			component: loan.debt > 0 ? 'active-loan' : 'loan-request',
			meta: loan
		};
		getAllLoanAuctionMeta();
		modalStore.trigger(modal);
	}

	let isOwner = false;
	$: isOwner = loan.ownersAddress === $currentUser?.addr;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card p-6 variant-ghost-tertiary flex flex-col justify-between gap-4 relative cursor-pointer hoverShadow"
	on:click={() => modalComponentImage(loan)}
>
	<div class="flex flex-col gap-2 w-full">
		Owner: {isOwner ? 'You' : loan.ownersAddress}
		{#if loan?.nftType}
			<!-- {#if loan.items[0].nfts.length > 0} -->
			<div class="flexRowCenter py-2">
				<p class="font-bold text-lg">Non Fungible Token (Collateral)</p>
			</div>
			<div class="flex gap-6 pb-4">
				<div class="w-full">
					<!-- {#each loan.items[0].nfts as nft} -->
					<NftCard nft={loan.nftType} />
					<!-- {/each} -->
				</div>
			</div>
		{/if}

		{#if loan.offer}
			<div class="flex justify-between w-full">
				<div class="text-lg w-1/2">
					<p>Current Offer:</p>
					<p>{loan.offer} FLOW</p>
				</div>
				<CardDetails {loan} />
			</div>
		{/if}
		<!-- <div>
			{#if loan.offer}
				Current Offer: ${loan?.offer ?? '--'} FLOW
				{#if isOwner}
					<p>Borrow Funds</p>
				{:else}
					<p class="font-bold">You are not the owner of this loan</p>
				{/if}
			{/if}
		</div> -->
	</div>

	<!-- {#if fts.length > 0}
			<div class="flexRowCenter pt-2">
				<p class="font-bold">Fungible Tokens</p>
			</div>
			<div class="gridDisplay2 gap-2 pb-4">
				{#each loan.items[1].fts as ft}
					<FtCard {ft} />
				{/each}
			</div>

		{/if} -->
</div>
