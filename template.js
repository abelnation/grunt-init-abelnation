/*
 * grunt-init-abelnation
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 Abel Allison, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Catch-all grunt project template';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. ';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  var _ = grunt.util._;

  var gruntTasks = {
    // commented lines are always included

    'grunt-bump':            { 'default': true,  'version': '^0.0.15', 'taskName': 'bump' },
    // 'grunt-contrib-clean':   { 'default': true,  'version': '^0.6.0',  'taskName': 'clean' },
    'grunt-contrib-jshint':  { 'default': true,  'version': '^0.10.0',  'taskName': 'jshint',       'fileDeps': [ '.jshint', 'src/.jshint', 'test/.jshint' ] },
    // 'grunt-contrib-watch':   { 'default': true,  'version': '^0.6.1',  'taskName': 'watch' },
    // 'grunt-dev-update':      { 'default': true,  'version': '^0.8.0',  'taskName': 'devUpdate' },
    'grunt-jscs':            { 'default': true,  'version': '^0.7.1',  'taskName': 'jscs',         'fileDeps': [ 'src/.jscs.jquery.json' ] },
    'grunt-shell':           { 'default': true,  'version': '^0.6.0',  'taskName': 'shell' },
    'grunt-contrib-concat':  { 'default': false, 'version': '^0.5.0',  'taskName': 'concat' },
    'grunt-contrib-connect': { 'default': false, 'version': '^0.8.0',  'taskName': 'connect' },
    'grunt-contrib-copy':    { 'default': false, 'version': '^0.6.0',  'taskName': 'copy' },
    'grunt-contrib-jasmine': { 'default': false, 'version': '^0.8.0',  'taskName': 'jasmine' },
    'grunt-contrib-uglify':  { 'default': false, 'version': '^0.6.0',  'taskName': 'uglify' },
    'grunt-contrib-sass':    { 'default': false, 'version': '^0.7.3',  'taskName': 'sass' },
    'grunt-line-remover':    { 'default': false, 'version': '^0.0.2',  'taskName': 'lineremover' },
    'grunt-casperjs':        { 'default': false, 'version': '^2.0.0',  'taskName': 'casperjs',     'fileDeps': [ 'test/functional/functionalExample.casper.js', 'test/integration/integrationExample.casper.js' ] },
    'grunt-jasmine-node':    { 'default': false, 'version': '^0.2.1',  'taskName': 'jasmine_node' },
    'grunt-jsdoc':           { 'default': false, 'version': '^0.6.0',  'taskName': 'jsdoc' },
  };

  var prompts = [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name', 'Abel Allison'),
    init.prompt('author_email', 'abel.allison@gmail.com'),
    init.prompt('author_url'),
  ];
  // add prompt for each grunt tasks
  _.each(gruntTasks, function(value, key) {
    prompts.push(init.prompt(key.replace(/-/g, '_'), value.default ? 'y' : 'n'));
  });

  init.process({ type: 'abelnation' }, prompts, function(err, props) {

    // A few additional properties.
    props.paths = {
      'src': './src',
      'build': './build',
      'tests': './test',
      'grunt': './grunt',
      'script': './script',
      'test_results': './test_results',
    };
    props.dependencies = {};
    props.devDependencies = {
      "underscore": "^1.7.0",
      "load-grunt-tasks": "^0.6.0",
      "glob": "^4.0.6",
      "grunt-timer": "^0.5.2",
      'grunt-contrib-watch': '^0.6.1',
      'grunt-dev-update': '^0.8.0',
      'grunt-contrib-clean': '^0.6.0',
      'grunt-bump': '^0.0.15',
    };
    props.scripts = {
      'test': 'grunt test',
      'lint': 'grunt lint',
      'setup': './script/setup.sh',
    };
    _.each(gruntTasks, function(value, key) {
      if ( /[yY](es)?/i.test(props[key.replace(/-/g, '_')]) ) {
        props.devDependencies[key] = gruntTasks[key].version;
      }
    });

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    var renames = init.renames;

    // don't copy grunt task configs for disabled tasks
    _.each(gruntTasks, function(value, key) {
      if ( !/[yY](es)?/i.test(props[key.replace(/-/g, '_')]) ) {
        delete files['grunt/options/' + value.taskName + ".js"];
        if ( _.has(value, 'fileDeps') ) {
          
          // go through and remove any file from files that matches fileSrc
          _.each(value.fileDeps, function(fileSrcToRemove) {
            if (_.has(files, fileSrcToRemove)) { delete files[fileSrcToRemove]; }
          });
        }
      }
    });

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    console.log(JSON.stringify(props, null, 2));

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, { noProcess: 'libs/**' });

    // Filter init prompts to create pkg.json values
    var pkgProps = _.pick(props, function(value, key, object) {
      if (_.has(gruntTasks, key)) { return false; }
      return true;
    });

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON("package.json", pkgProps, function(pkg, props) {
      // The jQuery site needs the "bugs" value as a string.
      if ('bugs' in props) { pkg.bugs = props.bugs; }
      return pkg;
    });

    // All done!
    done();
  });

};
