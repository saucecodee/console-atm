const env = require('./env');
const user = require('./user')
const adminMenu = require('./adminMenu')
const clientMenu = require('./clientMenu')


//===============================================================================
//                  Validate page                                              //
//===============================================================================

function enterPin(msg, userStatus) {
     env.header("Enter your PIN", msg)

     var options = [
          {
               type: 'password',
               name: 'pin',
               message: "Enter your PIN",
               mask: true
          },
     ];

     env.inquirer.prompt(options).then(answers => {
          if (userStatus == 'admin'){
               if (answers.pin == user.admin.pin){
                    adminMenu('')
               }else{
                    enterPin('INCORRECT PASSWORD', userStatus)
               }
          }else{
               if (answers.pin == user.client.pin){
                    clientMenu('')
               }else{
                    enterPin('INCORRECT PASSWORD', userStatus)
               }
          }
     });
}


exports.enterPin = enterPin
