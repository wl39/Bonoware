webpackJsonp([14],{7326:function(e,t,a){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function s(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=a(0),o=a.n(r),d=a(7),p=a.n(d),m=a(63),c=a.n(m),h=a(7800),x=a(10),w=(a.n(x),a(62)),g=a(87),u=a.n(g),f=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),v=function(e){function t(e){l(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.dateTransform=function(e){var t=new Date,a=new Date(e),i=t.getTime()-a.getTime(),l=parseInt(i/864e5,10);if(l<7)return 0===l?"\uc624\ub298":l+"\uc77c \uc804";if(l<29)return parseInt(l/7,10)+"\uc8fc \uc804";if(l<32)return"\ud55c\ub2ec \uc804";var n=a.getMonth()+1,s=a.getDate();return a=a.getFullYear()+"."+(n>9?"":"0")+n+"."+(s>9?"":"0")+s},a.previous=function(){a.state.skip&&u()({method:"get",url:"https://api.probe.gg/open/list_news?skip="+(a.state.skip-1)}).then(function(e){var t=[],l=!1;e.data.data.forEach(function(e,n){if(n>=6)l=!0;else{var s=new Date(e.postDate),r=s.getMonth()+1,o=s.getDate();s=s.getFullYear()+"."+(r>9?"":"0")+r+"."+(o>9?"":"0")+o,e.postDate=a.dateTransform(e.postDate),t=[].concat(i(t),[e])}}),a.setState({allNews:t,skip:a.state.skip-1,next:l})})},a.next=function(){u()({method:"get",url:"https://api.probe.gg/open/list_news?skip="+(a.state.skip+1)}).then(function(e){var t=[],l=!1;e.data.data.forEach(function(e,n){if(n>=6)l=!0;else{var s=new Date(e.postDate),r=s.getMonth()+1,o=s.getDate();s=s.getFullYear()+"."+(r>9?"":"0")+r+"."+(o>9?"":"0")+o,e.postDate=a.dateTransform(e.postDate),t=[].concat(i(t),[e])}}),a.setState({allNews:t,skip:a.state.skip+1,next:l})})},a.state={allNews:[],skip:0,next:!0},a}return s(t,e),f(t,[{key:"componentWillMount",value:function(){var e=this;u()({method:"get",url:"https://api.probe.gg/open/list_news?skip=0"}).then(function(t){var a=[],l=!1;t.data.data.forEach(function(t,n){if(n>=6)l=!0;else{var s=new Date(t.postDate),r=s.getMonth()+1,o=s.getDate();s=s.getFullYear()+"."+(r>9?"":"0")+r+"."+(o>9?"":"0")+o,t.postDate=e.dateTransform(t.postDate),a=[].concat(i(a),[t])}}),e.setState({allNews:a,next:l})})}},{key:"render",value:function(){var e=this.props.classes;return o.a.createElement("div",{className:e.container},this.state.allNews[0]?o.a.createElement("div",null,o.a.createElement("div",{className:e.headlineContainer},o.a.createElement("div",{className:e.headlineLeft},o.a.createElement("div",{className:e.headlineTitleHeader},o.a.createElement("div",{className:e.headlineTitleContainer},o.a.createElement("div",{className:e.headlineIndex},"01. "),o.a.createElement("div",{className:e.headlineTitle},"Sneakers")),o.a.createElement("div",{className:e.unknown},"\ud504\ub85c\ube0c\uc5d0\uc11c \uc0c8\ub85c \uc120\ubcf4\uc774\ub294 \uc2ec\ud50c\ud568 \uc18d\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc788\ub294 \uba4b\uc2a4\ub7ec\uc6c0\uacfc \uc12c\uc138\ud55c \ub514\ud14c\uc77c, \uadf8\ub9ac\uace0 \uc990\uac70\uc6c0\uc744 \ud45c\ud604\ud558\ub294 \uce90\uc96c\uc5bc \ube0c\ub79c\ub4dc\uc785\ub2c8\ub2e4."),o.a.createElement("div",{className:e.headlineDetailsContainer},o.a.createElement("div",{className:e.headlineDetailsLeft},"By ",this.state.allNews[0].writer,","," ",this.state.allNews[0].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[0].viewCount))),o.a.createElement("div",{className:e.headlineImageContainer},o.a.createElement("img",{className:e.headlineImage,src:this.state.allNews[0].image[0],alt:this.state.allNews[0].title}))),o.a.createElement("div",{className:e.headlineRight},o.a.createElement("div",{className:e.headlineTitleHeader},o.a.createElement("div",{className:e.headlineTitleContainer},o.a.createElement("div",{className:e.headlineIndex},"02. "),o.a.createElement("div",{className:e.headlineTitle},"Sneakers")),o.a.createElement("div",{className:e.unknown},"\ud504\ub85c\ube0c\uc5d0\uc11c \uc0c8\ub85c \uc120\ubcf4\uc774\ub294 \uc2ec\ud50c\ud568 \uc18d\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc788\ub294 \uba4b\uc2a4\ub7ec\uc6c0\uacfc \uc12c\uc138\ud55c \ub514\ud14c\uc77c, \uadf8\ub9ac\uace0 \uc990\uac70\uc6c0\uc744 \ud45c\ud604\ud558\ub294 \uce90\uc96c\uc5bc \ube0c\ub79c\ub4dc\uc785\ub2c8\ub2e4."),o.a.createElement("div",{className:e.headlineDetailsContainer},o.a.createElement("div",{className:e.headlineDetailsLeft},"By ",this.state.allNews[1].writer,","," ",this.state.allNews[1].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[1].viewCount))),o.a.createElement("div",{className:e.headlineImageContainer},o.a.createElement("img",{className:e.headlineImage,src:this.state.allNews[1].image[0],alt:this.state.allNews[1].title})))),o.a.createElement("div",{className:e.newsTypeContainer},o.a.createElement("div",null,"all"),o.a.createElement("div",null,"sneakers"),o.a.createElement("div",null,"designer"),o.a.createElement("div",null,"editorial")),o.a.createElement("div",{className:e.newsCardContainer},o.a.createElement(w.b,{to:"/news/"+this.state.allNews[2].title,className:e.newsCard},o.a.createElement("img",{className:e.newsCardImg,src:this.state.allNews[2].image[0],alt:this.state.allNews[2].title}),o.a.createElement("div",{className:e.category},"SNEAKERS"),o.a.createElement("div",{className:e.newsCardTitle},this.state.allNews[2].title),o.a.createElement("div",{className:e.newsCardDetailsContainer},o.a.createElement("div",null,"By ",this.state.allNews[2].writer,","," ",this.state.allNews[2].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[2].viewCount))),o.a.createElement(w.b,{to:"/news/"+this.state.allNews[3].title,className:e.newsCard},o.a.createElement("img",{className:e.newsCardImg,src:this.state.allNews[3].image[0],alt:this.state.allNews[3].title}),o.a.createElement("div",{className:e.category},"SNEAKERS"),o.a.createElement("div",{className:e.newsCardTitle},this.state.allNews[3].title),o.a.createElement("div",{className:e.newsCardDetailsContainer},o.a.createElement("div",null,"By ",this.state.allNews[3].writer,","," ",this.state.allNews[3].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[3].viewCount))),o.a.createElement(w.b,{to:"/news/"+this.state.allNews[4].title,className:e.newsCard},o.a.createElement("img",{className:e.newsCardImg,src:this.state.allNews[4].image[0],alt:this.state.allNews[4].title}),o.a.createElement("div",{className:e.category},"SNEAKERS"),o.a.createElement("div",{className:e.newsCardTitle},this.state.allNews[4].title),o.a.createElement("div",{className:e.newsCardDetailsContainer},o.a.createElement("div",null,"By ",this.state.allNews[4].writer,","," ",this.state.allNews[4].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[4].viewCount))),o.a.createElement(w.b,{to:"/news/"+this.state.allNews[5].title,className:e.newsCard},o.a.createElement("img",{className:e.newsCardImg,src:this.state.allNews[5].image[0],alt:this.state.allNews[5].title}),o.a.createElement("div",{className:e.category},"SNEAKERS"),o.a.createElement("div",{className:e.newsCardTitle},this.state.allNews[5].title),o.a.createElement("div",{className:e.newsCardDetailsContainer},o.a.createElement("div",null,"By ",this.state.allNews[5].writer,","," ",this.state.allNews[5].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[5].viewCount))),o.a.createElement(w.b,{to:"/news/"+this.state.allNews[5].title,className:e.newsCard},o.a.createElement("img",{className:e.newsCardImg,src:this.state.allNews[5].image[0],alt:this.state.allNews[5].title}),o.a.createElement("div",{className:e.category},"SNEAKERS"),o.a.createElement("div",{className:e.newsCardTitle},this.state.allNews[5].title),o.a.createElement("div",{className:e.newsCardDetailsContainer},o.a.createElement("div",null,"By ",this.state.allNews[5].writer,","," ",this.state.allNews[5].postDate),o.a.createElement("div",{style:{borderRight:"1px solid black"}}),o.a.createElement("div",null,"\uc870\ud68c\uc218 ",this.state.allNews[5].viewCount)))),this.state.skip?o.a.createElement(c.a,{onClick:this.previous},"\uc774\uc804"):null,this.state.next?o.a.createElement(c.a,{onClick:this.next},"\ub2e4\uc74c"):null):o.a.createElement("div",null,"\ub85c\ub529\uc911\uc785\ub2c8\ub2e4."))}}]),t}(o.a.Component);t.default=p()(h.a)(v)},7800:function(e,t,a){"use strict";function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var l,n,s={container:{display:"flex",flexDirection:"column",paddingTop:"200px",position:"relative",background:"#FFFFFF",marginLeft:"auto",marginRight:"auto",paddingBottom:"10px",width:"100%",maxWidth:"86.666%","@media (max-width: 1199px)":{maxWidth:"90%",paddingTop:"150px"},"@media (max-width: 992px)":{maxWidth:"90%",paddingTop:"150px"},"@media (max-width: 768px)":{maxWidth:"90%",paddingTop:"150px"},"@media (max-width: 599px)":{maxWidth:"100%",paddingTop:"72px",paddingLeft:"0",paddingRight:"0"}},headlineContainer:{display:"flex",flexDirection:"row",marginBottom:"100px","@media (max-width: 1199px)":{flexDirection:"column",padding:"0px 10px"}},headlineLeft:{width:"50%",display:"flex",flexDirection:"row",paddingRight:"35px","@media (max-width: 1199px)":{width:"100%",paddingRight:"0px",marginBottom:"40px"}},headlineImageContainer:{width:"30vw",height:"570px",border:"1px solid #b7b7b7","@media (max-width: 1199px)":{width:"50vw"}},headlineImage:{height:"568px",objectFit:"cover",width:"100%",margin:"auto"},headlineTitleHeader:{display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-between",position:"relative",width:"50%",color:"#2a2a2a"},headlineTitleContainer:{height:"52px",fontWeight:"bold",display:"flex",position:"absolute",top:"130px",color:"#2a2a2a"},headlineIndex:{fontSize:"16px",lineHeight:"52px",paddingRight:"20px",fontWeight:"900"},headlineTitle:{lineHeight:"50px",fontSize:"52px",fontWeight:"700",whiteSpace:"nowrap",maxWidth:"30vw",overflow:"hidden",textShadow:"1px 1px 4px white","@media (max-width: 1199px)":{maxWidth:"50vw"},"@media (max-width: 599px)":{maxWidth:"90vw"}},headlineDetailsContainer:{display:"flex",flexDirection:"row",height:"18px",lineHeight:"16px",fontSize:"16px",position:"absolute",bottom:"0",width:"15vw",justifyContent:"space-between",color:"#010101","@media (max-width: 1899px)":{flexDirection:"column",height:"40px"},"@media (max-width: 1199px)":{flexDirection:"row",height:"18px",bottom:"-570px",width:"40vw"},"@media (max-width: 768px)":{flexDirection:"column",height:"40px"}},headlineDetailsLeft:{letterSpacing:"-0.2px","@media (max-width: 1899px)":{letterSpacing:"-1px"},"@media (max-width: 1199px)":{letterSpacing:"0px"}},unknown:{position:"absolute",top:"250px",width:"15vw","@media (max-width: 1199px)":{width:"40vw"}},headlineButton:{minHeight:"24px",padding:"6px 0px"},headlineContent:(l={height:"2rem",lineHeight:"1rem",overflow:"hidden",marginTop:"6px",WebkitLineClamp:"2",display:"block"},i(l,"display","-webkit-box"),i(l,"WebkitBoxOrient","vertical"),l),headlineRight:{width:"50%",display:"flex",flexDirection:"row",paddingLeft:"35px","@media (max-width: 1199px)":{width:"100%",paddingLeft:"0px"}},subHeadlinesContainer:{display:"flex",flex:"1",maxnHeight:"192px",paddingLeft:"5px",paddingTop:"5px",borderBottom:"1px solid #eee"},subHeadlineLast:{borderBottom:"0px"},subHeadlineContainer:{display:"flex",flexDirection:"row"},subHeadlineImageContainer:{height:"180px",width:"180px"},subHeadlineImage:{height:"180px",objectFit:"contain",width:"180px",margin:"auto"},subInfoConatiner:{display:"flex",flexDirection:"column",margin:"0px 8px",justifyContent:"space-between"},subTitleHeader:{display:"flex",justifyContent:"space-between"},subTitle:{overflow:"hidden",height:"48px",lineHeight:"24px",fontSize:"24px"},subDetailsContainer:{display:"flex",flexDirection:"row",height:"12px",lineHeight:"12px",fontSize:"12px",justifyContent:"space-between",marginBottom:"5px"},subContent:(n={height:"112px",fontSize:"14px",lineHeight:"22px",paddingBottom:"4px",overflow:"hidden",WebkitLineClamp:"5",display:"block"},i(n,"display","-webkit-box"),i(n,"WebkitBoxOrient","vertical"),n),newsTypeContainer:{display:"flex",flexDirection:"row",textTransform:"uppercase",margin:"auto",marginBottom:"40px",justifyContent:"space-between",width:"520px","@media (max-width: 599px)":{width:"100%",padding:"0px 20px",marginBottom:"20px"}},newsCardContainer:{display:"grid",gridTemplateColumns:"25% 25% 25% 25%",gridTemplateRows:"650px 650px",color:"#2a2a2a",marginBottom:"50px","@media (max-width: 1600px)":{gridTemplateRows:"630px 630px"},"@media (max-width: 1400px)":{gridTemplateRows:"590px 590px"},"@media (max-width: 1199px)":{gridTemplateRows:"550px 550px",gridTemplateColumns:"33.33% 33.33% 33.33%"},"@media (max-width: 959px)":{gridTemplateRows:"520px 520px",gridTemplateColumns:"33.33% 33.33% 33.33%"},"@media (max-width: 599px)":{gridTemplateRows:"520px 520px 520px",gridTemplateColumns:"50% 50%"},"@media (max-width: 499px)":{gridTemplateRows:"390px 390px 390px"}},newsCard:{padding:"0px 10px",color:"#2a2a2a",cursor:"pointer","&:hover":{color:"#2a2a2a"}},newsCardImg:{width:"100%",height:"430px",objectFit:"contain",marginBottom:"20px","@media (max-width: 1600px)":{height:"410px"},"@media (max-width: 1400px)":{height:"370px"},"@media (max-width: 1199px)":{height:"350px"},"@media (max-width: 959px)":{height:"320px"},"@media (max-width: 499px)":{height:"220px"}},category:{fontSize:"14px",height:"10px",lineHeight:"10px",color:"#a2a9af",marginBottom:"15px",letterSpacing:"0.14px",fontWeight:"300"},newsCardTitle:{height:"60px",lineHeight:"30px",fontSize:"21px",fontWeight:"600",letterSpacing:"-1.05px","@media (max-width: 992px)":{fontSize:"18px",lineHeight:"24px",height:"52px"}},newsCardDetailsContainer:{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"16px",lineHeight:"16px",marginTop:"25px",color:"#010101",letterSpacing:"0.16px","@media (max-width: 1199px)":{height:"40px",flexDirection:"column"},"@media (max-width: 992px)":{fontSize:"14px",lineHeight:"14px",height:"36px"}}};t.a=s}});