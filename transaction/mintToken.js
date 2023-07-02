export const MintToken = `
import Token from 0x01;

transaction(addr: Address)
{
    let mintingRef: &Token.VaultMinter;
    var reciever: Capability<&Token.Vault{Token.Reciever}>;

  prepare(accAddress: AuthAccount)
  {
    self.mintingRef = accAddress.borrow<&Token.VaultMinter>(from: /storage/TokenMintPath) ?? panic("Couldn't borrow reference");
    let recipient = getAccount(addr);

    self.reciever = recipient.getCapability<&Token.Vault{Token.Reciever}>(/public/TokenPath);
  }

  execute
  {
    self.mintingRef.mintToken(amount: 30.0, recipient: self.reciever);
  }
}
`;