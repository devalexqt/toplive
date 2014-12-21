//PageManager - fast way to implement page navigation system in browser.
//
// Author: Alex, email: devalexqt@gmail.com 

function _PageManager(display_id,stack_id,menu_id,callback){

	var _stack={pages:[]}
	var _display={pages:[]}
	var that=this

	this.debug=true
	this.displayId=display_id
	this.stackId=stack_id
	this.menuId=menu_id
	this.pageClass="page"


	this.animation={
		  default:{
		          show:{
		            page_new:"show-page 0.250s linear forwards",
		            page_old:"show-page-back 0.250s linear forwards"
		            },
		          hide:{
		            page_new:"hide-page-back 0.250s linear forwards",
		            page_old:"hide-page 0.250s linear forwards"
		            },
		          },//default
		   default_menu:{
		           show:{
		             page_new:"menu-page-show 0.250s linear forwards",
		             page_old:"menu-page-forward 0.250s linear forwards"
		             },
		           hide:{
		             page_new:"menu-page-hide 0.250s linear forwards",
		             page_old:"menu-page-back 0.250s linear forwards"
		             },
		           }//default       
        }//animation object  


	Object.defineProperty(this,"stack",{
		get: function(){return _stack},
		set: function(obj){_stack=obj}
	})//stack


	Object.defineProperty(this,"display",{
		get: function(){return _display},
		set: function(obj){_display=obj}
	})//stack


	Object.defineProperty(this.display,"lastPage",{// get/set last page from display.view container
	  get:function(){
	  		return    this.pages.length>0?this.pages[this.pages.length-1]:null
	  		},
	  set:function(elem){
	  	this.push(elem)
	  }
	})


	Object.defineProperty(this.display,"beforeLastPage",{
	  get:function(){
	  return this.pages.length>1?this.pages[this.pages.length-2]:null
	}
	  //set:function(elem){return this.stack.insertBefore(elem, this.pages.lastChild.nextSibling);}
	})


	this.display.push=function(obj){/*Add page to this.diaplay.view*/
		var res=this.view.appendChild(obj)
		this.pages.push(res)
		return res
	}//push


	this.display.pop=function(obj){/*Remove page from diaplay.view or remove last page from display.view if obj is null.*/
		obj=obj?obj:this.lastPage
		//console.dir(obj)
		for(var i=0,page=this.pages[i];i<this.pages.length;page=this.pages[++i]){
			//console.dir(page)
			if(page==obj){
				this.pages.splice(i,1);
				return this.view.removeChild(page)
			}//if
		}//for
		
	}//push	


	Object.defineProperty(this.display,"firstPage",{
		get:function(){return this.pages[0]}
	})//isFirstPage


	Object.defineProperty(this.display,"overlay",{
		get:function(){return this._overlay},
		set:function(obj){
			if(obj){
				//this.push(obj)
				this.view.appendChild(obj)
			}//if object
			else{
				//this.pop(this._overlay)
				this.view.removeChild(this._overlay)
			}
			this._overlay=obj
			}//set
		})//overlay


	this.stack.push=function(page){
		that.stack.pages.push(page)
		return page
	}//push page to stack

	this.stack.pop=function(_page){
		for(var i=0,page=that.stack.pages[i];i<that.stack.pages.length;page=that.stack.pages[++i]){
			if(page==_page){
				return that.stack.pages.splice(i,1);
			}//if
		}//for
	}//pop page from stack


	this.initStack=function(pages){//init stack, push pages DOM collection to stack.pages array
		that.stack.pages=[]
		for(var i=0,page=pages[i];i<pages.length;page=pages[++i]){
			that.stack.push(page)
		}//for
		//console.dir(that.stack.pages)
	}//initPages


	this.init=function(){/*Default init function that use default parameters from constructor.*/
		//display
		if(typeof that.displayId=="string"){
			that.display.view=document.getElementById(that.displayId)
		}
		else if(typeof that.displayId=="object") {
			that.display.view=that.displayId
		}
		else{
			//if(!that.display.view){
				var err="ERROR: invalid display object!, type: "+typeof that.displayId 
				if(that.debug){console.log(err)}
					if(callback){callback(err)}
					return	
			//}//if display is null
		}//else display

		//stack
		if(typeof that.stackId=="string"){
			that.initStack(document.getElementById(that.stackId).getElementsByClassName(this.pageClass))
		}
		else if(typeof that.stackId=="object"){
			that.initStack(that.stackId.getElementsByClassName(this.pageClass))
		}
		else{
			//if(!that.stack){
				var err="ERROR: invalid stack object!"
				if(that.debug){console.log(err)}
					if(callback){callback(err)}
					return
		//}//if stack is null
		}//else stack

		if(!that.display.view||!that.stack){
			var err="ERROR: display object or stack object is null or undefined!"
			if(that.debug){console.log(err)}
			if(callback){callback(err)}
			return
		}//if display or stack null
		setTimeout(function(){
			if(callback){callback(null,that)}
		},0)
	}//init


	this.getPage=function(page_id){/*Retrun page object from stack by page ID parameter.*/
		  if(this.debug){console.log("getPage: "+page_id)}
		  for(var i=0,length=that.stack.pages.length,page=that.stack.pages[i];i<length;page=that.stack.pages[++i]){
		    if(page.id==page_id){
		     return page
		     }//if
		  }//for
		  return null
	}//getPage

	this.getAnimation=function(name,type,page_type){
	  var animation=that.animation[name]
	      animation=animation?animation:this.animation.default
	  return animation[type][page_type]
	}//getAnimation
  

	this.showPage=function(page,callback){
		var page_old=that.display.lastPage
		var page_new

		if(typeof page=="string"){page_new=that.getPage(page)}
			else if(typeof page=="object"){page_new=page}

		if(!page_new){
			if(that.debug){
				var err="ERROR: Page not found, id: "+page+" !";
				if(that.debug){console.log(err)}
				if(callback){callback(err)};
				return}
		}//if no page
		if(!page_old){
			if (that.debug) {console.log("Warning: No page in display stack!")};
		}		

		var animationend=function(e){
		           page_new.removeEventListener("animationend",animationend,false)
		           page_new.removeEventListener("webkitAnimationEnd",animationend,false)
		           page_new.removeEventListener("msAnimationEnd",animationend,false)
		           if(callback){callback(null,page_new)}
		            //console.log("animationend")
		         }//animationend

		         page_new.addEventListener("animationend",animationend,false)
		         page_new.addEventListener("webkitAnimationEnd",animationend,false)
		         page_new.addEventListener("msAnimationEnd",animationend,false)  
		        
		        var animation={
		          animation_page_new:that.getAnimation(page_new.getAttribute("data-animation"),"show","page_new"),
		          animation_page_old:that.getAnimation(page_new.getAttribute("data-animation"),"show","page_old")
		          }//animation
		          //console.dir(animation)

		         page_new.style.animation=animation.animation_page_new
		         page_new.style.webkitAnimation=animation.animation_page_new
		         page_new.style.msAnimation=animation.animation_page_new

		    if(page_old){
		         page_old.style.animation=animation.animation_page_old
		         page_old.style.webkitAnimation=animation.animation_page_old
		         page_old.style.msAnimation=animation.animation_page_old//"show-page-back 0.250s linear forwards"
		       }

	this.display.push(page_new)
	try{if(event){event.stopPropagation()}}catch(e){console.log(e)}
	}//showPage


	this.hidePage=function(callback){
		var page_old=that.display.lastPage
		var page_new=that.display.beforeLastPage
		if(!page_new){
			if(that.debug){var err="ERROR: Page not found, page_new!";if(callback){callback(err)};return}
		}//if no page
		if(!page_old){var err="ERROR: Page not found, page_old!";if(callback){callback(err)};return}

		var animationend=function(e){
		           page_new.removeEventListener("animationend",animationend,false)
		           page_new.removeEventListener("webkitAnimationEnd",animationend,false)
		           page_new.removeEventListener("msAnimationEnd",animationend,false)
		           that.display.pop()
		           if(callback){callback(null,page_new,page_old)}
		            // console.log("animationend")
		         }//animationend

		         page_new.addEventListener("animationend",animationend,false)
		         page_new.addEventListener("webkitAnimationEnd",animationend,false)
		         page_new.addEventListener("msAnimationEnd",animationend,false)  
		        
		        var animation={
		          animation_page_new:that.getAnimation(page_old.getAttribute("data-animation"),"hide","page_new"),
		          animation_page_old:that.getAnimation(page_old.getAttribute("data-animation"),"hide","page_old")
		          }//animationpage_old

		         page_new.style.animation=animation.animation_page_new
		         page_new.style.webkitAnimation=animation.animation_page_new
		         page_new.style.msAnimation=animation.animation_page_new

		         page_old.style.animation=animation.animation_page_old
		         page_old.style.webkitAnimation=animation.animation_page_old
		         page_old.style.msAnimation=animation.animation_page_old	

		         try{if(event){event.stopPropagation()}}catch(e){console.log(e)}
		         return false
	}//hidePage


	this.showMenu=function(menu,callback){
		//console.log("=>showMenu...")
		that.showPage(menu?menu:that.menuId,callback)
	}//showMenu

	this.hideMenu=function(callback){
		//console.log("==>hideMenu...")
		that.hidePage(callback)
	}//showMenu	

if(display_id&&stack_id){this.init()}//init object
	else{
		var err="ERROR: Invalid parameters, can't init object!"
		if(callback){callback(err)}
			if(that.debug){console.log(err)}
		return
	}//else
}//PageManager

