export const TransferToken = `
import Token from 0x01;

transaction(addr: Address)
{
    var tempVault: @Token.Vault;

    prepare(accAddress: AuthAccount)
    {
        let vaultRef = accAddress.borrow<&Token.Vault>(from: /storage/TokenPath) ?? panic("Error");
        self.tempVault <- vaultRef.withdraw(amount: 10.0);
    }

    execute
    {
        let recipient = getAccount(addr);
        let recipientRef = recipient.getCapability(/public/TokenPath).borrow<&Token.Vault{Token.Reciever}>() ?? panic("Couldn't Borrow!");

        recipientRef.deposit(from: <- self.tempVault);
        log("Transfer Successful!");
    }

  post
  {
    
  }
}
`;