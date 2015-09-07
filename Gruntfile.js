module.exports = function(grunt) {
    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    var path = require('path');
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    grunt.initConfig({
        clean: {
            vendor: {
                src: [ 'vendor', 'build/htdocs/js/lib' ]
            },
            build: {
              src: [ 'build/htdocs/js/app', 'build/inc/css']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './vendor',
                    install: true,
                    verbose: false,
                    clearnTargetDir: true,
                    clearnBowerDir: false,
                    layout: function(type, component, source) {
                        return "";
                    }
                }
            }
        },
        uglify: {
            vendor: {
                files: [{
                    expand: true,
                    cwd: 'vendor',
                    src: ['*.js'],
                    dest: 'build/htdocs/js/lib/'
                }]
            },
            inc_js: {
                files: [{
                    expand: true,
                    cwd: 'src/web/views',
                    src: ['**/inc.js'],
                    dest: 'build/inc/js/'
                }]
            }
        },
        copy: {
            vendor: {
                expand: true,
                cwd: 'vendor',
                src: '**/*.js',
                dest: 'build/htdocs/js/lib/'
            },
            views: {
                expand: true,
                cwd: 'src/web/views',
                src: '**/*.php',
                dest: 'build/views/'
            },
            inc_js: {
                expand: true,
                cwd: 'src/web/views',
                src: '**/inc.js',
                dest: 'build/inc/js/'
            },
            main: {
                src: 'src/web/index.php',
                dest: 'build/htdocs/index.php'
            },
            mock: {
                expand: true,
                cwd: 'src/mock',
                src: '**',
                dest: 'build/mock/'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/web/views',
                    src: ['**/inc.scss'],
                    dest: 'build/inc/css/',
                    ext: '.css'
                }]
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        compress:{
                            warnings: false
                        }
                    })
                )
            },
            build_dev: {
                debug: true,
            }
        },
        watch: {
            js: {
                files: [
                    "src/web/**/*",
                    "!src/web/sass/**/*",
                    "!src/web/**/*.php",
                    "!src/web/**/*.css",
                    "!src/web/**/*.inc"
                ],
                tasks: ["webpack:build_dev"],
                options: {
                    spawn: false,
                }
            },
            sass: {
                files: ["src/web/sass/**/*", "src/web/views/**/inc.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false,
                }
            },
            views: {
                files: ["src/web/**/*.php"],
                tasks: ["copy:views"],
                options: {
                    spawn: false,
                }
            },
            inc_js: {
                files: ["src/web/**/inc.js"],
                tasks: ["copy:inc_js"],
                options: {
                    spawn: false,
                }
            },
            main: {
                files: ["src/web/index.php"],
                tasks: ["copy:main"],
                options: {
                    spawn: false,
                }
            },
            mock: {
                files: ["src/mock/**/*"],
                tasks: ["copy:mock"],
                options: {
                    spawn: false,
                }
            }
        }
    });
    grunt.registerTask("default", ["clean:vendor", "bower"]);
    grunt.registerTask("dev", ["clean:build", "copy", "sass", "webpack:build_dev", "watch"]);
    grunt.registerTask("build", ["clean:build", "uglify", "copy:views", "copy:main", "copy:mock", "sass", "webpack:build"]);
};