const env = require('./env');
const user = require('./user')
const welcome = require('./app')
const moreTrans = require('./moreTransaction')
const atm = require('./atm')

//===============================================================================
//                  Admin page                                                 //
//===============================================================================

function adminMenu(msg) {
     env.header("Admin menu", msg)

     var atmState = !atm.isDisabled ? "Disable ATM" : "Enable ATM"

     var options = [
          {
               type: 'list',
               name: 'option',
               message: 'Select an option',
               choices: ['Deposit', 'Check balance', atmState, 'Go to main menu', 'Exit'],
               filter: function (val) {
                    return val.toLowerCase();
               }
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          if (answers.option == 'deposit') {
               deposit('')
          } else if (answers.option == 'check balance') {
               checkBalance('')
          } else if (answers.option == atmState.toLocaleLowerCase()) {
               disableAtm('')
          } else if (answers.option == 'go to main menu') {
               welcome.welcome('')
          } else {
               process.exit()
          }
     });
}

function deposit(msg) {
     env.header("Admin menu", msg)

     var options = [
          {
               type: 'input',
               name: 'amount',
               message: 'Enter amount to deposit',
               validate: function (value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
               },
               filter: Number
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          if (answers.amount > 999) {
               user.admin.deposit(parseInt(answers.amount))
               moreTrans("Deposit was successful", 'admin')
          } else {
               deposit('ENTER A VALID AMOUNT')
          }
     });
}

function checkBalance(msg) {
     env.header("ATM balance", msg)

     let balance = user.admin.checkBalance()
     moreTrans(`ATM balance is: N${balance.toLocaleString()}`, 'admin')
}

function disableAtm(msg) {
     env.header("Admin menu", msg)

     var options = [
          {
               type: 'list',
               name: 'option',
               message: 'Select an option',
               choices: ['Yes', 'No'],
               filter: function (val) {
                    return val.toLowerCase();
               }
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          if (answers.option == "yes") {
               if (!atm.isDisabled) {
                    user.admin.disableAtm(true)
                    moreTrans(`ATM is disabled`, 'admin')
               } else {
                    user.admin.disableAtm(false)
                    moreTrans(`ATM is Enabled`, 'admin')
               }

          } else {
               user.admin.disableAtm(fasle)
               moreTrans('', 'admin')
          }
     });
}

module.exports = adminMenu