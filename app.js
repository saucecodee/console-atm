const env = require('./env');
const validate = require('./validate')
const moreTrans = require('./moreTransaction')
const atm = require('./atm')

//===============================================================================
//                  Welcome page                                               //
//===============================================================================

function welcome(msg) {
     env.header("Welcome to Sauce ATM", msg)

     var options = [
          {
               type: 'list',
               name: 'status',
               message: 'Select an option',
               choices: ['Admin', 'Client'],
               filter: function (val) {
                    return val.toLowerCase();
               }
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          if (answers.status == 'client' && atm.isDisabled){
               moreTrans('Sorry ATM is disables at the moment', 'client')
               return
          }
          validate.enterPin('', answers.status)
     });
     return this;
}

welcome('')

exports.welcome = welcome;