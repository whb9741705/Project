/**
 * 
 */
 var chart= {};
 
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;
 chart.getoption=function (user,st,et,tns){
    var chartdata = new Array();
    $.ajax({
        type: "GET",
        url: "../RemoteVoltage",
        dataType: "json",
        data: {
            user: user,
            tns:tns,
            st:st,
            et:et,
        },
        async: false,
        success: function (result) {
            chartdata = result;
        }
    });
    return chartdata;
}