<script lang="ts">
	import {
		modalStore,
		type ModalSettings,
		type ToastSettings,
		toastStore
	} from '@skeletonlabs/skeleton';

	import RequestDetails from '../DataDisplay/RequestDetails.svelte';
	import OffersCard from '../Cards/OffersCard.svelte';
	import { lendFunds, borrowFunds, cancelAuction, getAllLoanAuctionMeta } from '$lib/flow/actions';
	import NftCard from '../Cards/NFTCard.svelte';
	import { user, toastMessage } from '$lib/flow/stores';
	import { onMount } from 'svelte';

	export let parent: any;
	export let loan = $modalStore[0].meta;
	// let currentOffer: number = loan.offer;
	let interest: number = loan.yield;

	let amount: number = loan.offer * 1.1; // input
	const t: ToastSettings = {
		message: $toastMessage
	};

	let isUserOwner = false;
	$: isUserOwner = loan.ownersAddress === $user?.addr;
	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';

	const onComplete = () => {
		getAllLoanAuctionMeta();
		toastStore.trigger(t);
		parent.onClose();
	};

	// CURRENTLY USING HARDCODED VALUES FOR TESTING
	const ftContractName = 'FlowToken';
	const ftContractAddress = '0x7e60df042a9c0868';
	const ftVaultStoragePath = '/storage/flowTokenVault';
	const collectionPublicPath = '/public/' + loan.nftReceiverCap.path.value.identifier; // $selectedCollateralNFT.publicPath.identifier; // '/public/BasketCollection';
	const ftReceiverPublicPath = '/public/flowTokenReceiver';

	let nft: any;
	let borrowAmount = 0;

	$: console.log(loan);
	$: nft = loan.nftType;
	$: console.log({ amount, loan });

	const handleOfferFundsClick = () => {
		if (amount <= 0) {
			alert('Please enter a valid amount to lend!');
			return;
		}
		toastMessage.set('Funds lent successfully');

		lendFunds(
			loan.id,
			amount,
			ftContractName,
			ftContractAddress,
			ftVaultStoragePath,
			collectionPublicPath,
			ftReceiverPublicPath,
			onComplete
		);
	};

	const handleBorrowundsClick = () => {
		toastMessage.set('Funds borrowed successfully');
		borrowFunds(loan.id, amountToBorrow.toString(), onComplete);
	};

	let amountToBorrow: number = loan.offer;

	const handleCancelLoanAuctionClick = () => {
		toastMessage.set('Loan auction cancelled successfully');
		console.log({ toastMessage });

		cancelAuction(loan.id, onComplete);
	};
	console.log({ loan });

	const handleBorrowFundsClick = () => {
		if (borrowAmount > loan.offer || borrowAmount <= 0) {
			alert('Please enter a valid amount to borrow!');
			return;
		}
		toastMessage.set('Funds borrowed successfully');
		borrowFunds(loan.id, borrowAmount.toString(), onComplete);
	};

	onMount(() => {
		getAllLoanAuctionMeta();
	});	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>X</button>
	<div class="card p-6 md:p-10 variant-filled-tertiary min-w-[90%] md:min-w-4/5 min-h-[90%] md:min-h-4/5 flex flex-col justify-center gap-4"
	>
		<div class="flexRowCenter relative w-full mb-2">
			<h2 class="h2 font-bold border-b-2 border-primary-800">Loan Request Details</h2>
		</div>
		<div class="flex flex-col gap-2 bg-tertiary-700 shadow-lg p-8 pt-4 rounded-md">
			<div class="flexRowCenter">
				<p class="font-bold">Non Fungible Token (Collateral)</p>
			</div>
			<div class="gridDisplay gap-2">
				<NftCard nft={{ type: nft.type, typeID: nft.typeID, kind: nft.kind }} />
			</div>
		</div>

		<div class="flexColumnCenter gap-2">
			<div class="py-6">
				<RequestDetails {loan} />
			</div>
			{#if isUserOwner}
				<div class="flexRowCenter w-full gap-8">
					<div class="w-full shadow-lg bg-tertiary-700 p-8 pt-4 rounded-md mb-3">
						<div class="flexRowCenter py-2">
							<p class="font-bold">Offer for your Loan Request</p>
						</div>
						<div class="py-4">
							{#if loan.offer != null}
								<div class="flex w-full gap-10">
									<OffersCard
										offer={{
											amount: loan.offer,
											interest: loan.yield * 100,
											duration: loan.duration / (60 * 60 * 24)
										}}
									/>
									<div class="flex flex-col gap-4 w-1/2">
										<input
											type="number"
											id="loanAmount"
											class="input w-full"
											placeholder="Amount"
											bind:value={borrowAmount}
											tabindex="0"
										/>
										<button
											class="btn variant-filled-primary font-bold"
											on:click={handleBorrowFundsClick}
										>
											Borrow Funds
										</button>
									</div>
								</div>
							{:else}
								<p class="w-full text-center">Your loan currently has no offer!</p>
							{/if}
						</div>
					</div>
				</div>
			{/if}
			{#if isUserOwner !== true}
				<div class="flex w-full md:w-1/2 gap-8">
					<div class="flex flex-col w-full">
						<p class="w-full text-center text-lg font-bold">
							Current Offer: {loan?.offer ?? 'None'}
						</p>
						<label for="loanAmount" class="font-bold pb-2">Amount</label>
						<input
							type="number"
							id="loanAmount"
							class="input w-full"
							placeholder="Amount"
							bind:value={amount}
							tabindex="0"
						/>
					</div>
					<!-- <div class="flex flex-col w-full">
						<label for="interestPercentage" class="font-bold pb-2">Interest %</label>
						<input
							type="number"
							id="interestPercentage"
							class=" input w-full"
							placeholder="Interest %"
							bind:value={interest}
							tabindex="0"
						/>
					</div> -->
				</div>
				<div class="pt-4">
					<button class="btn variant-filled-primary font-bold" on:click={handleOfferFundsClick}
						>Make An Offer</button
					>
				</div>
			{/if}
			<div class="mt-4">
				{#if isUserOwner === true}
					<button
						class="btn variant-filled-primary font-bold"
						on:click={handleCancelLoanAuctionClick}
					>
						Cancel the loan
					</button>					
				{/if}
			</div>
		</div>
	</div>
{/if}
