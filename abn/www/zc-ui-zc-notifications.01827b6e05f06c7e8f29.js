(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"2/C2":function(n,t,i){"use strict";i.r(t);var o=i("D57K"),a=i("LoAr"),s=i("WT9V"),r=i("981U"),e=i("05nE"),p=function(){function n(n){this.http=n}return n.prototype.getNotificationList=function(n,t){return this.http.post(n,t).map(function(n){return n})},n=o.c([Object(a.Injectable)({providedIn:"root"}),o.f("design:paramtypes",[e.c])],n)}(),c=function(){function n(n,t,i){this.router=n,this.route=t,this.notificationService=i,this.notifications=[],this.notificationsCount=0,this.appName="zcbase"}return n.prototype.ngOnInit=function(){var n=this;this.route.snapshot.params.app&&(this.appName=this.route.snapshot.params.app),this.allUrl="/"+this.appName+"/account/notification-list",this.notificationUrl="/"+this.appName+"/account/notification-view/",this.options.allUrl&&(this.allUrl=this.options.allUrl),this.options.notificationUrl&&(this.notificationUrl=this.options.notificationUrl),this.paramsSubscribe$=this.router.events.subscribe(function(t){t instanceof r.NavigationEnd&&n.notificationsList()}),this.notificationsList()},n.prototype.notificationsList=function(){var n=this,t={rows:5,dynaFilters:[{fieldName:"status",key:"status",value:"unread",matchType:"any"}]};this.notificationService.getNotificationList("zc-notification/notificationList",t).subscribe(function(t){t.success&&(n.notifications=t.data.listData.rows,n.notificationsCount=t.data.listData.records)})},n.prototype.ngOnDestroy=function(){this.paramsSubscribe$&&this.paramsSubscribe$.unsubscribe()},o.c([Object(a.Input)(),o.f("design:type",Object)],n.prototype,"options",void 0),n=o.c([Object(a.Component)({selector:"zc-notifications",template:i("peEp"),styles:[i("eGZN")]}),o.f("design:paramtypes",[r.Router,r.ActivatedRoute,p])],n)}(),l=i("SHvt");i.d(t,"ZcNotificationModule",function(){return d});var d=function(){function n(){}return n=o.c([Object(a.NgModule)({declarations:[c],imports:[s.CommonModule,r.RouterModule,l.g],exports:[c]})],n)}()},eGZN:function(n,t){n.exports='a {\n  position: relative;\n  font-size: 21px !important; }\n  a .zc-number {\n    position: absolute;\n    min-width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    background-color: #f00;\n    text-align: center;\n    line-height: 20px;\n    font-size: 12px;\n    top: 0;\n    right: 0;\n    color: #fff; }\n  a.dropdown-toggle::after {\n    display: none; }\n  .dropdown-menu {\n  padding: 0;\n  margin-top: 30px;\n  min-width: 300px;\n  visibility: hidden;\n  display: block !important;\n  opacity: 0;\n  transition: all 0.3s ease-in-out;\n  left: auto; }\n  .dropdown-menu.show {\n    opacity: 1;\n    visibility: visible;\n    margin: 0;\n    transition: all 0.3s ease-in-out; }\n  .dropdown-menu:after {\n    color: #7f7f7f;\n    content: "";\n    display: block;\n    position: absolute;\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid #7f7f7f;\n    right: 15px;\n    top: -10px; }\n  .dropdown-menu:before {\n    color: #7f7f7f;\n    content: "";\n    display: block;\n    position: absolute;\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid #ccc;\n    right: 15px;\n    top: -11px; }\n  .dropdown-menu h4 {\n    background-color: #ccc;\n    padding: 10px;\n    margin: 0; }\n  .dropdown-menu ul li {\n    border-bottom: 1px solid #ccc; }\n  .dropdown-menu ul li a {\n      padding: 10px;\n      font-size: 14px !important;\n      text-align: left; }\n  .dropdown-menu a.see-all {\n    font-size: 16px !important;\n    color: #2f6bb6; }\n'},peEp:function(n,t){n.exports='<div ngbDropdown  placement="bottom-right">\r\n    <a class="icon icon-bell" id="dropdownBasic1" ngbDropdownToggle>\r\n        <span class="zc-number" *ngIf="notificationsCount > 0">{{notificationsCount}}</span>\r\n    </a>\r\n    <div ngbDropdownMenu aria-labelledby="dropdownBasic1">\r\n        <h4>Notifications</h4>\r\n        <ul class="zc-notifications-list">\r\n            <li *ngFor= "let notification of notifications;" [routerLink]="[notificationUrl+notification.uid]"><a> {{notification.subject}}</a></li>\r\n        </ul>\r\n        <a class="see-all" [routerLink]="[allUrl]">See All</a>\r\n    </div>\r\n</div>\r\n'}}]);