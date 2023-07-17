<script lang="ts">
	import ItemDisplay from './ItemDisplay.svelte';
	import { dictionaryToArray, usersNFTs } from '$lib/flow/stores';
	export let pageTitle: string;

	let walletNFTs: NFTCatalogEntry[][];
	$: walletNFTs = dictionaryToArray($usersNFTs);
</script>

<ItemDisplay nfts={walletNFTs} {pageTitle} />
