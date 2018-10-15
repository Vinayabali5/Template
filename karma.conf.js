// karma.conf.js
module.exports = function(config) {
    config.set({
        preprocessors: {
            '**/*.html': ['ng-html2js']
        },
        basePath: 'src/main/webapp/resources/',
        frameworks: ['bower', 'jasmine'],
        autoWatch: true,
        browsers: ['Chrome'], //,'Firefox'],
        files: [
            //'bower_components/angular/angular.js',
            'js/components/**/*.js',
            'js/app.dependencies.js',
            'js/app.config.js',
            'js/app.js',
            'js/**/*.directive.js',
            'js/**/*.module.js',
            'js/**/*.js',
            'tests/test.helpers.js',
            'tests/**/*.spec.js',
            '**/*.html',

        ],
        bowerPackages: [
            'jquery',
            'bootstrap',
            'ngstorage',
            'angular',
            'angular-mocks',
            'angular-resource',
            'angular-cookies',
            'angular-ui-router',
            'angular-material',
            'angular-bootstrap',
            'bootbox',
        ],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        ngHtml2JsPreprocessor: {
            stripPrefix: '',
            // stripSuffix: '.ext',
            prependPrefix: 'served/',

            cacheIdFromPath: function(filepath) {
                // console.log(filepath);
                return filepath;
            },

            moduleName: 'html'
        },
        debug: true,
    });
};
