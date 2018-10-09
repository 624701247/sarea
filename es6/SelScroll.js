import * as utils from "./utils"
import {selData} from "./selData"


var createBlockStr = function(idName) {
	let node = document.createElement('div')
	node.id = idName
	node.className = 'block ' + idName
	node.innerHTML = '<ul class="sarea-list"></ul>'
	return node
}

export class SelScroll {

	// @param el_parent : 父节点dom对象
	// @param childNum: 子项数量
	// @param bId : 第 n 级   从 1 开始
	constructor(el_parent, childNum, bId) {
		let node = createBlockStr('block-' + bId)
		el_parent.appendChild(node)

		this.bId = bId
		this.listData = null

		if(childNum > 0) {
			this.subSelScroll = new SelScroll(el_parent, childNum - 1, bId + 1)
		}
		else {
			this.subSelScroll = null
		}

		// 
		this.el_cont = node
		// this.el_cont.onscroll = this.onScroll.bind(this)



		this.el_list = this.el_cont.querySelector('.sarea-list')

		this.el_items = null //项目列表
		this.itemHei = null  //项目高度

		// this.scTimer = null

		this.slowAniTimer = null  //缓动停下动画定时器
		this.inSlowAni = false    //缓动停下动画中，请等待

		this.inTouch = false  //是否在触摸操作中

		// this.curTop = 0
		this.maxTop = 0 //可以设置的最高 scrollTop值  设置超过该值得到结果是 scrollTop为该值

		// this.curTag = 0 //当前第一项的id 从0开始


		this.startTimeStamp = 0 //触摸开始时间戳
		this.startClientY = 0   //触摸开始y坐标
		this.curMoveClientY = 0 //移动中y坐标
		// this.endTimeStamp = 0  //触摸结束时间戳

		this.el_cont.addEventListener("touchstart", this.onTouchStart.bind(this), true);
	    this.el_cont.addEventListener("touchmove", this.onTouchMove.bind(this), false);
	    this.el_cont.addEventListener("touchend", this.onTouchEnd.bind(this), true);
	}

	onTouchStart(ev) {
		//  kone point : 
		// console.log('start screenX', ev.targetTouches[0].screenY)  //相对于设备屏幕
		// console.log('start pageX', ev.targetTouches[0].pageY) // ??
		// console.log('start pageX', ev.targetTouches[0].clientY) // ??

		ev.preventDefault();
		if(this.inSlowAni) {
			return
		}
		this.inTouch = true

		var touch = ev.changedTouches[0]
		this.startTimeStamp = ev.timeStamp
		this.startClientY = touch.clientY
		this.curMoveClientY = touch.clientY
	}
	onTouchMove(ev) {
		ev.preventDefault();
		if(!this.inTouch) {
			return
		}

		// var touch = ev.changedTouches[0]
		this.drag(ev, false)
	}
	onTouchEnd(ev) {
		ev.preventDefault();
		if(!this.inTouch) {
			this.inTouch = false
			return
		}
		this.inTouch = false

		var touch = ev.changedTouches[0]
		var timeDif = Math.abs(ev.timeStamp - this.startTimeStamp) //时间差值
		var destDif = Math.abs(touch.clientY - this.startClientY) //位置差值
		// console.log('timeDif', timeDif)
		// console.log('destDif', destDif, this.itemHei)
		if(timeDif < 300 &&  destDif < this.itemHei) {
			// clog('点击') //kone todo
			this.drag(ev, true)
		}
		else if(timeDif < 400 && destDif >= this.itemHei * 2) { //kone todo
			var dir;
			// console.log(touch.clientY, this.startClientY)
			if(touch.clientY > this.startClientY) {
				// clog('往下滑动')
				dir = -1
			}
			else {
				// clog('往上滑动')
				dir = 1
			}
			this.slide(dir, timeDif / 400)
		}
		else {
			// clog('拖动')
			this.drag(ev, true)
		}
	}

	// 拖动操作
	drag(ev, isEnd) {
		var touch = ev.changedTouches[0]
		var newTop = this.el_cont.scrollTop + this.curMoveClientY - touch.clientY
		if(newTop < 0) {
			newTop = 0
			// console.log('min')
		}
		if(newTop > this.maxTop) {
			newTop = this.maxTop
			// console.log('max')
		}
		this.el_cont.scrollTop = newTop
		this.curMoveClientY = touch.clientY

		if(isEnd) {
			this.aniSlowTop()
		}
	}

	// 滑动操作
	// @param rate : 0 -- 1 开区间 
	slide(dir, rate) {
		// console.log('slide', dir, rate)
		var target = this.el_cont
		var distTop = target.scrollTop + dir * this.maxTop * (1 - rate)
		if(distTop < 0) {
			distTop = 0
		}
		if(distTop > this.maxTop) {
			distTop = this.maxTop
		}
		var step = 2

		var isEnd = false
		var timer = setInterval(function() {
			var newTop = target.scrollTop + step
			if(Math.abs(newTop - target.scrollTop) <= step) {
				newTop = distTop
				isEnd = true
				// clog('slide end')
			}
			target.scrollTop = newTop


			if(isEnd) {
				clearInterval(timer)
				this.aniSlowTop()
			}

		}.bind(this), 50)

	}

	// 
	aniSlowTop() {
		// clog('ani slow')
		this.inSlowAni = true

		//  更新选中数据 跟 子列表
		var info = this.getCurSelInfo()
		selData.setSel(this.bId, info.tag, info.name)
		if(this.subSelScroll) {
			this.subSelScroll.updateList()
		}
		console.log('cur sel info', this.bId, info.tag, info.name)

		var target = this.el_cont
		var endTop = info.tag * this.itemHei

		if(target.scrollTop == endTop) {
			this.onAniSlowTopEnd()
			// clog(' == ')
			return 
		}

		utils.addClass(target, 'block-stop')

		let dist = endTop - target.scrollTop
		var step = 0.5 //dist / Math.abs(dist) * 2
		// clog(' != ' + step)

		this.slowAniTimer = setInterval(function() {
			var newTop = target.scrollTop + step			
			if(Math.abs(newTop -  target.scrollTop) <= step) {
				target.scrollTop = endTop

				utils.removeClass(target, 'block-stop')
				clearInterval(this.slowAniTimer)
				this.slowAniTimer = null 			 	
			 	this.onAniSlowTopEnd()
			}
			else {
				target.scrollTop = newTop
				console.log('nnn', newTop)
			}
		}.bind(this), 30)
	}
	onAniSlowTopEnd(tag) {
		setTimeout(function() {
			this.inSlowAni = false
			// clog('slow ani')
		}.bind(this), 80)
	}

	//
	updateMaxTop() {
		utils.removeClass(this.el_cont, 'block-stop')
		this.el_cont.scrollTop = 0
		this.maxTop = this.el_list.clientHeight - this.el_cont.clientHeight
		// console.log(this.maxTop, 'max')
	}

	setCurSel(curIdx) {
		// console.log('curIdx', curIdx)
		this.el_cont.scrollTop = (curIdx) * this.itemHei
	}


	// 创建列表
	addList() {
		let count = 0
		let str = ''
		str += this.createItem('', ++count)
		str += this.createItem('', ++count)
		for(let key in this.listData)  {
			str += this.createItem(key, ++count)
		}
		str += this.createItem('', ++count)
		str += this.createItem('', ++count)
		this.el_list.innerHTML = str
	}

	// 创建选择项
	createItem(val, id) {
		return '<li id="sarea-item-' + id + '" class="sarea-item sarea-item-' + this.bId + '">' + val + '</li>'
	}

	// 
	updateList() {
		this.listData = selData.getListDataById(this.bId)
		this.addList()

		this.el_items = this.el_list.getElementsByClassName('sarea-item')
		if(this.itemHei == null) {
			// this.itemHei = this.el_items[0].clientHeight //这样会有误差，导致滚到结尾位置不准确
			this.itemHei = this.el_cont.clientHeight  / 5
		}
		this.updateMaxTop()


		let val = selData.getSelValById(this.bId)
		let tag = selData.getTagByKey(this.listData, val)
		this.setCurSel(tag)

		if(this.subSelScroll) {
			this.subSelScroll.updateList()
		}
	}


	getCurSelInfo() {
		var tag = Math.round(this.el_cont.scrollTop / this.itemHei )

		return {
			tag: tag,
			name: this.el_items[tag + 2].innerHTML
		}
	}
}
