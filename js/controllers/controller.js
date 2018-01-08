var globalfunction = {};
myApp.controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

    .controller('headerctrl', function ($scope, TemplateService, $uibModal) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });

    })

    .controller('AccessController', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        // if ($.jStorage.get("accessToken")) {

        // } else {
        //     $state.go("login");
        // }
    })

    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };
    })

    .controller('CategoryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("category");
        $scope.menutitle = NavigationService.makeactive("Category");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
      
        $scope.formData = {};
        $scope.formData.page = 1;
        $scope.formData.type = '';
        $scope.formData.keyword = '';
      
        
      
        $scope.products =[{
          "name":"A"
        },{
          "name":"B"
        },{
          "name":"C"
        },{
          "name":"D"
        }];
      
        $scope.row=[];
        $scope.addRow=function(){
          var obj = {
            "name":[],
            "qnty":"",
            "qlty":"",
            "price":""
          }
          $scope.row.push(obj);
        }

        $scope.tagTransform = function (newTag) {
            var item = {
                name: newTag,
                "qnty":"",
                "qlty":"",
                "price":""
            };
            return item;
          };
        $scope.addRow();
      
        $scope.removeRow=function(index){
          $scope.row.splice(index,1);
        }
      });