<script lang="ts">
	import type { NftType } from '../../flow/stores';

	export let nft: any;
</script>

<div class="flexRowCenter card p-4 gap-x-3">
	<!-- <img src={nft.imgSrc} alt="" class="w-14" /> -->
	<div class="flexColumnCenter gap-y-1">
		<p class="text-xs text-left w-full">{nft.type}</p>
		<p class="text-xs text-left w-full">{nft.typeID}</p>
		<p class="text-xs text-left w-full">#{nft.kind}</p>
	</div>
</div>
