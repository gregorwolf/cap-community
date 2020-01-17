/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/LabelEnablement","sap/m/HyphenationSupport","sap/ui/core/library","./LabelRenderer"],function(e,a,t,r,n,i){"use strict";var o=n.TextDirection;var p=n.TextAlign;var l=e.LabelDesign;var u=n.VerticalAlign;var s=e.WrappingType;var f=a.extend("sap.m.Label",{metadata:{interfaces:["sap.ui.core.Label","sap.ui.core.IShrinkable","sap.m.IOverflowToolbarContent","sap.m.IHyphenation"],library:"sap.m",properties:{design:{type:"sap.m.LabelDesign",group:"Appearance",defaultValue:l.Standard},text:{type:"string",group:"Misc",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:o.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},required:{type:"boolean",group:"Misc",defaultValue:false},displayOnly:{type:"boolean",group:"Appearance",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:s.Normal},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:u.Inherit}},associations:{labelFor:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/m/designtime/Label.designtime"}});f.prototype.getAccessibilityInfo=function(){return{description:this.getText()}};f.prototype.getOverflowToolbarConfig=function(){var e={canOverflow:true,propsUnrelatedToSize:["design","required","displayOnly"]};function a(e){var a=e&&e.getLayoutData();if(g(a,"sap/m/OverflowToolbarLayoutData")){return a.getGroup()}}e.onBeforeEnterOverflow=function(e){var t=false,r,n,i,o,p;r=e.getParent();if(!g(r,"sap/m/OverflowToolbar")){return}n=e.getLabelFor();i=n&&sap.ui.getCore().byId(n);if(!i||r.indexOfContent(i)<0){return}o=a(e);p=a(i);t=o&&o===p;e.toggleStyleClass("sapMLabelMediumMarginTop",t,true)};e.onAfterExitOverflow=function(e){e.toggleStyleClass("sapMLabelMediumMarginTop",false,true)};return e};f.prototype.getTextsToBeHyphenated=function(){return{main:this.getText()}};f.prototype.getDomRefsForHyphenatedTexts=function(){return{main:this.$("bdi")[0]}};t.enrich(f.prototype);r.mixInto(f.prototype);function g(e,a){if(e&&a){var t=sap.ui.require(a);return typeof t==="function"&&e instanceof t}}return f});