module.exports = function(grunt) {
    return {
        options: {
            separator: ';',
            banner: '<%= banner %>',
        },
        dist: {
            src: [
                '<%= paths.src %>/*.js',
                '<%= paths.src %>/**/*.js',
                '!<%= paths.src %>/lib/**',
                '!<%= paths.src %>/**/lib/**',
            ],
            dest: './<%= pkg.name %>.js',
        },
    };
};
