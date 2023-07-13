export const GET_ACCOUNT_STORAGE_DETAILS = `
pub struct Entry {
    pub let path: StoragePath
    pub let type: Type

    init(path: StoragePath, type: Type) {
        self.path = path
        self.type = type
    }
}

pub fun main(address: Address): [Entry] {
    
    let data: [Entry] = [] 
    let account = getAuthAccount(address)
    account.forEachStored(fun (path: StoragePath, type: Type): Bool {
        data.append(Entry(path: path, type: type))
        return true
    })
    return data
}`