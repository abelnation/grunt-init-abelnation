module.exports = function(grunt) {

    // Grunt task for unit test
    grunt.registerTask('test-unit', [
        
        
    ]);

    grunt.registerTask('test-functional', [
        
    ]);
    grunt.registerTask('test-integration', [
        
    ]);

    grunt.registerTask('test', [
        'test-unit',
        'test-functional',
        'test-integration'
    ]);
};
