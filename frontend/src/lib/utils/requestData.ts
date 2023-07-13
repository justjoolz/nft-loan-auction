import test from '$lib/assets/nft1.jpg';
import flow from '$lib/assets/flow.png';
import fusd from '$lib/assets/fusd.png';
import usdc from '$lib/assets/usdc.png';

export const requests = [
	{
		id: 1,
		type: 'request',
		content: 'Request 1',
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
						name: 'FLOW',
						qty: 200
					}
				]
			}
		],
		minimumLoanAmount: 1000,
		minimumLoanDuration: 30,
		requestDate: '2023-07-01',
		requestOwner: '0x1234567890',
		requestStatus: 'Open',
		requestBids: [
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
		type: 'request',
		content: 'Request 2',
		items: [
			{
				nfts: [
					{
						id: 4,
						imgSrc: test,
						collection: 'CryptoKitties',
						name: 'CryptoKitty #500',
						serial: '500',
						maxSerial: '1000'
					},
					{
						id: 5,
						imgSrc: test,
						collection: 'CryptoPunks',
						name: 'CryptoPunk #250',
						serial: '250',
						maxSerial: '500'
					}
				]
			},
			{
				fts: [
					{
						id: 2,
						imgSrc: fusd,
						name: 'FUSD',
						qty: 2000
					},
					{
						id: 4,
						imgSrc: usdc,
						name: 'USDC',
						qty: 1000
					}
				]
			}
		],
		minimumLoanAmount: 5000,
		minimumLoanDuration: 60,
		requestDate: '2023-07-02',
		requestOwner: '0xabcdef1234',
		requestStatus: 'Open',
		requestBids: [
			{
				id: 3,
				bidAmount: 5200,
				bidInterest: 8,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0x0987654321',
				bidDate: '2023-07-15'
			}
		]
	},
	{
		id: 3,
		type: 'request',
		content: 'Request 3',
		items: [
			{
				nfts: [
					{
						id: 6,
						imgSrc: test,
						collection: 'Art Blocks',
						name: 'Art Blocks #567',
						serial: '567',
						maxSerial: '1000'
					},
					{
						id: 7,
						imgSrc: test,
						collection: 'Mutant Ape Yacht Club',
						name: 'Mutant Ape #123',
						serial: '123',
						maxSerial: '500'
					},
					{
						id: 8,
						imgSrc: test,
						collection: 'Bored Apes',
						name: 'Bored Apes #789',
						serial: '789',
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
						qty: 500
					}
				]
			}
		],
		minimumLoanAmount: 3000,
		minimumLoanDuration: 90,
		requestDate: '2023-07-03',
		requestOwner: '0x1234567890',
		requestStatus: 'Open',
		requestBids: []
	},
	{
		id: 4,
		type: 'request',
		content: 'Request 4',
		items: [
			{
				nfts: [
					{
						id: 9,
						imgSrc: test,
						collection: 'Pudgy Penguins',
						name: 'Pudgy Penguin #456',
						serial: '456',
						maxSerial: '1000'
					}
				]
			},
			{
				fts: []
			}
		],
		minimumLoanAmount: 2000,
		minimumLoanDuration: 45,
		requestDate: '2023-07-05',
		requestOwner: '0x0987654321',
		requestStatus: 'Open',
		requestBids: []
	},
	{
		id: 5,
		type: 'request',
		content: 'Request 5',
		items: [
			{
				nfts: [
					{
						id: 10,
						imgSrc: test,
						collection: 'Cool Cats',
						name: 'Cool Cat #123',
						serial: '123',
						maxSerial: '500'
					},
					{
						id: 11,
						imgSrc: test,
						collection: 'World of Women',
						name: 'World of Women #456',
						serial: '456',
						maxSerial: '1000'
					}
				]
			},
			{
				fts: []
			}
		],
		minimumLoanAmount: 10000,
		minimumLoanDuration: 180,
		requestDate: '2023-07-07',
		requestOwner: '0xabcdef1234',
		requestStatus: 'Open',
		requestBids: [
			{
				id: 4,
				bidAmount: 11000,
				bidInterest: 10,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0x12333445566',
				bidDate: '2023-07-18'
			},
			{
				id: 5,
				bidAmount: 12000,
				bidInterest: 12,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0x1234567890',
				bidDate: '2023-07-20'
			}
		]
	},
	{
		id: 6,
		type: 'request',
		content: 'Request 6',
		items: [
			{
				nfts: [
					{
						id: 12,
						imgSrc: test,
						collection: 'Punk Rockers',
						name: 'Punk Rocker #789',
						serial: '789',
						maxSerial: '1000'
					}
				]
			},
			{
				fts: []
			}
		],
		minimumLoanAmount: 500,
		minimumLoanDuration: 30,
		requestDate: '2023-07-09',
		requestOwner: '0x654321abcdef',
		requestStatus: 'Open',
		requestBids: [
			{
				id: 6,
				bidAmount: 550,
				bidInterest: 9,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0x0987654321',
				bidDate: '2023-07-22'
			},
			{
				id: 7,
				bidAmount: 600,
				bidInterest: 8,
				bidType: 'Fixed',
				bidStatus: 'Open',
				bidder: '0xabcdef1234',
				bidDate: '2023-07-25'
			}
		]
	},
	{
		id: 7,
		type: 'request',
		content: 'Request 7',
		items: [
			{
				nfts: []
			},
			{
				fts: [
					{
						id: 3,
						imgSrc: flow,
						name: 'FLOWtoken',
						qty: 2000
					}
				]
			}
		],
		minimumLoanAmount: 8000,
		minimumLoanDuration: 120,
		requestDate: '2023-07-11',
		requestOwner: '0x12333445566',
		requestStatus: 'Open',
		requestBids: []
	}
];
