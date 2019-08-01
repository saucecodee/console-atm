const env = require('./env');
const user = require('./user')
const welcome = require('./app')
const moreTrans = require('./moreTransaction')
const atm = require('./atm')

//===============================================================================
//                  Client page                                              //
//===============================================================================

function clientMenu(msg) {
     env.header("Client menu", msg)

     var options = [
          {
               type: 'list',
               name: 'option',
               message: 'Select an option',
               choices: ['Withdraw', 'Check balance', 'Go to main menu', 'Exit'],
               filter: function (val) {
                    return val.toLowerCase();
               }
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          if (answers.option == 'withdraw') {
               withdraw('')
          } else if (answers.option == 'check balance') {
               checkBalance('')
          } else if (answers.option == 'go to main menu') {
               welcome('')
          } else {
               process.exit()
          }
     });
}

function withdraw(msg) {
     env.header("Client menu", msg)

     var options = [
          {
               type: 'input',
               name: 'amount',
               message: 'Enter amount to withdraw',
               validate: function (value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
               },
               filter: Number
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          let amount = parseInt(answers.amount)
          if (amount > 1000) {
               if (atm.balance > amount) {
                    user.client.withdraw(parseInt(amount))
                    moreTrans("Withdraw was successful")
               }else {
                    moreTrans('Sorry, unable to dispense cash', 'client')
               }
          } else {
               withdraw('ENTER A VALID AMOUNT')
          }
     });
}

function checkBalance(msg) {
     env.header("ATM balance", msg)

     let balance = user.admin.checkBalance()
     moreTrans(`ATM balance is: N${balance.toLocaleString()}`, 'client')
}

module.exports = clientMenu