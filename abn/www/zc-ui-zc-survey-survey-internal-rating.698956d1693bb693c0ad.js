(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"920x":function(t,a){t.exports=".internal-rating .category-header,.internal-rating .sub-category-header{color:#221f60}.internal-rating .category-title-header{font-size:14px;padding-bottom:5px !important;color:#221f60}.internal-rating p-accordiontab .ui-accordion-content{border:none !important}.internal-rating p-accordiontab .ui-accordion-header,.internal-rating p-accordiontab .ui-state-active{margin:0 !important;border:none !important}.internal-rating p-accordiontab .ui-accordion-header :hover,.internal-rating p-accordiontab .ui-state-active :hover{color:black !important}.internal-rating p-accordiontab .ui-accordion-header a,.internal-rating p-accordiontab .ui-accordion-header .ui-accordion-toggle-icon,.internal-rating p-accordiontab .ui-state-active a,.internal-rating p-accordiontab .ui-state-active .ui-accordion-toggle-icon{border:none !important;background-color:#fef0d3 !important;color:black !important}.internal-rating p-accordiontab .ui-accordion-header>a,.internal-rating p-accordiontab .ui-state-active>a{padding:0 !important;display:flex;align-items:center}.internal-rating p-accordiontab .ui-accordion-header>a:focus,.internal-rating p-accordiontab .ui-state-active>a:focus{outline:none}.internal-rating p-accordiontab .ui-accordion-header>a .category-header .highlight,.internal-rating p-accordiontab .ui-state-active>a .category-header .highlight{padding:10px;background-color:#FAEDB6;color:#221f60;border-right:3px solid #fff;text-align:center !important}.internal-rating p-accordiontab .ui-accordion-header>a .ui-accordion-toggle-icon,.internal-rating p-accordiontab .ui-state-active>a .ui-accordion-toggle-icon{min-width:30px}.internal-rating p-accordiontab .ui-accordion-header>a p-header,.internal-rating p-accordiontab .ui-state-active>a p-header{width:100%}.internal-rating p-accordiontab .ui-accordion-header>a p-header .category-header,.internal-rating p-accordiontab .ui-state-active>a p-header .category-header{margin:0 !important}.internal-rating p-accordiontab .ui-accordion-header>a p-header .category-header .header-left,.internal-rating p-accordiontab .ui-state-active>a p-header .category-header .header-left{display:flex;align-items:center;padding-left:0}.internal-rating p-accordiontab p-accordiontab .ui-accordion-header{border:0px !important}.internal-rating p-accordiontab p-accordiontab .ui-accordion-header,.internal-rating p-accordiontab p-accordiontab .ui-state-active{border-bottom:1px solid #ccc !important}.internal-rating p-accordiontab p-accordiontab .ui-accordion-header :hover,.internal-rating p-accordiontab p-accordiontab .ui-state-active :hover{color:black !important}.internal-rating p-accordiontab p-accordiontab .ui-accordion-header a:focus,.internal-rating p-accordiontab p-accordiontab .ui-state-active a:focus{outline:inherit !important}.internal-rating p-accordiontab p-accordiontab .ui-accordion-header a,.internal-rating p-accordiontab p-accordiontab .ui-accordion-header .ui-accordion-toggle-icon,.internal-rating p-accordiontab p-accordiontab .ui-state-active a,.internal-rating p-accordiontab p-accordiontab .ui-state-active .ui-accordion-toggle-icon{background-color:white !important;border:none !important;color:#221f60 !important}.internal-rating p-accordiontab p-accordiontab .ui-accordion-header>a,.internal-rating p-accordiontab p-accordiontab .ui-state-active>a{padding:0.571em 1em !important}\n"},"N+aR":function(t,a,n){"use strict";n.r(a);var r=n("D57K"),i=n("LoAr"),o=n("WT9V"),e=n("981U"),c=n("05nE"),s=n("vtXP"),d=function(){function t(t){this.http=t}return t.prototype.getSurveyDetails=function(t,a){return this.http.post(t,a).pipe(Object(s.a)(function(t){return t.data}))},t.prototype.saveEditSurvey=function(t,a){return this.http.post(t,a)},t=r.c([Object(i.Injectable)(),r.f("design:paramtypes",[c.c])],t)}(),p=function(){function t(t,a,n){this.irs=t,this.as=a,this.route=n,this.isReadonly=!1,this.showBtn=!1,this.model={}}return t.prototype.ngOnInit=function(){var t=this,a=this.route.snapshot.params;if(this.payload={survey:this.options.survey,uid:a.uid},this.options.api.params&&this.options.api.params.length>0){var n=this.as.getParams(this.options.api.params,zc);Object.assign(this.payload,n)}var r=this.checkMode(this.options.mode);"view"===r&&(this.isReadonly=!0),this.irs.getSurveyDetails(this.options.api.list,this.payload).subscribe(function(a){var n=JSON.parse(JSON.stringify(a));t.weightageConfig=n.widgetMeta.weightage_config,a.widgetMeta&&a.widgetMeta.entity&&(t.payload.entity=a.widgetMeta.entity),t.questionList=n.categories,t.updateFormula(),"view"!==r&&(t.showBtn=!0)}),this.zcFormOptions={id:this.options.id+"Form",mode:this.options.mode,fields:this.options.fields}},t.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},t.prototype.reload=function(){this.ngOnInit()},t.prototype.ngDoCheck=function(){},t.prototype.dropDownChange=function(t,a){a.answer=t.value,this.updateFormula()},t.prototype.inputTextChange=function(t,a){console.log("event",t),this.updateFormula()},t.prototype.updateFormula=function(){this.questionList.map(function(t){t.category.calWeightage=0;var a=0,n=0;t.subCategories.map(function(t){var r=0,i=0;if(t.questions.forEach(function(t){t.answer&&t.answer.weightage>0&&(r+=t.answer.weightage,i+=1)}),r/=i,r=isNaN(r)?0:r.toFixed(2),t.subCategory.calWeightage=r,r>0){var o=parseFloat(t.weightage)/100;a+=o*r,n+=o}}),t.category.calWeightage=(a/n).toFixed(2),console.log("category weightage",t.category.calWeightage)})},t.prototype.checkMode=function(t){try{return new Function("return "+t+" ; ")()}catch(a){console.log("key",t)}},t.prototype.submit=function(t){var a=this;console.log("arg",t);var n=this.getAnswers();if(this.payload.answers=n,t&&t.params){var r=this.as.getParams(t.params,zc);Object.assign(this.payload,r)}this.irs.saveEditSurvey(this.options.api.save,this.payload).subscribe(function(n){a.as.onSuccess(t.onSuccess,{})})},t.prototype.submitBySubCategory=function(t,a){var n=this.getAnswersBySubCategory(t,a);if(this.payload.answers=n,this.options.api.params){var r=this.as.getParams(this.options.api.params,zc);Object.assign(this.payload,r)}this.irs.saveEditSurvey(this.options.api.save,this.payload).subscribe(function(t){})},t.prototype.getAnswersBySubCategory=function(t,a){var n=[];return a.questions.forEach(function(r){if(r.answer){var i={category:t.category.code,subCategory:a.subCategory.code,question:r.code,type:r.type,answer:r.answer};n.push(i)}}),n},t.prototype.getAnswers=function(){var t=[];return this.questionList.forEach(function(a){a.subCategories.forEach(function(n){n.questions.forEach(function(r){if(r.answer){var i={category:a.category.code,subCategory:n.subCategory.code,question:r.code,type:r.type,answer:r.answer};t.push(i)}})})}),t},r.c([Object(i.Input)(),r.f("design:type",Object)],t.prototype,"options",void 0),t=r.c([Object(i.Component)({selector:"zc-survey-internal-rating",template:n("l+4N"),encapsulation:i.ViewEncapsulation.None,styles:[n("920x")]}),r.f("design:paramtypes",[d,c.a,e.ActivatedRoute])],t)}(),l=n("Hhcr"),u=n("Hpdm"),g=n("IfiR"),h=function(){function t(){}return t.prototype.transform=function(t,a){console.log("value",t),console.log("args",a);var n=0;return a.forEach(function(t){t.answer&&(n+=t.answer.weightage)}),n},t=r.c([Object(i.Pipe)({name:"internalFactor"})],t)}(),b=n("pnHo");n.d(a,"InternalRatingModule",function(){return v});var v=function(){function t(){}return t=r.c([Object(i.NgModule)({declarations:[p,h],imports:[o.CommonModule,b.a,l.AccordionModule,u.DropdownModule,g.FormsModule],providers:[d],exports:[p]})],t)}()},"l+4N":function(t,a){t.exports='<div class="internal-rating bg-white survey-header">\r\n  <h3 class="header p-2" *ngIf="options.title">{{ options.title }}</h3>\r\n  <div class="body p-4">\r\n    <div class="row col-12 m-0 p-0 category-title-header">\r\n      <div class="col-9 pl-0">Business Risks Categories</div>\r\n      <div class="col-3">\r\n        <div class="row">\r\n          <div class="col-6 text-center">Factor</div>\r\n          <div class="col-6 text-center">Weight(%)</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <p-accordion [multiple]="true">\r\n      <p-accordionTab\r\n        [selected]="true"\r\n        [cache]="true"\r\n        *ngFor="let category of questionList"\r\n      >\r\n        <p-header>\r\n          <div class="category-header">\r\n            <div class="row col-12 m-0 p-0">\r\n              <div class="col-9 header-left">{{ category.category.name }}</div>\r\n              <div class="col-3">\r\n                <div class="row">\r\n                  <div class="col-6 text-right highlight">\r\n                    {{ category.category.calWeightage || \'0.00\' }}\r\n                  </div>\r\n                  <div class="col-6 text-right highlight">\r\n                    {{ category.weightage }} %\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </p-header>\r\n        <p-accordion [multiple]="true">\r\n          <p-accordionTab\r\n            [selected]="false"\r\n            [cache]="true"\r\n            *ngFor="let subCategory of category.subCategories"\r\n          >\r\n            <p-header>\r\n              <div class="sub-category-header">\r\n                <div class="row col-12 m-0 p-0">\r\n                  <div class="col-9 pl-0">\r\n                    {{ subCategory.subCategory.name }}\r\n                  </div>\r\n                  <div class="col-3">\r\n                    <div class="row">\r\n                      <div class="col-6 text-right">\r\n                        {{ subCategory.subCategory.calWeightage || \'0.00\' }}\r\n                      </div>\r\n                      <div class="col-6 text-right">\r\n                        {{ subCategory.weightage }} %\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </p-header>\r\n            <div *ngFor="let question of subCategory.questions">\r\n              <div class="question">\r\n                <div class="row col-12">\r\n                  <div class="col">\r\n                    <label>{{ question.question }}</label>\r\n                  </div>\r\n                  <div class="col-4">\r\n                    <p-dropdown\r\n                      [disabled]="isReadonly"\r\n                      optionLabel="name"\r\n                      appendTo="body"\r\n                      dataKey="uid"\r\n                      [style]="{ width: \'100%\' }"\r\n                      placeholder="select any options"\r\n                      [options]="question.options_data.data"\r\n                      [(ngModel)]="question.answer"\r\n                      (onChange)="dropDownChange($event, question)"\r\n                    ></p-dropdown>\r\n                  </div>\r\n                  <div class="col-2">\r\n                    <input\r\n                      type="number"\r\n                      [readonly]="isReadonly"\r\n                      min="0"\r\n                      class="form-control"\r\n                      *ngIf="question.answer"\r\n                      (change)="inputTextChange($event, question)"\r\n                      [(ngModel)]="question.answer.weightage"\r\n                    />\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            \x3c!--\r\n              <div class="col-12 text-right p-2 pr-5">\r\n                <button type="submit" (click)="submitBySubCategory(category,subCategory)"\r\n                  class="btn btn-primary submit-button">Save</button>\r\n              </div>\r\n            --\x3e\r\n          </p-accordionTab>\r\n        </p-accordion>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n  </div>\r\n  <div class="footer text-center pb-2" *ngIf="showBtn">\r\n    <zc-form [options]="zcFormOptions" [model]="model"></zc-form>\r\n    \x3c!-- <button\r\n      type="submit"\r\n      (click)="submit()"\r\n      class="btn btn-primary submit-button"\r\n    >\r\n      Submit\r\n    </button> --\x3e\r\n  </div>\r\n</div>\r\n'}}]);