import test from '$lib/assets/nft1.jpg';
import flow from '$lib/assets/flow.png';
import usdc from '$lib/assets/usdc.png';

export const loans = [
	{
		id: 1,
		type: 'active',
		content: 'Loan 1',
		items: [
			{
				nfts: [
					{
						id: 1,
						imgSrc: test,
						collection: 'Bored Apes',
						name: 'Bored Apes #100',
						serial: '100',
						maxSerial: '1000'
					},
					{
						id: 2,
						imgSrc: test,
						collection: 'Bored Apes',
						name: 'Bored Apes #150',
						serial: '150',
						maxSerial: '1000'
					},
					{
						id: 3,
						imgSrc: test,
						collection: 'Bored Apes',
						name: 'Bored Apes #200',
						serial: '200',
						maxSerial: '1000'
					}
				]
			},
			{
				fts: [
					{
						id: 3,
						imgSrc: flow,
						name: 'FLOWtoken',
						qty: 200
					}
				]
			}
		],
		loanAmount: 100000,
		loanDuration: 30,
		loanInterest: 10,
		borrowedAmount: 10050,
		outstandingAmount: 11000,
		loanDate: '2023-07-01',
		loanOwner: '0x1234567890',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: [
			{
				id: 1,
				bidAmount: 1050,
				bidInterest: 9,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0x12333445566',
				bidDate: '2023-07-11'
			},
			{
				id: 2,
				bidAmount: 200,
				bidDuration: 30,
				bidInterest: 10,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0x1234567890',
				bidDate: '2023-07-12'
			}
		]
	},
	{
		id: 2,
		type: 'active',
		content: 'Loan 2',
		items: [
			{
				nfts: [
					{
						id: 1,
						imgSrc: test,
						collection: 'Goated Goats',
						name: 'Goat #100',
						serial: '1500',
						maxSerial: '10000'
					}
				]
			},
			{
				fts: [
					{
						id: 3,
						imgSrc: flow,
						name: 'FLOWtoken',
						qty: 400
					}
				]
			}
		],
		loanAmount: 500,
		loanDuration: 60,
		loanInterest: 10,
		borrowedAmount: 100,
		outstandingAmount: 112,
		loanDate: '2023-06-10',
		loanOwner: '0x1234567890',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: []
	},
	{
		id: 3,
		type: 'active',
		content: 'Loan 3',
		items: [
			{
				nfts: [
					{
						id: 1,
						imgSrc: test,
						collection: 'Bored Apes',
						name: 'Bored Apes #100',
						serial: '100',
						maxSerial: '1000'
					}
				]
			},
			{
				fts: []
			}
		],
		loanAmount: 10000,
		loanDuration: 90,
		loanInterest: 10,
		borrowedAmount: 10000,
		outstandingAmount: 11200,
		loanDate: '2023-06-20',
		loanOwner: '0x1234567890',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: []
	},
	// create 4 more loans
	{
		id: 4,
		type: 'active',
		content: 'Loan 4',
		items: [
			{
				nfts: [
					{
						id: 2,
						imgSrc: test,
						collection: 'CryptoPunks',
						name: 'CryptoPunk #500',
						serial: '500',
						maxSerial: '10000'
					},
					{
						id: 3,
						imgSrc: test,
						collection: 'Art Blocks',
						name: 'Art Blocks #123',
						serial: '123',
						maxSerial: '500'
					}
				]
			},
			{
				fts: [
					{
						id: 1,
						imgSrc: flow,
						name: 'FLOWToken',
						qty: 500
					}
				]
			}
		],
		loanAmount: 5000,
		loanDuration: 60,
		loanInterest: 8,
		borrowedAmount: 5000,
		outstandingAmount: 5400,
		loanDate: '2023-06-25',
		loanOwner: '0x0987654321',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: []
	},
	{
		id: 5,
		type: 'active',
		content: 'Loan 5',
		items: [
			{
				nfts: [
					{
						id: 4,
						imgSrc: test,
						collection: 'Mutant Ape Yacht Club',
						name: 'Mutant Ape #1234',
						serial: '1234',
						maxSerial: '5000'
					},
					{
						id: 5,
						imgSrc: test,
						collection: 'World of Women',
						name: 'World of Women #789',
						serial: '789',
						maxSerial: '1000'
					}
				]
			},
			{
				fts: []
			}
		],
		loanAmount: 15000,
		loanDuration: 180,
		loanInterest: 12,
		borrowedAmount: 15000,
		outstandingAmount: 16800,
		loanDate: '2023-06-30',
		loanOwner: '0xabcdef1234',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: []
	},
	{
		id: 6,
		type: 'active',
		content: 'Loan 6',
		items: [
			{
				nfts: [
					{
						id: 6,
						imgSrc: test,
						collection: 'Punk Rockers',
						name: 'Punk Rocker #987',
						serial: '987',
						maxSerial: '10000'
					}
				]
			},
			{
				fts: []
			}
		],
		loanAmount: 8000,
		loanDuration: 120,
		loanInterest: 9,
		borrowedAmount: 8000,
		outstandingAmount: 8640,
		loanDate: '2023-06-18',
		loanOwner: '0x654321abcdef',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: []
	},
	{
		id: 7,
		type: 'active',
		content: 'Loan 7',
		items: [
			{
				nfts: [
					{
						id: 7,
						imgSrc: test,
						collection: 'Meebits',
						name: 'Meebit #456',
						serial: '456',
						maxSerial: '5000'
					},
					{
						id: 8,
						imgSrc: test,
						collection: 'Pudgy Penguins',
						name: 'Pudgy Penguin #789',
						serial: '789',
						maxSerial: '1000'
					},
					{
						id: 9,
						imgSrc: test,
						collection: 'Cool Cats',
						name: 'Cool Cat #234',
						serial: '234',
						maxSerial: '500'
					}
				]
			},
			{
				fts: [
					{
						id: 4,
						imgSrc: usdc,
						name: 'usdc',
						qty: 10000
					}
				]
			}
		],
		loanAmount: 20000,
		loanDuration: 240,
		loanInterest: 15,
		borrowedAmount: 20000,
		outstandingAmount: 23000,
		loanDate: '2023-07-01',
		loanOwner: '0xdeadbeef7890',
		loanType: 'Fixed',
		loanStatus: 'Open',
		loanBids: []
	}
];
