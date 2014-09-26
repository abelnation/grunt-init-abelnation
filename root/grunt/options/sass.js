module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    return {
        // For individual variant target
        // e.g. grunt sass:variant:<product_name>:<variant_name>
        src: {
            options: {
                style: 'expanded', // grunt-inline will do the minification for us
                compass: true,
                lineNumbers: true,
            },
            expand: true,
            flatten: true,
            cwd: '<%= paths.src %>/',
            src: [
                '**/*.scss',
                '!**/_*.scss',
                '!partials/**/*.scss'
            ],
            dest: '<%= paths.src %>/css/',
            ext: '.css'
        },
    };
};
