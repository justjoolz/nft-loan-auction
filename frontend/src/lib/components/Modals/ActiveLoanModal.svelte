<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	import LoanDetails from '../DataDisplay/LoanDetails.svelte';
	import RequestDetails from '../DataDisplay/RequestDetails.svelte';
	import NftCard from '../Cards/NFTCard.svelte';
	import FtCard from '../Cards/FTCard.svelte';
	import OffersCard from '../Cards/OffersCard.svelte';
	import { borrowFunds, cancelAuction, repayFunds } from '$lib/flow/actions';

	export let parent: any;
	export let loan: any = $modalStore[0].meta;
	let amount: number;
	let interest: number;
	let borrowAmount: number;
	let payBackAmount: number;
	let existingOffers: any[] = [
		{
			amount: 100,
			interest: 10,
			duration: 10
		}
	];
	let isOwned: boolean = true;
	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';

	const handleBorrowFundsClick = () => {
		if (!borrowAmount || borrowAmount > loan.offer) {
			alert('Please enter a valid amount to borrow!');
			return;
		}
		console.log('borrowing funds yeah!');
		borrowFunds(loan.id, borrowAmount.toString());
	};

	const handlePaybackFundsClick = () => {
		if (!payBackAmount || payBackAmount > loan.debt) {
			alert('Please enter a valid amount to pay back!');
			return;
		}
		console.log('paying back funds yeah!');

		// HARDCODED CURRENCY
		const ftName = 'FlowToken';
		const ftAddress = '0x7e60df042a9c0868';
		const ftStoragePath = '/storage/flowTokenVault';

		repayFunds(loan.id, payBackAmount.toString(), ftName, ftAddress, ftStoragePath);
	};

	const handleCancelLoanAuctionClick = () => {
		console.log('canceling loan auction yeah!');
		cancelAuction(loan.id);
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
		<div class="flex flex-col gap-2 bg-tertiary-700 p-6 pt-3 rounded-md">
			<div class="flexRowCenter">
				<p class="font-bold">Non Fungible Tokens</p>
			</div>
			<div class="gridDisplay gap-2">
				<!-- {#each loan.items[0].nfts as nft} -->
				<!-- <NftCard {loan} /> -->
				<!-- {/each} -->
			</div>
		</div>
		<!-- {/if} -->

		<div class="flexColumnCenter gap-2">
			<!-- {#if loan.items[1].fts.length > 0} -->
			<div class="w-full bg-tertiary-700 p-6 pt-3 rounded-md mb-3">
				<div class="flexRowCenter pt-2">
					<p class="font-bold">Fungible Tokens</p>
				</div>
				<div class="gridDisplay gap-2 pb-4">
					<!-- {#each loan.items[1].fts as ft} -->
					<!-- <FtCard {ft} /> -->
					<!-- {/each} -->
				</div>
			</div>
			<!-- {/if} -->
			<div class="py-6">
				{#if loan.type === 'active'}
					<LoanDetails {loan} />
				{:else if loan.type === 'request'}
					<RequestDetails {loan} />
				{/if}
			</div>
			{#if isOwned}
				<div class="flex w-full gap-8">
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
				{#if existingOffers.length > 0}
					<div class="flexRowCenter w-full gap-8 mt-8">
						<div class="w-full shadow-lg bg-tertiary-700 p-6 pt-3 rounded-md mb-3">
							<div class="flexRowCenter pt-2">
								<p class="font-bold">Offers for this loan request</p>
							</div>
							<div class="gridDisplay gap-2 pb-4">
								{#each existingOffers as offer}
									<OffersCard {offer} />
								{/each}
							</div>
						</div>
					</div>
				{/if}
			{:else}
				<div class="flex w-full gap-8">
					<div class="flex flex-col w-full">
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
					<div class="flex flex-col w-full">
						<label for="interestPercentage" class="font-bold pb-2">Interest %</label>
						<input
							type="number"
							id="interestPercentage"
							class=" input w-full"
							placeholder="Interest %"
							bind:value={interest}
							tabindex="0"
						/>
					</div>
				</div>
				<div class="pt-4">
					<button class="btn variant-filled-primary font-bold">Make An Offer</button>
				</div>
			{/if}
			<div class="flex relative w-full py-4">
				<h2 class="h4 border-b-2 border-primary-800">Ledger:</h2>
				{#each loan.ledger as ledger}
					<div class="flex flex-col w-full">
						<div class="flex flex-row justify-between">
							<p class="font-bold">{JSON.stringify(ledger)}</p>
							<!-- <p class="font-bold">{ledger.lastCalculatedTimestamp}</p> -->
						</div>
						<div class="flex flex-row justify-between">
							<!-- <p class="font-bold">{ledger.timestamp}</p> -->
							<!-- <p class="font-bold">{ledger.status}</p> -->
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div>
			{#if !loan.startTime}
				<button on:click={handleCancelLoanAuctionClick}> Cancel the loan! </button>
			{/if}
		</div>
	</div>
{/if}
