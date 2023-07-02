export const SetupAccount = `
import Token from 0x01;

transaction(addr: Address)
{
  prepare(accAddress: AuthAccount)
  {
    let vaultA <- Token.createEmptyVault();
    accAddress.save<@Token.Vault>(<-vaultA, to: /storage/TokenPath);
    log("Empty Vault Created!");

    let RecieverRef = accAddress.link<&Token.Vault{Token.Reciever, Token.Balance}>(/public/TokenPath, target: /storage/TokenPath);
  }

  post
  {
    getAccount(addr).getCapability<&Token.Vault{Token.Reciever}>(/public/TokenPath).check() : "Vault Reciever Reference was not created correctly";
  }
}
`;