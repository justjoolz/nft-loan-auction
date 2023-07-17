<script lang="ts">
	export let offer: any;
</script>

<div class="flex card p-4 justify-center gap-x-10 w-1/2">
	<div class="flexColumnCenter gap-y-1 w-full">
		<div class="flex gap-x-2 w-full justify-center items-center">
			<p class="text-xs text-left font-bold uppercase">Amount:</p>
			<p class="text-xs text-left font-bold uppercase">${offer.amount ?? '--'}</p>
		</div>
		<div class="flex w-full justify-center items-center">
			<p class="text-xs text-left">Interest: {offer.interest}%</p>
			<p class="text-xs text-left">Duration: {offer.duration} days</p>
		</div>
	</div>
	<div class="flex items-center">
		<!-- <button class="btn variant-filled-primary font-bold">Accept this Offer</button> -->
	</div>
</div>
