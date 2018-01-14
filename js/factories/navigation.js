var imgurl = adminurl + "/upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;



myApp.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Category",
            classis: "activeColor",
            sref: "#/category",
            icon: "phone"
        },{
            name: "Purchase Order(PO)",
            classis: "activeColor",
            sref: "#/purchaseorder",
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
                callback(data.data);
            });
        }
    };
});