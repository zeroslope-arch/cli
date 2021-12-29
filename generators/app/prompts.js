const consts = require('./consts');

const _createArray = (opts) => {
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
      name: 'framework',
      message: 'What framework would you like to use?',
      choices: consts.OPTIONS_FRAMEWORKS,
      default: consts.DEFAULT_FRAMEWORKS
    },
    {
      type: 'list',
      name: 'cloud',
      message: 'Which cloud provider will you be using?',
      choices: consts.OPTIONS_CLOUDPROVIDER,
      default: consts.DEFAULT_CLOUDPROVIDER
    },
    {
      type: 'confirm',
      name: 'frontend',
      message: 'Will you be using a frontend with this?',
      default: consts.DEFAULT_FRONTEND
    },
    {
      type: 'confirm',
      name: 'backend',
      message: 'Will you be using a backend with this?',
      default: consts.DEFAULT_BACKEND
    }
  ],
  set_two: [
    {
      type: 'input',
      name: 'domains',
      message: 'Please enter the domains you want to use as infrastructure abstraction. (comma delimited, no spaces)',
      filter: _createArray
    }
  ]
};