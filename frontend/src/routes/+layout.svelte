<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Toast,
		drawerStore,
		toastStore,
		type ToastSettings,
		Modal,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import CardModal from '$lib/components/Modals/CardModal.svelte';
	import CreateLoanModal from '$lib/components/Modals/CreateLoanModal.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { CurrentUser } from '@onflow/fcl/types/current-user';
	import { handleUserChange } from '../lib/flow/actions';
	import { setupFCL } from '../lib/flow/config';
	import flowIcon from '$lib/assets/flow-icon.svg';

	import { user, transactionStatus, usersFTs, flowTokenBalance } from '../lib/flow/stores';
	import * as fcl from '@onflow/fcl';

	import ActiveLoanModal from '$lib/components/Modals/ActiveLoanModal.svelte';
	import { logIn, unauthenticate } from '$lib/flow/actions';

	import LoanRequestModal from '$lib/components/Modals/LoanRequestModal.svelte';
	import { browser } from '$app/environment';

	function drawerOpen() {
		drawerStore.open();
	}
	let slug = '';
	let userFlowTokenBalance: number;
	$: userFlowTokenBalance = $flowTokenBalance;

	function updateSlug() {
		const pathParts = window.location.pathname.split('/');
		const slugIndex = 2; // Adjust this value based on the position of the "slug" in the URL

		// Update the slug variable
		slug = pathParts[slugIndex];
	}

	const modalComponentRegistry: Record<string, ModalComponent> = {
		card: {
			ref: CardModal
		},
		createLoan: {
			ref: CreateLoanModal
		},
		'active-loan': {
			ref: ActiveLoanModal
		},
		'loan-request': {
			ref: LoanRequestModal
		}
	};

	let tokens = $usersFTs;
	let txUnsub: Function;
	let userUnsub: Function;

	onMount(() => {
		if (!browser) return;

		setupFCL();

		fcl.currentUser.subscribe((data: CurrentUser) => user.set(data));
		userUnsub = user.subscribe(handleUserChange);
		txUnsub = transactionStatus.subscribe((value) => {
			console.log('transactionStatus changed', { value });
		});
		updateSlug();
		window.addEventListener('popstate', updateSlug);
	});

	onDestroy(() => {
		if (!browser) return;

		window.removeEventListener('popstate', updateSlug);
		if (userUnsub) userUnsub();
		if (txUnsub) txUnsub();
	});
</script>

<Toast position="br" />
<Modal position="items-start" padding="p-8" components={modalComponentRegistry} />
<Drawer position="right" width="w-[300px]" regionDrawer="p-12">
	<Navigation />
	<div class="mt-5 pt-5 border-t-[1px] border-tertiary-400">
		{#if $user.loggedIn}
			<div class="flex items-center gap-2 pl-4 pt-4 pb-2">
				<img src={flowIcon} alt="" class="h-6" />{userFlowTokenBalance}
			</div>
			<button
				class="block text-lg btn hover:variant-ringed-primary font-bold"
				on:click={unauthenticate}>Log Out</button
			>
		{:else}
			<button class="block btn text-lg hover:variant-ringed-primary font-bold" on:click={logIn}
				>Log In
			</button>
		{/if}
	</div>
</Drawer>

<AppShell>
	<svelte:fragment slot="header"
		><AppBar background="bg-surface-500" padding="px-8 py-4">
			<svelte:fragment slot="lead">
				<a href="/"><strong class="sm:text-2xl lg:text-4xl">Loan Auction</strong></a
				></svelte:fragment
			>
			<div class="hidden md:block">
				<Navigation />
			</div>
			<svelte:fragment slot="trail">
				<button class="md:hidden btn btn-sm" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 100" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="40" width="100" height="20" />
							<rect y="80" width="100" height="20" />
						</svg>
					</span>
				</button>
				{#if $user.loggedIn}
					<div class="hidden lg:flex items-center gap-2">
						<img src={flowIcon} alt="" class="h-5 lg:h-6" />{userFlowTokenBalance}
					</div>
					<button
						class="hidden md:block text-lg btn hover:variant-ringed-primary font-bold"
						on:click={unauthenticate}>Log Out</button
					>
				{:else}
					<button
						class="hidden md:block btn text-lg hover:variant-ringed-primary font-bold"
						on:click={logIn}
						>Log In
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="w-full">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<div class="flex flex-col items-center justify-center gap-4">
			<p class="text-sm text-center">
				{$transactionStatus}
			</p>
		</div>
	</svelte:fragment>
	<!-- (pageFooter) -->
</AppShell>
