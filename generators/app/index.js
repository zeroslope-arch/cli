'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const packageInfo = require('../../package.json');
const prompts = require('./prompts');
const consts = require('./consts');
const ENUMS = require('./enums');

module.exports = class extends Generator {

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
    this.log(`\nTo begin we need to know a little high level information...\n`);
    return this.prompt(prompts.set_one).then(props1 => {
      this.log(`\nThank you! Next we need a little technical information...\n`);
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
    this.log('\nStarting ...\n');
    this._setupDirectory();
    this._setupFrontend();
    this._setupBackend();
    this._setupServerless();
    this._setupCloud();
    this.log('\n\nThank you! You are ready to go!');
  }

  _setupDirectory = () => {
    this.log(`Setting up directory: ${chalk.yellow(this.props.name)} ...`);
    this._createDirectory(`./${this.props.name}`);
  }

  _setupFrontend = () => {
    if (this.props.frontend !== ENUMS.NONE && this.props.frontend !== ENUMS.NONE) {
      this.log(`Setting up: Website ...`);
      var dest = `./${this.props.name}/website/`;
      this._createDirectory(dest);
      switch (this.props.frontend) {
        case ENUMS.NEXTJS:
          this.log(`  ├─── Cloning: ${consts.REPO_FE_NEXTJS} ...`);
          this._saveFilesFromRepo(consts.REPO_FE_NEXTJS, dest);
          break;
        case ENUMS.REACT:
          this.log(`  ├─── Cloning: ${consts.REPO_FE_REACT} ...`);
          this._saveFilesFromRepo(consts.REPO_FE_REACT, dest);
          break;
        case ENUMS.ANGULAR:
          this.log(`  ├─── Cloning: ${consts.REPO_FE_ANGULAR} ...`);
          this._saveFilesFromRepo(consts.REPO_FE_ANGULAR, dest);
          break;
      }
      this.log(`  └─── Installing: npm dependencies ...`);
      this._installDeps_Npm(dest);
    }
  }

  _setupServerless = () => {
    if (this.props.backend !== ENUMS.NONE && this.props.architecture === ENUMS.SERVERLESS) {
      this.log(`Setting up: Functions ...`);
      this._createDirectory(`./${this.props.name}/functions`);
      this.props.domains.forEach((domain) => {
        var dest = `./${this.props.name}/functions/${domain}`;
        this._createDirectory(dest);
        switch (this.props.backend) {
          case ENUMS.DOTNET_CORE:
            this._cloneBackend(consts.REPO_SL_DOTNET_CORE, dest, domain, this._installDeps_Nuget);
            break;
          case ENUMS.NODE:
            this._cloneBackend(consts.REPO_SL_NODE, dest, domain, this._installDeps_Npm);
            break;
        }
      });
    }
  }

  _setupBackend = () => {
    if (this.props.backend !== ENUMS.NONE && this.props.architecture === ENUMS.MICROSERVICES) {
      this.log(`Setting up: Backend ...`);
      this._createDirectory(`./${this.props.name}/services`);
      this.props.domains.forEach((domain) => {
        var dest = `./${this.props.name}/services/${domain}`;
        this._createDirectory(dest);
        switch (this.props.backend) {
          case ENUMS.DOTNET_SIX:
            this._cloneBackend(consts.REPO_MS_DOTNET_SIX, dest, domain, this._installDeps_Nuget);
            break;
          case ENUMS.DOTNET_CORE:
            this._cloneBackend(consts.REPO_MS_DOTNET_CORE, dest, domain, this._installDeps_Nuget);
            break;
          case ENUMS.NODE:
            this._cloneBackend(consts.REPO_MS_NODE, dest, domain, this._installDeps_Npm);
            break;
          case ENUMS.JAVA:
            this._cloneBackend(consts.REPO_MS_JAVA, dest, domain, this._installDeps_Java);
            break;
          case ENUMS.GOLANG:
            this._cloneBackend(consts.REPO_MS_GOLANG, dest, domain, this._installDeps_Go);
            break;
        }
      });
    }
  }

  _setupCloud = () => {
    if (this.props.cloud !== ENUMS.NONE) {
      this.log(`Setting up: Infrastructure ...`);
      this._createDirectory(`./${this.props.name}/infrastructure`);
      switch (this.props.cloud) {
        case ENUMS.AWS:
          // Test
          break;
        case ENUMS.AZURE:
          // Test
          break;
        case ENUMS.GCP:
          // Test
          break;
      }
    }
  }

  _cloneBackend = (repo, destination, domain, callback) => {
    this.log(`  ├─── Cloning domain (${domain}): ${repo} ...`);
    this._saveFilesFromRepo(repo, destination);
    this.log(`  └─── Installing: dependencies...`);
    //callback(destination);
  }

  _saveFilesFromRepo = (repo, destination) => {
    this.spawnCommandSync('git', ['clone', repo, destination], {
      stdio: [process.stderr]
    });
    this.spawnCommandSync('rm', ['-r .git'], {
      stdio: [process.stderr]
    });
  }

  _installDeps_Npm = (destination) => {
    this.spawnCommand('npm', ['install'], {
      cwd: destination,
      stdio: [process.stderr]
    });
  }

  _installDeps_Nuget = (destination) => {
    this.spawnCommand('dotnet', ['restore'], {
      cwd: destination,
      stdio: [process.stderr]
    });
  }

  _installDeps_Java = (destination) => {
    this.spawnCommand('mvn', ['-U clean install'], {
      cwd: destination,
      stdio: [process.stderr]
    });
  }

  _installDeps_Go = (destination) => {
    this.spawnCommand('go', ['mod vendor'], {
      cwd: destination,
      stdio: [process.stderr]
    });
  }

  _createDirectory = (path) => {
    fs.mkdir(path, (err) => { });
  }

  _renameSolution = (name) => {
    // grep rename zeroslope instances with provided name
  }

};
