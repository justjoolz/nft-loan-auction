<script lang="ts">
	import ItemCard from './ItemCard.svelte';

	export let nfts: NFTCatalogEntry[][];
	export let pageTitle: string;
</script>

<div class="flex flex-col px-10 w-full lg:w-1/2">
	<div class="w-full flex items-center gap-x-3">
		<p class="text-3xl font-b7">{pageTitle}</p>
	</div>
	<div class="relative">
		<div class="w-full py-8 lg:py-6 flex flex-col gap-y-4">
			{#each nfts as nftCollection}
				{#if nftCollection[0]?.collectionName !== undefined}
					<div>
						<p class="h3 font-bold">{nftCollection[0]?.collectionName}</p>
						<div class="gridDisplay py-4 gap-3">
							{#each nftCollection as nft}
								<ItemCard {nft} />
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
