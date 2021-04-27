(window.webpackJsonp=window.webpackJsonp||[]).push([[43,54],{"4UNb":function(n,t,e){"use strict";e.r(t);var r=e("D57K"),i=e("LoAr"),p=e("vtXP"),o=e("05nE"),a=function(){function n(n){this.http=n}return n.prototype.getAppList=function(n){return this.http.get(n).pipe(Object(p.a)(function(n){return n}))},n=r.c([Object(i.Injectable)(),r.f("design:paramtypes",[o.c])],n)}(),s=e("981U"),c=function(){function n(n,t){this.manageAppService=n,this.router=t,this.appList=[]}return n.prototype.ngOnInit=function(){this.getAppList()},n.prototype.getAppList=function(){var n=this;this.manageAppService.getAppList("apps").subscribe(function(t){t.success&&(n.appList=t.data)})},n.prototype.navigateUrl=function(n){n.value.redirectUrl&&this.router.navigate(["/"+n.value.redirectUrl])},r.c([Object(i.Input)(),r.f("design:type",Object)],n.prototype,"options",void 0),n=r.c([Object(i.Component)({selector:"zc-manage-app",template:e("ulvB"),styles:[e("94qj")]}),r.f("design:paramtypes",[a,s.Router])],n)}(),d=e("eQXH");e.d(t,"ZcManageAppModule",function(){return l});var l=function(){function n(){}return n=r.c([Object(i.NgModule)({declarations:[c],imports:[d.a],providers:[a],exports:[c]})],n)}()},"94qj":function(n,t){n.exports=".appManagment {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center; }\n  .appManagment .mngContent {\n    text-align: center;\n    flex: 0 0 33.33%;\n    padding: 10px;\n    outline: none; }\n  .appManagment .mngContent .mngdescription {\n      border: 1px solid #d9d9df;\n      padding: 25px;\n      cursor: pointer;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n      background: #fff; }\n  .appManagment .mngContent .mngdescription p {\n        margin: 0; }\n  .appManagment .mngContent .mngdescription .description {\n        padding-top: 10px;\n        text-align: left !important;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        -webkit-line-clamp: 2; }\n  .appManagment .mngContent .mngdescription span {\n        font-size: 3rem; }\n  .appManagment .mngContent .mngdescription:hover {\n        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n"},YfSF:function(n,t,e){"use strict";var r=e("Jg5f");e.d(t,"a",function(){return r.a})},ulvB:function(n,t){n.exports='<div\r\n  class="appManagment"\r\n  style="float:right"\r\n  *ngIf="options.type === \'dropdown\'"\r\n>\r\n  <p-dropdown\r\n    [options]="appList"\r\n    placeholder="Select Application"\r\n    optionLabel="name"\r\n    (onChange)="navigateUrl($event)"\r\n    [showClear]="true"\r\n    filter="true"\r\n  >\r\n  </p-dropdown>\r\n</div>\r\n\r\n<div class="appManagment" *ngIf="options.type !== \'dropdown\'">\r\n  <div\r\n    class="mngContent"\r\n    [id]="list.code"\r\n    *ngFor="let list of appList"\r\n    routerLink="/{{list.redirectUrl}}"\r\n  >\r\n    <div class="mngdescription">\r\n      <span [class]="list.icon"></span>\r\n      <p>\r\n        <strong>{{ list.name }}</strong>\r\n      </p>\r\n      <p\r\n        class="description"\r\n        style="-webkit-box-orient: vertical;"\r\n        title="{{list.description}}"\r\n      >\r\n        {{ list.description }}\r\n      </p>\r\n    </div>\r\n  </div>\r\n</div>\r\n'},vtXP:function(n,t,e){"use strict";var r=e("YfSF");e.d(t,"a",function(){return r.a})}}]);