// angular自动聚焦
app.directive('focusMe', function($timeout, $parse){

	return {
		link: function(scope, element, attrs){
			var model = $parse(attrs.focusMe);
			scope.$watch(attrs.focusMe, function(value){
				if(value === true){
					$timeout(function(){
						element[0].focus();
					});
				}
			});
		}
	}
})

.directive("focusChange", function(){
	return {
		link: function(scope, element, attrs){
			element.bind("focus", function(){
				scope.error.urlName = "";
				scope.error.url = "";
			});
		}
	}
})

.directive('bmBlocks', ["$timeout","drawBlock", function($timeout, drawBlock){

	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		templateUrl: 'views/bookMarkerBlocks.html',
		link: function(scope, element, attrs){

			// 计算得其父元素的宽度，普通获取为auto
			// var sideBarW = angular.element("#sidebar").outerWidth(true),
			// 	bodyW = angular.element("body")[0].clientWidth,
			// 	padding = parseFloat(angular.element("#mainContain").css("padding")),
			// 	bmsW = bodyW - sideBarW - 2*padding - 17;  // not IE scroll

			// 监测$http数据是否从后台获取完毕,显示
			// 之所以在directive检测isLoad，是因为不能在尚未加载完成的时候绘制
			// TODO:应该改为路由中使用resolve拿到数据
			scope.$watch(attrs.isLoad, function(value){
				if(value == true){
					$timeout(function(){
						// var eleArr = element.children(),
						// 	len = eleArr.length - 1,
						// 	extendHeight = new scope.blockObj(len);
							
						// 以最后一个手动添加的元素来撑开父元素	
						// angular.element("#extendHeight")[0].style.height = extendHeight.top + extendHeight.height + extendHeight.margin + "px";
						// for (var i = 0; i < len; i++){
						// 	var obj = new scope.blockObj(i, bmsW);
						// 	drawBlock.draw(eleArr[i], obj)
						// }
						scope.isContainsShow = true;
					}, 0);
				}
			})

		}
	}
}])

.directive("bmItems", function($timeout){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "views/bookMarkerItems.html",
		link: function(scope, element, attrs){

			scope.count = 1;
			scope.$watch(attrs.isLoad, function(value){
				if(value == true){
					$timeout(function(){
							
						
					}, 0);
				}
			})

		}
	}
})

// 左侧siderbar高度适应
.directive("adpatHeight", function($timeout){
	return {
		link: function(scope, element, attrs){
			var doc = document, 
				header = doc.querySelectorAll("#userHeader")[0],
				pageHeight = Math.max(doc.documentElement.clientHeight, doc.body.clientHeight),
				siderHeight = pageHeight - header.offsetHeight;

			element[0].style.height = siderHeight + "px";

		}
	}
})

.directive("dragFree", function(){
	return {
		restrict: "A",
		link: function(scope, element, attrs){

			var timeHit, isLongHit;
				doc = document,
				moveBlock,							// 被拖动的块
				isLongHit = false,
				ox = 0, 
				oy = 0,									// 点击点在元素中的相对位置
				ssIndex = 0,							// 被拖动元素起始位置(父元素childs[i])
				sIndex = 0;								//

			element[0].addEventListener("mousedown", function(event){
				
				var e = event || window.event,
					target = e.target || e.srcElement;

				element[0].addEventListener("mousemove", moveListen);

				// target可能是：
				// 1、普通块；
				// 2、删除按钮；
				// 3、其他空白的地方。
				if(target.className.indexOf("bookMarkerBlock") > -1){
					
					// 获取事件在元素中的位置和元素固有的位置对象
					var elePos = getOffset(target);
			        ox = e.offsetX;                  //e.pageX - elePos.left;      // PC:offsetX
			        oy = e.offsetY;
					pos = getPosFromEleArr(target);

					// 点击所有普通的块，隐藏删除按钮
					var clas = doc.getElementsByClassName("removeIcon");
			        for (var i = 0, len = clas.length; i < len; i++){
			          clas[i].style.display = "none";
			        }

			        // 长按后触发
					timeHit = setTimeout(function(){
						e.preventDefault();
						
						isLongHit = true;
			          	sIndex = pos.index;
			          	ssIndex = sIndex;

			          	element[0].style.cursor = "pointer";

			          	// 显示拖动块
			          	// 注意：拷贝重排后需要重新getId
			          	// todo: float left 代替absolute
			          	moveBlock = doc.getElementById("moveBlock");
			          	moveBlock.style.display = "";
			          	moveBlock.style.left   = pos.x  + "px";    //-pos.w*0.05
			          	moveBlock.style.top    = pos.y + "px";   //-pos.h*0.05 

			          	// 将块内容复制到拖动块中去
			          	var clone = target.cloneNode(true);
			          	moveBlock.innerHTML = "";
			          	moveBlock.appendChild(clone);

			          	// 隐藏点击的block,内容由拖动块代替显示
			          	target.style.opacity = 0;

			          	// 显示拖动块中删除按钮
			          	moveBlock.lastChild.lastChild.style.display = "";

					},2000);

				}else if(target.className.indexOf("removeIcon") > -1){

			        var block = target.parentNode,
			            index = block.getAttribute("sortN"),
			            reNode = contains.removeChild(block);

			        // 从mainBlocks[]中删除index
			        var more = lStorage.get("mainBlocks");
			        var more2 = more.filter(function(item){
			          return !(item == index);
			        });

			        // 更新本地存储
			        lStorage.update("mainBlocks", more2);

			    }else{
			        var clas = doc.getElementsByClassName("removeIcon");
			        for (var i = 0, len = clas.length; i < len; i++){
			          clas[i].style.display = "none";
			        }
      			}
					
			}); 

			element[0].addEventListener("mouseup", function(event){
				
				var e = event || window.event,
					target = e.target || e.srcElement;

				clearTimeout(timeHit);
		      	if(isLongHit){

		        	element[0].style.cursor = "auto";
		        	isLongHit = false;
		        	element[0].addEventListener("mousemove", null);
		        	moveBlock.style.display = "none";
		        	element[0].childNodes[sIndex].style.opacity = 1;
		        	updateBlockSort();

		        	// 判断是否是原来位置（区域）
		        	if(ssIndex == sIndex){
		          		element[0].childNodes[sIndex].lastChild.style.display = "";
		        	}
		      	}

			});


			// 拖动过程中的函数绑定
		    // 1、判断是否是长按后拖动
		    // 2、让被拖动的盒子跟随鼠标移动
		    // 3、判断被拖动到的位置，并操作占位div
		    // 4、对初始位置更新
		    function moveListen(event){
		      var e = event || window.event;
		      var contains = this;
		      e.preventDefault();

		      if(isLongHit){
		        e.preventDefault();
		        console.log("------------------------------------------");
		        var containsPos = getOffset(contains),
		          childs = contains.childNodes,
		          len1 = childs.length;
		      
		        moveBlock.style.left = e.pageX - ox - containsPos.left + "px";
		        moveBlock.style.top = e.pageY- oy - containsPos.top + "px";
		        var cx = e.pageX- ox - containsPos.left + moveBlock.offsetWidth/2,
		            cy = e.pageY - oy - containsPos.top + moveBlock.offsetHeight/2,
		            s;

		        console.log("s="+sIndex);

		        // 如果是最后一个,放在原来最后一个（拖动框）前
		        s = contains.removeChild(childs[sIndex]);

		        arr  = getBlocksPosArr(contains);
		        var lentest = arr.length;
		        // console.log(arr);
		        // console.log("cx="+cx+"; cy="+cy);
		        console.log("此时有"+lentest+" 个div");
		        var dIndex = getIndexByPos(arr, {x:cx,y:cy});
		        console.log("目标是d="+dIndex);

		        if(dIndex == lentest - 1){
		          console.log("enter !");
		          contains.insertBefore(s, childs[sIndex]);
		        }else{
		          console.log("!插入"+dIndex+"之前");
		          contains.insertBefore(s, childs[dIndex]);
		          sIndex = dIndex;
		        }
		      }
		    }

			// 获取元素相对页面的位置
			function getOffset(ele){
		      	var totalLeft = ele.offsetLeft,
		        	totalTop = ele.offsetTop,
		        	parent = ele.offsetParent;

		      	while(parent != null){
		        	totalLeft += parent.offsetLeft;
		        	totalTop  += parent.offsetTop;
		        	parent = parent.offsetParent;
		      	}

		      	return {
		        	left: totalLeft,
		        	top: totalTop
		      	}
		    }

		    // 获取元素相对父元素的特性
		    function getPosFromEleArr(child){
		    	
		    	var parent = child.parentNode,
		      		len = parent.childNodes.length,
			        i = 0,
			        ele = parent.firstChild,
			        width = child.offsetWidth,
			        height = child.offsetHeight;

		      	while(ele != child){
		        	i++;
		        	ele = ele.nextSibling;
		      	}

		      	return {
		        	index: i,
		        	x: child.offsetLeft,
		        	y: child.offsetTop,
		        	w: width,
		        	h: height
		      	};
		    }

		    function updateBlockSort(){

		      	var arr = [],
		      		childs = doc.getElementsByClassName("block1");

		      	// 最后一个克隆了，故不是，还有一个是更多，也不需要加入到localStorage中
		      	// localStorage中只存放除更多之外的
		      	for (var i = 0, len = childs.length; i < len; i++){
		        	arr[i] = childs[i].getAttribute("sortN");
		      	}
		      	localStorage.setItem("mainBlocks", JSON.stringify(arr));
		      	// console.log("更新arr="+arr);
		    }

		    // 进入页面时返回每个块位置范围
		    // [[minX,maxX],[minY,maxY]]
		    function getBlocksPosArr(parent){
		      var arr = [],
		        childs = parent.childNodes,
		        len = childs.length,
		        i;

		      for (i = 0; i < len; i++){
		        if(childs[i].nodeType === 1){
		          arr[i] = [];
		          arr[i][0] = [childs[i].offsetLeft, childs[i].offsetLeft + childs[i].offsetWidth];
		          arr[i][1] = [childs[i].offsetTop, childs[i].offsetTop + childs[i].offsetHeight];
		        }else{
		          arr[i] = "";
		        }
		      }
		      return arr;
		    }

		    // 根据pos、arr组判断元素在父元素中的index
		    function getIndexByPos(arr, pos){
		      var x = pos.x,
		        y = pos.y,
		        i,
		        len = arr.length ? arr.length : 0;

		      for (i = 0; i < len; i++){
		        if(Object.prototype.toString.call(arr[i]) === "[object Array]"){
		          if(x > arr[i][0][0] && x <= arr[i][0][1]){
		            if(y > arr[i][1][0] && y <= arr[i][1][1]){
		              return i;
		            }
		          }
		        }
		      }
		      return len;
		    }

		}
	}
})