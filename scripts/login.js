var login_btn = document.getElementById("login_btn"),
	register_btn = document.getElementById("register_btn"),
	password = document.getElementById("password"),
	name2 = document.getElementById("username"),
	err3 = document.getElementById("err3");

EventUtil.addHandler(login_btn, handler, "click");
EventUtil.addHandler(register_btn, handler, "click");

// 如何在js的事件中进行ajax通过php去后台数据库做判断？？？？？？？？？？？？？？？？？
function handler(e){
	var e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	if(target == login_btn){
		window.location.href = "login.php";
	}else if(target == register_btn){
		window.location.href = "register.php";
	}else{
		// do nothing 
	}
}

EventUtil.addHandler(password, focusHandler, "focus");

function focusHandler (e) {
	var e = EventUtil.getEvent(e);
	var aa = name2.value;
	
	var xhr = createXHR();alert(aa);
	// xhr.open("get", "judge.php?name=aa", false);
	// xhr.send(null);
	// if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
	// 	var span = xhr.responseText;
	// 	err3.innerHTML = span;
	// }else{
	// 	// do nothing;
	// 	alert("shibai");
	// }

}
function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){
		alert("xml");
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){
		if(typeof arguments.callee.activeXString != 'string'){
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;

			for(i = 0, len = versions.length; i < len; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				}catch(ex){
					// do nothing
				}
			}

		}
		return new ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new Error("存在错误");
	}
	
}