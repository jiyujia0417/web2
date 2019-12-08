
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
//参数(对象，哪些样式变化，回调函数)
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
    }, 30) 
}

// index.html中的JavaScript代码


var box=document.getElementById("box");
var navList=document.getElementById("nav").children;
var slider=document.getElementById("slider");
var left=document.getElementById("left");
var right=document.getElementById("right");
var timer;
var isMoving=false;

//图片轮播-得到下一张图片
function next(){
    i++;
    navChange();
    animate(slider,{left:-1200*i},function(){
        if(i===6){
            slider.style.left="-1200px";
            i=1;
        }
    });
}
//得到上一张图片
function pre(){
    i--;
    navChange();
    animate(slider,{left:-1200*i},function(){
        if(i===0){
            slider.style.left="-6000px";
            i=5;
        }
    });
}

//自动轮播图片
var i=1;
var timer=setInterval(next,2000)

//滑入图片界面时红色箭头会出现，同时图片轮播取消
box.onmousemove=function(){
    animate(left,{opacity:50});
    animate(right,{opacity:50});
    clearInterval(timer);
}

//滑出图片界面时红色箭头会消失，同时图片继续轮播
box.onmouseout=function(){
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    timer=setInterval(next,2000);
}

//点击右箭头出现下一张图片
right.onclick=next;

//点击左箭头出现前一张图片
left.onclick=pre;

//点击点出现相应的图片
for(var j=0;j<navList.length;j++){
    navList[j].idx=j;
    navList[j].onclick=function(){
        i=this.idx+1;
        navChange();
        animate(slider,{left:-1200*i});
    }
}

//轮播时红点的改变(当前哪张图片显示，相应的点就变红)
function navChange(){
    for(var j=0;j<navList.length;j++){
        navList[j].className="";
    }
    if(i===6){
        navList[0].className="active";
    }else if(i===0){
        navList[4].className="active";
    }else{
        navList[i-1].className="active";
    }
}