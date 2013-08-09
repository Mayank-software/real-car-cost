//grunt.js

module.exports = function(grunt) {

  // configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      livereload: {
        files: ['css/*.css',"*.html"],
        options: { livereload: true }
      }
    }

  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');

  // register tasks
  grunt.registerTask('default', ['watch']);
};
