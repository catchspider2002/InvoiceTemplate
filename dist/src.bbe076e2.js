parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"DOJS":[function(require,module,exports) {
var t=function(t,e){var r=t*e;console.log("Area of the rectangle is "+r+" square unit")},e=function(t){return{svg:'<svg width="10" height="'+t+'"><rect style="fill:transparent" /></svg>'}},r=function(t,e){return{layout:"noBorders",table:{widths:["*"],heights:[t],body:[[{text:"",fillColor:e}]]}}},n=function(t,e){var r=!1;"#"==t[0]&&(t=t.slice(1),r=!0);var n=parseInt(t,16),o=(n>>16)+e,l=(n>>8&255)+e,i=(255&n)+e;return o>255?o=255:o<0&&(o=0),l>255?l=255:l<0&&(l=0),i>255?i=255:i<0&&(i=0),(r?"#":"")+(i|l<<8|o<<16).toString(16)};module.exports={spacer:e,coloredRect:r,lightenDarkenColor:n};
},{}],"H99C":[function(require,module,exports) {
var t=require("./functions"),e=10,o=5,l={width:595.28,height:841.89},n={width:612,height:792},r=l,i="#ff3e00",a="#676778",s="#b71c1c",g="#ffffff",d=t.lightenDarkenColor(i,60);console.log(d);var f=t.lightenDarkenColor(i,-60);console.log(f);var h,c,m,A="MMMM Do YYYY";A="MMM Do YYYY",A="DD-MM-YYYY",A="DD-MM-YY",A="D-M-YY",A="D-M-YYYY",A="DD.MM.YY",A="D.M.YY",A="YYYY-MM-DD",A="DD MMMM YYYY",A="DD MMM YYYY",A="M/D/YYYY",A="M/D/YY",A="MM/DD/YYYY",moment.locale("tr");var u=moment().format(A),x="NEW HEADER CENTER",y="NEW HEADER RIGHT",b="NEW FOOTER LEFT\nNEW FOOTER LEFT",v="NEW FOOTER CENTER",Y="NEW FOOTER RIGHT",w="INVOICE",p="Invoice #",V="Invoice Date",B="Due Date",R="000021",M=moment("20111031").format("MMM Do YY"),z="Jan 06, 2020",F="Billing From",H="Your Name",O="Your Company",E="Address",W="9999 Street Name",q="Some Area",T="Some Place",P="New York City",N="NY 00010",U="USA",Z="Billing To",L="Client Name",X="Client Company",S="Address",j="1111 Street Name",k="Some Area",C="Some Place",J="New York City",D="NY 00011",G="USA",Q={pageSize:{width:r.width,height:r.height},pageMargins:[0,0,0,40],background:function(){return{canvas:[{type:"rect",x:0,y:0,w:r.width,h:r.height,color:"#00BFFF"}]}},footer:{columns:[{text:b,style:["margin5","left","font10"]},{text:v,style:["margin5","center","font10"]},{text:Y,style:["margin5","right","font10"]}]},content:[{svg:'<svg width="'+r.width+'" height="10"><rect width="100%" height="10" style="fill:green" /></svg>'},t.coloredRect(0,i),{table:{widths:["*","*","*","*","*","*"],body:[[{text:"",fillColor:f},{text:"",fillColor:d},{text:"",fillColor:f},{text:"",fillColor:d},{text:"",fillColor:f},{text:"",fillColor:d}]]},layout:"noBorders"},t.spacer(40),{svg:'<svg width="'+r.width+'" height="10"><rect width="'+r.width+'" height="10" style="fill:rgb(0,0,255)" /></svg>'},{table:{widths:["15%","*","35%"],body:[[{text:"first column",fillColor:"#555555",color:"#00FFFF"},{text:"second column",color:"#555555",fillColor:"#dedede"},{text:"third column",fillColor:"#555555"}]]},layout:"noBorders"},{svg:'<svg height="30" width="200"><text x="0" y="15" fill="red">I love SVG!</text></svg>'},{svg:'<svg width="'+r.width+'" height="110"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:'+f+';stop-opacity:1" /><stop offset="50%" style="stop-color:'+i+';stop-opacity:1" /><stop offset="100%" style="stop-color:'+d+';stop-opacity:1" /></linearGradient></defs><rect width="'+r.width+'" height="100" fill="url(#grad1)" /></svg>'},{svg:'<svg width="'+r.width+'" height="10"><defs><pattern id="pattern_gWSAk" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)"><line x1="0" y="0" x2="0" y2="24" stroke="#16874E" stroke-width="24" /></pattern></defs><rect width="100%" height="100%" fill="url(#pattern_gWSAk)"/></svg>'},{columns:[{image:"data:image/png;base64,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",width:150},[{text:w,style:["font22","right","bold","marginL0T0R0B15"],width:"*"},{stack:[{columns:[{text:p,style:["font12","right"],width:"*"},{text:R,style:["font12","right"],width:100}]},{columns:[{text:V,style:["font12","right"],width:"*"},{text:M,style:["font12","right"],width:100}]},{columns:[{text:B,style:["font12","right"],width:"*"},{text:z,style:["font12","right"],width:100}]}]}]]},{columns:[{text:F,style:["font14","bold","left","marginL0T20R0B5"]},{svg:'<svg width="100" height="40"><rect width="100%" height="100%" style="fill:green" /></svg>'},t.coloredRect(40,i),{text:Z,style:["font14","bold","left","marginL0T20R0B5"]}]},{columns:[{text:H+"\n"+O,style:["left"]},{text:L+"\n"+X,style:["left"]}]},{columns:[{text:E,style:["bold","marginL0T7R0B3"]},{text:S,style:["bold","marginL0T7R0B3"]}]},{columns:[{text:W+"\n"+q+"\n"+T+"\n"+P+" "+N+"\n"+U,style:"invoiceBillingAddress"},{text:j+"\n"+k+"\n"+C+"\n"+J+" "+D+"\n"+G,style:"invoiceBillingAddress"}]},"\n\n",{table:{headerRows:1,widths:["*",40,"auto",40,"auto",80],body:[[{text:"Product",style:["marginH0V5","bold"]},{text:"Qty",style:["marginH0V5","bold","center"]},{text:"Price",style:["marginH0V5","bold","center"]},{text:"Tax",style:["marginH0V5","bold","center"]},{text:"Discount",style:["marginH0V5","bold","center"]},{text:"Total",style:["marginH0V5","bold","center"]}],[[{text:"Item 1",style:["bold"]},{text:"Item Description",style:["italics","font11"]}],{text:"1",style:["marginH0V5","center"]},{text:"$999.99",style:["marginH0V5","center"]},{text:"0%",style:["marginH0V5","center"]},{text:"0%",style:["marginH0V5","center"]},{text:"$999.99",style:["marginH0V5","bold","center"]}],[[{text:"Item 2",style:["bold"]},{text:"Item Description",style:["italics","font11"]}],{text:"1",style:["marginH0V5","center"]},{text:"$999.99",style:["marginH0V5","center"]},{text:"0%",style:["marginH0V5","center"]},{text:"0%",style:["marginH0V5","center"]},{text:"$999.99",style:["marginH0V5","bold","center"]}]]}},{table:{headerRows:0,widths:["*",80],body:[[{text:"Subtotal",style:["marginH0V5","bold","right"]},{text:"$2000.00",style:["marginH0V5","bold","center"]}],[{text:"Tax 21%",style:["marginH0V5","bold","right"]},{text:"$523.13",style:["marginH0V5","bold","center"]}],[{text:"TOTAL",style:["marginH0V5","bold","right"]},{text:"$2523.93",style:["marginH0V5","bold","center"]}]]},layout:"lightHorizontalLines"},{columns:[{text:""},{stack:[t.spacer(70),{text:"_________________________________"},{text:"Your Name",style:["bold","center"]},{text:"Your job title",style:["italics","font10","center"]}],width:180}]},t.spacer(50),{text:"NOTES",style:["font10","bold"]},{text:"Some notes goes here \n Notes second line",style:["font10"]}],styles:{margin5:{margin:[5,5,5,5]},marginL0T0R0B15:{margin:[0,0,0,15]},marginL0T20R0B5:{margin:[0,20,0,5]},marginL0T7R0B3:{margin:[0,7,0,3]},marginH0V5:{margin:[0,5,0,5]},font10:{fontSize:10},font11:{fontSize:11},font12:{fontSize:12},font14:{fontSize:14},font22:{fontSize:22},right:{alignment:"right"},left:{alignment:"left"},center:{alignment:"center"},bold:{bold:!0},italics:{italics:!0}},defaultStyle:{columnGap:20}},I={content:["This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns",{style:"section",table:{widths:["15%","*","35%"],body:[[{text:"first column",fillColor:"#555555",color:"#00FFFF"},{text:"second column",color:"#555555",fillColor:"#dedede"},{text:"third column",fillColor:"#555555"}]]},layout:"noBorders"}],styles:{section:{fontSize:9,color:"#FFFFFF",fillColor:"#2361AE",margin:[0,15,0,5]}},defaultStyle:{alignment:"center"}},K={content:["This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns",{columns:[{width:"auto",text:"First column",background:"#ff00ff"},{width:"*",text:"Second column",background:"#ff0000",fill:"#f000ff"},{width:100,text:"Third column",background:"#0000ff"},{width:"20%",text:"Fourth column",background:"#ffff00"}],columnGap:10},"This paragraph goes below all columns and has full width"]},_={pageSize:{width:595.28,height:841.89},background:function(){return{canvas:[{type:"rect",x:0,y:0,w:595.28,h:841.89,color:"#00BFFF"}]}},content:[{text:"Simple text 1",pageBreak:"after"},{text:"Simple text 2",pageBreak:"after"},{text:"Simple text 3",pageBreak:"after"}]},$=Q;function tt(t){return document.getElementById(t)}function et(){pdfMake.createPdf($).getDataUrl(function(t){lt(t,tt("canvas"))})}function ot(){createPdf($).download("PPRA.pdf")}function lt(t,e,o){function l(t){var l=t.getViewport(o.scale),n=document.createElement("div");n.className="canvas-wrapper";var r=document.createElement("canvas"),i={canvasContext:r.getContext("2d"),viewport:l};r.height=l.height,r.width=l.width,n.appendChild(r),e.appendChild(n),t.render(i)}o=o||{scale:1.4},PDFJS.disableWorker=!0,PDFJS.getDocument(t).then(function(t){for(var e=1;e<=t.numPages;e++)t.getPage(e).then(l)})}tt("downloadButton")&&tt("downloadButton").addEventListener("click",ot,!1),tt("renderButton")&&tt("renderButton").addEventListener("click",et,!1),et();
},{"./functions":"DOJS"}]},{},["H99C"], null)
//# sourceMappingURL=src.bbe076e2.js.map