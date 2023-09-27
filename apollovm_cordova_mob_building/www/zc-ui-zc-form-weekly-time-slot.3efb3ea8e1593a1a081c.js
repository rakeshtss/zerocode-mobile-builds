(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{M0mM:function(e,n){e.exports='<input type="number" [(ngModel)]="userinput" \r\n      name="" id=""> &nbsp;\r\n<button (click)="setAvailableTimes()" >get Time slots</button> &nbsp;\r\n<button (click)="submit()" >Submit</button>\r\n<ul>\r\n  <li *ngFor="let eachDay of availableDays">\r\n\r\n    <span class="time-slot-container">\r\n      \x3c!-- <div class="time-slot-container-left"> --\x3e\r\n      <input type="checkbox" [(ngModel)]="eachDay.available" \r\n      (change)="checkboxEvent(eachDay)" name="" id="">\r\n      <span class="week-name"> {{eachDay.day.name}} </span>\r\n     \r\n      <div *ngIf="eachDay.available;else unavailable">\r\n        <div *ngFor="let eachTimeSlot of eachDay.timeslots; let i = index" >\r\n          <div class="time-container">\r\n            <p-dropdown  class="time-slot" [options]="availableTimes"\r\n              [(ngModel)]="eachTimeSlot.from.value"\r\n              (onChange)="onChange($event, eachTimeSlot)"\r\n              placeholder="Select"\r\n              appendTo="body" >\r\n            </p-dropdown>\r\n\r\n            <p-dropdown  class="time-slot" [options]="availableTimes"\r\n              [(ngModel)]="eachTimeSlot.to.value"\r\n              (onChange)="onChange($event, eachTimeSlot)"\r\n              placeholder="Select"\r\n              appendTo="body" >\r\n            </p-dropdown> \r\n            <button (click)="delTime(eachDay,i)" type="button" class="btn btn-light"><i class="icon icon-trash-o"></i></button>\r\n          </div>\r\n         <div class="errorMsg" *ngIf="eachTimeSlot.inValidTime" >\r\n           Choose an *end time later than *start time\r\n          </div>\r\n        </div>\r\n      </div>\r\n    \x3c!-- </div> --\x3e\r\n     \r\n    \r\n    </span>\r\n    <button (click)="addTime(eachDay)" type="button" class="btn btn-light slot-add-btn"><i\r\n        class="icon zcv-plus"></i></button>\r\n  \r\n  </li>\r\n</ul>\r\n\r\n<ng-template #unavailable> \r\n  <span class="time-container">Unavailable </span>\r\n</ng-template>\r\n'},"UxD/":function(e,n,t){"use strict";t.r(n);var o=t("D57K"),l=t("LoAr"),a=t("WT9V"),i=function(){function e(){this.userinput=60,this.availableTimes=[],this.availableDays=[{day:{name:"Sun",code:"sun"},available:!1},{day:{name:"Mon",code:"mon"},available:!0,timeslots:[{from:{label:"9:00am",value:"09:00"},to:{label:"5:00pm",value:"17:00"}},{from:{label:"12:00am",value:"00:00"},to:{label:"5:00pm",value:"17:00"}}]},{day:{name:"Tues",code:"tues"},available:!0,timeslots:[{from:{label:"9:00am",value:"09:00"},to:{label:"10:00am",value:"10:00"}}]},{day:{name:"Wed",code:"wed"},timeslots:[{from:{label:"9:00am",value:"09:00"},to:{label:"5:00pm",value:"17:00"}}]},{day:{name:"Thur",code:"thur"},timeslots:[{from:{label:"9:00am",value:"09:00"},to:{label:"5:00pm",value:"17:00"}}]},{day:{name:"Fri",code:"fri"},timeslots:[{from:{label:"9:00am",value:"09:00"},to:{label:"5:00pm",value:"17:00"}}]},{day:{name:"Sat",code:"sat"},available:!1}]}return e.prototype.ngOnInit=function(){this.setAvailableTimes()},e.prototype.submit=function(){var e=[];this.availableDays.forEach(function(n){if(n.timeslots){var t=n.timeslots.filter(function(e){return 1==e.inValidTime});t.length>0&&e.push(t)}}),e.length},e.prototype.setAvailableTimes=function(){for(var e=[],n=0,t=0,o=this.convertMinsToHrs(this.userinput);n<1440;){var l;l=this.convertMinsToHrs(t),t+=o.mins,e.push(l),n=t}this.availableTimes=e,console.log(e)},e.prototype.convertMinsToHrs=function(e){var n=Math.floor(e/60),t=e%60,o=n;return n=n<10?"0"+n:n,t=t<10?"0"+t:t,{label:this.convertFrom24To12Format(n+":"+t),value:n+":"+t,mins:e,hours:o,_24hrslabel:o+":"+t}},e.prototype.convertFrom24To12Format=function(e){var n=e.match(/([0-9]{1,2}):([0-9]{2})/).slice(1),t=n[0];return(+t%12||12)+":"+n[1]+" "+(+t<12?"AM":"PM")},e.prototype.addTime=function(e){var n={from:{label:"10:00am",value:"10:00"},to:{label:"11:00am",value:"11:00"}};if(e.available){if(e.timeslots&&e.timeslots.length>0){var t=this.convertH2M(e.timeslots[e.timeslots.length-1].to.value);if(t<1440){if(n.from=this.convertMinsToHrs(t+60),(t+=120)>=1440)return n.from.value="23:00",n.to.value="00:00",void e.timeslots.push(n);n.to=this.convertMinsToHrs(t),e.timeslots.push(n)}console.log(e)}}else e.available=!0,e.timeslots=[n]},e.prototype.delTime=function(e,n){1==e.timeslots.length?(e.available=!1,delete e.timeslots):e.timeslots.splice(n,1)},e.prototype.onChange=function(e,n){this.checkValidation(n)?n.inValidTime=!0:n.inValidTime=!1,this.validTime&&console.log("=>>>>>>>>>>",e)},e.prototype.checkValidation=function(e){return console.log(this.convertH2M(e.from.value)+" from"),console.log(this.convertH2M(e.to.value)+" to"),this.convertH2M(e.from.value)>=this.convertH2M(e.to.value)?(this.validTime=!1,!0):(this.validTime=!0,!1)},e.prototype.convertH2M=function(e){var n=e.split(":");return 60*Number(n[0])+Number(n[1])},e.prototype.checkboxEvent=function(e){!e.available||e.timeslots&&0!=e.timeslots.length||(e.timeslots=[{from:{label:"10:00am",value:"10:00"},to:{label:"11:00am",value:"11:00"}}]),console.log(e)},e=o.c([Object(l.Component)({selector:"zc-weekly-time-slot",template:t("M0mM"),styles:[t("tEaL")]}),o.f("design:paramtypes",[])],e)}(),r=t("IfiR"),s=t("Hpdm");t.d(n,"ZcWeeklyTimeSlotModule",function(){return m});var m=function(){function e(){}return e=o.c([Object(l.NgModule)({declarations:[i],imports:[a.CommonModule,r.FormsModule,s.DropdownModule],entryComponents:[i]})],e)}()},tEaL:function(e,n){e.exports="ul li {\n  border-bottom: 1px solid #E7E7E7;\n  padding: 33px 0 10px 0;\n  display: flex;\n  align-items: flex-start; }\n  ul li:last-child {\n    border-bottom: none; }\n  ul li .time-slot-container {\n    display: flex;\n    align-items: flex-start;\n    width: 35%; }\n  ul li .time-slot-container .week-name {\n      padding: 0 30px 0 5px;\n      min-width: 70px; }\n  ul li .time-slot-container .time-container {\n      margin-bottom: 10px; }\n  ul li .time-slot-container .time-container .time-slot {\n        margin-right: 8px; }\n  ul li .time-slot-container .time-container .btn-light {\n        margin-left: 15px; }\n  ul li .btn-light {\n    background-color: transparent;\n    border: none; }\n  ul li .btn-light:hover {\n      background-color: transparent;\n      border: none; }\n  ul li .btn-light:focus {\n      box-shadow: none; }\n  ul li .btn {\n    padding: 0 !important; }\n  ul li .slot-add-btn {\n    margin-left: 20px;\n    border: 1px solid #ccc;\n    padding: 5px 6px 1px 6px !important;\n    font-size: 13px;\n    color: #9a9999; }\n  ul li .slot-add-btn:hover {\n      border: 1px solid #ccc; }\n  .time-slot {\n  width: 110px; }\n  .errorMsg {\n  color: #ec3232;\n  padding: 7px 0px; }\n  .time-container .ui-dropdown {\n  cursor: pointer;\n  width: 110px; }\n"}}]);