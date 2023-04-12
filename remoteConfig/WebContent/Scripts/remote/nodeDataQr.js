$(function () {
    // 主页跳转
    $("#pageCard").find(".layui-card").on("click", function () {
        var index = $(this).index(".layui-card") - 1;
        var thisPage = $(".page2")[index];
        $(thisPage).removeClass("layui-hide");
        $("#page1").addClass("layui-hide");
    });
    $(".page2").find(".layui-icon-return").on("click", function () {
        var index = $(this).index(".page2 .layui-icon-return");
        var thisPage = $(".page2")[index];
        $(thisPage).addClass("layui-hide");
        $("#page1").removeClass("layui-hide");
    });
    //系统时间
    Date.prototype.format = function (fmt) {
        var o = {
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds() //秒
        };
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    document.getElementById('systemtime').value = (new Date()).format('hh:mm:ss');
    setInterval("document.getElementById('systemtime').value = (new Date()).format('hh:mm:ss');", 1000);
    // 在线状态
    if (node.isonline === "1") {
        $("#isonline")[0].innerHTML = "在线";
        $("canvas").css("display", "block");
    } else {
        $("#isonline")[0].innerHTML = "离线";
        $("canvas").css("display", "none");
    }
    // 设备基本信息
    basicFill = function (node) {
        $("#rid")[0].innerHTML = node.rid;
        $("#tns")[0].innerHTML = node.tns;
        $("#ip")[0].innerHTML = node.ip;
        $("#port")[0].innerHTML = node.port;
        $("#svr")[0].innerHTML = node.svr;
        layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", node);
            form.render();
        });
        //实时采集数据
        if(node.clre!=undefined){
            var clre = node.clre.split(":");
            $("#clre1")[0].innerHTML = clre[0];
            $("#clre2")[0].innerHTML = clre[1];
        }else{
            $("#clre1")[0].innerHTML = undefined;
            $("#clre2")[0].innerHTML = undefined;
        };
    }
    basicFill(node);
    // 电压
    voltageFill = function(node){
        var voltage = remoteDetail.voltage(node.tns)[0].voltage;
        $("#voltage")[0].innerHTML= "电池电压：" + voltage + "V";
    }
    voltageFill(node);
    //其它平台参数
    var dms = $("#dms input");
    dms.each(function () {
        $(this).attr("checked", false);
    })
    $(dms[parseInt(node.dms) - 1]).attr("checked", true);

    //通道参数
    // 模拟通道
    analogFill = function (params) {
        $("#csps").val(params.s);
        $("#cspa").val(params.a);
        $("#cspp").val(params.p);
        $("#cspk").val(params.k);
        $("#cspb").val(params.b);
        layui.use('form', function () {
            var form = layui.form;
            form.render();
        });
    }
    analogCardRender = function (analogParams) {
        for (var i = 0; i < 6; i++) {
            var html = "<div class='layui-col-xs6'><div class='layui-card analogCard' style='border-radius: 15px !important;padding: 10px;'><div class='channel-button'><i class='layui-icon layui-icon-logout' style='font-size: 17px;color: #666;font-weight:bold'></i></div><i class='layui-icon layui-icon-slider' style='font-size: 16px;color: #666;'></i><div style='display: inline-block;margin-left:5px'>模拟通道" + (i + 1) + "</div><div style='color:rgb(0,0,0,0.7)'><div class='layui-col-xs6'>编号：" + analogParams[i].a + "</div><div class='layui-col-xs6'>P：" + analogParams[i].p + "</div><div>K：" + analogParams[i].k + "</div><div>B：" + analogParams[i].b + "</div></div></div></div>";
            $("#channelCard").append(html);
            if (analogParams[i].s == "1") {
                $($(".analogCard .channel-button")[i]).addClass("channel-button-checked");
            }
            else {
                $($(".analogCard .channel-button")[i]).removeClass("channel-button-checked");
            }
        };
        $(".analogCard .channel-button").on("click", function (event) {
            var index = $(this).index(".analogCard .channel-button");
            analogIndex = index + 1;
            var control = $.extend(true, {}, analogParams[index]);
            if (control.s == "0") {
                control.s = "1";
            } else {
                control.s = "0";
            }
            Control.analogWrite(control);
            event.stopPropagation();
        });
        $(".analogCard").on("click", function () {
            var index = $(this).index(".analogCard");
            analogIndex = index + 1;
            var thisPage = $("#analogConfig");
            $("#analogConfig").removeClass("layui-hide");
            $("#channelPage").addClass("layui-hide");
            $("#analogHead").html("<span style='color:#000'> 模拟通道" + (index + 1) + "</span>")
            analogFill(analogParams[index]);
        });
    }
    analogCardRender(analogParams);
    $("#analogConfig").find(".layui-icon-return").on("click", function () {
        $("#analogConfig").addClass("layui-hide");
        $("#channelPage").removeClass("layui-hide");
    });
    // 485通道
    modbusFill = function (params) {
        $("#csms").val(params.s);
        $("#csma").val(params.a);
        $("#csmp0").val(params.p0);
        $("#csmp1").val(params.p1);
        $("#csmp2").val(params.p2);
        $("#csmp3").val(params.p3);
        $("#csmp4").val(params.p4);
        $("#csmb").val(params.b);
        $("#csmm").val(params.m);
        $("#csmr").val(params.r);
        $("#csmn").val(params.n);
        layui.use('form', function () {
            var form = layui.form;
            form.render();
        });
    }
    modbusCardRender = function (modbusParams) {
        for (var i = 0; i < 4; i++) {
            var html = "<div class='layui-col-xs6'><div class='layui-card modbusCard' style='border-radius: 15px !important;padding: 10px;'><div class='channel-button'><i class='layui-icon layui-icon-logout' style='font-size: 17px;color: #666;font-weight:bold'></i></div><i class='layui-icon layui-icon-slider' style='font-size: 16px;color: #666;'></i><div style='display: inline-block;margin-left:5px'>RS485通道" + (i + 1) + "</div><div style='color:rgb(0,0,0,0.7)'><div>编号：" + modbusParams[i].a + "</div><div>P：" + modbusParams[i].p0 + "|" + modbusParams[i].p1 + "|" + modbusParams[i].p2 + "|" + modbusParams[i].p3 + "|" + modbusParams[i].p4 + "</div><div class='layui-row'><div class='layui-col-xs6'>B：" + modbusParams[i].b + "</div><div class='layui-col-xs6'>M：" + modbusParams[i].m + "</div><div class='layui-col-xs6'>R：" + modbusParams[i].r + "</div><div class='layui-col-xs6'>N：" + modbusParams[i].n + "</div></div></div></div></div>";
            $("#channelCard").append(html);
            if (modbusParams[i].s == "1" || modbusParams[i].s == "2") {
                $($(".modbusCard .channel-button")[i]).addClass("channel-button-checked");
            }
            else {
                $($(".modbusCard .channel-button")[i]).removeClass("channel-button-checked");
            }
        };
        $(".modbusCard .channel-button").on("click", function (event) {
            var index = $(this).index(".modbusCard .channel-button");
            modbusIndex = index + 1;
            var control = $.extend(true, {}, modbusParams[index]);
            if (control.s == "0") {
                control.s = "1";
            } else {
                control.s = "0";
            }
            Control.modbusWrite(control);
            event.stopPropagation();
        });
        $(".modbusCard").on("click", function () {
            var index = $(this).index(".modbusCard");
            modbusIndex = index + 1;
            var thisPage = $("#modbusConfig");
            $("#modbusConfig").removeClass("layui-hide");
            $("#channelPage").addClass("layui-hide");
            $("#modbusHead").html("<span style='color:#000'> RS485通道" + (index + 1) + "</span>")
            modbusFill(modbusParams[index]);
        });
    }
    modbusCardRender(modbusParams);

    $("#modbusConfig").find(".layui-icon-return").on("click", function () {
        $("#modbusConfig").addClass("layui-hide");
        $("#channelPage").removeClass("layui-hide");
    });

    // 报警参数
    avsFill = function (params) {
        $("#avss").val(params.s);
        $("#avsh").val(params.h);
        $("#avsl").val(params.l);
        $("#avsa").val(params.a);
        layui.use('form', function () {
            var form = layui.form;
            form.render();
        });
    }
    avsCardRender = function (avsParams) {
        for (var i = 0; i < 6; i++) {
            var html = "<div class='layui-col-xs6'><div class='layui-card avsCard' style='border-radius: 15px !important;padding: 10px;'><div class='channel-button'><i class='layui-icon layui-icon-logout' style='font-size: 17px;color: #666;font-weight:bold'></i></div><i class='layui-icon layui-icon-rss' style='font-size: 16px;color: #666;'></i><div style='display: inline-block;margin-left:5px'>模拟通道" + (i + 1) + "</div><div style='color:rgb(0,0,0,0.7)'><div>S：" + avsParams[i].s + "</div><div>H：" + avsParams[i].h + "</div><div>L：" + avsParams[i].l + "</div><div>A：" + avsParams[i].a + "</div></div></div></div>";
            $("#avsCard").append(html);
            if (avsParams[i].s == "0") {
                $($(".avsCard .channel-button")[i]).removeClass("channel-button-checked");
            }
            else {
                $($(".avsCard .channel-button")[i]).addClass("channel-button-checked");
            }
        };
        $(".avsCard .channel-button").on("click", function (event) {
            var index = $(this).index(".avsCard .channel-button");
            avsIndex = index + 1;
            var control = $.extend(true, {}, avsParams[index]);
            if (control.s == "0") {
                control.s = "1";
            } else {
                control.s = "0";
            }
            Control.avsWrite(control);
            event.stopPropagation();
        });
        $(".avsCard").on("click", function () {
            var index = $(this).index(".avsCard");
            avsIndex = index + 1;
            var thisPage = $("#avsConfig");
            $("#avsConfig").removeClass("layui-hide");
            $("#avsPage").addClass("layui-hide");
            $("#avsHead").html("<span style='color:#000'> 模拟通道" + (index + 1) + "</span>")
            avsFill(avsParams[index]);
        });
    }
    avsCardRender(avsParams);
    $("#avsConfig").find(".layui-icon-return").on("click", function () {
        $("#avsConfig").addClass("layui-hide");
        $("#avsPage").removeClass("layui-hide");
    });

    // 参数修正
    float_9Correct = function () {
        var str = this.value;
        if (str.length === 0 || !(new RegExp("^[0-9\+\-\.]+$").test(str))) {
            return;
        }

        if (str.indexOf("+") === -1 && str.indexOf("-") === -1 && str.length < 9) {
            str = "+" + str;
        }
        while (str.indexOf("0") === 1) {
            if (str.indexOf(".") === 2) {
                break;
            }
            str = str.replace("0", "");
        }
        if (str.indexOf(".") === -1 && str.length < 9) {
            str = str + ".";
        }
        if (str.indexOf(".") === 1) {
            str = str.substring(0, 1) + "0" + str.substring(1);
        }

        while (str.length < 9) {
            str = str + "0";
        }
        this.value = str;
    }
    $("input").filter(function () {
        return /^[kb]$|^[hl]$/.test(this.name);
    }).blur(float_9Correct);
});
