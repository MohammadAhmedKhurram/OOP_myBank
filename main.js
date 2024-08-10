class Customer {
    firstName;
    lastName;
    gender;
    age;
    phoneNumber;
    constructor(firstName, lastName, gender, age, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }
}
class BankAccount {
    customer;
    balance = 0;
    constructor(customer) {
        this.customer = customer;
    }
    getBalance() {
        return this.balance;
    }
    debit(amount) {
        if (amount > this.balance) {
            return 'Transaction cancelled: Insufficient balance.';
        }
        else {
            this.balance -= amount;
            return `Successfully debited $${amount}. New balance is $${this.balance}.`;
        }
    }
    credit(amount) {
        let deduction = Math.floor(amount / 100); // Deduct $1 for each $100
        let netAmount = amount - deduction; // Amount after deduction
        this.balance += netAmount;
        return `Successfully credited $${netAmount}. New balance is $${this.balance}.`;
    }
}
const customer = new Customer('John', 'Doe', 'Male', 30, '123-456-7890');
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
        }
        else if (action === 'Debit money') {
            const { amount } = await inquirer.prompt({
                type: 'number',
                name: 'amount',
                message: 'Enter amount to debit:'
            });
            console.log(bankAccount.debit(amount));
        }
        else if (action === 'Credit money') {
            const { amount } = await inquirer.prompt({
                type: 'number',
                name: 'amount',
                message: 'Enter amount to credit:'
            });
            console.log(bankAccount.credit(amount));
        }
        else if (action === 'Exit') {
            console.log('Exiting...');
            break;
        }
    }
}
main();
