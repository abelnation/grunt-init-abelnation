module.exports = function(grunt) {

    // Grunt task for unit test
    grunt.registerTask('test-unit', [
        {% if (/[yY]/.test(grunt_contrib_jasmine)) { %}
        'connect:jasmine',
        'jasmine',
        {% } %}
        {% if (/[yY]/.test(grunt_jasmine_node)) { %}
        'jasmine_node',
        {% } %}
    ]);

    grunt.registerTask('test-functional', [
        {% if (/[yY]/.test(grunt_casperjs)) { %}
        'connect:casperjs'
        'casperjs:functional',
        {% } %}
    ]);
    grunt.registerTask('test-integration', [
        {% if (/[yY]/.test(grunt_casperjs)) { %}
        'connect:casperjs'
        'casperjs:integration',
        {% } %}
    ]);

    grunt.registerTask('test', [
        'test-unit',
        'test-functional',
        'test-integration'
    ]);
};
