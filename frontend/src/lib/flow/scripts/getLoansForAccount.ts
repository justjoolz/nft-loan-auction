export const GET_LOANS_FOR_ACCOUNT = `
import "NonFungibleToken" 
import "NFTLoanAuction"

pub fun main(address: Address) : [UInt64] {
    let account = getAccount(address)
    let cap = account.getCapability(NFTLoanAuction.getLoanManagerPublicPath())
    let ref = cap.borrow<&NFTLoanAuction.LoanManager>()!
    
    return ref.loans.keys
}
`