(window.webpackJsonp=window.webpackJsonp||[]).push([[47,58],{"4UNb":function(n,t,e){"use strict";e.r(t);var i=e("D57K"),p=e("LoAr"),o=e("vtXP"),a=e("05nE"),r=function(){function n(n){this.http=n}return n.prototype.getAppList=function(n){return this.http.get(n).pipe(Object(o.a)(function(n){return n}))},n=i.c([Object(p.Injectable)(),i.f("design:paramtypes",[a.c])],n)}(),s=e("981U"),c=function(){function n(n,t){this.manageAppService=n,this.router=t,this.appList=[]}return n.prototype.ngOnInit=function(){this.getAppList()},n.prototype.getAppList=function(){var n=this;this.manageAppService.getAppList("apps").subscribe(function(t){t.success&&(n.appList=t.data)})},n.prototype.navigateUrl=function(n){n.value.redirectUrl&&this.router.navigate(["/"+n.value.redirectUrl])},i.c([Object(p.Input)(),i.f("design:type",Object)],n.prototype,"options",void 0),n=i.c([Object(p.Component)({selector:"zc-manage-app",template:e("ulvB"),styles:[e("94qj")]}),i.f("design:paramtypes",[r,s.Router])],n)}(),d=e("eQXH");e.d(t,"ZcManageAppModule",function(){return l});var l=function(){function n(){}return n=i.c([Object(p.NgModule)({declarations:[c],imports:[d.a],providers:[r],exports:[c]})],n)}()},"94qj":function(n,t){n.exports=".appManagment{display:flex;flex-wrap:wrap;align-items:center}.appManagment .mngContent{text-align:center;flex:0 0 33.33%;padding:10px;outline:none}.appManagment .mngContent .mngdescription{border:1px solid #d9d9df;padding:25px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);background:#fff}.appManagment .mngContent .mngdescription p{margin:0}.appManagment .mngContent .mngdescription .description{padding-top:10px;text-align:left !important;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2}.appManagment .mngContent .mngdescription span{font-size:3rem}.appManagment .mngContent .mngdescription:hover{box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)}\n"},YfSF:function(n,t,e){"use strict";var i=e("Jg5f");e.d(t,"a",function(){return i.a})},ulvB:function(n,t){n.exports='<div\n  class="appManagment"\n  style="float:right"\n  *ngIf="options.type === \'dropdown\'"\n>\n  <p-dropdown\n    [options]="appList"\n    placeholder="Select Application"\n    optionLabel="name"\n    (onChange)="navigateUrl($event)"\n    [showClear]="true"\n    filter="true"\n  >\n  </p-dropdown>\n</div>\n\n<div class="appManagment" *ngIf="options.type !== \'dropdown\'">\n  <div\n    class="mngContent"\n    [id]="list.code"\n    *ngFor="let list of appList"\n    routerLink="/{{list.redirectUrl}}"\n  >\n    <div class="mngdescription">\n      <span [class]="list.icon"></span>\n      <p>\n        <strong>{{ list.name }}</strong>\n      </p>\n      <p\n        class="description"\n        style="-webkit-box-orient: vertical;"\n        title="{{list.description}}"\n      >\n        {{ list.description }}\n      </p>\n    </div>\n  </div>\n</div>\n'},vtXP:function(n,t,e){"use strict";var i=e("YfSF");e.d(t,"a",function(){return i.a})}}]);