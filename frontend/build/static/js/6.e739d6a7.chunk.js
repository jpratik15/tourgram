(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[6],{43:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(47);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},47:function(e,t,a){},58:function(e,t,a){"use strict";var n=a(10),r=a(0),s=a.n(r),c=(a(59),a(42));t.a=function(e){var t=Object(r.useState)(),a=Object(n.a)(t,2),l=a[0],i=a[1],o=Object(r.useState)(),u=Object(n.a)(o,2),p=u[0],m=u[1],d=Object(r.useState)(!1),b=Object(n.a)(d,2),f=b[0],v=b[1],g=Object(r.useRef)();Object(r.useEffect)((function(){if(l){var e=new FileReader;e.onload=function(){m(e.result)},e.readAsDataURL(l)}}),[l]);return s.a.createElement("div",{className:"form-control"},s.a.createElement("input",{type:"file",id:e.id,ref:g,style:{display:"none"},accept:".jpg,.png,.jpeg",onChange:function(t){var a,n;t.target.files&&1===t.target.files.length?(n=t.target.files[0],i(n),v(!0),a=!0):(v(!1),a=!1),e.onInput(e.id,n,a)}}),s.a.createElement("div",{className:"image-upload ".concat(e.center&&"center")},s.a.createElement("div",{className:"image-upload__preview"},p&&s.a.createElement("img",{src:p,alt:"Preview"}),!p&&s.a.createElement("p",null,"Please Pick and Image")),s.a.createElement(c.a,{type:"button",onClick:function(){g.current.click()}},"Upload")),s.a.createElement("div",null,!f&&s.a.createElement("p",null,e.errorText)))}},59:function(e,t,a){},70:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(44),r=a.n(n),s=a(45),c=a(56),l=a(10),i=a(0),o=a.n(i),u=a(1),p=a(57),m=a(55),d=a(42),b=a(52),f=a(43),v=a(11),g=a(46),O=a(16),j=a(58);a(70);t.default=function(){Object(u.g)();var e=Object(p.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),t=Object(l.a)(e,3),a=t[0],n=t[1],h=t[2],E=Object(i.useState)(!1),w=Object(l.a)(E,2),k=w[0],x=w[1],y=Object(i.useState)(),S=Object(l.a)(y,2),I=S[0],N=S[1],P=Object(i.useContext)(v.a),T=Object(i.useState)(!0),C=Object(l.a)(T,2),V=C[0],W=C[1],G=function(){var e=Object(s.a)(r.a.mark((function e(t){var n,s,c,l,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!V){e.next=23;break}return e.prev=2,x(!0),e.next=6,fetch("".concat("https://tourgrambackend.herokuapp.com/api","/users/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a.inputs.email.value,password:a.inputs.password.value})});case 6:return n=e.sent,e.next=9,n.json();case 9:if(s=e.sent,n.ok){e.next=12;break}throw new Error(s.message);case 12:x(!1),P.login(s.userId,s.token),e.next=21;break;case 16:e.prev=16,e.t0=e.catch(2),console.log(e.t0),x(!1),N(e.t0.message||"Something Went Wrong");case 21:e.next=47;break;case 23:return e.prev=23,(c=new FormData).append("name",a.inputs.name.value),c.append("email",a.inputs.email.value),c.append("password",a.inputs.password.value),c.append("image",a.inputs.image.value),x(!0),e.next=32,fetch("".concat("https://tourgrambackend.herokuapp.com/api","/users/signup"),{method:"POST",body:c});case 32:return l=e.sent,e.next=35,l.json();case 35:if(i=e.sent,l.ok){e.next=38;break}throw new Error(i.message);case 38:x(!1),P.login(i.userId,i.token),e.next=47;break;case 42:e.prev=42,e.t1=e.catch(23),console.log(e.t1),x(!1),N(e.t1.message||"Something Went Wrong");case 47:case"end":return e.stop()}}),e,null,[[2,16],[23,42]])})));return function(t){return e.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,{error:I,onClear:function(){N(null)}}),o.a.createElement(f.a,{className:"authentication"},k&&o.a.createElement(O.a,{asOverlay:!0}),o.a.createElement("h2",null,"Login Required!"),o.a.createElement("hr",null),o.a.createElement("form",{onSubmit:G},!V&&o.a.createElement(m.a,{id:"name",element:"input",type:"text",label:"Name",validators:[Object(b.c)()],errorText:"Please enter your name",onInput:n}),o.a.createElement(m.a,{id:"email",element:"input",type:"email",label:"Email",validators:[Object(b.a)()],errorText:"Please enter a valid email!!",onInput:n}),!V&&o.a.createElement(j.a,{center:!0,id:"image",onInput:n,errorText:"Please select an image"}),o.a.createElement(m.a,{id:"password",element:"input",type:"password",label:"Password",validators:[Object(b.b)(6)],errorText:"Please enter a valid password of length atleast 6",onInput:n}),o.a.createElement(d.a,{type:"submit",disabled:!a.isValid},V?"LOGIN":"SIGNUP")),o.a.createElement(d.a,{type:"submit",onClick:function(){V?h(Object(c.a)(Object(c.a)({},a.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1}}),!1):h(Object(c.a)(Object(c.a)({},a.inputs),{},{name:void 0,image:void 0}),a.inputs.email.isValid&&a.inputs.password.isValid),W((function(e){return!e}))}},"SWITCH TO ",V?"SIGNUP":"LOGIN")))}}}]);
//# sourceMappingURL=6.e739d6a7.chunk.js.map