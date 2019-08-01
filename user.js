const atm = require('./atm')

class User {
     constructor(pin) {
          this.pin = pin;
     }
     checkBalance (){
          return atm.balance
     }
}

class Admin extends User {
     constructor(pin) {
          super(pin);
     }

     deposit(amount) {
          atm.balance = atm.balance + amount;
     }

     disableAtm(state) {
          atm.isDisabled = state;
     }
}

class Client extends User {
     constructor(pin) {
          super(pin);
     }

     withdraw(amount) {
          atm.balance = atm.balance - amount
     }
}

const admin = new Admin(8080)
const client = new Client(6080)

module.exports = {admin, client}