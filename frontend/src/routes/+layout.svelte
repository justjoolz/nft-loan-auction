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
	import ActiveLoanModal from '$lib/components/Modals/ActiveLoanModal.svelte';
	import LoanRequestModal from '$lib/components/Modals/LoanRequestModal.svelte';	
	import { authenticate } from '@onflow/fcl';
	import { onDestroy, onMount } from 'svelte';
	import type { CurrentUser } from '@onflow/fcl/types/current-user';
	import { handleUserChange } from '../lib/flow/actions';
	import { setupFCL } from '../lib/flow/config';
	// import { setupFCL } from '$lib/flow/config.client'; // in basket lives here

	import { user, transactionStatus } from '../lib/flow/stores';
	import * as fcl from '@onflow/fcl';

	const t: ToastSettings = {
		message: 'menu opened'
	};

	function drawerOpen() {
		drawerStore.open();
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

	let txUnsub: Function;
	let userUnsub: Function;

	onMount(() => {
		setupFCL();
		fcl.currentUser.subscribe((data: CurrentUser) => user.set(data));
		userUnsub = user.subscribe(handleUserChange);
		txUnsub = transactionStatus.subscribe((value) => {
			console.log('transactionStatus changed', { value });
		});
	});

	onDestroy(() => {
		if (userUnsub) userUnsub();
		if (txUnsub) txUnsub();
	});
</script>

<Toast position="br" />
<Modal components={modalComponentRegistry} />
<Drawer>
	<Navigation />
</Drawer>

<AppShell>
	<svelte:fragment slot="header"
		><AppBar background="bg-surface-500" padding="px-8 py-4">
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-4xl">Loan Auction</strong></a></svelte:fragment
			>
			<Navigation />
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
				<div class="flex w-[234px] justify-end" on:click={authenticate}>
					<Avatar initials="JD" background="bg-primary-500" width="w-10" class="hidden md:block" />
				</div></svelte:fragment
			>
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
	<!-- (pageFooter) -->
</AppShell>
