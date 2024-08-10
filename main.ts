class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    phoneNumber: string;

    constructor(firstName: string, lastName: string, gender: string, age: number, phoneNumber: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }
}


class BankAccount {
    private balance: number = 0;

    constructor(private customer: Customer) {}

    getBalance(): number {
        return this.balance;
    }

    debit(amount: number): string {
        if (amount > this.balance) {
            return 'Transaction cancelled: Insufficient balance.';
        } else {
            this.balance -= amount;
            return `Successfully debited $${amount}. New balance is $${this.balance}.`;
        }
    }

    credit(amount: number): string {
        let deduction = Math.floor(amount / 100); 
        let netAmount = amount - deduction; 

        this.balance += netAmount;

        return `Successfully credited $${netAmount}. New balance is $${this.balance}.`;
    }
}

const customer = new Customer('Ahmed', 'Khurram', 'Male', 22, '123-456-789');
const bankAccount = new BankAccount(customer);


import inquirer from 'inquirer';

async function main() {
    console.log('Welcome to the Console Banking Application');

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an option:',
            choices: ['Check balance', 'Debit money', 'Credit money', 'Exit']
        });

        if (action === 'Check balance') {
            console.log(`Your balance is $${bankAccount.getBalance()}.`);
        } else if (action === 'Debit money') {
            const { amount } = await inquirer.prompt({
                type: 'number',
                name: 'amount',
                message: 'Enter amount to debit:'
            });
            console.log(bankAccount.debit(amount));
        } else if (action === 'Credit money') {
            const { amount } = await inquirer.prompt({
                type: 'number',
                name: 'amount',
                message: 'Enter amount to credit:'
            });
            console.log(bankAccount.credit(amount));
        } else if (action === 'Exit') {
            console.log('Exiting...');
            break;
        }
    }
}

main();