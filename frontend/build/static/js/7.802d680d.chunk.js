(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{58:function(e,t,a){"use strict";var n=a(10),r=a(0),c=a.n(r),l=(a(59),a(42));t.a=function(e){var t=Object(r.useState)(),a=Object(n.a)(t,2),i=a[0],s=a[1],o=Object(r.useState)(),u=Object(n.a)(o,2),d=u[0],p=u[1],m=Object(r.useState)(!1),b=Object(n.a)(m,2),f=b[0],v=b[1],g=Object(r.useRef)();Object(r.useEffect)((function(){if(i){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(i)}}),[i]);return c.a.createElement("div",{className:"form-control"},c.a.createElement("input",{type:"file",id:e.id,ref:g,style:{display:"none"},accept:".jpg,.png,.jpeg",onChange:function(t){var a,n;t.target.files&&1===t.target.files.length?(n=t.target.files[0],s(n),v(!0),a=!0):(v(!1),a=!1),e.onInput(e.id,n,a)}}),c.a.createElement("div",{className:"image-upload ".concat(e.center&&"center")},c.a.createElement("div",{className:"image-upload__preview"},d&&c.a.createElement("img",{src:d,alt:"Preview"}),!d&&c.a.createElement("p",null,"Please Pick and Image")),c.a.createElement(l.a,{type:"button",onClick:function(){g.current.click()}},"Upload")),c.a.createElement("div",null,!f&&c.a.createElement("p",null,e.errorText)))}},59:function(e,t,a){},69:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(44),r=a.n(n),c=a(45),l=a(10),i=a(0),s=a.n(i),o=a(1),u=a(55),d=a(42),p=a(11),m=a(46),b=a(16),f=a(52),v=(a(69),a(57)),g=a(58);t.default=function(){var e=Object(i.useState)(!1),t=Object(l.a)(e,2),a=t[0],n=t[1],j=Object(i.useState)(),E=Object(l.a)(j,2),O=E[0],h=E[1],x=Object(i.useContext)(p.a),k=Object(v.a)({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1),w=Object(l.a)(k,2),y=w[0],P=w[1],S=Object(o.g)(),I=function(){var e=Object(c.a)(r.a.mark((function e(t){var a,c,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,(a=new FormData).append("title",y.inputs.title.value),a.append("description",y.inputs.description.value),a.append("address",y.inputs.address.value),a.append("creator",x.userId),a.append("image",y.inputs.image.value),n(!0),e.next=11,fetch("".concat("https://tourgrambackend.herokuapp.com/api","/places"),{method:"POST",headers:{Authorization:"Bearer "+x.token},body:a});case 11:return c=e.sent,e.next=14,c.json();case 14:if(l=e.sent,c.ok){e.next=17;break}throw new Error(l.message);case 17:n(!1),S.push("/"),e.next=26;break;case 21:e.prev=21,e.t0=e.catch(1),console.log(e.t0),n(!1),h(e.t0.message||"Something Went Wrong");case 26:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{error:O,onClear:function(){h(null)}}),s.a.createElement("form",{className:"place-form",onSubmit:I},a&&s.a.createElement(b.a,{asOverlay:!0}),s.a.createElement(u.a,{id:"title",element:"input",type:"text",label:"title",validators:[Object(f.c)()],errorText:"Please Enter A Valid Title",onInput:P}),s.a.createElement(u.a,{id:"description",element:"textarea",label:"Description",validators:[Object(f.b)(5)],errorText:"Please Enter Atleast 5 Characters",onInput:P}),s.a.createElement(u.a,{id:"address",element:"input",label:"Address",validators:[Object(f.c)()],errorText:"Please enter a valid address",onInput:P}),s.a.createElement(g.a,{id:"image",onInput:P,errorText:"Please provide an image"}),s.a.createElement(d.a,{type:"submit",disabled:!y.isValid},"Add Place")))}}}]);
//# sourceMappingURL=7.802d680d.chunk.js.map