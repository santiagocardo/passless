const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')
const { userServices } = require('@passless/services')

class UsersListCommand extends Command {
  async run () {
    try {
      const results = await userServices.listUsers()
      cli.table(results.rows, {
        username: {
          minWidth: 12
        },
        fullName: {
          header: 'Full name',
          minWidth: 20
        }
      }, {
        printLine: this.log
      })

      this.log(`Total: ${results.count}`)
    } catch (err) {
      throw new CLIError('Cannot list users')
    }
  }
}

UsersListCommand.description = 'List all users'
UsersListCommand.flags = {}

module.exports = UsersListCommand
