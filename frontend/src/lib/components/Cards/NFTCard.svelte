<script lang="ts">
	export let nft: any;
</script>

<div class="flexRowCenter card p-4 gap-x-3">
	<img src={nft.imgSrc} alt="" class="w-14" />
	<div class="flexColumnCenter gap-y-1">
		<p class="text-xs text-left w-full">{nft.collection}</p>
		<p class="text-xs text-left w-full">{nft.name}</p>
		<p class="text-xs text-left w-full">#{nft.serial}/{nft.maxSerial}</p>
	</div>
</div>
