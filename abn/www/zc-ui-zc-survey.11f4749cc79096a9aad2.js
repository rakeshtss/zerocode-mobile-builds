(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{"1lUD":function(e,t){e.exports='<div class="survey-container">\n  <div class="survey-header">\n    <h3>{{options.title}}</h3>\n  </div>\n  <div class="survey-body">\n    <form [formGroup]="form" (ngSubmit)="submit()">\n      <zc-form [options]="zcFormOptions" [model]="model" *ngIf="show">\n      </zc-form>\n      \x3c!-- <div class="footer text-center">\n        <button type="submit" class="btn btn-primary submit-button">Submit</button>\n        <button type="button" class="btn btn-default" (click)="formlyOptions.resetModel()">Reset</button>\n      </div> --\x3e\n    </form>\n  </div>\n</div>'},HO4e:function(e,t,o){"use strict";o.r(t);var i=o("D57K"),s=o("LoAr"),n=o("05nE"),r=o("vtXP"),a=function(){function e(e){this.http=e,this.seq=1}return e.prototype.getSurveyDetails=function(e,t){return this.http.post(e,t).pipe(Object(r.a)(function(e){return e.data}))},e.prototype.saveEditSurvey=function(e,t){return this.http.post(e,t)},e.prototype.questionBankToFormFields=function(e){var t=this;try{var o=[];if(e)e.forEach(function(e){var i={};if(i=t.categoryToFieldGroup(e.category,"category"),e.config&&e.config.display_expression&&(i.conditions.hidden="!("+e.config.display_expression+")"),e.subCategories){var s=e.subCategories;s.forEach(function(o){var n={};n=t.categoryToFieldGroup(o.subCategory,"category"),o.config&&o.config.display_expression&&(n.conditions.hidden="!("+o.config.display_expression+")"),s&&1===s.length&&(n.fieldItems=[]),o.questions.forEach(function(i,s){i.key=e.category.code+"__ZC__"+o.subCategory.code+"__ZC__"+i.code,i.properties={},i.conditions={},n.fieldItems.push(t.questionToFormField(i,t.seq))}),i.fieldItems.push(n)})}o.push(i)});return o}catch(i){}},e.prototype.questionBankToFormFields1=function(e,t,o){var i=this;try{var s=[];if(e)e.forEach(function(e){if(s.push(i.categoryToTemplateField(e.category,"category")),e.subCategories){var o=e.subCategories;o.forEach(function(n){o&&o.length>1&&s.push(i.categoryToTemplateField(n.subCategory,"sub-category"));var r=n.questions,a={containerClass:"col-12",fieldClass:"row p-3",fieldItems:[]};r.forEach(function(o,s){o.key=e.category.code+"__ZC__"+n.subCategory.code+"__ZC__"+o.code,o.properties={},t[e.category.code]&&t[e.category.code][n.subCategory.code]&&t[e.category.code][n.subCategory.code][o.code]&&(o.properties=t[e.category.code][n.subCategory.code][o.code]),o.conditions={},a.fieldItems.push(i.questionToFormField(o,s))}),s.push(a)})}});return s}catch(n){}},e.prototype.categoryToFieldGroup=function(e,t){return{containerClass:"col-12",fieldClass:"row m-0",fieldItems:[{template:"<h3 class='"+t+" mb-1'>"+e.name+"</h3>"}],conditions:{}}},e.prototype.categoryToTemplateField=function(e,t){return{template:"<h3 class='"+t+"'>"+e.name+"</h3>"}},e.prototype.questionToFormField=function(e,t){var o={},i="Q. ";if(o.name=e.key,o.type=e.type,o.properties||(o.properties={}),o.conditions||(o.conditions={}),e.required_config&&e.required_config.required&&(o.properties.required=!0),e.display_config&&e.display_config.display&&e.display_config.rules&&e.display_config.rules.length>0){o.label=e.question,o.fieldClass="child-field";var s="",n="",r="";e.display_config.rules.forEach(function(t,o){n=t.category_code+"__ZC__"+t.subCategory_code+"__ZC__"+t.questionCode,console.log("question.display_config.rules ---\x3e",e.display_config.rules.length),console.log("rindex ---\x3e",o),console.log("condition ---\x3e",e.display_config.rules.length-1>o),0===o&&(s="!("),s+="($["+n+"]",r="","select"===t.queType||"radio"===t.queType||"checkbox"===t.queType?(t.value&&t.value.value&&(r=t.value.value),s+=" && $["+n+'][uid] === "'+r+'"'):(r=t.value,s+=" && $["+n+'] === "'+r+'"'),s+=")",e.display_config.rules.length-1>o&&(s+=" && "),e.display_config.rules.length-1===o&&(s+=" ) ")}),console.log("hiddenCondition --\x3e",s),o.conditions.hidden=s}else o.fieldClass="survey-question";switch(e.display_config&&e.display_config.display&&e.display_config.expression?(o.conditions.hidden?o.conditions.hidden=o.conditions.hidden+" && !("+e.display_config.expression+")":o.conditions.hidden="!("+e.display_config.expression+")",this.seq=this.seq+1,i="Q. ",o.label=i+e.question):(i="Q. ",o.label=i+e.question,this.seq=this.seq+1),e.answer&&(o.defaultValue=e.answer),"multicheckbox"===o.type&&(o.properties.hideLabel=!1),o.type){case"radio":case"select":case"multiselect":case"multicheckbox":case"multifile":o.type.includes("multi")&&(o.properties.multiple=!0,o.type=o.type.replace("multi","")),o.properties.options=e.options_data.data}return o},e.prototype.getField=function(e,t,o,i){try{return e.find(function(e){return e.category.code===t}).subCategories.find(function(e){return e.subCategory.code===o}).questions.find(function(e){return e.code===i})}catch(s){}},e=i.c([Object(s.Injectable)(),i.f("design:paramtypes",[n.c])],e)}(),c=o("IfiR"),p=o("981U"),d=function(){function e(e,t,o,i){this.surveyService=e,this.as=t,this.route=o,this.router=i,this.form=new c.FormGroup({}),this.model={},this.formlyOptions={formState:{awesomeIsForced:!1}},this.fields=[],this.show=!1}return e.prototype.ngOnInit=function(){var e=this,t=this.route.snapshot.params;if(this.zcFormOptions={id:this.options.id+"Form",mode:this.options.mode,fields:[]},this.payload={survey:this.options.survey,uid:t.uid},this.options.api.listParams&&this.options.api.listParams.length>0){var o=this.as.getParams(this.options.api.listParams,zc);Object.assign(this.payload,o)}this.surveyService.getSurveyDetails(this.options.api.list,this.payload).subscribe(function(t){var o;t.widgetMeta&&t.widgetMeta.entity&&(e.payload.entity=t.widgetMeta.entity),e.questionBank=JSON.parse(JSON.stringify(t)),e.fields=e.surveyService.questionBankToFormFields(t.categories),e.options.fields&&e.options.fields.length>0&&(o=e.fields).push.apply(o,e.options.fields),e.zcFormOptions.events=e.options.events,e.zcFormOptions.fields=e.fields,e.show=!0})},e.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},e.prototype.submit=function(e){var t=this;if(e.validate&&(zc[this.options.id+"Form"].formlyOptions.formState&&(zc[this.options.id+"Form"].formlyOptions.formState.submitted=!0),zc[this.options.id+"Form"].form.invalid))return!1;for(var o=[],i=Object.keys(this.model),s=0;s<i.length;s++){var n=i[s],r=this.model[n],a=n.split("__ZC__"),c=this.surveyService.getField(this.questionBank.categories,a[0],a[1],a[2]),p={category:a[0],subCategory:a[1],question:a[2],type:c.type,answer:r};o.push(p)}if(this.payload.answers=o,this.options.api.params){var d=this.as.getParams(this.options.api.params,zc);Object.assign(this.payload,d)}if(e.params){var u=this.as.getParams(e.params,zc);Object.assign(this.payload,u)}this.surveyService.saveEditSurvey(this.options.api.save,this.payload).subscribe(function(o){t.as.onSuccess(e.onSuccess,o)})},i.c([Object(s.Input)(),i.f("design:type",Object)],e.prototype,"options",void 0),e=i.c([Object(s.Component)({selector:"zc-survey",template:o("1lUD"),styles:[o("qsZ2")]}),i.f("design:paramtypes",[a,n.a,p.ActivatedRoute,p.Router])],e)}(),u=o("eQXH"),l=o("pnHo");o.d(t,"ZcSurveyModule",function(){return y});var y=function(){function e(){}return e=i.c([Object(s.NgModule)({imports:[u.a,l.a],declarations:[d],providers:[a],exports:[d]})],e)}()},qsZ2:function(e,t){e.exports=""}}]);