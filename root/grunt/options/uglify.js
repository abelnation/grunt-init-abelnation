module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('./package.json');
    var paths = pkg.domains;

    var exports = {
        options: {
            banner: "<%= banner %>",
            preserveComments: 'some',
            mangle: {
                except: [ 'jQuery', '_' ],
            },
            compress: {
                drop_console: true
            }
        },

        // For individual variant target
        // e.g. grunt uglify:variant:<product_name>:<variant_name>
        dist: {
            files: {
                './<%= pkg.name %>-min.js': ['./<%= pkg.name %>.js']
            }

        },
    };

    return exports;
};
