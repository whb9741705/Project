var remoteDetail = {};
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;
remoteDetail.authority = function (user,pwd){
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteLogin",
        dataType: "json",
        data: {
            user: user,
            pwd: pwd
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }
    });
    return remoteDetail;
}
remoteDetail.basic = function (tns) {
	//console.log(tns);
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteBasic",
        dataType: "json",
        data: {
            tns: tns,
            user: user
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }
    });
    //console.log("aa"+remoteDetail);
    return remoteDetail;
}
remoteDetail.dtu = function (tns,channel) {
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteDtu",
        dataType: "json",
        data: {
            tns: tns,
            channel:channel,
            user: user
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }
    });
    //console.log(remoteDetail);
    return remoteDetail;
}
remoteDetail.voltage = function (tns) {
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteVoltage",
        dataType: "json",
        data: {
            tns: tns
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }
    });
    return remoteDetail;
}
remoteDetail.channel = function (tns,channel) {
	//window.alert(tns,channel);
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteChannel",
        dataType: "json",
        data: {
            tns: tns,
            channel:channel
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }

    });
    return remoteDetail;
}

remoteDetail.pulse = function (tns,channel) {
	//window.alert(tns,channel);
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteChannel",
        dataType: "json",
        data: {
            tns: tns,
            channel:channel
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }

    });
    return remoteDetail;
}

remoteDetail.relay = function (tns,channel) {
	//window.alert(tns,channel);
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteChannel",
        dataType: "json",
        data: {
            tns: tns,
            channel:channel
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }

    });
    return remoteDetail;
}

remoteDetail.CSM = function (tns,channel) {
	//window.alert(tns,channel);
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteCSM",
        dataType: "json",
        data: {
            tns: tns,
            channel:channel
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }

    });
    //console.log(length);
    //console.log(remoteDetail);
    return remoteDetail;
}

remoteDetail.analogArray = function (rid) {
    var result = remoteDetail.channel(rid)[0];
    var analogParams = new Array();
    for (var i = 1; i < 7; i++) {
        var channel = {};
        for (var key in result) {
            if (key.toString() == "csp" + i + "s") {
                channel.s = result[key];
            }
            else if (key.toString() == "csp" + i + "a") {
                channel.a = result[key];
            }
            else if (key.toString() == "csp" + i + "p") {
                channel.p = result[key];
            }
            else if (key.toString() == "csp" + i + "k") {
                channel.k = result[key];
            }
            else if (key.toString() == "csp" + i + "b") {
                channel.b = result[key];
            }
        }
        channel.index = i;
        analogParams.push(channel);
    }
    return analogParams;
}
remoteDetail.modbusArray = function (rid) {
    var result = remoteDetail.channel(rid)[0];
    var modbusParams = new Array();
    for (var i = 1; i < 5; i++) {
        var channel = {};
        for (var key in result) {
            if (key.toString() == "csm" + i + "s") {
                channel.s = result[key];
            }
            else if (key.toString() == "csm" + i + "a") {
                channel.a = result[key];
            }
            else if (key.toString() == "csm" + i + "p0") {
                channel.p0 = result[key];
            }
            else if (key.toString() == "csm" + i + "p1") {
                channel.p1 = result[key];
            }
            else if (key.toString() == "csm" + i + "p2") {
                channel.p2 = result[key];
            }
            else if (key.toString() == "csm" + i + "p3") {
                channel.p3 = result[key];
            }
            else if (key.toString() == "csm" + i + "p4") {
                channel.p4 = result[key];
            }
            else if (key.toString() == "csm" + i + "b") {
                channel.b = result[key];
            }
            else if (key.toString() == "csm" + i + "m") {
                channel.m = result[key];
            }
            else if (key.toString() == "csm" + i + "r") {
                channel.r = result[key];
            }
            else if (key.toString() == "csm" + i + "n") {
                channel.n = result[key];
            }
        }
        channel.index = i;
        modbusParams.push(channel);
    }
    return modbusParams;
}
remoteDetail.avs = function (rid) {
    var length = 0;
    var remoteDetail = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteAvs",
        dataType: "json",
        data: {
            rid: rid
        },
        async: false,
        success: function (result) {
            length = result.total;
            remoteDetail = result.rows;
        }

    });
    return remoteDetail;
}
remoteDetail.avsArray = function (rid) {
    var result = remoteDetail.avs(rid)[0];
    var avsParams = new Array();
    for (var i = 1; i < 7; i++) {
        var channel = {};
        for (var key in result) {
            if (key.toString() == "avs" + i + "a") {
                channel.a = result[key];
            }
            else if (key.toString() == "avs" + i + "h") {
                channel.h = result[key];
            }
            else if (key.toString() == "avs" + i + "l") {
                channel.l = result[key];
            }
            else if (key.toString() == "avs" + i + "s") {
                channel.s = result[key];
            }
        }
        channel.index = i;
        avsParams.push(channel);
    }
    return avsParams;
}