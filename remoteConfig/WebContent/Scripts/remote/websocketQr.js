var Control = {};
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;
var timer = null;

//var ws = new WebSocket("ws://121.40.165.18:8800");
// var ws = new WebSocket("ws://49.234.18.41:8866");
var ws = new WebSocket("ws://47.98.214.12:5257");
// var ws = new WebSocket("ws://47.98.214.12:7271");
// console.log(ws.readyState);
ws.onopen = function () {
    // Web Socket 已连接上，使用 send() 方法发送数据
    console.log("websocket on");
};
ws.onerror = function () {
    layer.msg("连接失败");
};

// 将后台返回的消息提示框显示
ws.onmessage = function (evt) {
    layer.close(controlLoading);
    var received_msg = evt.data;
    if (received_msg === "基础参数数据更新成功") {
        var basic = remoteDetail.basic(rid)[0];
        basicFill(basic);
        layer.msg("成功", {
            time: 1000
        });
    } else if (received_msg === "通道参数数据更新成功") {
        layer.msg("成功", {
            time: 1000
        });
        $("#channelCard").empty();
        analogCardRender(remoteDetail.analogArray(rid));
        modbusCardRender(remoteDetail.modbusArray(rid));
    } else if (received_msg === "报警参数数据更新成功") {
        layer.msg("成功", {
            time: 1000
        });
        $("#avsCard").empty();
        avsCardRender(remoteDetail.avsArray(rid));
    } else if (received_msg === "sessionID不存在!") {
        layer.msg("设备已离线", {
            time: 1000
        });
    } else {
        layer.msg(received_msg);
    }
    console.log(received_msg);
};

var flag = node.tns;

Control.tnsRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":TNS" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.tnsWrite = function (tns) {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":TNS:" + tns + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.systemtimeWrite = function (systemtime) {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":TIME:" + systemtime + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.dateRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":DATE" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.dateWrite = function (date) {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":DATE:" + date + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.timeRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":TIME" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.timeWrite = function (time) {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":TIME:" + time + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.wmsRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":WMS" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.wmsWrite = function (wms) {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":WMS:" + wms + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.cstRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":CST" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.cstWrite = function (cst) {
    controlLoading = layer.load(2);
    cst = cst.split(":");
    var control = "NO:" + flag + ":CST:H:" + cst[0] + ":M:" + cst[1] + ":S:" + cst[2] + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};

Control.analogRead = function () {
    controlLoading = layer.load(2);
    control = "NO:" + flag + ":CSP:0" + analogIndex+ ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
        return;
    } else {
        ws.send(control);
    };
}
Control.analogWrite = function (params) {
    controlLoading = layer.load(2);
    control = "NO:" + flag + ":CSP:0" + params.index + ":S:" + params.s + ":A:" + params.a + ":T:0:P:02" + params.p + ":K:" + params.k + ":B:" + params.b + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
        return;
    } else {
        ws.send(control);
    };
}
Control.modbusRead = function () {
    controlLoading = layer.load(2);
    control = "NO:" + flag + ":CSM:0" + modbusIndex+ ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
        return;
    } else {
        ws.send(control);
    };
}
Control.modbusWrite = function (params) {
    controlLoading = layer.load(2);
    control = "NO:" + flag + ":CSM:0" + params.index + ":S:" + params.s + ":A:" + params.a + ":P:" + params.p0 + "|" + params.p1 + "|" + params.p2 + "|" + params.p3 + "|" + params.p4 + ":B:" + params.b + ":M:" + params.m + ":R:" + params.r + ":N:" + params.n + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
        return;
    } else {
        ws.send(control);
    };
}
Control.avsRead = function () {
    controlLoading = layer.load(2);
    control = "NO:" + flag + ":AVS:0" + avsIndex+ ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
        return;
    } else {
        ws.send(control);
    };
}
Control.avsWrite = function (params) {
    controlLoading = layer.load(2);
    control = "NO:" + flag + ":AVS:0" + params.index + ":" + params.h + ":" + params.l + ":" + params.a + ":" + params.s + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
        return;
    } else {
        ws.send(control);
    };
}

Control.dmsRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":DMS" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.dmsWrite = function (dms) {
    controlLoading = layer.load(2);
    if (dms.dizhi === "on") {
        dms = "01";
    } else if (dms.shuili === "on") {
        dms = "02";
    } else {
        dms = "00";
    }
    var control = "NO:" + flag + ":DMS:" + dms + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.clreRead = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":CLRE" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.clreClear = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":CLRE:00" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};
Control.clrsClear = function () {
    controlLoading = layer.load(2);
    var control = "NO:" + flag + ":CLRS:00" + ":END" + "\r\n";
    console.log(control);
    if (ws.readyState != 1) {
        layer.msg("连接失败");
        layer.close(controlLoading);
    } else {
        ws.send(control);
    };
};

function writeCurrentDate() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth(); //得到月份
    var date = now.getDate(); //得到日期
    var day = now.getDay(); //得到周几
    var hour = now.getHours(); //得到小时
    var minu = now.getMinutes(); //得到分钟
    var sec = now.getSeconds(); //得到秒

    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;


    var time = "";
    time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
    return time;
};