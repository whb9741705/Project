var Login = {};
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPath = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPath;
//var root = localhostPaht;
Login.check_remember = function() {
    $.ajax({
        type: "POST",
        url: root + "/User/GetCookie",
        async: true,
        cache: false,
        dataType: "json",
        success: function(result) { //请求成功时调用的函数    
            if (result.havecookie) {
                $('#username').val(result.username);
                $('#password').val(result.password);
                $('#checkbox').attr('checked', true);
                $("#ifrem").val("true");

            } else {
                console.log("havecookie等于false");
            }
        }
    });
}

Login.Login = function() {
    if ($("#username").val() == undefined) {
        $("#username").attr('placeholder', "用户名不能为空！");
    } else if ($("#username").val().length == 0) {
        $("#username").attr('placeholder', "用户名不能为空！");
    } else if ($("#password").val() == undefined) {
        $("#password").attr('placeholder', "密码不能为空！");
    } else if ($("#password").val().length == 0) {
        $("#password").attr('placeholder', "密码不能为空！");
    } else {
        var username = $("#username").val();
        var password = $("#password").val();
        var ifrem = $("#ifrem").val();
        $.ajax({
            async: true,
            type: "POST",
            url: root + "/CheckLogin",
            data: { "username": username, "password": password, "ifrem": ifrem },
            dataType: "json",
            cache: false,
            success: function(data) {

                if (data) {
                    //if(username=="XAXYGMJC") window.location = "./Sensor/Index.html";  
                    window.location = "./configurate/index.html";

                } else {
                    console.log("密码错误");
                    alert("用户名或密码错误");
                    // layer.msg('用户名或密码错误！', { icon: 1, time: 1000 });
                }
            },
            error: function(XmlHttpRequest, textStatus, errorThrown) {
                $("#errtip").html("服务器地址错误" + XmlHttpRequest.responseText);
            }
        });
    }
}
Login.authorize = function() {
    if ($("#username").val() == undefined) {
        $("#username").attr('placeholder', "用户名不能为空！");
    } else if ($("#username").val().length == 0) {
        $("#username").attr('placeholder', "用户名不能为空！");
    } else if ($("#password").val() == undefined) {
        $("#password").attr('placeholder', "密码不能为空！");
    } else if ($("#password").val().length == 0) {
        $("#password").attr('placeholder', "密码不能为空！");
    } else {
        var username = $("#username").val();
        var password = $("#password").val();
        var ifrem = "false";
        $.ajax({
            async: true,
            type: "POST",
            url: "../CheckLogin",
            data: { "username": username, "password": password, "ifrem": ifrem },
            dataType: "json",
            cache: false,
            success: function(data) {
                if (data) {
                    $("#loginPage").addClass("layui-hide");
                } else {
                    console.log("密码错误");
                    alert("用户名或密码错误");
                    // layer.msg('用户名或密码错误！', { icon: 1, time: 1000 });
                }
            },
            error: function(XmlHttpRequest, textStatus, errorThrown) {
                $("#errtip").html("服务器地址错误" + XmlHttpRequest.responseText);
            }
        });
    }
}

Login.check_rem = function() {
        $.ajax({
            type: "POST",
            url: "../User/GetCookie",
            async: true,
            cache: false,
            dataType: "json",
            success: function(result) { //请求成功时调用的函数    
                console.log(result);
                if (result.havecookie);
                else {
                    window.location = "../index.html";
                }
            }
        });
    }
    /*Login.Login = function () {
        $('#errtip').html("");
        if ($.trim($('#iusername').val()) == "" || $.trim($('#ipassword').val()) == "") {
            $('#errtip').html("请输入用户名和密码！");
            return;
        }
        var c1 = $('#rempwd').attr('checked');
        $.ajax({
            type: "POST",
            url:root+"/CheckLogin",
            data: { 'uname': $('#iusername').val(), 'upwd': $('#ipassword').val(), 'rpwd': c1 },
            async: true,
            cache: false,
            success: function (msg) { //请求成功时调用的函数
                if (msg=="success") {            	  
                    window.location = "./Home/Index.html";
                } else {
                    $('#ipassword').val('');
                    $('#errtip').html(msg);
                    // alert(msg.errmsg);
                }
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                $("#errtip").html("服务器地址错误" + XmlHttpRequest.responseText);
            }
        });
    };*/

Login.LogOut = function() {
    var passWrd = prompt("您确定要退出平台吗?\n请输入账户密码", ""); //将输入的内容赋给变量 passWrd ，  		  
    //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值  
    if (passWrd) //如果返回的有内容  
    {
        $.ajax({
            type: "POST",
            url: root + "/User/GetCookie",
            async: true,
            cache: false,
            dataType: "json",
            success: function(result) { //请求成功时调用的函数   	        
                if (result.havecookie) {
                    var pw = result.password;
                    if (passWrd == pw) {
                        window.location = "../User/Logout";
                    } else
                        alert("密码不正确，请重新输入！");
                }
            }
        });
    } else if (passWrd === "") {
        alert("密码不能为空！");
    }
};

/*Login.CheckCookie = function () {

    $.ajax({
        type: "POST",
        url: root+"/User/GetCookie",
        async: true,
        cache: false,
        success: function (result) { //请求成功时调用的函数           
            if (result.havecookie) {
                $('#iusername').val(result.username);
                $('#ipassword').val(result.password);
                //if (result.remember) {
                
                    $('#rempwd').attr('checked', true);
                    $('#lab').addClass('ui-state-active');
                alert("Login.CheckCookie！");
                //}
               // else {
                //    $('#rempwd').attr('checked', false);
               // }

            }
        }
    });
};*/

Login.GetCookie = function() {

    $.ajax({
        type: "POST",
        url: root + "/User/GetCookie",
        async: true,
        cache: false,
        dataType: "json",
        success: function(result) { //请求成功时调用的函数 
            if (result.havecookie) {
                $('#usershowname').html("您好," + result.username);
            } else {
                window.location = "../login.html";
            }
            //alert($('#rempwd').attr('checked'));
        }
    });
};

Login.GetUserName = function() {
    //var username0 = "0";
    $.ajax({
        type: "POST",
        url: root + "/User/GetCookie",
        async: false,
        cache: false,
        dataType: "json",
        success: function(result) { //请求成功时调用的函数        	
            if (result.havecookie) {
                username0 = result.username;
            } else {
                window.location = "../login.html";
                username0 = "0";
            }
        }
    });
    //console.log(username0);
    return username0;
};
document.onkeydown = function(e) {

    //获得键盘按下事件,支持ie，ff，google，safari，opera  
    var loginae = (typeof event != 'undefined') ? window.event : e;
    if (loginae.keyCode == 13 || loginae.which == 13) {
        Login.Login();
    }
}