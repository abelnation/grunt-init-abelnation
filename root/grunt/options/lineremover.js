module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('./package.json');
    var paths = pkg.domains;

    return {
        html: {
            files: [{
                expand: true,
                cwd: '<%= paths.build %>/',
                src: ['**/*.html'],
                dest: '<%= paths.build %>/',
                ext: '.html'
            }]
        }
    };
};
