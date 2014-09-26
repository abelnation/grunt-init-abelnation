module.exports = function(grunt) {

    return {
        // @TODO: (aallison) improve async situation
        options: {
            async: {
                parallel: false
            },
        },

        // Functional tests are run directly on the built page
        functional: {
            src: '<%= paths.tests %>/functional/*.casper.js',
            options: {
                casperjsOptions: [
                    "--log-level=debug", //|info|warning|error]",
                    "--verbose",
                    '--xunit=<%= paths.test_results %>/functional/results.xml',
                    '--env=dev',
                ],
                // If you need to debug with charles, uncomment this line
                // "--proxy=localhost:8888",
            }
        },

        // Test product integration in production or stage
        integration: {
            src: '<%= paths.tests %>/integration/*.casper.js',,
            options: {
                force: true,
                casperjsOptions: [
                    "--log-level=debug", //|info|warning|error]",
                    "--verbose",
                    "--ignore-ssl-errors=true",
                    "--xunit=<%= paths.test_results %>/integration/results.xml",
                    "--local-storage-path=./.localstorage",
                    "--local-to-remote-url-access=true",
                    "--test-name=integration",

                    // If you need to debug with charles, uncomment this line
                    // "--proxy=localhost:8888",
                ]
            }
        },
    };
};
