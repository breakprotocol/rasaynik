// JavaScript Document
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap",
    'ui.bootstrap',
    'ui.select',
    'toastr',
    'textAngular',
    'angular-flexslider',
    'imageupload',
    'ngMap',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.sortable',
    'ui.date'
]);

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        //category
        .state('category', {
            url: "/category",
            templateUrl: "views/template.html",
            controller: 'CategoryCtrl'
        })
      
      
        //sports
       
        .state('page', {
            url: "/page/:id/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'PageJsonCtrl'
        })
        // .state('page', {
        //     url: "/page/:id/{page:.*}/{keyword:.*}/{filter:.*}",
        //     templateUrl: "views/template.html",
        //     controller: 'PageJsonCtrl'
        // })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        
        .state('schema-creator', {
            url: "/schema-creator",
            templateUrl: "views/template.html",
            controller: 'SchemaCreatorCtrl'
        })

        .state('excel-upload', {
            url: "/excel-upload/:controller/:funcName/:view",
            templateUrl: "views/template.html",
            controller: 'ExcelUploadCtrl'
        })
        
        //Event pdf
        .state('tablepdf', {
            url: "/tablepdf",
            templateUrl: "views/template.html",
            controller: 'TablePdfCtrl'
        })
        .state('detailpdf', {
            url: "/detailpdf/:id",
            templateUrl: "views/template.html",
            controller: 'DetailPdfCtrl'
        })
        //detailmatches
        .state('detailmatches', {
            url: "/detailmatches",
            templateUrl: "views/template.html",
            controller: 'DetailMatchesCtrl'
        })
        // ***************EDIT PAGES FOR DIGITAL SCORING *******************
        
        .state('jagz', {
            url: "/jagz",
            templateUrl: "views/jagz.html",
            controller: 'JagzCtrl'
        })

        .state('loginapp', {
            url: "/login/:id",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        });

    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(false).hashPrefix('');
    // $locationProvider.html5Mode(isproduction);
});

myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});