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
    $stateProvider

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        //category
        .state('category', {
            url: "/category/:id",
            templateUrl: "views/template.html",
            controller: 'CategoryCtrl'
        })

         //purchaase order
        .state('purchase-order', {
            url: "/purchaseorder",
            templateUrl: "views/template.html",
            controller: 'PurchaseOrderCtrl'
        })

        .state('store-room-entry', {
            url: "/storeroomentry",
            templateUrl: "views/template.html",
            controller: 'StoreRoomEntryCtrl'
        })

        .state('store-room', {
            url: "/storeroom",
            templateUrl: "views/template.html",
            controller: 'StoreRoomCtrl'
        })

        .state('request-raw-material', {
            url: "/requestrawmaterial",
            templateUrl: "views/template.html",
            controller: 'RequestRawMaterialCtrl'
        })   
        
        .state('list-request-raw-material', {
            url: "/listreqrawmaterial",
            templateUrl: "views/template.html",
            controller: 'ListRequestRawMaterialCtrl'
        })
        
        .state('store-room-exit', {
            url: "/storeroomexit",
            templateUrl: "views/template.html",
            controller: 'StoreRoomExitCtrl'
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
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            controller: 'RegisterCtrl'
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