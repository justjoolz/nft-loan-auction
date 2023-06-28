<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	function modalComponentImage(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'card',
			image: 'https://i.imgur.com/WOgTG96.gif',
			meta: { source: 'Silly Symphonies - The Skeleton Dance' }
		};
		modalStore.trigger(modal);
	}

	const loans = [
		{
			id: 1,
			content: 'Loan 1'
		},
		{
			id: 2,
			content: 'Loan 2'
		}
	];
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="text-4xl font-bold">Welcome to Basket</h1>
		<p class="text-lg">
			Basket is a collection of NFT Vaults for keeping all of your collectibles in one location!
		</p>
		<a href="/"><button class="btn variant-filled-primary">Search Collection</button></a>
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{#each loans as loan}
				<div class="card p-4 variant-ghost-tertiary flex flex-col gap-2 relative">
					<button
						on:click={modalComponentImage}
						class="btn-icon btn-icon-sm variant-filled-error absolute -top-1.5 -right-1.5">X</button
					>
					<div>{loan.content}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
