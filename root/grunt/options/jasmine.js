module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    return {
        options: {
            summary: false,
            host: 'http://127.0.0.1:8083',
            keepRunner: true,
        },

        // For individual variant target
        // e.g. grunt jasmine:variant:<product_name>:<variant_name>
        unit: {

            src: [
                // FILL THIS IN
            ],

            options: {
                vendor: [

                    // FILL THIS IN

                    // Copy and pasted into the specrunner
                    // '<%= paths.tests %>/lib/jasmine-jquery/jquery-2.0.3.min.js',
                    // '<%= paths.tests %>/lib/jasmine-jquery/jasmine-jquery.js'
                    // '<%= paths.src %>/lib/underscore-min.js'
                ],
                specs: '<%= paths.tests %>/unit/*Spec.js',
                junit: {
                    path: '<%= paths.test_results %>/unit/',
                    consolidate: true,
                },
            }
        },
    };
};
