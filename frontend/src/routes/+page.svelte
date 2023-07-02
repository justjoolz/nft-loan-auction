<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { loans } from '$lib/utils/loanData';
	import { requests } from '$lib/utils/requestData';
	import Hero from '$lib/components/Hero.svelte';
	import CardDisplay from '$lib/components/Cards/CardDisplay.svelte';
</script>

<div class="h-full mx-auto flex justify-center items-center">
	<div class="w-full">
		<Hero />
		<CardDisplay title={'Active Loans'} {loans} />
		<CardDisplay title={'Loan Requests'} loans={requests} />
	</div>
</div>
