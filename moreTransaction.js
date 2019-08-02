const env = require('./env');
const welcome = require('./app')
const enterPin = require('./validate')

//===============================================================================
//                  More Options page                                              //
//===============================================================================

function moreTrans(msg, user) {
     env.header("Transaction processed !", msg)

     var options = [
          {
               type: 'list',
               name: 'option',
               message: 'Do you want to peform another transaction ?',
               choices: ['Yes', 'No', 'Go to main menu'],
               filter: function (val) {
                    return val.toLowerCase();
               }
          }
     ];

     env.inquirer.prompt(options).then(answers => {
          if (answers.option == 'yes') {
               enterPin.enterPin('', user)
          } else if (answers.option == 'no') {
               console.clear()
               console.log('Good bye !')
               process.exit()
          } else {
               welcome.welcome('')
          }
     });
}


module.exports = moreTrans