var login_btn = document.getElementById("login_btn"),
	register_btn = document.getElementById("register_btn"),
	password = document.getElementById("password"),
	username = document.getElementById("username"),
	login_password = document.getElementById("login_password"),
	login_name = document.getElementById("login_name"),
	submit = document.getElementById("register_submit"),
	login_submit = document.getElementById("login_submit"),
	err3 = document.getElementById("err3"),
	repassword = document.getElementById("repassword");

// EventUtil.addHandler(login_btn, handler, "click");
// EventUtil.addHandler(register_btn, handler, "click");
// 如何在js的事件中进行ajax通过php去后台数据库做判断
function handler(e){
	console.log("whar");
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

// keyup
EventUtil.addHandler(username, nameBlurHandler, "blur");
function nameBlurHandler (e) {
	var e = EventUtil.getEvent(e);
	var aa = username.value;
	var xhr = createXHR();
	var url = "judge.php";
	url = url + "?name="+aa;
	url = url + "&id="+Math.random();

	xhr.open("get", url, false);
	xhr.send(null);
	if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
		var span = xhr.responseText;
		err3.innerHTML = span;
		span = span.trim();
		if(span !=""){
			submit.disabled = true;
		}else{
			submit.disabled = false;
		};
	}else{
		// do nothing; 
	}

}

EventUtil.addHandler(repassword, repasswordBlurHandler, "keyup");
function repasswordBlurHandler (e) {
	if(repassword.value != password.value){
		err3.innerHTML = "两次密码不匹配！";
		submit.disabled = true;
	}else{
		err3.innerHTML = "";
		submit.disabled = false;
	}
}

EventUtil.addHandler(login_name, hiddenErr, 'click');
function hiddenErr (e) {
	// alert("focus");
}

var aa = document.getElementById("aa");
EventUtil.addHandler(aa, hiddenErr, "click");


