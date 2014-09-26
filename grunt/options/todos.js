'use strict';

module.exports = function(grunt) {
    return {
        options: {},
        all: {
            src: [
                "./**",
                "!./**/lib/**",
                "!./node_modules/**",
                "!./**/tasks/todos.js"
            ],
        },
    };
};
