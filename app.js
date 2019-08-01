const env = require('./env');
const validate = require('./validate')

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
          validate('', answers.status)
     });
     return this;
}

// welcome('')

module.exports = welcome;