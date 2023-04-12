/**
 * 
 */
 var filepost={};
 var localhostPath = curWwwPath.substring(0, pos);
 var root = localhostPath;
filepost.post = function(i,user,message) {
	var state;
    $.ajax({
        type: "POST",
        url: '../User/UserAddTerminalEdit',
        async: false,
        cache: false,
        dataType: "json",
        data: {'user':user,'terminalNum': message[0], 'TNS': message[1],'RID': message[2],
        'TerminalType': message[3],'description': message[4],'Longitude': message[5],
        'Latitude': message[6],'SCSW_Num': message[7],'Longitude': message[8],},
        success: function(result) { //请求成功时调用的函数 
        if(result.tnssuccess){
		if(result.success)
		{//layer.msg('第'+i+'条用户终端信息加入成功!', { icon: 1, time: 20,});
		state=1;}
		else
		{//layer.msg('第'+i+'条修改失败,请检查录入项是否规范!', { icon: 2, time: 1000 });
		state=0;}
		}
		else
		{//layer.msg('第'+i+'条修改失败,TNS不能重复,请检查!', { icon: 2, time: 1000 });
		state=2;}
                 },
        error: function (){
                    		layer.msg('第'+i+'条修改失败,请检查录入项是否规范!', { icon: 2, time: 1000 });
               console.log("error");state=3;
                    	}
    });
    return state;
}