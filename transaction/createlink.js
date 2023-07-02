export const CreateLink = `
import Token from 0x01;

transaction()
{
  prepare(accAddress: AuthAccount)
  {
    let RecieverRef = accAddress.link<&Token.Vault{Token.Reciever, Token.Balance}>(/public/TokenPath, target: /storage/TokenPath);
    log("Public Reciever Reference Created!");
  }

  post
  {
    getAccount(0x01).getCapability<&Token.Vault{Token.Reciever}>(/public/TokenPath).check() : "Vault Reciever Reference was not created correctly";
  }
}
`;