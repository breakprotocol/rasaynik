var imgurl = adminurl + "/upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;



myApp.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Purchase Order(PO)",
            classis: "activeColor",
            sref: "#/purchaseorder",
            icon: "phone"
        },{
            name: "Store Room Entry",
            classis: "activeColor",
            sref: "#/storeroomentry",
            icon: "phone"
        },{
            name: "Store Room",
            classis: "activeColor",
            sref: "#/storeroom",
            icon: "phone"
        },{
            name: "Req Raw Materials",
            classis: "activeColor",
            sref: "#/requestrawmaterial",
            icon: "phone"
        },{
            name: "Products",
            classis: "activeColor",
            sref: "#/products",
            icon: "phone"
        }
    ];

    return {
        getnav: function () {
            return navigation;
        },

        parseAccessToken: function (data, callback) {
            if (data) {
                $.jStorage.set("accessToken", data);
                callback();
            }
        },

        removeAccessToken: function (data, callback) {
            $.jStorage.flush();
        },

        profile: function (callback, errorCallback) {
            var data = {
                accessToken: $.jStorage.get("accessToken")
            };
            $http.post(adminurl + 'user/profile', data).then(function (data) {
                data = data.data;
                if (data.value === true) {
                    $.jStorage.set("profile", data.data);
                    callback();
                } else {
                    errorCallback(data.error);
                }
            });
        },

        login:function(url,data,callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                callback(data.data);
            });
        },

        register:function(url,data,callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                callback(data.data);
            });
        },

        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "activeColor";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        delete: function (url, data, callback) {
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                console.log(data.data);
            });
        },

        getAllRaw_materials: function (url, data, callback) {
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                callback(data.data);
            });
        },

        savePO: function(url,data,callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                callback(data.data);
            });
        },

        getAllPO: function(url,pagenumber,callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data:pagenumber
            }).then(function (data) {
                callback(data.data);
            });
        },

        getOne:function(url,data,callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                callback(data.data);
            });
        },

        getCount:function(url,callback){
            $http({
                method: "POST",
                url: adminurl + url
            }).then(function (data) {
                callback(data.data);
            });
        },

        apiCall: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },

        approveDecline: function(url, formData, callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data: formData
            }).then(function (data) {
                callback(data.data);
            });
        },

        save: function(url,data,callback){
            $http({
                method: "POST",
                url: adminurl + url,
                data: data
            }).then(function (data) {
                callback(data.data);
            });
        },

        getReqNo:function(url,callback){
            // $http({
            //     method: "POST",
            //     url: adminurl + url,
            //     data: data
            // }).then(function (data) {
            //     callback(121);
            // });
            callback(121);
        }
       
    };
});