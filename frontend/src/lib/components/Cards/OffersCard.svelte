<script lang="ts">
	export let offer: any;
</script>

<div class="flex card p-4 justify-center gap-x-10">
	<div class="flexColumnCenter gap-y-1">
		<p class="text-xs text-left w-full font-bold uppercase">Amount: ${offer.offer ?? '--'}</p>
		<p class="text-xs text-left w-full">Interest {offer.interest}%</p>
		<p class="text-xs text-left w-full">Duration: {offer.duration} days</p>
	</div>
	<div class="flex items-center">
		<!-- <button class="btn variant-filled-primary font-bold">Accept this Offer</button> -->
	</div>
</div>
