export const GetBalance = `
import Token from 0x01;

pub fun main()
{
    let acc1 = getAccount(0x01);
    let acc2 = getAccount(0x05);

    let acc1RecieverRef = acc1.getCapability(/public/TokenPath).borrow<&Token.Vault{Token.Balance}>() ?? panic("Couldn't Borrow!");
    let acc2RecieverRef = acc2.getCapability(/public/TokenPath).borrow<&Token.Vault{Token.Balance}>() ?? panic("Couldn't Borrow!");

    log("Account 1 Balance:");
    log(acc1RecieverRef.balance);
    log("Account 2 Balance:");
    log(acc2RecieverRef.balance);
}
`;