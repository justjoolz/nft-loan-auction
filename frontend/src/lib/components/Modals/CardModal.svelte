<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { lendFunds } from '../../flow/actions';
	import { usersNFTs } from '$lib/flow/stores';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
	const cImage = 'max-w-[90%] max-h-[90%] rounded-container-token overflow-hidden shadow-xl';

	let amount = 0;	
</script>

{#if $modalStore[0]}
	<!-- Button -->
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>×</button>
	<!-- Image -->
	<!-- <p>{$modalStore[0].meta.content}</p> -->
	<p>Enter the amount of tokens you want to lend</p>
	<input type="number" class="input mb-4" placeholder="Amount" bind:value={amount} />

	<button>Lend Funds</button>
{/if}
