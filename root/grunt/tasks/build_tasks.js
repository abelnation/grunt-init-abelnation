module.exports = function(grunt) {

    grunt.registerTask('lint', [
        {% if (/[yY]/.test(grunt_dev_update)) { %}'devUpdate',{% } %}
        {% if (/[yY]/.test(grunt_contrib_jshint)) { %}'jshint',{% } %}
        {% if (/[yY]/.test(grunt_jscs)) { %}'jscs',{% } %}
        'todos',
    ]);

    grunt.registerTask('build', [
        'clean',
        'lint',

        {% if (/[yY]/.test(grunt_contrib_sass)) { %}'sass',{% } %}
        {% if (/[yY]/.test(grunt_contrib_concat)) { %}'concat',{% } %}
        {% if (/[yY]/.test(grunt_contrib_uglify)) { %}'uglify',{% } %}
        {% if (/[yY]/.test(grunt_line_remover)) { %}'lineremover',{% } %}

        // FILL ME IN
    ]);

    grunt.registerTask('docs', [
        'clean:docs',
        {% if (/[yY]/.test(grunt_jsdoc)) { %}'jsdoc:dist',{% } %}
    ]);

};
