<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	import LoanDetails from '../DataDisplay/LoanDetails.svelte';
	import RequestDetails from '../DataDisplay/RequestDetails.svelte';
	import NftCard from '../Cards/NFTCard.svelte';
	import FtCard from '../Cards/FTCard.svelte';
	import OffersCard from '../Cards/OffersCard.svelte';
	import {
		borrowFunds,
		cancelAuction,
		getAllLoanAuctionMeta,
		lendFunds,
		repayFunds
	} from '$lib/flow/actions';
	import { user } from '$lib/flow/stores';
	import formatDate from '$lib/utils/formatDate';

	export let parent: any;
	export let loan: any = $modalStore[0].meta;
	let amount: number;
	let interest: number;
	let borrowAmount: number;
	let payBackAmount: number;

	let isUserOwner = false;
	$: isUserOwner = $user.addr === loan.ownersAddress;
	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';

	const onComplete = () => {
		getAllLoanAuctionMeta();
		parent.onClose();
	};

	const handleBorrowFundsClick = () => {
		if (!borrowAmount || borrowAmount > loan.offer) {
			alert('Please enter a valid amount to borrow!');
			return;
		}

		borrowFunds(loan.id, borrowAmount.toString(), onComplete);
	};

	const handlePaybackFundsClick = () => {
		if (!payBackAmount || payBackAmount > loan.debt) {
			alert('Please enter a valid amount to pay back!');
			return;
		}

		// HARDCODED CURRENCY
		const ftName = 'FlowToken';
		const ftAddress = '0x7e60df042a9c0868';
		const ftStoragePath = '/storage/flowTokenVault';

		repayFunds(loan.id, payBackAmount.toString(), ftName, ftAddress, ftStoragePath, onComplete);
	};

	const handleCancelLoanAuctionClick = () => {
		console.log('canceling loan auction yeah!');
		cancelAuction(loan.id, onComplete);
	};

	const handleOfferFundsClick = () => {
		if (amount <= 0 || amount <= loan.offer) {
			alert('Please enter a valid amount to lend!');
			return;
		}
		const ftContractName = 'FlowToken';
		const ftContractAddress = '0x7e60df042a9c0868';
		const ftVaultStoragePath = '/storage/flowTokenVault';
		const collectionPublicPath = '/public/' + loan.nftReceiverCap.path.value.identifier; // $selectedCollateralNFT.publicPath.identifier; // '/public/BasketCollection';
		const ftReceiverPublicPath = '/public/flowTokenReceiver';

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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>X</button>
	<div
		class="card p-6 md:p-10 variant-filled-tertiary min-w-[90%] md:min-w-4/5 min-h-[90%] md:min-h-4/5 flex flex-col justify-center gap-4"
	>
		<div class="flexRowCenter relative w-full mb-2">
			<h2 class="h2 font-bold border-b-2 border-primary-800">Active Loan Details</h2>
		</div>
		<!-- {#if loan.items[0].nfts.length > 0} -->
		<div class="flex flex-col gap-2 bg-tertiary-700 shadow-lg p-6 pt-3 rounded-md">
			<div class="flexRowCenter">
				<p class="font-bold">Non Fungible Token (Collateral)</p>
			</div>
			<div class="gridDisplay gap-2">
				<NftCard nft={loan.nftType} />
			</div>
		</div>

		<div class="flexColumnCenter gap-2">			
			<div class="py-6">				
					<LoanDetails {loan} />				
			</div>
			{#if isUserOwner}
				<div class="flex w-full gap-8 pb-10">
					<div class="flex flex-col w-full">
						<label for="borrow" class="font-bold pb-2">Borrow USDC</label>
						<input
							type="number"
							id="borrow"
							class="input w-full"
							placeholder="Amount"
							bind:value={borrowAmount}
							tabindex="0"
						/>
						<div class="pt-4">
							<button
								class="btn variant-filled-primary font-bold"
								placeholder="0.0"
								on:click={handleBorrowFundsClick}>Borrow</button
							>
						</div>
					</div>
					<div class="flex flex-col w-full">
						<label for="payBack" class="font-bold pb-2">Pay back USDC</label>
						<input
							type="number"
							id="payBack"
							class=" input w-full"
							placeholder="Amount"
							bind:value={payBackAmount}
							tabindex="0"
						/>
						<div class="pt-4">
							<button
								class="btn variant-filled-primary font-bold"
								on:click={handlePaybackFundsClick}>Pay</button
							>
						</div>
					</div>
				</div>

				<!-- <div class="flexRowCenter w-full gap-8 mt-8">
					<div class="w-full shadow-lg bg-tertiary-700 p-6 pt-3 rounded-md mb-3">
						<div class="flexRowCenter pt-2">
							<p class="font-bold">Offers for this loan request</p>
						</div>
						<div class="gridDisplay gap-2 pb-4">
							<OffersCard
								offer={{
									amount: loan.offer,
									interest: loan.yield * 100,
									duration: loan.duration / (60 * 60 * 24)
								}}
							/>
						</div>
					</div>
				</div> -->
			{:else}
				<div class="flex w-full items-center justify-center gap-8">
					<div class="flex flex-col w-1/2">
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
				{#if !isUserOwner}
					<div class="pt-4">
						<button on:click={handleOfferFundsClick} class="btn variant-filled-primary font-bold"
							>Make An Offer</button
						>
					</div>
				{/if}
			{/if}
			<div class="flex relative flex-col w-full py-4">
				<div>
					<h2 class="h4 border-b-2 border-primary-800 pb-2 mb-4">Ledger:</h2>
				</div>
				<div class="flex flex-col w-full gap-1">
					{#each loan.ledger as ledger}
						<div class="flex gap-10 border-b-[1px] border-tertiary-400 w-full">
							<div class="flex">
								<p class="font-bold pr-2">Timestamp:</p>
								<p>{formatDate(ledger.lastCalculatedTimestamp)}</p>
							</div>
							<div class="flex">
								<p class="font-bold pr-2">Outstanding Debt:</p>
								<p>{ledger.debt}</p>
							</div>
							<div class="flex">
								<p class="font-bold pr-2">Amount Repaid:</p>
								<p>{ledger.repaid}</p>
							</div>
							<div class="flex">
								<p class="font-bold pr-2">Fees:</p>
								<p>{ledger.feesIncurred}</p>
							</div>
							<div class="flex">
								<p class="font-bold pr-2">Interest:</p>
								<p>{ledger.intrestIncurred}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div>
			{#if loan.startTime}
				Ends at: <b
					>{formatDate((parseFloat(loan.startTime) + parseFloat(loan.duration)).toString())}</b
				>
			{:else}
				<button
					class="btn variant-filled-primary font-bold"
					on:click={handleCancelLoanAuctionClick}
				>
					Cancel the loan!
				</button>
			{/if}
		</div>
	</div>
{/if}
