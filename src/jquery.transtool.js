/*
 * transtool
 * https://github.com/i5ting/toolbar
 *
 * Copyright (c) 2014 alfred sang
 * Licensed under the MIT license.
 */

(function($) {
	
	/**
	 * 创建tooltip‘s options html
	 */ 
	function create_tip_opts(opts){
		
		if(opts.mp_title && opts.mp_title.length > 0){
			$('#mp_title').html(opts.mp_title);
			$('title').html(opts.mp_title);
		}
		
		// <li id='all'><a class="icon icon-world" href="#">show all</a></li>
		var optsion_html = "";
		
		$.each(opts.states,function(){
			$.each(this,function(key,value){
					if(value.href){
						if(!value.target){
							value.target = '_blank';
						}
						
						optsion_html += "<li id='" + key + "'><a class='icon "+ value.icon +"' href='" + value.href + "' target='" + value.target+ "'>" + value.display  + "</a></li>";
					}else{
						optsion_html += "<li id='" + key + "'><a class='icon "+ value.icon +"' href='#1'>" + value.display  + "</a></li>";
					}
					
					$('#'+key).on('click',value.click);
			});
			
		});
		
		$(opts.toolbarselector).find('ul').append(optsion_html);
		
		log(optsion_html);
	}
	
	/**
	 * 绑定事件
	 */ 
	function bind_click_event(opts){
		$.each(opts.states,function(){
			$.each(this,function(key,value){
					//$('#'+key).on('click',value.click);
					var $this = this;
					$('#' + key).on('click',function(){
						console.log(key + '--click');
						show_preview_info_wity_type(opts, key);
					});
			});
		});
		
	
		$('#all').click(function(){
			$.each(opts.states,function(){
				$.each(this,function(key,value){
						$('.' + key).show();
				});
			});
			
			//$('#normal-button').trigger('click');
		});	
	}
	
	/**
	 * 处理按钮事件
	 */ 
	function show_preview_info_wity_type(opts, type){
		$.each(opts.states,function(){
			$.each(this,function(key,value){
					$('.' + key ).hide();
					
			});
		});
		
		$('.' + type).show();

		$(opts.menu_trigger_selector).trigger('click');
	}
	
	/**
	 * 初始化默认state
	 */ 
	function init_with_default_state(opts){
		var key = opts.default_state;
		if(key === 'all'){
			$.each(opts.states,function(){
				$.each(this,function(key,value){
						$('.' + key).show();
				});
			});
			$(opts.menu_trigger_selector).trigger('click');
		}else{
			show_preview_info_wity_type(opts, key);
		}
	}
	
	/**
	 * 确定是否显示pushmenu
	 */ 
	function show_push_menu(opts){
		if(opts.menu_container_selector && opts.menu_trigger_selector){
			var c = document.getElementById( opts.menu_container_selector.replace('#','') );
			var t = document.getElementById( opts.menu_trigger_selector.replace('#','') );
			
			new mlPushMenu( c, t , {
				type : 'cover'
			} );
		}else{
			return
		}
	}

  // Static method.
  $.transtool = function(options) {
    // Override default options with passed-in options.
    var opts = $.extend({}, $.transtool.options, options);
    
		// show or hide push_menu
		show_push_menu(opts);
		
		// 创建tooltip‘s options html
		create_tip_opts(opts);
		
		// 给每个tooltip上的按钮绑定click事件
		bind_click_event(opts);
		 
		// 初始化默认state
		init_with_default_state(opts);
		 
  };

// left menu html
// 					<li id='todo'><a class="icon icon-shop" href="#">todo</a></li>
// 					<li id='review'><a class="icon icon-cloud" href="#">review</a></li>
// 					<li id='ok'><a class="icon icon-diamond" href="#">ok</a></li>
// 					<li id='zh'><a class="icon icon-photo" href="#">中文</a></li>
// 					<li id='en'><a class="icon icon-wallet" href="#">英文</a></li>
//					<li id='all'><a class="icon icon-shop" href="#">show all</a></li>

  // Static method default options.
  $.transtool.options = {
		debug: false,
		mp_title:"请配置mp_title",
		toolbarselector: "#user-toolbar",
		menu_container_selector:'#mp-menu',
		menu_trigger_selector:'#normal-button',
    punctuation: '.',
		states:[
			{
				'zh':{
					'icon':'icon-edit',
					'href':'http://baidu.com',
					'target':'_self',
					click:function(){
						alert('zh');
					}
				},
				'en':{
					'icon':'icon-user',
					click:function(){
						alert('en');
					}
				}
			}
		]
  };
	
	/**
	 * 日志方法
	 */
	function log(text){
		if($.transtool.options.debug === true){
			console.log(text);
		}
	}
	
  // Custom selector.
  $.expr[':'].transtool = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
