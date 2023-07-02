<script lang="ts">
	export let ft: any;
</script>

<div class="flexRowCenter card p-4 gap-x-3">
	<img src={ft.imgSrc} alt="" class="w-12" />
	<div class="flexColumnCenter gap-y-1">
		<p class="text-xs text-left w-full font-bold uppercase">{ft.name}</p>
		<p class="text-xs text-left w-full">{ft.qty}</p>
	</div>
</div>
