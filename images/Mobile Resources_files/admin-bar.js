if(typeof(jQuery)!="undefined"){if(typeof(jQuery.fn.hoverIntent)=="undefined"){(function(b){b.fn.hoverIntent=function(p,r){var g={sensitivity:7,interval:100,timeout:0};g=b.extend(g,r?{over:p,out:r}:p);var a,f,t,v;var u=function(c){a=c.pageX;f=c.pageY};var w=function(c,d){d.hoverIntent_t=clearTimeout(d.hoverIntent_t);if((Math.abs(t-a)+Math.abs(v-f))<g.sensitivity){b(d).unbind("mousemove",u);d.hoverIntent_s=1;return g.over.apply(d,[c])}else{t=a;v=f;d.hoverIntent_t=setTimeout(function(){w(c,d)},g.interval)}};var s=function(c,d){d.hoverIntent_t=clearTimeout(d.hoverIntent_t);d.hoverIntent_s=0;return g.out.apply(d,[c])};var x=function(e){var d=this;var c=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(c&&c!=this){try{c=c.parentNode}catch(e){c=this}}if(c==this){if(b.browser.mozilla){if(e.type=="mouseout"){d.mtout=setTimeout(function(){q(e,d)},30)}else{if(d.mtout){d.mtout=clearTimeout(d.mtout)}}}return}else{if(d.mtout){d.mtout=clearTimeout(d.mtout)}q(e,d)}};var q=function(e,d){var c=jQuery.extend({},e);if(d.hoverIntent_t){d.hoverIntent_t=clearTimeout(d.hoverIntent_t)}if(e.type=="mouseover"){t=c.pageX;v=c.pageY;b(d).bind("mousemove",u);if(d.hoverIntent_s!=1){d.hoverIntent_t=setTimeout(function(){w(c,d)},g.interval)}}else{b(d).unbind("mousemove",u);if(d.hoverIntent_s==1){d.hoverIntent_t=setTimeout(function(){s(c,d)},g.timeout)}}};return this.mouseover(x).mouseout(x)}})(jQuery)}jQuery(document).ready(function(e){var d=e("#wpadminbar"),c,a,b,f=false;c=function(g,j){var k=e(j),h=k.attr("tabindex");if(h){k.attr("tabindex","0").attr("tabindex",h)}};a=function(g){d.find("li.menupop").on("click.wp-mobile-hover",function(i){var h=e(this);if(!h.hasClass("hover")){i.preventDefault();d.find("li.menupop.hover").removeClass("hover");h.addClass("hover")}if(g){e("li.menupop").off("click.wp-mobile-hover");f=false}})};b=function(){var g=/Mobile\/.+Safari/.test(navigator.userAgent)?"touchstart":"click";e(document.body).on(g+".wp-mobile-hover",function(h){if(!e(h.target).closest("#wpadminbar").length){d.find("li.menupop.hover").removeClass("hover")}})};d.removeClass("nojq").removeClass("nojs");if("ontouchstart" in window){d.on("touchstart",function(){a(true);f=true});b()}else{if(/IEMobile\/[1-9]/.test(navigator.userAgent)){a();b()}}d.find("li.menupop").hoverIntent({over:function(g){if(f){return}e(this).addClass("hover")},out:function(g){if(f){return}e(this).removeClass("hover")},timeout:180,sensitivity:7,interval:100});if(window.location.hash){window.scrollBy(0,-32)}e("#wp-admin-bar-get-shortlink").click(function(g){g.preventDefault();e(this).addClass("selected").children(".shortlink-input").blur(function(){e(this).parents("#wp-admin-bar-get-shortlink").removeClass("selected")}).focus().select()});e("#wpadminbar li.menupop > .ab-item").bind("keydown.adminbar",function(i){if(i.which!=13){return}var h=e(i.target),g=h.closest("ab-sub-wrapper");i.stopPropagation();i.preventDefault();if(!g.length){g=e("#wpadminbar .quicklinks")}g.find(".menupop").removeClass("hover");h.parent().toggleClass("hover");h.siblings(".ab-sub-wrapper").find(".ab-item").each(c)}).each(c);e("#wpadminbar .ab-item").bind("keydown.adminbar",function(h){if(h.which!=27){return}var g=e(h.target);h.stopPropagation();h.preventDefault();g.closest(".hover").removeClass("hover").children(".ab-item").focus();g.siblings(".ab-sub-wrapper").find(".ab-item").each(c)});e("#wpadminbar").click(function(g){if(g.target.id!="wpadminbar"&&g.target.id!="wp-admin-bar-top-secondary"){return}g.preventDefault();e("html, body").animate({scrollTop:0},"fast")});e(".screen-reader-shortcut").keydown(function(g){if(13!=g.which){return}var h=e(this).attr("href");if(e.browser.webkit&&h&&h.charAt(0)=="#"){setTimeout(function(){e(h).focus()},100)}})})}else{(function(j,l){var e=function(o,n,d){if(o.addEventListener){o.addEventListener(n,d,false)}else{if(o.attachEvent){o.attachEvent("on"+n,function(){return d.call(o,window.event)})}}},f,g=new RegExp("\\bhover\\b","g"),b=[],k=new RegExp("\\bselected\\b","g"),h=function(n){var d=b.length;while(d--){if(b[d]&&n==b[d][1]){return b[d][0]}}return false},i=function(u){var o,d,r,n,q,s,v=[],p=0;while(u&&u!=f&&u!=j){if("LI"==u.nodeName.toUpperCase()){v[v.length]=u;d=h(u);if(d){clearTimeout(d)}u.className=u.className?(u.className.replace(g,"")+" hover"):"hover";n=u}u=u.parentNode}if(n&&n.parentNode){q=n.parentNode;if(q&&"UL"==q.nodeName.toUpperCase()){o=q.childNodes.length;while(o--){s=q.childNodes[o];if(s!=n){s.className=s.className?s.className.replace(k,""):""}}}}o=b.length;while(o--){r=false;p=v.length;while(p--){if(v[p]==b[o][1]){r=true}}if(!r){b[o][1].className=b[o][1].className?b[o][1].className.replace(g,""):""}}},m=function(d){while(d&&d!=f&&d!=j){if("LI"==d.nodeName.toUpperCase()){(function(n){var o=setTimeout(function(){n.className=n.className?n.className.replace(g,""):""},500);b[b.length]=[o,n]})(d)}d=d.parentNode}},c=function(q){var o,d,p,n=q.target||q.srcElement;while(true){if(!n||n==j||n==f){return}if(n.id&&n.id=="wp-admin-bar-get-shortlink"){break}n=n.parentNode}if(q.preventDefault){q.preventDefault()}q.returnValue=false;if(-1==n.className.indexOf("selected")){n.className+=" selected"}for(o=0,d=n.childNodes.length;o<d;o++){p=n.childNodes[o];if(p.className&&-1!=p.className.indexOf("shortlink-input")){p.focus();p.select();p.onblur=function(){n.className=n.className?n.className.replace(k,""):""};break}}return false},a=function(n){var s,q,p,d,r,o;if(n.id!="wpadminbar"&&n.id!="wp-admin-bar-top-secondary"){return}s=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if(s<1){return}o=s>800?130:100;q=Math.min(12,Math.round(s/o));p=s>800?Math.round(s/30):Math.round(s/20);d=[];r=0;while(s){s-=p;if(s<0){s=0}d.push(s);setTimeout(function(){window.scrollTo(0,d.shift())},r*q);r++}};e(l,"load",function(){f=j.getElementById("wpadminbar");if(j.body&&f){j.body.appendChild(f);if(f.className){f.className=f.className.replace(/nojs/,"")}e(f,"mouseover",function(d){i(d.target||d.srcElement)});e(f,"mouseout",function(d){m(d.target||d.srcElement)});e(f,"click",c);e(f,"click",function(d){a(d.target||d.srcElement)})}if(l.location.hash){l.scrollBy(0,-32)}})})(document,window)};