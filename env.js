//===============================================================================
//                  Require modules                                            //
//===============================================================================

//========== require the prompt module and create interface ==========
const inquirer = require('inquirer');

//========== require cli-tabel ==========
const Table = require('cli-table');

//========== require colors ==========
const colors = require('colors');


//===============================================================================
//                  Header functiom                                            //
//===============================================================================

function header(title, msg) {
     console.clear();

     msg = msg.toUpperCase();
     var table = new Table({
          chars: { 'top': '═', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'right': '║' },
          head: [title],
          colWidths: [72],
          colAligns: ['middle']
     });
     console.log(table.toString());

     if (msg.length < 1) {
          console.log();
     } else {
          console.log();
          console.log(colors.red('=> '), msg .cyan)
          console.log()
     }
}

module.exports = {inquirer, Table, colors, header}