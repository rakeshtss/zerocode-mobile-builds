(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{LlmB:function(t,e,i){"use strict";i.d(e,"a",function(){return r});var n=i("D57K"),o=i("LoAr"),a=i("05nE"),s=(i("xH94"),i("Jg5f")),r=function(){function t(t,e,i,n,o){this.http=t,this.ngZone=e,this.appHttp=i,this.actionService=n,this.unsavedDataAlertService=o,this.requests={},this.isAggregating=!1,this.configs={}}return t.prototype.getOptionsList=function(t,e,i,n,o){var a=this;void 0===o&&(o=!0);return"post"!=e&&(i=i&&Object.keys(i).length>0?"?"+this.convertJsonToQueryString(i):""),o?"post"===e?this.http.requestCache(t,e,i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&t.data.listData.rows&&(e=t.data.listData.rows||[]),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):this.http.requestCache(t+i,e).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&t.data.listData.rows?e=t.data.listData.rows||[]:t.data&&(e=t.data),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):"post"===e?this.appHttp.post(t,i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&t.data.listData.rows&&(e=t.data.listData.rows||[]),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):this.appHttp.get(t+i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&t.data.listData.rows?e=t.data.listData.rows||[]:t.data&&(e=t.data),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]}))},t.prototype.getOptionsListByTableField=function(t,e,i,n,o){var a=this;void 0===o&&(o=!0);return"post"!=e&&(i=i&&Object.keys(i).length>0?"?"+this.convertJsonToQueryString(i):""),o?"post"===e?this.http.requestCache(t,e,i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&(e=t.data.listData||{}),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):this.http.requestCache(t+i,e).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&t.data.listData?e=t.data.listData||[]:t.data&&(e=t.data),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):"post"===e?this.appHttp.post(t,i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&(e=t.data.listData||{}),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):this.appHttp.get(t+i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&t.data.listData?e=t.data.listData||[]:t.data&&(e=t.data),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]}))},t.prototype.convertJsonToQueryString=function(t,e){var i,n=[];for(i in t)if(t.hasOwnProperty(i)){var o=e?e+"["+i+"]":i,a=t[i];null!=a&&("object"==typeof a&&(Array.isArray(a)&&a.length>0||Object.keys(a).length>0)?n.push(this.convertJsonToQueryString(a,o)):"object"!=typeof a&&n.push(encodeURIComponent(o)+"="+encodeURIComponent(a)))}return n.join("&")},t.prototype.getOptionsListByTableField1=function(t,e,i,n,o){var a=this;void 0===o&&(o=!0);return"post"===e?this.http.requestCache(t,e,i).pipe(Object(s.a)(function(t){var e=[];return t.data&&t.data.listData&&(e=t.data.listData||{}),n&&n.value&&(e=a.getKeyValue(n.value,t.data)||[]),e||[]})):this.http.requestCache(t,e,{params:i}).pipe(Object(s.a)(function(t){return t.data||[]}))},t.prototype.getKeyValue=function(t,e){var i="item."+t;try{return new Function("item","return "+i+" ; ")(e)}catch(n){console.log("error",i,n)}},t.prototype.getUploadConfig=function(t,e,i){return"post"===e?this.appHttp.post(t,i).pipe(Object(s.a)(function(t){return t.data.listData.rows||[]})):this.appHttp.get(t,{params:i}).pipe(Object(s.a)(function(t){return t.data||{}}))},t.prototype.formValueChangeConditions=function(t,e,i,n){var o=this;if("view"!==t.mode){if(e.options.events&&e.options.events&&e.options.events.onchange)if(e.options.events.onchange.actions)e.options.events.onchange.actions.forEach(function(t){o.actionService.action(t,i,{})});e.options.properties&&e.options.properties.unsavedDataAlert&&this.unsavedDataAlertService.activedAlert()}},t.prototype.checkUndataSaveAlert=function(){},t=n.c([Object(o.Injectable)({providedIn:"root"}),n.f("design:paramtypes",[a.g,o.NgZone,a.c,a.a,a.l])],t)}()},M8oN:function(t,e,i){"use strict";i.r(e);var n=i("D57K"),o=i("LoAr"),a=i("LlmB"),s=i("IfiR"),r=i("fQLH"),l=i("WT9V"),c=function(){return function(){this.baseURL="./assets/tinymce/",this.fileName="tinymce.min.js"}}(),d=function(){function t(t){this.doc=t,this.loaded=!1,this.list={},this.emitter=new r.a}return t.prototype.getChangeEmitter=function(){return this.emitter},t.prototype.load=function(t){var e=this;if(this.loaded)return this;this.loaded=!0;var i=[];return[t].forEach(function(t){return i.push(e.loadScript(t))}),Promise.all(i).then(function(t){e.emitter.next(!0)}),this},t.prototype.loadScript=function(t){var e=this;return new Promise(function(i,n){if(!0!==e.list[t]){e.list[t]=!0;var o=e.doc.createElement("script");o.type="text/javascript",o.src=t,o.charset="utf-8",o.readyState?o.onreadystatechange=function(){"loaded"!==o.readyState&&"complete"!==o.readyState||(o.onreadystatechange=null,i({path:t,loaded:!0,status:"Loaded"}))}:o.onload=function(){i({path:t,loaded:!0,status:"Loaded"})},o.onerror=function(e){return i({path:t,loaded:!1,status:"Loaded"})},e.doc.getElementsByTagName("head")[0].appendChild(o)}else i({path:t,loaded:!0,status:"Loaded"})})},t.decorators=[{type:o.Injectable}],t.ctorParameters=function(){return[{type:void 0,decorators:[{type:o.Inject,args:[l.DOCUMENT]}]}]},t}(),p=function(){function t(t,e,i){this.defConfig=t,this.ss=e,this.cd=i,this.load=!0,this.id="_tinymce-"+Math.random().toString(36).substring(2),this._disabled=!1,this.delay=0,this.ready=new o.EventEmitter}return Object.defineProperty(t.prototype,"disabled",{set:function(t){this._disabled=t,this.setDisabled()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"loading",{set:function(t){t instanceof o.TemplateRef?(this._loading=null,this._loadingTpl=t):this._loading=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"instance",{get:function(){return this._instance},enumerable:!0,configurable:!0}),t.prototype.initDelay=function(){var t=this;this.delay>0?setTimeout(function(){return t.init()},this.delay):this.init()},t.prototype.init=function(){var t=this;if(!window.tinymce)throw new Error("tinymce js\u6587\u4ef6\u52a0\u8f7d\u5931\u8d25");var e=this.defConfig,i=this.config,n=this.id;if(!this._instance){if(e.baseURL){var o=""+e.baseURL;o.endsWith("/")&&(o=o.substr(0,o.length-1)),tinymce.baseURL=o}var a=Object.assign({},e.config,i),s=Object.assign({selector:"#"+n},e.config,i,{setup:function(e){t._instance=e,e.on("change keyup",function(){t.value=e.getContent(),t.onChange(t.value),t.cd.detectChanges()}),"function"==typeof a.setup&&a.setup(e)},init_instance_callback:function(e){e&&t.value&&e.setContent(t.value),t.setDisabled(),"function"==typeof a.init_instance_callback&&a.init_instance_callback(e),t.ready.emit(t._instance)}});a.auto_focus&&(s.auto_focus=n),tinymce.init(s),this.load=!1,this.cd.detectChanges()}},t.prototype.destroy=function(){this._instance&&(this._instance.off(),this._instance.remove("#"+this.id),this._instance=null)},t.prototype.setDisabled=function(){this._instance&&this._instance.setMode(this._disabled?"readonly":"design")},t.prototype.ngAfterViewInit=function(){var t=this;if(window.tinymce)this.initDelay();else{var e=this.defConfig,i=e&&e.baseURL,n=e&&e.fileName;this.ss.load((i||"./assets/tinymce/")+(n||"tinymce.min.js")).getChangeEmitter().subscribe(function(){return t.initDelay()})}},t.prototype.ngOnChanges=function(t){this._instance&&t.config&&(this.destroy(),this.initDelay())},t.prototype.ngOnDestroy=function(){this.destroy()},t.prototype._onReuseInit=function(){this.destroy(),this.initDelay()},t.prototype.writeValue=function(t){this.value=t||"",this._instance&&this._instance.setContent(this.value)},t.prototype.registerOnChange=function(t){this.onChange=t},t.prototype.registerOnTouched=function(t){this.onTouched=t},t.prototype.setDisabledState=function(t){this.disabled=t,this.setDisabled()},t.decorators=[{type:o.Component,args:[{selector:"tinymce",template:'<textarea id="{{id}}" [placeholder]="placeholder" class="tinymce-selector"></textarea>\n<div class="loading" *ngIf="load">\n  <ng-container *ngIf="_loading; else _loadingTpl">{{_loading}}</ng-container>\n</div>\n',encapsulation:o.ViewEncapsulation.None,providers:[{provide:s.NG_VALUE_ACCESSOR,useExisting:Object(o.forwardRef)(function(){return t}),multi:!0}],changeDetection:o.ChangeDetectionStrategy.OnPush,styles:["tinymce .tinymce-selector { display: none; }"]}]}],t.ctorParameters=function(){return[{type:c},{type:d},{type:o.ChangeDetectorRef}]},t.propDecorators={config:[{type:o.Input}],placeholder:[{type:o.Input}],disabled:[{type:o.Input}],loading:[{type:o.Input}],delay:[{type:o.Input}],ready:[{type:o.Output}]},t}(),u=function(){function t(){}return t.forRoot=function(e){return{ngModule:t,providers:[d,{provide:c,useValue:e}]}},t.decorators=[{type:o.NgModule,args:[{imports:[l.CommonModule],declarations:[p],exports:[p]}]}],t}(),h=function(){function t(t){var e=this;this.formFieldService=t,this.plugins="print preview searchreplace autolink directionality code visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount paste textpattern textcolor contextmenu colorpicker autoresize fullpage",this.basic=" bold italic forecolor backcolor | link | alignleft aligncenter alignright alignjustify removeformat | numlist bullist outdent indent lineheight",this.advanced="formatselect fontselect fontsizeselect | "+this.basic+" | table | image imagetools link media | advlist contextmenu | code",this.custom="",this.config={height:150,theme:"silver",plugins:this.plugins,paste_retain_style_properties:"height,width,padding,font-size,color,border,cellspacing,cellpadding,border-collapse,border-left,border-right,border-bottom,border-top,border-color,border-style,background",image_advtab:!0,convert_urls:!1,imagetools_toolbar:"rotateleft rotateright | flipv fliph | editimage imageoptions",templates:[{title:"Test template 1",content:"Test 1"},{title:"Test template 2",content:"Test 2"}],content_css:["//fonts.googleapis.com/css?family=Lato:300,300i,400,400i","//www.tinymce.com/css/codepen.min.css"],valid_children:"+body[style]",paste_data_images:!0,toolbar_mode:"sliding",contextmenu:"",autoresize_bottom_margin:0,fontsize_formats:"8px 10px 11px 14px 16px 18px 24px 36px 48px",images_file_types:"JPG,jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp",setup:function(t){e.tinymceEdiot=t,t.on("KeyUp",function(){e.valueChange()}),t.on("init",function(){setTimeout(function(){e.valueChange()},1e3)})}},this.showHtml=!1}return t.prototype.ngOnInit=function(){var t=this,e=document.getElementById("theme");switch(this.themeUrl=e.href,this.config.content_css.push(this.themeUrl),this.to.extended_valid_elements&&(this.config.extended_valid_elements=this.to.extended_valid_elements),this.to.max_height&&(this.config.max_height=this.to.max_height),this.config.placeholder=this.to.placeholder,this.formControl.valueChanges.subscribe(function(e){t.formFieldService.formValueChangeConditions(t.to,t.formState,t.formControl.model,t.field)}),this.to.fileUpload?this.to.fileUpload.max_size||zc.config.allowedMaxFileSize&&(this.to.fileUpload.max_size=zc.config.allowedMaxFileSize):(this.to.fileUpload={},zc.config.allowedMaxFileSize&&(this.to.fileUpload.max_size=zc.config.allowedMaxFileSize)),this.to.fileUpload&&this.to.fileUpload.api?this.setFileuploadHandler():!1!==this.to.imageUploadToServer&&(this.to.fileUpload.api={url:"api/html_editor_image/save-update",map:{name:"image"}},this.setFileuploadHandler()),this.to.menubar||(this.config.menubar=!1),this.to.rows&&(this.config.min_height=20*parseInt(this.to.rows)),this.to.height&&(this.config.height=parseInt(this.to.height)),this.to.min_height&&(this.config.min_height=parseInt(this.to.min_height)),this.to.displayStyle){case"basic":this.config.toolbar=this.basic+" code";break;case"advanced":this.config.toolbar=this.advanced;break;case"custom":this.config.toolbar=this.to.custom;break;default:this.config.toolbar=this.basic}},t.prototype.reload=function(){var t=this;this.showHtml=!1,setTimeout(function(){t.showHtml=!0},100)},t.prototype.valueChange=function(){!this.tinymceEdiot.getContent({format:"all"})&&this.formControl.value&&this.formControl.setValue(null)},t.prototype.setFileuploadHandler=function(){var t=this.to.fileUpload.api?this.to.fileUpload.api.url:"dummy/url",e=this.to.fileUpload.api&&this.to.fileUpload.api.map?this.to.fileUpload.api.map.name:"image";console.log("max_size --\x3e",this.to.fileUpload.max_size);var i=this.to.fileUpload.max_size?1024*parseInt(this.to.fileUpload.max_size):1024;this.config.images_upload_handler=function(n,o,a,s){var r,l,c=n.blob().size/1e3;c>i?a("Image is too large ( "+Math.round(c/1e3)+" mb ), Maximum allowed size is: "+Math.round(i/1e3)+" mb",{remove:!0}):((r=new XMLHttpRequest).withCredentials=!1,r.open("POST",zc.config.fileServer+"/upload"),(l=new FormData).append("file",n.blob(),n.filename()),r.send(l),r.upload.onprogress=function(t){s(t.loaded/t.total*100)},r.onload=function(){var i,n,s,l,c,d;if(403!==r.status){if(r.status<200||r.status>=300)a("HTTP Error: "+r.status);else if(s=JSON.parse(r.responseText),(i={})[e]=s.data,n=i,200===r.status&&n)return(c=new XMLHttpRequest).withCredentials=!1,c.open("POST",zc.config.apiUrl+zc.config.client+"/"+t),c.setRequestHeader("Content-Type","application/json"),c.send(JSON.stringify(n)),void(c.onload=function(){(d=JSON.parse(c.responseText)).data[e]?(l=d.data[e][0].fullPath,o(l)):a("Cannot find path.. ")})}else a("HTTP Error: "+r.status,{remove:!0})},r.onerror=function(){a("Image upload failed due to a XHR Transport error. Code: "+r.status)})}},n.c([Object(o.Input)(),n.f("design:type",Object)],t.prototype,"formControl",void 0),n.c([Object(o.Input)(),n.f("design:type",Object)],t.prototype,"to",void 0),n.c([Object(o.Input)(),n.f("design:type",Object)],t.prototype,"field",void 0),n.c([Object(o.Input)(),n.f("design:type",Object)],t.prototype,"form",void 0),n.c([Object(o.Input)(),n.f("design:type",Object)],t.prototype,"formState",void 0),n.c([Object(o.ViewChild)("tinyMcy"),n.f("design:type",p)],t.prototype,"tinyMcy",void 0),t=n.c([Object(o.Component)({selector:"zc-htmleditor",template:i("pLoF"),styles:[i("yUWu")]}),n.f("design:paramtypes",[a.a])],t)}(),f=i("eQXH"),g=i("05nE");i.d(e,"ZcHtmlEditorModule",function(){return m});var m=function(){function t(){}return t=n.c([Object(o.NgModule)({declarations:[h],imports:[g.o,f.a,u.forRoot({baseURL:"/assets/tinymce/5.6.1/"})],entryComponents:[h],exports:[h]})],t)}()},"R+ki":function(t,e,i){"use strict";i.d(e,"a",function(){return s});var n=i("D57K"),o=i("DwTn"),a=i("diMa");function s(t,e){return void 0===e&&(e=a.a),function(i){return i.lift(new r(t,e))}}var r=function(){function t(t,e){this.dueTime=t,this.scheduler=e}return t.prototype.call=function(t,e){return e.subscribe(new l(t,this.dueTime,this.scheduler))},t}(),l=function(t){function e(e,i,n){var o=t.call(this,e)||this;return o.dueTime=i,o.scheduler=n,o.debouncedSubscription=null,o.lastValue=null,o.hasValue=!1,o}return n.d(e,t),e.prototype._next=function(t){this.clearDebounce(),this.lastValue=t,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(c,this.dueTime,this))},e.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},e.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var t=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(t)}},e.prototype.clearDebounce=function(){var t=this.debouncedSubscription;null!==t&&(this.remove(t),t.unsubscribe(),this.debouncedSubscription=null)},e}(o.a);function c(t){t.debouncedNext()}},pLoF:function(t,e){t.exports='<div *ngIf="to.mode == \'view\'; else: fieldTemp" class="view htmleditor" zcFieldValueFormat type="htmleditor" [value]="formControl.value"></div>\r\n<ng-template #fieldTemp>\r\n    <tinymce #tinyMcy [formControl]="formControl" (ngModelChange)="valueChange()" delay="10" [config]="config"></tinymce>\r\n</ng-template>\r\n<ng-template #loading>\r\n    Loading\r\n</ng-template>'},yUWu:function(t,e){t.exports=".cutom-editor {\n  position: relative;\n  width: 'auto'; }\n  .cutom-editor i {\n    position: absolute;\n    top: 4px;\n    right: 4px;\n    font-size: 14px;\n    cursor: pointer;\n    z-index: 1;\n    padding: 5px 10px;\n    background-color: #fff;\n    border: 1px solid #ccc;\n    color: #000;\n    border-radius: 5px; }\n  .cutom-editor i.active {\n      color: #1e88e5; }\n  .cutom-editor i:hover {\n      background-color: #f1f1f1; }\n"}}]);