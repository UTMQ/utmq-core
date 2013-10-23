'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var appConfig = {
    app: 'app',
    dist: 'dist/client'
  };

  try {
    appConfig.app = require('./bower.json').appPath || appConfig.app;
  } catch (e) {}

  grunt.initConfig({
    appPort: '5000',
    appConfig: appConfig,
    watch: {
      scripts: {
        files: ['<%= appConfig.app %>/scripts/**/*.js'],
        tasks: [ 'build' ]
      },
      all: {
        files: ['<%= appConfig.app %>/**/*.html'],
        tasks: [ 'build' ]
      },
      styles: {
        files: ['<%= appConfig.app %>/styles/{,*/}*.css'],
        tasks: []
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build']
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
      },
      deploy: [ 'deploy' ]
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
          src: ['*.html', 'views/**/*.html'],
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
            'vendor_components/**/*',
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
      },
      deploy: {
        expand: true,
        src: ['dist/**', 'package.json', 'Procfile'],
        dest: 'deploy/'
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
    shell: {
      // TODO: update this when there is time
      tempDeploy: {
        options: {
          stdout: true,
          stderr: true
        },
        command: [
          'cd deploy',
          'git init',
          'git add *',
          'git commit -m "Deploy"',
          'git push -f git@heroku.com:utmq.git'
        ].join(' && ')
      }
    }
  });


  grunt.registerTask('test', [ 'karma' ]);
  grunt.registerTask('deploy', [ 'clean:deploy', 'build', 'copy:deploy', 'shell:tempDeploy' ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy:dist',
    'ngmin',
    'cssmin',
    'usemin'
  ]);

  grunt.registerTask('dev', [
    'build',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', [ 'build' ]);
};
