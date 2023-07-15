const GET_LOANS_FOR_ACOUNT = `
import "NonFungibleToken" 
import "NFTLoanAuction"

pub fun main(address: Address) : [UInt64] {
    let account = getAccount(address)
    let cap = account.getCapability(NFTLoanAuction.LoanManagerPublicPath)
    let ref = cap.borrow<&NFTLoanAuction.LoanManager>()!
    
    return ref.loans.keys
}
`