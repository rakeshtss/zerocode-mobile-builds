(window.webpackJsonp=window.webpackJsonp||[]).push([[55,66],{"4UNb":function(n,t,e){"use strict";e.r(t);var p=e("D57K"),i=e("LoAr"),o=e("vtXP"),a=e("05nE"),r=function(){function n(n){this.http=n}return n.prototype.getAppList=function(n){return this.http.get(n).pipe(Object(o.a)(function(n){return n}))},n=p.c([Object(i.Injectable)(),p.f("design:paramtypes",[a.c])],n)}(),s=e("981U"),c=function(){function n(n,t){this.manageAppService=n,this.router=t,this.appList=[]}return n.prototype.ngOnInit=function(){this.getAppList()},n.prototype.getAppList=function(){var n=this;this.manageAppService.getAppList("apps").subscribe(function(t){t.success&&(n.appList=t.data)})},n.prototype.navigateUrl=function(n){n.value.redirectUrl&&this.router.navigate(["/"+n.value.redirectUrl])},p.c([Object(i.Input)(),p.f("design:type",Object)],n.prototype,"options",void 0),n=p.c([Object(i.Component)({selector:"zc-manage-app",template:e("ulvB"),styles:[e("94qj")]}),p.f("design:paramtypes",[r,s.Router])],n)}(),d=e("eQXH");e.d(t,"ZcManageAppModule",function(){return l});var l=function(){function n(){}return n=p.c([Object(i.NgModule)({declarations:[c],imports:[d.a],providers:[r],exports:[c]})],n)}()},"94qj":function(n,t){n.exports=".appManagment {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center; }\n  .appManagment .mngContent {\n    text-align: center;\n    flex: 0 0 33.33%;\n    padding: 10px;\n    outline: none; }\n  .appManagment .mngContent .mngdescription {\n      border: 1px solid #d9d9df;\n      padding: 25px;\n      cursor: pointer;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n      background: #fff; }\n  .appManagment .mngContent .mngdescription p {\n        margin: 0; }\n  .appManagment .mngContent .mngdescription .description {\n        padding-top: 10px;\n        text-align: left !important;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        -webkit-line-clamp: 2; }\n  .appManagment .mngContent .mngdescription span {\n        font-size: 3rem; }\n  .appManagment .mngContent .mngdescription:hover {\n        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n"},ulvB:function(n,t){n.exports='<div\n  class="appManagment"\n  style="float:right"\n  *ngIf="options.type === \'dropdown\'"\n>\n  <p-dropdown\n    [options]="appList"\n    placeholder="Select Application"\n    optionLabel="name"\n    (onChange)="navigateUrl($event)"\n    [showClear]="true"\n    filter="true"\n  >\n  </p-dropdown>\n</div>\n\n<div class="appManagment" *ngIf="options.type !== \'dropdown\'">\n  <div\n    class="mngContent"\n    [id]="list.code"\n    *ngFor="let list of appList"\n    routerLink="/{{list.redirectUrl}}"\n  >\n    <div class="mngdescription">\n      <span [class]="list.icon"></span>\n      <p>\n        <strong>{{ list.name }}</strong>\n      </p>\n      <p\n        class="description"\n        style="-webkit-box-orient: vertical;"\n        title="{{list.description}}"\n      >\n        {{ list.description }}\n      </p>\n    </div>\n  </div>\n</div>\n'},vtXP:function(n,t,e){"use strict";var p=e("YfSF");e.d(t,"a",function(){return p.map})}}]);