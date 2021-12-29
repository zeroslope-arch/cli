'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const packageInfo = require('../../package.json');
const prompts = require('./prompts')

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.option('skip-install', {
      desc: 'Skips package installation steps.',
      type: Boolean,
      defaults: false
    });
    this.config.save();
  }

  initializing() {
    this.props = {};
  }

  prompting() {
    this.log('===============================');
    this.log(`Welcome to the the ${chalk.blue('ZeroSlope')} generator!`);
    this.log(`Version:   ${chalk.green(packageInfo.version)}`);
    this.log(`Website:   ${chalk.green('https://www.zeroslope.dev')}`);
    this.log(`Github:    ${chalk.green('https://github.com/zeroslope-arch')}`);
    this.log(`Source:    ${chalk.green(packageInfo.repository)}`);
    this.log('===============================');

    this.log(`To begin we need to know a little high level information.\n`);
    return this.prompt(prompts.set_one).then(props1 => {
      this.log(`\nThank you! Please just a little more detailed information and we are done!.\n`);
      return this.prompt(prompts.set_two).then(props2 => {
        this.props = {
          ...props1,
          ...props2
        };
      });
    });
  }

  configuring() { 
    // Pre configuration here...
  }

  writing() {
    // Write the files here ...
    console.log('\n#DEBUG# State: ', this.props);
  }

  install() {
    if(!this.options['skip-install']) {
      // Post processing ... (npm, nuget, etc)
    }
  }

  _saveFilesFromRepo(repo, destination) {
    this.remote('yeoman', repo, (err, remote) => {
      remote.bulkDirectory(destination, repo);
    });  
  }

  _renameSolution(name) {
    // grep rename zeroslope instances with provided name
  }

};
