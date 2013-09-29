'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    appConfig.app = require('./bower.json').appPath || appConfig.app;
  } catch (e) {}

  grunt.initConfig({
    appPort: '9051',
    appConfig: appConfig,
    watch: {
      styles: {
        files: ['<%= appConfig.app %>/styles/{,*/}*.css'],
        tasks: []
      },
        scripts: {
            files: ['<%= appConfig.app %>/styles/{,*/}*.css'],
            tasks: ['copy:styles']
        }
    },
    open: {
      server: {
        url: 'http://localhost:<%= appPort %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= appConfig.dist %>/*',
            '!<%= appConfig.dist %>/.git*'
          ]
        }]
      }
    },
    useminPrepare: {
        html: ['<%= appConfig.app %>/student.html', '<%= appConfig.app %>/authoring.html'],
        options: {
            dest: '<%= appConfig.dist %>'
        }
    },
    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= appConfig.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= appConfig.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= appConfig.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.{ico,png,txt}',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: 'dist/images',
          dest: '<%= appConfig.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    concurrent: {
      dist: [
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>/scripts',
          src: '*.js',
          dest: '<%= appConfig.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= appConfig.dist %>/scripts/scripts.js': [
            '<%= appConfig.dist %>/scripts/scripts.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy:dist',
    'ngmin',
    'cssmin',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('dev', [
    'build',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
