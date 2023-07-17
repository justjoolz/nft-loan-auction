<script lang="ts">
	import topFolder from '$lib/assets/top-folder.png';
	import ItemCard from './ItemCard.svelte';

	export let nfts: NFTCatalogEntry[][];
	export let imgSrc: string;
	export let pageTitle: string;

	let folder = true;
	function updateFolder() {
		folder = !folder;
	}

	console.log(nfts, 'nfts');
</script>

<div class="flex flex-col lg:h-full pb-14 px-10 w-full lg:w-1/2">
	<div class="w-full flex items-center gap-x-3 pb-6">
		<img src={imgSrc} alt="" class="w-8 pb-1" />
		<p class="text-3xl font-b7">{pageTitle}</p>
	</div>
	<div class="border-l-2 border-b-2 border-primary-500 relative mt-4">
		<img
			src={topFolder}
			alt=""
			class="w-full absolute top-[-6px] sm:top-[-8px] md:top-[-12px] lg:top-[-7px] xl:top-[-12px]"
		/>
		<div
			class="absolute top-[-10px] sm:top-[-10px] md:top-[-13px] lg:top-[-12px] xl:top-[-15px] left-[10%] w-[22%] py-2"
		/>
		<div
			class="w-full py-8 lg:py-6 flex flex-col gap-y-4 border-r-2 border-primary-500 mt-[4%] sm:mt-[24px] md:mt-[32px] lg:mt-[20px] xl:mt-[29px] lg:min-h-[100vh]"
		>
			{#each nfts as nftCollection}
				{#if nftCollection[0]?.collectionName !== undefined}
					<div>
						<p class="h3 font-bold px-4">{nftCollection[0]?.collectionName}</p>
						<div class="gridDisplay p-4">
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
