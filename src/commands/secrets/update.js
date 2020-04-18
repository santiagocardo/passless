'use strict'

const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')
const { userServices, secretServices } = require('@passless/services')

class SecretsUpdateCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsUpdateCommand)
      const { username, name } = args
      const password = await cli.prompt('Enter your password', { type: 'hide' })

      const user = await userServices.authenticate(username, password)
      if (!user) throw new CLIError('Invalid user or password')

      const value = await cli.prompt('Enter your new secret', { type: 'mask' })
      await secretServices.updateSecret(user, password, name, value)
      this.log(`secret ${name} updated`)
    } catch (err) {
      if (err instanceof CLIError) {
        throw err
      } else {
        throw new CLIError('Cannot update secret')
      }
    }
  }
}

SecretsUpdateCommand.description = 'Delete a secret by username and name'
SecretsUpdateCommand.flags = {}
SecretsUpdateCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]

module.exports = SecretsUpdateCommand
