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

        var profile = $.jStorage.get('profile');
        console.log("profile", profile);
        // if (!profile) {
        //     $state.go('login')
        // }
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

        $scope.profile = $.jStorage.get("profile");
        console.log($scope.profile);

        $scope.template = TemplateService.changecontent("register");
        $scope.menutitle = NavigationService.makeactive("Register");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


        $showRegisterbool = false;
        $scope.successMessagebol = false;
        // if($jStorage.get("profile"))
        // {
        //     console.log("error");
        // }
        if ($scope.profile == 0) {
            $showRegisterbool = true;
        }

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

    //Purchase Order Lists
    .controller('PurchaseOrderCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file

        $scope.profile = $.jStorage.get("profile");
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

    //Purchase Order -create/edit
    .controller('CategoryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.cred = $.jStorage.get("profile").credentials;
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
            //-edit/view
            $scope.readonly = true;
            $scope.create = false;

            $scope.view = false;

            var obj = {
                "purchase_order_id": $stateParams.id
            }
            NavigationService.getOne('/purchase_request/getOne', obj, function (data) {
                $scope.formData = data[0];
                $scope.formData.raw_materials = data['raw_materials'];
            })

            $scope.saveData = function (obj) {
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
                    if (data == "true" || data == 1 || data == true) {
                        toastr.success("Order Placed Successfully", "Successful");
                        $state.go("purchase-order");
                    }
                })
            };

        } else {
            //-create
            $scope.readonly = false;
            $scope.create = true;

            NavigationService.getPONumber(function (num) {
                $scope.formData.purchase_order_id = num;
            });
            $scope.create = true;
            $scope.view = true;
            $scope.createNew = true;
            NavigationService.getAllRaw_materials('/raw_materials/getAll', $scope.data,
                function (data) {
                    $scope.products = data;
                    $scope.products.unshift({
                        'id': "",
                        "name": ""
                    });
                    $scope.addRow();
                });

            $scope.saveData = function (formData) {
                console.log("formData.raw_materials", formData.raw_materials);
                formData.raw_materials = _.map(formData.raw_materials, function (n) {
                    n = _.omit(n, ['products']);
                    return n;
                });
                formData.totalAmt = _.sumBy(formData.raw_materials, 'raw_material_amt');
                NavigationService.savePO('/purchase_request/create', formData, function (data) {
                    console.log("data", data);
                    if (data == "true" || data == 1 || data == true) {
                        toastr.success("Order Placed Successfully", "Successful");
                        $state.go("purchase-order");
                    }
                })
            }


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
        $scope.template = TemplateService.changecontent("reqrawmateial");
        $scope.menutitle = NavigationService.makeactive("Req Raw Materials");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.profile = $.jStorage.get("profile");

        $scope.formData = {
            "raw_materials": []
        };

        $scope.addRow = function () {
            var obj = {
                "raw_material_qty": "",
                "raw_material_unit": "",
                "raw_material": {
                    "raw_material_id": "",
                    "raw_material_name": ""
                },
                "products": _.cloneDeep($scope.products),
                "isValid": false
            }
            $scope.formData.raw_materials.push(obj);
        };


        if ($stateParams.id) {
            $scope.readonly = true;
            $scope.create = false;
        } else {
            $scope.readonly = false;
            $scope.create = true;
            $scope.saveData = function (formData) {
                var index = _.findIndex(formData.raw_materials, ['isValid', false]);
                console.log(index);
                if (index != -1) {
                    toastr.error("Please Correct The Data Before Submitting");
                } else {
                    formData.raw_materials = _.map(formData.raw_materials, function (n) {
                        n = _.omit(n, ['products', 'isValid', 'minimum']);
                        return n;
                    });
                    NavigationService.save('/product_request/create', formData, function (data) {
                        if (data == "true" || data == 1 || data == true) {
                            toastr.success("Request Raised Successfully", "Successful");
                            $state.go("list-request-raw-material");
                        }else{
                            toastr.error("Something Went Wrong", "Error");
                            $state.go("list-request-raw-material");
                        }
                    })
                }
            }
        }

        $scope.removeRow = function (index) {
            $scope.formData.raw_materials.splice(index, 1);
        }

        NavigationService.getAllRaw_materials('/store_room/getAllRawMaterials', $scope.data,
            function (data) {
                $scope.products = data;
                $scope.products.unshift({
                    'id': "",
                    "name": ""
                });
                $scope.addRow();
            });

        $scope.isValid = function (item, requested) {
            console.log(requested, item, requested > item.minimum);
            if (requested > parseInt(item.minimum)) {
                toastr.error("Requested Quantity Is Out Of Stock");
                item.isValid = false;
            } else {
                item.isValid = true;
            }
        }

        $scope.assign = function (min, item) {
            console.log(min);
            item.minimum = min;
        }
    })

    .controller('ListRequestRawMaterialCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("listreqrawmaterial");
        $scope.menutitle = NavigationService.makeactive("Req Raw Materials");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.profile = $.jStorage.get("profile");

        NavigationService.getAll('/product_request/getAll', function (data) {
            $scope.items = data;
        });

    })

    .controller('StoreRoomExitCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("storeroomexit");
        $scope.menutitle = NavigationService.makeactive("Store Room Exit");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.profile = $.jStorage.get("profile");

        NavigationService.getAll('/product_request/getAll', function (data) {
            $scope.items = data;
        });

        $scope.approveDecline = function (flag, item) {
            console.log(flag, item);
            var sendObj = {
                "store_room_exit_id": item.request_id
            };
            if (flag == 1) {
                NavigationService.approveDecline('/store_room_exit/accept', sendObj, function (data) {
                    if (data == 1) {
                        item.request_status = 'Complete'
                    }
                });
            } else if (flag == 0) {
                NavigationService.approveDecline('/store_room_exit/decline', sendObj, function (data) {
                    if (data == 1) {
                        item.request_status = 'Rejected'
                    }
                });
            }

        }
    })

    .controller('ManageUserCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("manageuser");
        $scope.menutitle = NavigationService.makeactive("Manage User");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.profile = $.jStorage.get("profile");
        $scope.getAllUser = function () {
            NavigationService.getAll('/login/getAll', function (data) {
                $scope.items = data;
            });
        };
        $scope.getAllUser();

        // DELETE
        $scope.confDel = function (data) {
            $scope.deleteId = data;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/delete.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                scope: $scope
            });
        };

        $scope.noDelete = function () {
            $scope.modalInstance.close();
        }

        $scope.delete = function (username) {
            // console.log(data);
            var url = "/login/disableUser";
            var obj = {};
            obj.username = username;
            NavigationService.delete(url, obj, function (data) {
                console.log(data);
                // alert("outside");

                if (data == '1' || data == "true" || data == 1) {
                    // alert("inside");
                    toastr.success('User ' + username + ' Successfully Deleted');
                    $scope.modalInstance.close();
                    $scope.getAllUser();
                } else {
                    toastr.error('Something Went Wrong while Deleting');
                }
            });
        }
        // DELETE END


    })

    .controller('EditUserCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.profile = $.jStorage.get("profile");
        $scope.template = TemplateService.changecontent("edituser");
        $scope.menutitle = NavigationService.makeactive("Manage User");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {
            "username": $stateParams.username
        };

        $scope.update = function (formData) {
            NavigationService.getAll('/login/changePassword', function (data) {
                if (data == '1' || data == "true" || data == 1) {
                    // alert("inside");
                    toastr.success('User ' + formData.username + ' Updated Successfully');

                    $state.go('manage-users');
                } else {
                    toastr.error('Something Went Wrong while Updating');
                }
            });
        };

    });