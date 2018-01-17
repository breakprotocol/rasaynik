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

        if($stateParams.id){
            $scope.view=false
            var obj={
                "request_id":$stateParams.id
            }
            NavigationService.getOne('/po_request/getOne',obj,function(data){
                $scope.formData = data;
            })
        }else{
            $scope.view=true;
        }

        $scope.raw_materials = NavigationService.getAllRaw_materials('/raw_materials/getAll',$scope.data,
            function(data){
                $scope.products=data;
                $scope.products.unshift("");
            });
      
        $scope.formData={
            "raw_materials":[]
        };
        $scope.addRow=function(){
          var obj = {
            "raw_material_id":"",
            "raw_material_name":"",
            "raw_material_desc":"",
            "raw_material_quality":"",
            "raw_material_qty":"",
            "raw_material_unit":"",
            "raw_material_rate":"",
            "raw_material_amt":"",
            "totalAmt":""
          }
          $scope.formData.raw_materials.push(obj);
        }


        $scope.refreshItems=function(tag){
            console.log(tag);
            $scope.products[0].name=tag;
            // $scope.$apply();
            
        };
        $scope.addRow();
      
        $scope.removeRow=function(index){
          $scope.formData.raw_materials.splice(index,1);
        }

        $scope.saveData = function(formData){
          
            NavigationService.savePO('/purchase_request/create',formData,function(data){
                console.log(data);
            })
        }
      })

      .controller('PurchaseOrderCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("purchaseorder");
        $scope.menutitle = NavigationService.makeactive("Purchase Order(PO)");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        NavigationService.getAllPO('/po_request/getAll',function(data){
            $scope.formData=data;
        });
      
        $scope.formData = {};
        $scope.formData.page = 1;
        $scope.formData.type = '';
        $scope.formData.keyword = '';
      
        // credentials--0 for PO Department
        // credentials--1 for admin 
        // change and see the dii=fference
        $.jStorage.set("profile",{'credentials':0});
        $scope.profile = $.jStorage.get("profile");
        
        // $scope.products =[{
        //     "name":"A"
        //   },{
        //     "name":"B"
        //   },{
        //     "name":"C"
        //   },{
        //     "name":"D"
        //   }];
        
        //   $scope.row=[];
        //   $scope.addRow=function(){
        //     var obj = {
        //       "name":"A",
        //       "qnty":12,
        //       "qlty":22,
        //       "price":200,
        //       "status":0

        //     }
        //     $scope.row.push(obj);
        //   }
        //   $scope.addRow();


        
       
      });