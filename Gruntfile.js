module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'js/tank/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                globals: {
                    jQuery: true,
                    console: true
                }
            }
        },
        browserify: {
            options: {
                transform: [require('grunt-react').browserify]
            },
            app: {
                src: ['js/tank/**/*.js'],
                dest: 'js/bundle.js'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'browserify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-jsxhint');
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'browserify']);

};
