<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	import LoanDetails from '../DataDisplay/LoanDetails.svelte';
	import RequestDetails from '../DataDisplay/RequestDetails.svelte';
	import NftCard from '../Cards/NFTCard.svelte';
	import FtCard from '../Cards/FTCard.svelte';

	export let parent: any;
	export let loan: any = $modalStore[0].meta;
	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>X</button>
	<div
		class="card p-6 md:p-10 variant-filled-tertiary w-[90%] md:w-4/5 h-[90%] md:h-4/5 flex flex-col justify-center gap-4 relative cursor-pointer hoverShadow"
	>
		<div class="flexRowCenter relative w-full">
			<h2 class="h2 font-bold border-b-2 border-primary-800">Loan Request Details</h2>
		</div>
		<div class="flex flex-col gap-2">
			{#if loan.items[0].nfts.length > 0}
				<div class="flexRowCenter pt-2">
					<p class="font-bold">Non Fungible Tokens</p>
				</div>
				<div class="gridDisplay gap-2">
					{#each loan.items[0].nfts as nft}
						<NftCard {nft} />
					{/each}
				</div>
			{/if}
		</div>

		<div class="flexColumnCenter gap-2">
			{#if loan.items[1].fts.length > 0}
				<div class="flexRowCenter pt-2">
					<p class="font-bold">Fungible Tokens</p>
				</div>
				<div class="gridDisplay gap-2 pb-4">
					{#each loan.items[1].fts as ft}
						<FtCard {ft} />
					{/each}
				</div>
			{/if}
			{#if loan.type === 'active'}
				<LoanDetails {loan} />
			{:else if loan.type === 'request'}
				<RequestDetails {loan} />
			{/if}
			<div class="pt-4">
				<button class="btn variant-filled-primary font-bold">Make an offer</button>
			</div>
		</div>
	</div>
{/if}
