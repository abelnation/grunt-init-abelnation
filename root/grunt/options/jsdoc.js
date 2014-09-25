module.exports = function (grunt) {
    return {
        options : {
            // template: "node_modules/ink-docstrap/template",
            // template: "./grunt/helpers/jsdoc_template_default",
            // configure: "./grunt/helpers/jsdoc_conf.json",
        },
        dist : {
            src: [
                "<%= jshint.src.src %>",
            ],
            options: {
                destination: '<%= paths.docs %>/',
            }
        },
        inherittest : {
            src: [
                './grunt/helpers/jsdoc_plugins/predefs_test.js',
                './grunt/helpers/jsdoc_plugins/predefs_test02.js',
            ],
            options: {
                destination: 'docs_test/',
            }
        }
    };
};
