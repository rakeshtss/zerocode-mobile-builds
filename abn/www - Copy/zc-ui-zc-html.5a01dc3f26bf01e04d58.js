(window.webpackJsonp=window.webpackJsonp||[]).push([[44,59],{FXim:function(t,e){t.exports=""},YfSF:function(t,e,n){"use strict";var o=n("Jg5f");n.d(e,"a",function(){return o.a})},oIyp:function(t,e){t.exports='<ng-container *ngIf="showWidget">\r\n\r\n<ng-template\r\n  *ngIf="showTemplate && options.type !==\'page\'"\r\n  dynamic-template\r\n  [extraModules]="[myExtraModules]"\r\n  [template]="htmlContainer"\r\n  [defaultTemplate]="\'<span>on error template</span>\'"\r\n  [context]="{ zc: _zc }"\r\n>\r\n</ng-template>\r\n<zc-page-render *ngIf="options.type==\'page\' && pageInfo" [options]="{ widgets: pageInfo }"></zc-page-render>\r\n</ng-container>'},vtXP:function(t,e,n){"use strict";var o=n("YfSF");n.d(e,"a",function(){return o.a})},wOqE:function(t,e,n){"use strict";n.r(e);var o=n("D57K"),i=n("LoAr"),s=n("WT9V"),r=n("05nE"),a=n("GiBk"),p=function(){function t(t){this.http=t,this.scriptsList=[],this.scriptsLength=0}return t.prototype.load=function(t){this.scriptsList=t,this.loadScript(0)},t.prototype.loadScript=function(t){var e=this;void 0===t&&(t=0);var n=this.scriptsList[t];if(n){var o="zc-script-"+n.name,i=document.createElement("script");i.type="text/javascript",i.src=n.src,i.id=o,i.readyState?i.onreadystatechange=function(){"loaded"!==i.readyState&&"complete"!==i.readyState||(i.onreadystatechange=null,n.loaded=!0)}:i.onload=function(){n.loaded=!0,e.scriptsList.length-1>t&&(console.log("indexd",t),e.loadScript(t+1))},i.onerror=function(t){return console.log({script:n.name,loaded:!1,status:"Loaded"})},this.isMyScriptLoaded(o)&&document.getElementsByTagName("head")[0].appendChild(i)}},t.prototype.loadCss=function(t){var e=this;t&&t.forEach(function(t){var n=document.createElement("link");n.rel="stylesheet";var o=(new Date).getTime();n.href=t.src+"?cache="+o,n.id="dynamiccss_"+t.name,e.isMyCssLoaded(n.id)||document.getElementsByTagName("head")[0].appendChild(n)})},t.prototype.getHtml=function(t){var e=new a.HttpHeaders;return e.append("Cache-control","no-cache"),e.append("Cache-control","no-store"),e.append("Expires","0"),e.append("Pragma","no-cache"),this.http.getHtml(t,{responseType:"text",headers:e})},t.prototype.isMyScriptLoaded=function(t){for(var e=document.getElementsByTagName("head")[0].getElementsByTagName("script"),n=e.length;n--;)if(e[n].id===t)return e[n].remove(),!0;return!0},t.prototype.isMyCssLoaded=function(t){for(var e=document.getElementsByTagName("head")[0].getElementsByTagName("link"),n=e.length;n--;)if(e[n].id===t)return!0;return!1},t=o.c([Object(i.Injectable)(),o.f("design:paramtypes",[r.c])],t)}(),c=n("vtXP"),d=function(){function t(t){this.http=t}return t.prototype.getHtmlContent=function(t){return this.http.get("html-content-api/"+t)},t.prototype.getActionPageInfo=function(t){return this.http.get(t).pipe(Object(c.a)(function(t){return t.data}))},t=o.c([Object(i.Injectable)({providedIn:"root"}),o.f("design:paramtypes",[r.c])],t)}(),h=n("k/eh"),l=n("981U"),u=function(){function t(t,e,n){this.ds=t,this._htmlService=e,this.http=n,this.showWidget=!0,this.htmlContainer="",this.myExtraModules=[s.CommonModule,r.n,h.b,l.RouterModule],zc.http=n}return t.prototype.ngOnInit=function(){switch(this.showWidget=!0,this._zc=zc,this.ds.loadCss(this.options.css||[]),this.options.type){case"custom-html":this.loadCustomHtml();break;case"custom-api":this.getHtmlFormAPI();break;case"page":this.getPageload();break;default:this.options.template&&(this.htmlContainer=this.options.template,this.showTemplate=!0,this.loadJsFile())}},t.prototype.ngAfterViewInit=function(){this.options.id&&(zc[this.options.id]=this)},t.prototype.getPageload=function(){var t=this;this.pageInfo=null,this.options.pageUrl&&this._htmlService.getActionPageInfo("page/"+this.options.pageUrl).subscribe(function(e){e.instructions.definition&&e.instructions.definition.widgets&&(t.pageInfo=e.instructions.definition.widgets)})},t.prototype.loadCustomHtml=function(){var t=this;this.ds.getHtml(this.options.htmlUrl).subscribe(function(e){t.htmlContainer=e,t.showTemplate=!0,t.loadJsFile()})},t.prototype.getHtmlFormAPI=function(){var t=this;this._htmlService.getHtmlContent(this.options.apiCode).subscribe(function(e){e&&e.content&&(t.htmlContainer=e.content,t.showTemplate=!0,t.loadJsFile())})},t.prototype.loadJsFile=function(){this.options&&this.options.js&&this.options.js.length>0&&this.ds.load(this.options.js||[])},t.prototype.show=function(){this.showWidget=!0},t.prototype.hide=function(){this.showWidget=!1},t.prototype.reload=function(){var t=this;this.htmlContainer="",this.showTemplate=!1,setTimeout(function(){t.ngOnInit()},100)},t.prototype.ngOnDestroy=function(){},o.c([Object(i.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),t=o.c([Object(i.Component)({selector:"zc-html",template:n("oIyp"),styles:[n("FXim")]}),o.f("design:paramtypes",[p,d,r.c])],t)}(),m=n("87bh");n.d(e,"ZcHtmlModule",function(){return g});var g=function(){function t(){}return t=o.c([Object(i.NgModule)({imports:[s.CommonModule,m.NgxDynamicTemplateModule,h.b],declarations:[u],providers:[p,d],exports:[u]})],t)}()}}]);