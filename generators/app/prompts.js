const consts = require('./consts');

const _createArray = (opts) => {
  if (opts.replace(' ', '') === '') { return []; }
  return opts.split(',');
}

module.exports = {
  set_one: [
    {
      type: 'input',
      name: 'name',
      message: 'Please enter your product name.',
      default: consts.DEFAULT_PROJECTNAME
    },
    {
      type: 'list',
      name: 'monorepo',
      message: 'What repo strategy will you be using?',
      choices: consts.OPTIONS_MONOREPO,
      default: consts.DEFAULT_MONOREPO
    },
    {
      type: 'list',
      name: 'architecture',
      message: 'What architecture would you like to use?',
      choices: consts.OPTIONS_ARCHITECTURE,
      default: consts.DEFAULT_ARCHITECTURE
    },
    {
      type: 'list',
      name: 'cloud',
      message: 'Which cloud provider will you be using?',
      choices: consts.OPTIONS_CLOUDPROVIDER,
      default: consts.DEFAULT_CLOUDPROVIDER
    }
  ],
  set_two: [
    {
      type: 'list',
      name: 'frontend',
      message: 'Which frontend framework do you want to use?',
      choices: consts.OPTIONS_FRONTEND,
      default: consts.DEFAULT_FRONTEND
    },
    {
      type: 'list',
      name: 'backend',
      message: 'Which backend language do you want to use?',
      choices: consts.OPTIONS_BACKEND,
      default: consts.DEFAULT_BACKEND
    },
    {
      type: 'input',
      name: 'domains',
      message: 'Please enter the domains you want to use as infrastructure abstraction. (comma delimited, no spaces)',
      filter: _createArray
    },
  ]
};