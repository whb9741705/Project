$(function() {
    tree = function(data) {
        layui.use(['tree', 'jquery'], function() {
            var tree = layui.tree;
            var $ = layui.jquery;
            //渲染
            var inst1 = tree.render({
                elem: '#deviceTree',
                data: data,
                showLine: false,
                click: function(obj) {
                    node = obj.data;
                    //console.log(markers[0])
                    for(let i = 0;i<markers.length;i++){
						if(node.tns == markers[i].tns){
							markerClick(markers[i])
						}
					}
                    $(obj.elem).siblings().find(".layui-tree-txt").removeClass("tree-node-checked tree-node-checked:hover");
                    $(obj.elem).find(".layui-tree-txt").addClass("tree-node-checked tree-node-checked:hover");
                    $("#content_index").attr("src", "config.html");
                }
            });
        });
        // 节点左侧小圆点显示在线状态
        $(function() {
            var txt = $(".layui-tree-txt");
            for (var i = 0; i < data.length; i++) {
                if (data[i].isOnline === "1") {
                    $(txt[i]).before('<span class="layui-badge-dot" style="margin:-1px -12px 0px;background-color:#3de46c"></span>');
                } else {
                    $(txt[i]).before('<span class="layui-badge-dot" style="margin:-1px -12px 0px;background-color:rgb(255,255,255,0.5)"></span>');
                }
            }
        });
    };
    // 初始化导航树
    var basic = remoteDetail.basic()
    var markers = []
    var markerClick
    var infoWindow
    // 左侧导航标签切换筛选条件
    $(".tree-type-btn").on("click",function() {
        $(this).siblings().removeClass("tree-type-btn-checked");
        $(this).addClass("tree-type-btn-checked")
        for (var i = 0; i < basic.length; i++) {
                basic[i].title = basic[i].terminalNum;
            }
        if ($(this).index() === 0) {
            for (var i = 0; i < basic.length; i++) {
                basic[i].title = basic[i].terminalNum;
            }
        } else if ($(this).index() === 1) {
            for (var i = 0; i < basic.length; i++) {
                basic[i].title = basic[i].tns;
            }
            $("#deviceTree").css("padding-left","0px");
        }
        $("#search").val("");
        tree(basic);
    });
	$("#tab-terminalNum").click()
    // 搜索框筛选
    $("#search").on("keyup", function() {
        var input = $(this).val().toUpperCase();
        var result = $.extend(true, [], basic);
        regexp = new RegExp(input, "i");
        for (var i = 0; i < result.length; i++) {
            if (!regexp.test(result[i].title)) {
                result.splice(i, 1);
                i--;
            }
        }
        tree(result);
        $(function() {
            $(".layui-tree-txt").each(function(index, item) {
                var str = $(item).html().replace(input, "<span>" + input + "</span>");
                $(item).html(str);
            })
        })
    })
	tree(basic)
	
AMapLoader.load({
    "key": "0aae27ca750210aeda1ceb8d42ba31af",              // 申请好的Web端开发者Key，首次调用 load 时必填
    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "plugins": ['AMap.Scale','AMap.ToolBar'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    "AMapUI": {             // 是否加载 AMapUI，缺省不加载
        "version": '1.1',   // AMapUI 版本
        "plugins":['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
    },
    // "Loca":{                // 是否加载 Loca， 缺省不加载
    //     "version": '2.0'  // Loca 版本
    // },
}).then((AMap)=>{
        var origin = [103.98967077726365, 30.77249784908029];
        var map = new AMap.Map('container',{
            center: origin
        });
        map.addControl(new AMap.Scale());
        //map.addControl(new AMap.ToolBar());
        infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -30)
        });
        markerClick = function(e) {
			if(e.target){
	            infoWindow.setContent(e.target.content);
	            infoWindow.open(map, e.target.getPosition());
	            map.setZoomAndCenter(10,e.target.getPosition())
			}else{
				infoWindow.setContent(e.content);
	            infoWindow.open(map, e.getPosition());
	            map.setZoomAndCenter(10,e.getPosition())
			}
        }
        for (var i = 0, marker; i < basic.length; i++) {
			if(!basic[i].longitude)
				continue
        	var lnglat = [basic[i].longitude,basic[i].lantitude]
            var marker = new AMap.Marker({
                position: lnglat,
                //map: map
            });
        	map.add(marker)
        	var markerContent = document.createElement("div");
        	var tnsNumDiv = document.createElement("div");
        	tnsNumDiv.innerHTML = "TNS：" + basic[i].tns;
        	markerContent.appendChild(tnsNumDiv);
        	var terminalNumDiv = document.createElement("div");
        	terminalNumDiv.innerHTML = "设备编号：" + basic[i].terminalNum;
        	markerContent.appendChild(terminalNumDiv);
        	marker.content=markerContent;
        	marker.tns = basic[i].tns;
            marker.on('click', markerClick);
            //AMap.event.addListener(marker,'click',markerClick)
            markers.push(marker)
        }
        map.setFitView();
    }).catch((e)=>{
        console.error(e);  //加载错误提示
    });
})