<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
</script>

{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>×</button>
	<div class="card flexRowCenter p-40">
		<button class="btn variant-filled-primary font-bold">Create New Loan Request</button>
	</div>
{/if}
