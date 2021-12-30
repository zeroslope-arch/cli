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
    // Write the files here ...
    // console.log('\n#DEBUG# State: ', this.props);
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
    if (this.props.frontend !== ENUMS.NONE) {
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
          // case ENUMS.DOTNET_SIX:
          //   this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_DOTNET_SIX} ...`);
          //   this._saveFilesFromRepo(consts.REPO_MS_DOTNET_SIX, dest);
          //   this.log(`  └─── Installing: nuget dependencies ...`);
          //   this._installDeps_Nuget(dest);
          //   break;
          case ENUMS.DOTNET_CORE:
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_SL_DOTNET_CORE} ...`);
            this._saveFilesFromRepo(consts.REPO_SL_DOTNET_CORE, dest);
            this.log(`  └─── Installing: nuget dependencies ...`);
            this._installDeps_Nuget(dest);
            break;
          case ENUMS.NODE:
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_SL_NODE} ...`);
            this._saveFilesFromRepo(consts.REPO_SL_NODE, dest);
            this.log(`  └─── Installing: npm dependencies ...`);
            this._installDeps_Npm(dest);
            break;
          // case ENUMS.JAVA:
          //   this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_GOLANG} ...`);
          //   this._saveFilesFromRepo(consts.REPO_MS_GOLANG, dest);
          //   this.log(`  └─── Installing: mvn dependencies ...`);
          //   this._installDeps_Java(dest);
          //   break;
          // case ENUMS.GOLANG:
          //   this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_GOLANG} ...`);
          //   this._saveFilesFromRepo(consts.REPO_MS_GOLANG, dest);
          //   this.log(`  └─── Installing: go dependencies ...`);
          //   this._installDeps_Go(dest);
          //   break;
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
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_DOTNET_SIX} ...`);
            this._saveFilesFromRepo(consts.REPO_MS_DOTNET_SIX, dest);
            this.log(`  └─── Installing: nuget dependencies ...`);
            this._installDeps_Nuget(dest);
            break;
          case ENUMS.DOTNET_CORE:
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_DOTNET_CORE} ...`);
            this._saveFilesFromRepo(consts.REPO_MS_DOTNET_CORE, dest);
            this.log(`  └─── Installing: nuget dependencies ...`);
            this._installDeps_Nuget(dest);
            break;
          case ENUMS.NODE:
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_NODE} ...`);
            this._saveFilesFromRepo(consts.REPO_MS_NODE, dest);
            this.log(`  └─── Installing: npm dependencies ...`);
            this._installDeps_Npm(dest);
            break;
          case ENUMS.JAVA:
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_GOLANG} ...`);
            this._saveFilesFromRepo(consts.REPO_MS_GOLANG, dest);
            this.log(`  └─── Installing: mvn dependencies ...`);
            this._installDeps_Java(dest);
            break;
          case ENUMS.GOLANG:
            this.log(`  ├─── Cloning domain (${domain}): ${consts.REPO_MS_GOLANG} ...`);
            this._saveFilesFromRepo(consts.REPO_MS_GOLANG, dest);
            this.log(`  └─── Installing: go dependencies...`);
            this._installDeps_Go(dest);
            break;
        }
      });
    }
  }

  _setupCloud = () => {
    
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
    // this.spawnCommand('npm', ['install'], {
    //   cwd: destination,
    //   stdio: [process.stderr]
    // });
  }

  _installDeps_Nuget = (destination) => {
    // this.spawnCommand('dotnet', ['restore'], {
    //   cwd: destination,
    //   stdio: [process.stderr]
    // });
  }

  _installDeps_Java = (destination) => {
    // this.spawnCommand('mvn', ['-U clean install'], {
    //   cwd: destination,
    //   stdio: [process.stderr]
    // });
  }

  _installDeps_Go = (destination) => {
    // this.spawnCommand('', [''], {
    //   cwd: destination,
    //   stdio: [process.stderr]
    // });
  }

  _createDirectory = (path) => {
    fs.mkdir(path, (err) => { });
  }

  _renameSolution = (name) => {
    // grep rename zeroslope instances with provided name
  }

};
