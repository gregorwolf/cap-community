/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./Plugin","sap/ui/Device","sap/base/util/UriParameters","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/security/encodeURL"],function(e,t,i,n,o,r,s){"use strict";var a=e.extend("sap.ui.core.support.Support",{constructor:function(t){if(!d){throw Error()}e.apply(this);var r=this;this._sType=t;this._sLocalOrigin=window.location.protocol+"//"+window.location.host;var s=o.proxy(this._receiveEvent,this);if(window.addEventListener){window.addEventListener("message",s,false)}else{window.attachEvent("onmessage",s)}switch(t){case u.APPLICATION:this._isOpen=false;this.attachEvent(p.TEAR_DOWN,function(e){r._isOpen=false;if(i.browser.msie){o(document.getElementById(c+"-frame")).remove()}else{m(r._oRemoteWindow)}r._oRemoteWindow=null;a.exitPlugins(r,false)});this.attachEvent(p.LIBS,function(e){var t=a.getDiagnosticLibraries(),i=[];for(var n=0;n<t.length;n++){i.push(t[n].name)}r.sendEvent(p.LIBS,i)});this.attachEvent(p.SETUP,function(e){r._isOpen=true;a.initPlugins(r,false)});break;case u.IFRAME:this._oRemoteWindow=window.parent;this._sRemoteOrigin=n.fromQuery(window.location.search).get("sap-ui-xx-support-origin");this.openSupportTool();o(window).bind("unload",function(e){m(r._oOpenedWindow)});break;case u.TOOL:this._oRemoteWindow=window.opener;this._sRemoteOrigin=n.fromQuery(window.location.search).get("sap-ui-xx-support-origin");o(window).bind("unload",function(e){r.sendEvent(p.TEAR_DOWN);a.exitPlugins(r,true)});this.attachEvent(p.LIBS,function(e){var t=e.mParameters;if(!Array.isArray(t)){t=Object.keys(t).map(function(e){return t[e]})}sap.ui.getCore().loadLibraries(t,true).then(function(){o(function(){a.initPlugins(r,true).then(function(){r.sendEvent(p.SETUP)})})})});this.sendEvent(p.LIBS);break}}});var u={APPLICATION:"APPLICATION",IFRAME:"IFRAME",TOOL:"TOOL"};var p={LIBS:"sapUiSupportLibs",SETUP:"sapUiSupportSetup",TEAR_DOWN:"sapUiSupportTeardown"};a.StubType=u;a.EventType=p;var f=[];a.getStub=function(e){if(l){return l}if(e!=u.APPLICATION&&e!=u.IFRAME&&e!=u.TOOL){e=u.APPLICATION}d=true;l=new a(e);d=false;return l};a.getToolPlugins=function(){var e=[];for(var i=0;i<f.length;i++){if(f[i]instanceof t&&f[i].isToolPlugin()){e.push(f[i])}}return e};a.getAppPlugins=function(){var e=[];for(var i=0;i<f.length;i++){if(f[i]instanceof t&&f[i].isAppPlugin()){e.push(f[i])}}return e};a.prototype.getType=function(){return this._sType};a.prototype.isToolStub=function(){return this._sType===a.StubType.TOOL};a.prototype.isAppStub=function(){return this._sType===a.StubType.APPLICATION};a.prototype._receiveEvent=function(e){var t=e.data;if(typeof t==="string"&&t.indexOf("SAPUI5SupportTool*")===0){t=t.substr(18)}else{return}if(e.source!=this._oRemoteWindow){return}this._oRemoteOrigin=e.origin;if(this._sType===u.IFRAME){var i=this;setTimeout(function(){i._oOpenedWindow.sap.ui.core.support.Support.getStub(u.TOOL)._receiveEvent({source:window,data:e.data,origin:i._sLocalOrigin})},0)}else{var n=JSON.parse(t);var o=n.eventId;var r=n.params;this.fireEvent(o,r)}};a.prototype.sendEvent=function(e,t){if(!this._oRemoteWindow){return}t=t?t:{};if(i.browser.msie&&this._sType===u.TOOL){this._oRemoteWindow.sap.ui.core.support.Support.getStub(u.IFRAME).sendEvent(e,t)}else{var n=t;if(i.browser.msie){n={};o.extend(true,n,t)}var r={eventId:e,params:n};var s="SAPUI5SupportTool*"+JSON.stringify(r);this._oRemoteWindow.postMessage(s,this._sRemoteOrigin)}};a.prototype.openSupportTool=function(){var e=sap.ui.require.toUrl("sap/ui/core/support/support.html");var t="?sap-ui-xx-noless=true&sap-ui-xx-support-origin="+s(this._sLocalOrigin);var o;if(this._sType===u.APPLICATION){var r=window.document.getElementById("sap-ui-bootstrap");if(r){var a=sap.ui.require.toUrl("");var p=r.getAttribute("src");if(typeof p==="string"&&p.indexOf(a)===0){o=p.substr(a.length)}}}else if(this._sType===u.IFRAME){o=n.fromQuery(window.location.search).get("sap-ui-xx-support-bootstrap")}if(o&&o!=="sap-ui-core.js"&&o.indexOf("/")===-1){t+="&sap-ui-xx-support-bootstrap="+s(o)}function f(e){return e.indexOf(".")==0||e.indexOf("/")==0||e.indexOf("://")<0}if(this._sType===u.APPLICATION){if(!this._isOpen){if(i.browser.msie){var d=sap.ui.require.toUrl("sap/ui/core/support/msiebridge.html");g().html("").append(v(d,t));this._sRemoteOrigin=f(d)?this._sLocalOrigin:d}else{this._oRemoteWindow=h(e+t);this._sRemoteOrigin=f(e)?this._sLocalOrigin:e}}else{this._oRemoteWindow.focus()}}else if(this._sType===u.IFRAME){this._oOpenedWindow=h(e+t)}};a._onSupportIFrameLoaded=function(){l._oRemoteWindow=o(document.getElementById(c+"-frame"))[0].contentWindow};a.prototype.toString=function(){return"sap.ui.core.support.Support"};var d=false;var l;var c="sap-ui-support";function g(){var e=o(document.getElementById(c));if(e.length===0){e=o("<DIV/>",{id:c}).addClass("sapUiHidden").appendTo(document.body)}return e}function v(e,t){var i=document.createElement("iframe");i.id=c+"-frame";i.src=e+t;i.onload=a._onSupportIFrameLoaded;return i}function h(e){return window.open(e,"sapUiSupportTool","width=800,height=700,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=yes")}function m(e){if(!e){return}try{e.close()}catch(e){}}a.getDiagnosticLibraries=function(){var e=sap.ui.getCore().getLoadedLibraries(),t=[];for(var i in e){var n=e[i];if(n.extensions&&n.extensions["sap.ui.support"]&&n.extensions["sap.ui.support"].diagnosticPlugins){t.push(n)}}return t};a.initPlugins=function(e,i){return new Promise(function(i,n){f=[];var o=a.getDiagnosticLibraries();for(var r=0;r<o.length;r++){var s=o[r],u=s.extensions["sap.ui.support"].diagnosticPlugins;if(Array.isArray(u)){for(var p=0;p<u.length;p++){if(f.indexOf(u[p])===-1){f.push(u[p])}}}}var d=[],l=[],r;for(r=0;r<f.length;r++){if(typeof f[r]==="string"){d.push(f[r]);l.push(r)}}sap.ui.require(d,function(){var n,o,r;for(o=0;o<arguments.length;o++){r=arguments[o];n=l[o];if(e.isToolStub()&&r.prototype.isToolPlugin()){f[n]=new r(e);S(f[n])}else if(e.isAppStub()&&r.prototype.isAppPlugin()){f[n]=new r(e)}}for(n=0;n<f.length;n++){if(f[n]instanceof t){if(e.isToolStub()&&f[n].isToolPlugin()){f[n].init(e)}else if(e.isAppStub()&&f[n].isAppPlugin()){f[n].init(e)}}}i()})})};a.exitPlugins=function(e,i){for(var n=0;n<f.length;n++){if(f[n]instanceof t){if(f[n].isToolPlugin()&&e.isToolStub()&&i){f[n].exit(e,true)}else if(f[n].isAppPlugin()&&e.isAppStub()&&!i){f[n].exit(e,false)}}}};function S(e){e.$().replaceWith("<div  id='"+e.getId()+"-Panel' class='sapUiSupportPnl'>"+"<div id='"+e.getId()+"-PanelHeader' class='sapUiSupportPnlHdr'>"+"<div id='"+e.getId()+"-PanelHandle' class='sapUiSupportPnlHdrHdl sapUiSupportPnlHdrHdlClosed'>"+"</div>"+"<div class='sapUiSupportPanelTitle'>"+e.getTitle()+"</div>"+"</div>"+"<div id='"+e.getId()+"-PanelContent' class='sapUiSupportPnlCntnt sapUiSupportHidden'>"+"<div id='"+e.getId()+"' class='sapUiSupportPlugin'></div>"+"</div>"+"</div>");e.$("PanelHeader").click(function(){var t=e.$("PanelHandle");if(t.hasClass("sapUiSupportPnlHdrHdlClosed")){t.removeClass("sapUiSupportPnlHdrHdlClosed");e.$("PanelContent").removeClass("sapUiSupportHidden")}else{t.addClass("sapUiSupportPnlHdrHdlClosed");e.$("PanelContent").addClass("sapUiSupportHidden")}})}a.initializeSupportMode=function(e,t){if(e.indexOf("true")>-1||e.indexOf("viewinfo")>-1){a._initializeSupportInfo(t)}};a._initializeSupportInfo=function(e){var t=[],i=[],n=[],o="support:data",s="support",u="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1",p={};var f=function(){var e="sap-ui-support.probe",t;try{localStorage.setItem(e,e);t=localStorage.getItem(e);localStorage.removeItem(e);return t===e}catch(e){return false}}();function d(){if(f){localStorage.setItem("sap-ui-support.aSupportInfosBreakpoints/"+document.location.href,JSON.stringify(i))}}function l(){if(f){localStorage.setItem("sap-ui-support.aSupportXMLModifications/"+document.location.href,JSON.stringify(n))}}if(f){var c=localStorage.getItem("sap-ui-support.aSupportInfosBreakpoints/"+document.location.href);if(c){i=JSON.parse(c)}var c=localStorage.getItem("sap-ui-support.aSupportXMLModifications/"+document.location.href);if(c){n=JSON.parse(c)}}a.info=function(e){e._idx=t.length;if(e._idx>0&&!e.context){e.context=t[t.length-1].context}if(!e.context){r.debug("Support Info does not have a context and is ignored");return e}if(e.context&&e.context.ownerDocument&&e.context.nodeType===1){var n=e._idx+"";if(!e.context.hasAttributeNS(u,"data")){e.context.setAttribute("xmlns:"+s,u)}else{n=e.context.getAttributeNS(u,"data")+","+n}e.context.setAttributeNS(u,o,n)}t.push(e);if(i.indexOf(e._idx)>-1){r.info(e);r.info("To remove this breakpoint execute:","\nsap.ui.core.support.Support.info.removeBreakpointAt("+e._idx+")");debugger}return e._idx};a.info.getAll=function(e){if(e===undefined){return t}else{return t.filter(function(t){return t.env&&t.env.caller===e})}};a.info.getInfos=function(e){if(e&&typeof e==="string"){e=e.split(",")}else{e=[]}var i=[];for(var n=0;n<e.length;n++){if(t[e[n]]){i.push(t[e[n]])}}return i};a.info.byIndex=function(e){return t[e]};a.info.getAllBreakpoints=function(){return i};a.info.hasBreakpointAt=function(e){return i.indexOf(e)>-1};a.info.addBreakpointAt=function(e){if(i.indexOf(e)>-1){return}i.push(e);d()};a.info.removeBreakpointAt=function(e){var t=i.indexOf(e);if(t>-1){i.splice(t,1);d()}};a.info.removeAllBreakpoints=function(){i=[];d()};a.info.addSupportInfo=function(e,t){if(e&&t){if(p[e]){p[e]+=","+t}else{p[e]=t}}};a.info.byId=function(e){return p[e]||null};a.info.getIds=function(e){var t=[];for(var i in p){var n=p[i];if(n&&n.indexOf(e)>-1){t.push(i)}}return t};a.info.getElements=function(e){var t=[];for(var i in p){var n=p[i];if(n&&n.indexOf(e)===0){var o=sap.ui.getCore().byId(i);if(o){t.push(sap.ui.getCore().byId(i))}}}return t};a.info.getAllXMLModifications=function(){return n};a.info.hasXMLModifications=function(){return n.length>0};a.info.addXMLModification=function(e,t,i){n.push({id:e,idx:t,change:i});l()};a.info.removeXMLModification=function(e){var t=n.indexOf(e);if(t>-1){n.splice(t,1);l()}};a.info.removeAllXMLModification=function(){n=[];l()};a.info.modifyXML=function(e,t){if(!a.info.hasXMLModifications()){return}var i=t;if(!i||!i.nodeType||!(i.nodeType==1||i.nodeType==9)){return}if(i.nodeType===9){i=i.firstChild}var o=i.querySelectorAll("*");var r=[i];for(var s=0;s<o.length;s++){r.push(o[s])}for(var s=0;s<n.length;s++){var u=n[s],p=u.change;if(u.id===e){var f=r[u.idx];if(f.nodeType===1&&p.setAttribute){var d=f.getAttribute(p.setAttribute[0]);f.setAttribute(p.setAttribute[0],p.setAttribute[1]);if(!f._modified){f._modified=[]}f._modified.push(p.setAttribute[0]);if(!f._oldValues){f._oldValues=[]}f._oldValues.push(d)}}}};a.info._breakAtProperty=function(e){return function(t){if(t.getParameter("name")===e){debugger}}};a.info._breakAtMethod=function(e){return function(){debugger;return e.apply(this,arguments)}};var g=["sap/ui/base/ManagedObject","sap/ui/core/mvc/View","sap/ui/core/XMLTemplateProcessor","sap/ui/thirdparty/datajs"];function v(e,t,i,n){e._supportInfo=a.info;t._supportInfo=a.info;i._supportInfo=a.info;if(window.datajs){window.datajs._sap={_supportInfo:a.info}}r.info("sap.ui.core.support.Support.info initialized.")}if(e){sap.ui.require(g,v)}else{v.apply(null,g.map(sap.ui.requireSync))}};return a});