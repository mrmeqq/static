var shadeDiv = "<div id='_loading' style='display: block; z-index: 9999; position: fixed;position: absolute;left: 0;top: 0;width: 100%;height: 100%;font-size: 1px;overflow: hidden;background: #FFF;'></div>"
document.write(shadeDiv);

function closes() {
	$("#_loading").fadeOut("normal", function() {
		$(this).remove();
	});
}
var _timer;
$.parser.onComplete = function() {
	if (_timer){
		clearTimeout(_timer);
	}
	_timer = setTimeout(closes,100);
}

$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: 'Field do not match.'
    },
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: 'Please enter at least {0} characters.'
    },
    code:{
    	validator: function(value) {
            return /^[a-zA-Z][a-zA-Z0-9_]+$/i.test(value);
        },
        message: '编码必须以字母开头,允许字母、数字和下划线'
    }
});

var _timer0,_index0; 
var _title0 = document.title;
function _title_stop0(){
	_index0 = 0;
	if(_timer0){
		clearInterval(_timer0);
		_timer0 = null;
		document.title = _title0;
	}
}
function _title_start0(){
	_title_stop0();
	_timer0 = setInterval(function() {
		if(_index0++ % 2){
			document.title = '【新消息】' + _title0;
		}else{
			document.title = '【　　　】' + _title0;
		}
		if(_index0 > 60){
			_title_stop0();
		}
	}, 500);
}
document.addEventListener("visibilitychange", function() {
	_title_stop0();
});

function playSound() {
	_title_start0();
	var audio = $("#audioPlay");
	if(!audio[0]){
		$('<audio id="audioPlay" hidden="true" src="message.mp3"></audio>').appendTo("body");
	}
	$('#audioPlay')[0].play();
}

function message(msg){
	$.messager.show({
	    title:'系统消息',
	    msg:msg,
	    timeout:8000,
	    showType:'slide'
	});
	playSound();
}

var options = {
  	type: "get",
  	dataType:"json",
  	url: '',
	data:{},
	success: function(data){
	},
	error:function (XMLHttpRequest, textStatus, errorThrown) {
	},
	complete:function (XMLHttpRequest, textStatus) {
	}
};
function rest(url,type,data,fn,complete){
	fn = fn ? fn : function(){};
	complete = complete?complete:function(){};
	data = data ? data : {};
	var opt = $.extend(options,{
		type: type,
		url: url,
		data:data,
		success:fn,
		complete:complete
	});
	$.ajax(opt);
}
function get(url,data,fn,complete){
	rest(url,'GET',data,fn,complete)
}
function post(url,data,fn,complete){
	rest(url,'POST',data,fn,complete)
}

function grid(listUrl,columns,mainTable,queryForm,editUrl,fn,deleteUrl,i,o,tools,loadSuccess){
}
function comboboxFilter(data){
	if(data && data.code==='OK'){
		return data.response.list;
	}else{
		return [];
	}
}
//提示信息
function showMessage(msg){
    $.messager.alert({
    	icon:'info',
    	title:'提示',
        msg:msg
    });
}
//提示信息
function errorMessage(msg){
  $.messager.alert({
	  icon:'error',
	  title:'操作失败',
      msg:msg
  });
}
var inc = 1;
function winDialog(ele,t,url,fn,ok,w,h,closeFn){
	var width=$(window).width()*0.6;
	if(w){
		width = w;
	}else{
		if(width<650){
			width = $(window).width()-150;
		}
	}
	var height=$(window).height()*0.84;
	if(h){
		height = h;
	}else{
		if(height<480){
			height = $(window).height()-10;
		}
	}
	var t = t ? t : '对话框';
	var id = ''+ (++inc)+new Date().getTime();
	var dialog = $('<div id="ref_'+id+'"></div>').appendTo('body');
	var r = '<iframe id="iframe_'+id+'" scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:100%;margin-bottom:-5px;"></iframe>';
	function handler(){
		var width=$(window).width()*0.6;
		if(w){
			width = w;
		}else{
			if(width<650){
				width = $(window).width()-150;
			}
		}
    	var height=$(window).height()*0.84;
    	if(h){
    		height = h;
    	}else{
    		if(height<480){
    			height = $(window).height()-10;
    		}
    	}
    	if(dialog){
	    	dialog.dialog('resize',{
	    		width: width,
	    		height: height
	    	});
    	}
	}
    var buttons = [];
    var btn_ok_id = 'btn_ok_'+id;
    if(ok){
    	buttons.push({
    		id:btn_ok_id,
			text:ok,
          	iconCls:'icon-ok',
          	handler:function(){
            	var win = $("#iframe_"+id)[0].contentWindow;
            	if(fn && win){
            		fn(win,ele,dialog);
            	}
            }
		});
    }
    var btn_cancel__id = 'btn_cancel_'+id;
    buttons.push({
    	id:btn_cancel__id,
        text:'关闭',
        iconCls:'icon-cancel',
        handler:function(){
        	dialog.dialog('destroy');
        }
    });
	dialog.dialog({
	    title: t,
	    width: width,
	    height: height,
	    resizable:true,
	    closed: false,
	    cache: false,
	    content : r,
	    modal: true,
	    maximizable:true,
	    onDestroy:function(){
	    	if(closeFn){
	    		closeFn();
	    	}
	    	$(window).unbind('resize',handler);
	    },
	    onBeforeOpen : function(){
	    	$(window).bind('resize',handler);
	    	$('#iframe_'+id).load(function(){//iframe已加载
	    		var win = this.contentWindow;
	    		if(win){
	    			win.ele=ele;//当前元素
	    			win.dialog=dialog;//当前dialog
	    			win.fn=fn;//当前回调函数
	    			win.ok_btn=$('#'+btn_ok_id);//确认按钮
	    			win.cancel_btn=$('#'+btn_cancel__id);//关闭按钮
	    		}
	    	});
	    },
	    onClose : function() {  
	    	dialog.dialog('destroy');  
        },
	    buttons:buttons
	});
}

var cmenu = null;
function createColumnMenu(ele){
    cmenu = $('<div/>').appendTo('body');
    cmenu.menu({
        onClick: function(item){
            if (item.iconCls == 'icon-yes'){
                ele.datagrid('hideColumn', item.name);
                cmenu.menu('setIcon', {
                    target: item.target,
                    iconCls: 'icon-blank'
                });
            } else {
                ele.datagrid('showColumn', item.name);
                cmenu.menu('setIcon', {
                    target: item.target,
                    iconCls: 'icon-yes'
                });
            }
        }
    });
    var fields = ele.datagrid('getColumnFields');
    for(var i=0; i<fields.length; i++){
        var field = fields[i];
        var col = ele.datagrid('getColumnOption', field);
        if(!col.hidden){
	        cmenu.menu('appendItem', {
	            text: col.title,
	            name: field,
	            iconCls: 'icon-yes'
	        });
        }
    }
}
//构造参数
function buildParams(form){
	var query = form.serializeArray();
	var params={};
	$.each(query, function(i, item){
		if (params[item.name]==null)
		{params[item.name] = item.value}
		else
		{params[item.name] = params[item.name]+","+item.value}

	});
	return params;
}
function createFrame(url) {
	return '<iframe scrolling="auto" frameborder="0" src="' + url + '" style="width:100%;height:100%;margin-bottom:-5px;"></iframe>';
}
function openUrl(text, url,iconCls) {
	var Tabs = $("#main-tabs");
	if(Tabs.length==0){
		Tabs = parent.$("#main-tabs");
	}
	if (Tabs.tabs('exists', text)) {
		Tabs.tabs('select', text);
	} else {
		var options = {
			title : text,
			closable : true,
			content : createFrame(url),
			tools : [ {
				iconCls : 'icon-mini-refresh',
				handler : function() {
					var iframes = Tabs.tabs('getSelected').find('iframe');
					if(iframes && iframes.length>0){
						iframes[0].contentWindow.location.href=iframes[0].src;
					}
				}
			} ]
		};
		if(iconCls){
			options.iconCls=iconCls;
		}
		Tabs.tabs('add', options);
	}
}
$(function(){
	var token = sessionStorage.getItem("token");
	if(token){
		$.ajaxSetup({
			complete:function(xhr,status){
			},
			statusCode: {
	            401:function (xhr,status) {
						if (self != top) {
							top.location.href="/login.action";
						}else{
							location.href="/login.action";
						}
	            }
	        },
			beforeSend:function(xhr) {
		    	xhr.setRequestHeader('token', token);
		    },
		    error:function(xhr,status,error){
		    	alert('Error .\n' + xhr.responseText);
		    }
		});
	}
	$('#easyui-tree').tree({
		method:'post',
	    url:'/api/sys/menu/menus',
	    queryParams:{roleId:0,menuType:'M,F'},
	    animate:true,
	    onClick: function(node){
		}
	});
	$.ajax({
	  	type: "post",
	  	dataType:"json",
	  	url: '/api/sys/menu/sidemenu',
		data:{roleId:0,menuType:'M,F'},
		success: function(data){
			$('#easyui-sidemenu').sidemenu({
				data:data,
				fit:true,
				multiple:false,
				animate:true,
				border:false,
				onSelect: function(node){
			    	if(node.attributes.url){
			    		openUrl(node.text,node.attributes.url,node.iconCls);
			    	}
				}
			});
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
		},
		complete:function (XMLHttpRequest, textStatus) {
		}
	});
	var Tabs = $("#main-tabs");
	Tabs.tabs({
		onContextMenu : function(e, title) {
			e.preventDefault();
			Tabs.tabs("select", title);
			$('#tabsMenu').menu('show', {
				left : e.pageX,
				top : e.pageY,
				hideOnUnhover : false
			}).data("tabTitle", title);
		}
	})
	$("#tabsMenu").menu({
		onClick : function(item) {
			itemHandler(this, item.name);
		}
	});
	function itemHandler(menu, type) {
		var curTabTitle = $(menu).data("tabTitle");
		if(type=="refresh"){
			var iframes = Tabs.tabs('getSelected').find('iframe');
			if(iframes && iframes.length>0){
				iframes[0].contentWindow.location.href=iframes[0].src;
			}
			return;
		}
		if (type === "close") {
			Tabs.tabs("close", curTabTitle);
			return;
		}
		var allTabs = Tabs.tabs("tabs");
		var closeTabsTitle = [];
		$.each(allTabs, function() {
			var opt = $(this).panel("options");
			if (opt.closable && opt.title != curTabTitle && type === "other") {
				closeTabsTitle.push(opt.title);
			} else if (opt.closable && type === "all") {
				closeTabsTitle.push(opt.title);
			}
		});
		for ( var i = 0; i < closeTabsTitle.length; i++) {
			Tabs.tabs("close", closeTabsTitle[i]);
		}
	}
});

function onComboboxHide() {
	var valueField = $(this).combobox("options").valueField;
	var val = $(this).combobox("getValue");
	var data = $(this).combobox("getData");
	var result = true;
	for (var i = 0; i < data.length; i++) {
		if (val == data[i][valueField]) {
			result = false;
		}
	}
	if (result) {
		$(this).combobox("clear");
	}
}

function formatAmount(val,row){
	if(!val){
		val = 0;
	}
	return val.toFixed(2);
}
function formatAmount1(val,row){
	if(!val){
		val = 0;
	}
	if(val>=0){
		return '<span style="color:green;">+'+val.toFixed(2)+'</span>'
	}else{
		return '<span style="color:red;">'+val.toFixed(2)+'</span>'
	}
}
function formatAmount2(val,row){
	if(!val){
		return '';
	}
	return val.toFixed(2);
}