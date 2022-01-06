// 判断变量的类型
function getType(obj){
	var str = Object.prototype.toString.call(obj);
	var map={
		'[object Boolean]'  : 'boolean', 
		'[object Number]'   : 'number', 
		'[object String]'   : 'string', 
		'[object Function]' : 'function', 
		'[object Array]'    : 'array', 
		'[object Date]'     : 'date', 
		'[object RegExp]'   : 'regExp', 
		'[object Undefined]': 'undefined',
		'[object Null]'     : 'null', 
		'[object Object]'   : 'object'
	}
	if(obj instanceof Element){ //判断是否是dom元素，如div等
		return "element";
	}
	return map[str];
}

function deepCopy(p){
	var obj;
	var str = getType(p);
	if(str == 'array'){
		obj = [];
		for (var i = 0; i < p.length; i++) {
			obj.push(arguments.callee(p[i]));  //回调自己
		}
	}else if(str == 'object'){
		obj = {};
		for(var i in p){
			obj[i] = arguments.callee(p[i]);
		}
	}else{
		return p;
	}
	return obj;
}

export default deepCopy;