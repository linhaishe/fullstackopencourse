(this.webpackJsonpcourseinfo=this.webpackJsonpcourseinfo||[]).push([[0],{21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t(3),a=t(0),i=t(1),u=t(14),o=t.n(u),s=(t(21),t(4)),l=t.n(s),d="/api/person",f=function(){return l.a.get(d)},j=function(e){return l.a.post(d,e)},b=function(e,n){return l.a.put("".concat(d,"/").concat(e),n)},m=function(e){return l.a.delete("".concat(d,"/").concat(e))},h=function(e){var n=e.persons,t=e.handleDelete;return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("li",{children:[n.name," ",n.number,Object(a.jsx)("button",{onClick:t,children:" delete"})]})})},O=function(e){var n=e.addName,t=e.newName,r=e.handleNameChange,c=e.newNumber,i=e.handleNumberChange;return Object(a.jsxs)("form",{onSubmit:n,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:t,onChange:r})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:c,onChange:i})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.filterResult;return Object(a.jsxs)("li",{children:[n.name," ",n.number]})},p=function(e){var n=e.message;return null===n?null:Object(a.jsx)("div",{className:"success",children:n})},g=function(e){var n=e.message;return null===n?null:Object(a.jsx)("div",{className:"error",children:n})},x=function(){var e=Object(i.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(i.useState)(""),s=Object(c.a)(o,2),l=s[0],d=s[1],x=Object(i.useState)(""),w=Object(c.a)(x,2),N=w[0],y=w[1],S=Object(i.useState)(""),C=Object(c.a)(S,2),k=C[0],D=C[1],J=Object(i.useState)(null),I=Object(c.a)(J,2),T=I[0],E=I[1],L=Object(i.useState)(null),R=Object(c.a)(L,2),$=R[0],z=R[1];Object(i.useEffect)((function(){f().then((function(e){u(e.data)}))}),[]);var B=t.filter((function(e){return n=Object.values(e),t=k,n.map((function(e){return String(e).toLowerCase()})).find((function(e){return e.includes(t.toString().toLowerCase())}));var n,t})),F=function(e){window.confirm("Do you really want to delete ".concat(t[e-1].name,"?"))&&m(e).then((function(n){u(t.filter((function(n){return n.id!==e})))})).catch((function(){z("Information of '".concat(t[e-1].name,"' has already been removed from the server")),setTimeout((function(){z(null)}),5e3)}))};return Object(a.jsxs)("div",{children:[Object(a.jsx)(g,{message:$}),Object(a.jsx)(p,{message:T}),Object(a.jsx)("h2",{children:"Phonebook"}),"filter shown with"," ",Object(a.jsx)("input",{value:k,onChange:function(e){D(e.target.value)}}),Object(a.jsx)("p",{children:B.map((function(e,n){return Object(a.jsx)(v,{filterResult:e},n)}))}),Object(a.jsx)("h1",{children:"add a new"}),Object(a.jsx)(O,{addName:function(e){var n=Object(r.a)({},t);e.preventDefault();var c={name:l,number:N};if(0===String(c.name).replace(/(^\s*)|(\s*$)/g,"").length||0===String(c.number).replace(/(^\s*)|(\s*$)/g,"").length)alert("empty string,plz reconfirm");else if(-1===JSON.stringify(n).indexOf(JSON.stringify(l)))j(c).then((function(e){E("Note '".concat(l,"' was add successfully")),setTimeout((function(){E(null)}),5e3),u(t.concat(e.data)),d(""),y("")}));else{var a=t.find((function(e){return e.name===l}));if("undefined"!==typeof a&&a.number!==N)return void b(a.id,{name:a.name,number:N}).then((function(e){if(window.confirm("".concat(e.name," is already added to phonebook,replace the old number with a new one?"))){var n=t.map((function(n){return n.id!==a.id?n:e.data}));u(n),d(""),y("")}})).catch((function(){z("Information of '".concat(l,"' has already been removed from the server")),setTimeout((function(){z(null)}),5e3)}));if("undefined"!==typeof a)return alert("".concat(l," is already added to phonebook")),d(""),void y("")}},newName:l,handleNameChange:function(e){d(e.target.value.trim())},newNumber:N,handleNumberChange:function(e){y(e.target.value.trim())}}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)("p",{children:t.map((function(e,n){return Object(a.jsx)(h,{persons:e,handleDelete:function(){return F(e.id)}},n)}))})]})};n.default=x;o.a.render(Object(a.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.bc648d4b.chunk.js.map