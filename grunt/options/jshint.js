module.exports = function(grunt) {
    return {
        gruntfile: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: 'Gruntfile.js'
        },
        grunttasks: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                '<%= paths.grunt %>/**/*.js',
            ]
        },
        src: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                './template.js',
                './rename.js',
                './root/**/*.js',
                '!./root/grunt/**/*.js',
            ]
        },
    };
};
