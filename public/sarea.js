var sarea=function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.addClass=function(t,e){e=" "+e;var n=null;n="string"==typeof t?document.getElementById(t):t;-1==n.className.indexOf(e)&&(n.className+=e)},e.removeClass=function(t,e){e=" "+e;var n=null;n="string"==typeof t?document.getElementById(t):t;n.className=n.className.replace(e,"")},e.getFirstKey=function(t){for(var e in t)return e;return""}},,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.close=e.open=e.addSelEventListener=e.init=void 0;var i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),a=n(5),l=n(6),s=n(4);var r=null,o=null,u="cont-sarea",c="cont-sarea-show",h=null,f=null,v=(e.init=function(t,e){if(h&&h.getData()==t)console.log("重复初始化");else{(h=t instanceof Array?new l.SelDataMgr:new a.SelAssDataMgr).setData(t,e),o=null;var n=document.getElementById(u);n&&n.remove();var i="";i+='\n\t<div class="sarea">\n\t\t<div class="sarea-hd">\n\t\t\t<span id="btn-area-cancel" class="btn-area">取消</span>\n\t\t\t<span id="btn-area-ok" class="btn-area">确认</span>\n\t\t</div>\n\n\t\t<div class="sarea-bd">\n\t\t\t<div id="selmask" class="selmask"></div>\n\t\t</div>\n\t</div>\n\t';var s,c,f=document.createElement("div");f.className=f.id=u,f.innerHTML=i,document.body.appendChild(f),s=f,c=document.documentElement.clientWidth||document.body.clientWidth,s.style.fontSize=c/7.5+"px",r=f,document.querySelector("#btn-area-cancel").onclick=v,document.querySelector("#btn-area-ok").onclick=function(){var t=new Event("onSel");t.data=h.getAllSelVal(),r.dispatchEvent(t),v()}}},e.addSelEventListener=function(t,e){null!=r?(f&&r.removeEventListener("onSel",f),f=function(n){null==e?t(n.data):t.call(e,n.data)},r.addEventListener("onSel",f)):console.error("sarea 还没初始化")},e.open=function(t){if(null!=r){if(h.initSelAry(t),i.addClass(r,c),null==o){var e=r.querySelector(".sarea-bd");o=new s.SelScroll(e,h)}o.updateList()}else console.error("sarea 还没初始化")},e.close=function(){null!=r&&i.removeClass(r,c)})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SelScroll=void 0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0));var l=function(t){var e=document.createElement("div");return e.id=t,e.className="block "+t,e.innerHTML='<ul class="sarea-list"></ul>',e};e.SelScroll=function(){function t(e,n,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.bId=i||0,this.listData=null,this.slData=n,this.isAss=n.getIsAss();var a=l("block-"+this.bId);e.appendChild(a);var s=this.slData.getBlockNum()-this.bId-1;this.subSelScroll=s>0?new t(e,this.slData,this.bId+1):null,this.el_cont=a,this.el_list=this.el_cont.querySelector(".sarea-list"),this.el_items=null,this.itemHei=null,this.slowAniTimer=null,this.inSlowAni=!1,this.inTouch=!1,this.maxTop=0,this.startTimeStamp=0,this.startClientY=0,this.curMoveClientY=0,this.el_cont.addEventListener("touchstart",this.onTouchStart.bind(this),!0),this.el_cont.addEventListener("touchmove",this.onTouchMove.bind(this),!1),this.el_cont.addEventListener("touchend",this.onTouchEnd.bind(this),!0)}return i(t,[{key:"onTouchStart",value:function(t){if(t.preventDefault(),!this.inSlowAni){this.inTouch=!0;var e=t.changedTouches[0];this.startTimeStamp=t.timeStamp,this.startClientY=e.clientY,this.curMoveClientY=e.clientY}}},{key:"onTouchMove",value:function(t){t.preventDefault(),this.inTouch&&this.drag(t,!1)}},{key:"onTouchEnd",value:function(t){if(t.preventDefault(),this.inTouch){this.inTouch=!1;var e=t.changedTouches[0],n=Math.abs(t.timeStamp-this.startTimeStamp),i=Math.abs(e.clientY-this.startClientY);if(n<250&&i<this.itemHei)this.drag(t,!0);else if(n<300&&i>=2*this.itemHei){var a;a=e.clientY>this.startClientY?-1:1;var l=1-n/300,s=i/(10*this.itemHei),r=Math.ceil(s*l*100);this.slide(t,a,r)}else this.drag(t,!0)}else this.inTouch=!1}},{key:"drag",value:function(t,e){var n=t.changedTouches[0].clientY,i=t.currentTarget,a=i.scrollTop+this.curMoveClientY-n;a<0&&(a=0),a>this.maxTop&&(a=this.maxTop),i.scrollTop=a,this.curMoveClientY=n,e&&this.aniSlowTop(i)}},{key:"slide",value:function(t,e,n){var i=t.currentTarget,a=i.scrollTop+e*this.maxTop*n/100;a<0&&(a=0),a>this.maxTop&&(a=this.maxTop);var l,s=a-i.scrollTop;l=s>0?30:-30;var r=Math.round(Math.abs(s/l)),o=!1,u=setInterval(function(){r--;var t=i.scrollTop+l;r<=0&&(t=a,o=!0),i.scrollTop=t,o&&(clearInterval(u),this.aniSlowTop(i))}.bind(this),25)}},{key:"aniSlowTop",value:function(t){this.inSlowAni=!0;var e=this.getCurSelInfo();this.slData.setSel(this.bId,e.tag,e.name),this.subSelScroll&&this.isAss&&this.subSelScroll.updateList();var n,i=e.tag*this.itemHei;if(t.scrollTop==i)return this.onAniSlowTopEnd(),void console.log(" == ");a.addClass(t,"block-stop");var l=i-t.scrollTop;n=l>0?1:-1;var s=Math.round(Math.abs(l/n));this.slowAniTimer=setInterval(function(){s--;var e=t.scrollTop+n;s<=0?(t.scrollTop=i,a.removeClass(t,"block-stop"),clearInterval(this.slowAniTimer),this.slowAniTimer=null,this.onAniSlowTopEnd()):t.scrollTop=e}.bind(this),25)}},{key:"onAniSlowTopEnd",value:function(t){setTimeout(function(){this.inSlowAni=!1}.bind(this),80)}},{key:"updateMaxTop",value:function(){a.removeClass(this.el_cont,"block-stop"),this.el_cont.scrollTop=0,this.maxTop=this.el_list.clientHeight-this.el_cont.clientHeight}},{key:"setCurSel",value:function(t){this.el_cont.scrollTop=t*this.itemHei}},{key:"addList",value:function(){var t=0,e="";e+=this.createItem("",++t),e+=this.createItem("",++t);for(var n in this.listData)e+=this.createItem(n,++t);e+=this.createItem("",++t),e+=this.createItem("",++t),this.el_list.innerHTML=e}},{key:"createItem",value:function(t,e){return'<li id="sarea-item-'+e+'" class="sarea-item sarea-item-'+this.bId+'">'+t+"</li>"}},{key:"updateList",value:function(){this.listData=this.slData.getListDataById(this.bId),this.addList(),this.el_items=this.el_list.getElementsByClassName("sarea-item"),null==this.itemHei&&(this.itemHei=this.el_cont.clientHeight/5),this.updateMaxTop();var t=this.slData.getSelValById(this.bId),e=this.slData.getTagByKey(this.listData,t);this.setCurSel(e),this.subSelScroll&&this.subSelScroll.updateList()}},{key:"getCurSelInfo",value:function(){var t=Math.round(this.el_cont.scrollTop/this.itemHei);return{tag:t,name:this.el_items[t+2].innerHTML}}}]),t}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SelAssDataMgr=void 0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0));e.SelAssDataMgr=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.listData,this.blockNum,this.selValAry}return i(t,[{key:"getIsAss",value:function(){return!0}},{key:"setData",value:function(t,e){this.listData=t;for(var n=1,i=t;;){var l=a.getFirstKey(i);if(!i[l].items)break;n++,i=i[l].items}this.blockNum=e||n}},{key:"getData",value:function(){return this.listData}},{key:"getBlockNum",value:function(){return this.blockNum}},{key:"initSelAry",value:function(t){t=t||[];for(var e=this.listData,n=0;n<this.blockNum;n++)t[n]&&null!=e[t[n]]||(t[n]=a.getFirstKey(e)),e=e[t[n]].items;this.selValAry=t}},{key:"setSel",value:function(t,e,n){this.selValAry[t]!=n&&(this.selValAry[t]=n,this.initSelAry(this.selValAry))}},{key:"getAllSelVal",value:function(){return this.selValAry}},{key:"getSelValById",value:function(t){return this.selValAry[t]}},{key:"getListDataById",value:function(t){for(var e=this.listData,n=0;n<t;n++)e=e[this.selValAry[n]].items;return e}},{key:"getTagByKey",value:function(t,e){var n=0;for(var i in t){if(e==i)break;n++}return n}}]),t}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e.SelDataMgr=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.listData,this.blockNum,this.selValAry}return i(t,[{key:"getIsAss",value:function(){return!1}},{key:"setData",value:function(t,e){this.listData=t,this.blockNum=e||this.listData.length}},{key:"getData",value:function(){return this.listData}},{key:"getBlockNum",value:function(){return this.blockNum}},{key:"initSelAry",value:function(t){t=t||[];for(var e=0;e<this.blockNum;e++)if(!t[e]||null==this.listData[e][t[e]])for(var n in this.listData[e]){t[e]=n;break}this.selValAry=t}},{key:"setSel",value:function(t,e,n){this.selValAry[t]=n}},{key:"getAllSelVal",value:function(){return this.selValAry}},{key:"getSelValById",value:function(t){return this.selValAry[t]}},{key:"getListDataById",value:function(t){return this.listData[t]}},{key:"getTagByKey",value:function(t,e){var n=0;for(var i in t){if(e==i)break;n++}return n}}]),t}()}]);