pub contract Token 
{
    pub var totalSupply: UFix64;

    pub resource interface Provider 
    {
        pub fun withdraw(amount: UFix64): @Vault
        {
            post
            {
                result.balance == UFix64(amount) : "Withdraw amount must be same as balance"; 
            }
        }
    }

    pub resource interface Reciever 
    {
        pub fun deposit(from: @Vault)
        {
            pre
            {
                from.balance > 0.0 : "Deposit balance must be positive!";
            }
        }
    }

    pub resource interface Balance 
    {
        pub var balance: UFix64;
    }

    pub resource Vault: Provider, Reciever, Balance 
    {
        pub var balance: UFix64;

        init(balance: UFix64)
        {
            self.balance = balance;
        }

        pub fun withdraw(amount: UFix64): @Vault
        {
            self.balance = self.balance - amount;
            return <- create Vault(balance: amount);
        }

        pub fun deposit(from: @Vault)
        {
            self.balance = self.balance + from.balance;
            destroy from;
        }
    }

    pub resource VaultMinter 
    {
        pub fun mintToken(amount: UFix64, recipient: Capability<&AnyResource{Reciever}>)
        {
            let recipientRef = recipient.borrow() ?? panic("Couldn't Borrow!");
            Token.totalSupply = Token.totalSupply + amount;

            recipientRef.deposit(from: <- create Vault(balance: amount));    
        }    
    }

    pub fun createEmptyVault(): @Vault
    {
        return <- create Vault(balance: 0.0);
    }

    init()
    {
        self.totalSupply = 50.0;
        self.account.save(<-create Vault(balance: self.totalSupply), to: /storage/TokenPath);

        self.account.save(<- create VaultMinter(), to: /storage/TokenMintPath);
        self.account.link<&VaultMinter>(/private/Minter, target: /storage/TokenMintPath);
    }
}