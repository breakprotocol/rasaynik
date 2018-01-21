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

        $scope._ = _;

        $scope.formData = {
            "raw_materials": []
        };
        $scope.addRow = function () {
            var obj = {
                "raw_material_id": "",
                "raw_material_name": "",
                "raw_material_desc": "",
                "raw_material_quality": "",
                "raw_material_qty": "",
                "raw_material_unit": "",
                "raw_material_rate": "",
                "raw_material_amt": "",
                "totalAmt": "",
                "raw_material": {
                    "raw_material_id": "",
                    "raw_material_name": ""
                },
                "products": _.cloneDeep($scope.products)
            }
            $scope.formData.raw_materials.push(obj);
        }

        if ($stateParams.id) {
            $scope.view = false
            var obj = {
                "purchase_order_id": $stateParams.id
            }
            NavigationService.getOne('/purchase_request/getOne', obj, function (data) {
                $scope.formData = data[0];
                $scope.formData.raw_materials = data['raw_materials'];
            })
            $scope.readonly = true;
        } else {
            $scope.view = true;
            NavigationService.getAllRaw_materials('/raw_materials/getAll', $scope.data,
            function (data) {
                $scope.products = data;
                $scope.products.unshift({
                    'id': "",
                    "name": ""
                });
                $scope.addRow();
            });
           
            $scope.readonly = false;

        }

      

        $scope.removeRow = function (index) {
            $scope.formData.raw_materials.splice(index, 1);
        }

        $scope.setNewRaw = function (prod, val) {
            if (!_.isEmpty(val)) {
                prod[0].name = val;
            }
        }
        $scope.tp = {};

        $scope.saveData = function (formData) {
            console.log("formData.raw_materials", formData.raw_materials);
            formData.raw_materials = _.map(formData.raw_materials, function (n) {
                n = _.omit(n, ['products']);
                return n;
            });
            console.log("formData.raw_materials", formData);

            NavigationService.savePO('/purchase_request/create', formData, function (data) {
                console.log(data);
            })
        }

        $scope.submitApproveReject=function(obj){
            var raw_material = _.map(obj.raw_materials,function(n){
                return {
                    "raw_material_id":n.raw_material_id,
                    "status":n.status
                }
            });
            var saveObj={
                "type":"partial",
                "purchase_order_id":obj.purchase_order_id,
                "raw_materials":raw_material
            }
            console.log(saveObj);
            NavigationService.approveDecline('/purchase_request/approve',saveObj,function(data){
                console.log(data);
            })
        };
    })

    .controller('PurchaseOrderCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("purchaseorder");
        $scope.menutitle = NavigationService.makeactive("Purchase Order(PO)");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {};
        $scope.formData.page = 1;
        $scope.formData.type = '';
        $scope.formData.keyword = '';

        $scope.viewTable = function () {

            $scope.url = "/purchase_request/getAll";
            // $scope.search = $scope.formData.keyword;
            $scope.formData.page = $scope.formData.page++;
            NavigationService.apiCall($scope.url, $scope.formData, function (data) {
                $scope.formData = data
            });
        }
        $scope.viewTable();

        // NavigationService.getAllPO('/purchase_request/getAll', {
        //     "page": 1
        // }, function (data) {
        //     $scope.formData = data;
        // });

        NavigationService.getCount('/purchase_request/getCount', function (data) {
            $scope.totalItems = data;
        });

        $scope.viewTable = function () {
            var pagenumber = {
                "page": $scope.formData.page++
            };
            NavigationService.getAllPO('/purchase_request/getAll', pagenumber, function (data) {
                $scope.formData = data;
            });
        };



        // credentials--0 for PO Department
        // credentials--1 for admin 
        // change and see the dii=fference
        $.jStorage.set("profile", {
            'credentials': 0
        });
        $scope.profile = $.jStorage.get("profile");

        $scope.approveDecline = function (flag, item) {
            console.log(flag, item);
            var sendObj = {
                "type": "full",
                "purchase_order_id": item.purchase_order_id
            };

            if (flag == 1) {
                NavigationService.approveDecline('/purchase_request/approve', sendObj, function (data) {
                    if (data == 1) {
                        item.status = 'Complete'
                    }
                });
            } else if (flag == 0) {
                NavigationService.approveDecline('/purchase_request/decline', sendObj, function (data) {
                    if (data == 1) {
                        item.status = 'Rejected'
                    }
                });
            }

        }

      




    });