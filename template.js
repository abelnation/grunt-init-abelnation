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
    'grunt-bump':            { default: true,  version: '^0.0.15', 'taskName': 'bump' },
    'grunt-contrib-clean':   { default: true,  version: '^0.6.0',  'taskName': 'clean' },
    'grunt-contrib-jshint':  { default: true,  version: '^0.6.0',  'taskName': 'jshint' },
    'grunt-contrib-watch':   { default: true,  version: '^0.6.1',  'taskName': 'watch' },
    'grunt-dev-update':      { default: true,  version: '^0.8.0',  'taskName': 'devUpdate' },
    'grunt-jscs':            { default: true,  version: '^0.7.1',  'taskName': 'jscs' },
    'grunt-shell':           { default: true,  version: '^0.6.0',  'taskName': 'shell' },
    'grunt-contrib-concat':  { default: false, version: '^0.5.0',  'taskName': 'concat' },
    'grunt-contrib-connect': { default: false, version: '^0.8.0',  'taskName': 'connect' },
    'grunt-contrib-copy':    { default: false, version: '^0.6.0',  'taskName': 'copy' },
    'grunt-contrib-jasmine': { default: false, version: '^0.8.0',  'taskName': 'jasmine' },
    'grunt-contrib-uglify':  { default: false, version: '^0.6.0',  'taskName': 'uglify' },
    'grunt-jasmine-node':    { default: false, version: '^0.2.1',  'taskName': 'jasmine_node' },
    'grunt-jsdoc':           { default: false, version: '^0.6.0',  'taskName': 'jsdoc' },
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
    prompts.push(init.prompt(key, value.default ? 'y' : 'n'));
  });

  init.process({type: 'abelnation'}, prompts, function(err, props) {

    // A few additional properties.
    props.paths = {
      'src': './src',
      'tests': './test',
      'grunt': './grunt',
      'script': './script',
      'test_results': './test_results',
    };
    props.dependencies = {};
    props.devDependencies = {
      "underscore": "^1.7.0",
      "load-grunt-tasks": "^0.4.0",
    };
    props.scripts = {
      'test': 'grunt test',
      'lint': 'grunt lint',
      'setup': './script/setup.sh',
    };
    _.each(gruntTasks, function(value, key) {
      console.log(key + ": " + props[key]);
      if ( /[yY](es)?/i.test(props[key]) ) {
        props.devDependencies[key] = gruntTasks[key].version;
      }
    });

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    var renames = init.renames;

    // don't copy grunt task configs for disabled tasks
    _.each(gruntTasks, function(value, key) {
      if ( !/[yY](es)?/i.test(props[key]) ) {
        delete files['grunt/options/' + value.taskName + ".js"];
      }
    });

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

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
