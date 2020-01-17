/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(t){"use strict";var e=t.extend("sap.m.plugins.PluginBase",{metadata:{abstract:true,library:"sap.m",properties:{enabled:{type:"boolean",defaultValue:true}}}});var a={};e.setConfig=function(t,i){var r=typeof i=="function"?i.getMetadata().getName():e.getMetadata().getName();Object.assign(a[r]=a[r]||{},t)};e.prototype.getControl=function(){return this.getParent()};e.prototype.getControlPluginConfig=function(t,i){var r=this.getControl();if(!r){return i}var n=this.getMetadata().getName();var o=r.getMetadata().getName();var s=a[n]||{};var p=s[o]||{};if(t in p){return p[t]}for(var u in s){if(r.isA(u)&&t in s[u]){return s[u][t]}}var l=e.getMetadata().getName();var c=a[l]||{};var f=c[o]||{};if(t in f){return f[t]}for(var u in c){if(r.isA(u)&&t in c[u]){return c[u][t]}}return i};e.prototype.isApplicable=function(t){return t.isA("sap.ui.core.Control")};e.prototype.onActivate=function(t){};e.prototype.onDeactivate=function(t){};e.prototype.setParent=function(e){if(this.getEnabled()&&this.getControl()){this._deactivate()}t.prototype.setParent.apply(this,arguments);if(e&&this.getEnabled()){if(!this.isApplicable(e)){throw new Error(this+" is not an applicable plug-in for "+e)}else{this._activate()}}return this};e.prototype.setEnabled=function(t){var e=this.getEnabled();this.setProperty("enabled",t,true);var a=this.getEnabled();if(a!=e&&this.getControl()){if(a){this._activate()}else{this._deactivate()}}return this};e.prototype.setProperty=function(e,a,i){i=i||(this.getMetadata().getProperty(e).appData||{}).invalidate===false;return t.prototype.setProperty.call(this,e,a,i)};e.prototype._activate=function(){this.onActivate(this.getControl())};e.prototype._deactivate=function(){this.onDeactivate(this.getControl())};return e});