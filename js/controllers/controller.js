var globalfunction = {};
myApp.controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

    .controller('headerctrl', function ($scope, TemplateService, $uibModal, $state) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });

        var profile = $.jStorage.get("profile");

        if (!profile) {
            $state.go('login')
        }
    })

    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $uibModal, $state) {
        $.jStorage.flush();
        $scope.template = TemplateService;
        $scope.formData = {};
        $scope.goRegister = function () {
            $state.go("register");
        }
        $scope.login = function (formData) {
            console.log(formData);
            $scope.LoginFailurebool = false;
            NavigationService.login('/login/login', formData, function (data) {
                console.log(data.success);
                if (data.success == "false") {
                    console.log("data.success");
                    $scope.LoginFailurebool = true;
                    $scope.LoginFailureMessage = "Incorrect Creds,Go send the valid user!!";
                    $state.go('login');
                } else {
                    $.jStorage.set("profile", {
                        'credentials': data.access
                    });
                    $state.go("purchase-order");
                }

            });
        }
    })

    .controller('RegisterCtrl', function ($scope, TemplateService, NavigationService, $uibModal, $state, $timeout) {
        $showRegisterbool = false;
        $scope.successMessagebol = false;
        // if($jStorage.get("profile"))
        // {
        //     console.log("error");
        // }
        if ($scope.profile == 0) {
            $showRegisterbool = true;
        }
        $scope.template = TemplateService;
        $scope.formData = {};
        $scope.register = function (formData) {
            console.log(formData);
            NavigationService.register('/login/register', formData, function (data) {
                console.log(data);
                $.jStorage.set("profile", {
                    'credentials': data
                });
                $scope.successMessage = "User Registered successfully. Redirecting to login page";
                $scope.successMessagebol = true;
                $timeout(function () {
                    $state.go('login');
                }, 3000);

                //  $state.go("purchase-order");
            });
        }
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
        $scope.profile = $.jStorage.get("profile");
        console.log($scope.profile);
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

        $scope.submitApproveReject = function (obj) {
            var raw_material = _.map(obj.raw_materials, function (n) {
                return {
                    "raw_material_id": n.raw_material_id,
                    "status": n.status
                }
            });
            var saveObj = {
                "type": "partial",
                "purchase_order_id": obj.purchase_order_id,
                "raw_materials": raw_material
            }
            console.log(saveObj);
            NavigationService.approveDecline('/purchase_request/approve', saveObj, function (data) {
                console.log(data);
            })
        };
    })

    .controller('PurchaseOrderCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file

        $scope.profile = $.jStorage.get("profile");
        console.log("profile",$scope.profile);
        $scope.template = TemplateService.changecontent("purchaseorder");
        $scope.menutitle = NavigationService.makeactive("Purchase Order(PO)");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {};
        $scope.formData.page = 1;
        $scope.formData.type = '';
        $scope.formData.keyword = '';

        NavigationService.getCount('/purchase_request/getCount', function (data) {
            $scope.totalItems = data;
        });

        $scope.viewTable = function () {

            $scope.url = "/purchase_request/getAll";
            // $scope.search = $scope.formData.keyword;
            $scope.formData.page = $scope.formData.page++;
            NavigationService.apiCall($scope.url, $scope.formData, function (data) {
                $scope.items = data
            });
        }
        $scope.viewTable();



        // credentials--0 for PO Department
        // credentials--1 for admin 
        // change and see the dii=fference
        // $.jStorage.set("profile", {
        //     'credentials': 0
        // });

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

    })

    .controller('StoreRoomEntryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file

        $scope.profile = $.jStorage.get("profile");
        console.log($scope.profile);
        $scope.template = TemplateService.changecontent("storeroomentry");
        $scope.menutitle = NavigationService.makeactive("Store Room Entry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {};
        $scope.formData.page = 1;
        $scope.formData.type = '';
        $scope.formData.keyword = '';

        NavigationService.getCount('/store_room_entry/getCount', function (data) {
            $scope.totalItems = data;
        });

        $scope.searchInTable = function (data) {
            $scope.formData.page = 1;
            if (data.length >= 2) {
                $scope.formData.keyword = data;
                $scope.viewTable();
            } else if (data.length == '') {
                $scope.formData.keyword = data;
                $scope.viewTable();
            }
        }
        $scope.viewTable = function () {

            $scope.url = "/store_room_entry/getAll";
            // $scope.search = $scope.formData.keyword;
            $scope.formData.page = $scope.formData.page++;
            NavigationService.apiCall($scope.url, $scope.formData, function (data) {
                console.log("data.value", data);
                $scope.items = data;
            });
        }
        $scope.viewTable();

        $scope.items = [{
            "store_room_entry_id": 1,
            "name": "pratik patel",
            "type": "by-product",
            "quantity": "12"
        }, {
            "store_room_entry_id": 2,
            "name": "Vishal Singh",
            "type": "raw_material",
            "quantity": "22"
        }, {
            "store_room_entry_id": 3,
            "name": "Abhishek",
            "type": "qwerty",
            "quantity": "12"
        }, {
            "store_room_entry_id": 4,
            "name": "Ashish Raina",
            "type": "by-product",
            "quantity": "134"
        }];

        $scope.approveDecline = function (obj, flag) {
            console.log();
            var sendObj = {
                "store_room_entry_id": obj.id
            }
            var url = "";
            if (flag == 1) {
                url = "/store_room_entry/accept";
            } else if (flag == 0) {
                url = "/store_room_entry/decline"
            }

            NavigationService.approveDecline(url, sendObj, function (data) {
                console.log(data);
                if (flag == 1) {
                    item.status = "approve";
                } else if (flag == 0) {
                    item.status = "reject";
                }
            });

        }
    })

    .controller('StoreRoomCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("storeroom");
        $scope.menutitle = NavigationService.makeactive("Store Room");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {};
        $scope.formData.page = 1;

        $scope.filterKeys = ["name", "desc", "minQty", "qtyAvail", "loc", "type"];

        $scope.search = "";

        NavigationService.getCount('/store_room/getCount', function (data) {
            $scope.totalItems = data;
        });

        $scope.searchInTable = function (data) {
            $scope.formData.page = 1;
            if (data.length >= 2) {
                $scope.formData.keyword = data;
                $scope.viewTable();
            } else if (data.length == '') {
                $scope.formData.keyword = data;
                $scope.viewTable();
            }
        }
        $scope.viewTable = function () {

            $scope.url = "/store_room/getAll";
            // $scope.search = $scope.formData.keyword;
            $scope.formData.page = $scope.formData.page++;
            NavigationService.apiCall($scope.url, $scope.formData, function (data) {
                console.log("data.value", data);
                $scope.items = data;
            });
        }
        $scope.viewTable();


        // $scope.formData.stock = [{
        //     "name": "pratik patel",
        //     "desc": "pratik patel wohlig",
        //     "minQty": 10,
        //     "qtyAvail": 20,
        //     "loc": "Sion",
        //     "type": "by-product"
        // }, {
        //     "name": "Vishal Singh",
        //     "desc": "Vishal Singh Barcleys",
        //     "minQty": 20,
        //     "qtyAvail": 40,
        //     "loc": "Pune",
        //     "type": "raw_material"
        // }, {
        //     "name": "Abhishek",
        //     "desc": "Abhishek Zeus",
        //     "minQty": 10,
        //     "qtyAvail": 20,
        //     "loc": "Vichroli",
        //     "type": "qwerty"
        // }, {
        //     "name": "Ashish Raina",
        //     "desc": "Ashish Raina Net Magic",
        //     "minQty": 10,
        //     "qtyAvail": 20,
        //     "loc": "Kamothe",
        //     "type": "by-product"
        // }];
    })

    .controller('ProductsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("products");
        $scope.menutitle = NavigationService.makeactive("Products");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {};
        $scope.formData.page = 1;

        $scope.filterKeys = ["name", "desc", "minQty", "qtyAvail", "loc", "type"];

        $scope.search = "";

        $scope.searchInTable = function (data) {
            $scope.formData.page = 1;
            if (data.length >= 2) {
                $scope.formData.keyword = data;
                $scope.viewTable();
            } else if (data.length == '') {
                $scope.formData.keyword = data;
                $scope.viewTable();
            }
        }

        $scope.viewTable = function () {

            $scope.url = "/store_room_entry/getAll";
            // $scope.search = $scope.formData.keyword;
            $scope.formData.page = $scope.formData.page++;
            NavigationService.apiCall($scope.url, $scope.formData, function (data) {
                console.log("data.value", data);
                $scope.items = data.data;
            });
        }
        $scope.viewTable();
    })

    .controller('RequestRawMaterialCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("createproduct");
        $scope.menutitle = NavigationService.makeactive("Req Raw Materials");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.profile = $.jStorage.get("profile");

        $scope.formData = {
            "raw_materials": []
        };

        NavigationService.getReqNo('//', function (data) {
            $scope.formData.reqNo = data;
        })


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
        };

        $scope.removeRow = function (index) {
            $scope.formData.raw_materials.splice(index, 1);
        }

        NavigationService.getAllRaw_materials('/raw_materials/getAll', $scope.data,
            function (data) {
                $scope.products = data;
                $scope.products.unshift({
                    'id': "",
                    "name": ""
                });
                $scope.addRow();
            });

    });