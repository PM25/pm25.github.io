(this.webpackJsonpplusmore=this.webpackJsonpplusmore||[]).push([[18],{269:function(e,t,n){},294:function(e,t){},389:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return q}));var i=n(1),a=n(0),c=n.n(a),s=n(221),r=(n(269),n(22)),o=n(23),l=n(25),d=n(24),u=n(230),h=n.n(u),j=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={residence:{name:"Residence",icon:"fas fa-thumbtack",content:"Taipei, Taiwan"},hometown:{name:"Hometown",icon:"fas fa-search-location",content:"Taichung, Taiwan"},birthplace:{name:"Birthplace",icon:"fas fa-map-marked-alt",content:"Auckland, New Zealand"},email:{icon:"far fa-envelope",content:"pyhuang97@gmail.com",url:"mailto:pyhuang97@gmail.com"},bio:["Hi! I am Pin-Yen, you can also call me Jason.","I'm a M.S. student in Computer Science and Information Engineering at the National Taiwan University (NTU), advised by Prof. <a href='https://www.csie.ntu.edu.tw/~htlin/'>Hsuan-Tien Lin</a>. My research focuses on <b>artificial intelligence</b> and <b>machine learning</b>."]},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{className:"bio",children:[Object(i.jsx)("h2",{className:"header",children:"Introduction"}),Object(i.jsxs)("div",{className:"content",children:[Object(i.jsxs)("div",{className:"info",children:[this.renderInfoBlock(this.state.residence),this.renderInfoBlock(this.state.hometown),this.renderInfoBlock(this.state.birthplace),this.renderInfoBlock(this.state.email)]}),Object(i.jsx)("div",{className:"paragraph",children:this.state.bio.map((function(e,t){return Object(i.jsx)("div",{children:h()(e)},t)}))})]})]})}},{key:"renderInfoBlock",value:function(e){return Object(i.jsx)(b,{icon:e.icon,name:e.name,content:e.content,url:e.url})}}]),n}(a.PureComponent);function b(e){return Object(i.jsxs)("div",{className:"info-block",children:[Object(i.jsx)("i",{className:e.icon+" icon"}),Object(i.jsxs)("span",{children:[e.name?e.name+": ":"",e.url?Object(i.jsx)("a",{href:e.url,children:e.content}):e.content]})]})}var m=n.p+"static/media/ntu_logo.1701240b.webp",p=n.p+"static/media/nccu_logo.368c0923.webp",f=n.p+"static/media/ncnu_logo.50889c83.webp",v=n.p+"static/media/tcssh_logo.2193e933.webp",g=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={ntu:{name:"National Taiwan University",degree:"Master of Science",department:"Computer Science and Information Engineering",period:"2020.9 - Present",logo:m,status:"current"},nccu:{name:"National Chengchi University",degree:"Bachelor of Science",department:"Computer Science",period:"2018.9 - 2020.6",logo:p,status:"before"},ncnu:{name:"National Chi Nan University",degree:"Bachelor of Science",department:"Computer Science and Information Engineering",period:"2016.9 - 2018.6",logo:f,status:"before"},tcssh:{name:"Taichung Second Senior High School",degree:"Senior High School",department:"Regular",period:"2013.9 - 2016.6",logo:v,status:"before"}},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{className:"education",children:[Object(i.jsx)("h2",{className:"header",children:"Education"}),Object(i.jsx)("div",{className:"content",children:Object(i.jsx)("div",{className:"timeline-container",children:Object(i.jsxs)("div",{className:"edu-timeline",children:[this.renderEdu(this.state.ntu),this.renderEdu(this.state.nccu),this.renderEdu(this.state.ncnu),this.renderEdu(this.state.tcssh)]})})})]})}},{key:"renderEdu",value:function(e){return Object(i.jsx)(O,{status:e.status,name:e.name,degree:e.degree,department:e.department,period:e.period,logo:e.logo})}}]),n}(a.PureComponent);function O(e){return Object(i.jsx)("div",{className:"container "+e.status,children:Object(i.jsxs)("div",{className:"content",children:[Object(i.jsxs)("div",{className:"school",children:[Object(i.jsx)("img",{src:e.logo,alt:"logo"}),Object(i.jsx)("span",{children:e.name})]}),Object(i.jsxs)("div",{className:"major subtitle",children:[Object(i.jsxs)("div",{children:[e.degree,", ",e.department]}),Object(i.jsx)("div",{children:e.period})]})]})})}var x=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{id:"intro",className:"section",children:[Object(i.jsx)(g,{}),Object(i.jsx)(j,{})]})}}]),n}(a.PureComponent),k=n(65),y=n(266),N=n(69),w=(n(120),n.p+"static/media/python_logo.41433130.webp"),S=n.p+"static/media/cpp_logo.8782fc29.webp",C=n.p+"static/media/javascript_logo.16d28473.webp",B=n.p+"static/media/lisp_logo.2fd3d1d2.webp",I=n.p+"static/media/pytorch_logo.a5963e20.webp",L=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={skillsText:[{name:"programming languages",icon:"fas fa-code",content:"<b>(proficient):</b> Python, C/C++, JavaScript, Lisp, Shell Script <br><b>(familiar):</b> R, Matlab"},{name:"tools",icon:"fas fa-wrench",content:"VSCode, Vim, Emacs, Git, Github, Google Cloud"},{name:"others",icon:"fas fa-server",content:"Linux/Unix, Arduino, Raspberry Pi, PyTorch, Keras, HTML/CSS, React, Markdown, LaTeX"}],skillsLevel:[{name:"Python",level:92,logo:w},{name:"C/C++",level:93,logo:S},{name:"Javascript",level:90,logo:C},{name:"Lisp",level:88,logo:B},{name:"PyTorch",level:91,logo:I}],activeSkillsLevel:!1},i.contentRef=c.a.createRef(),i.handleScroll=i.handleScroll.bind(Object(k.a)(i)),i}return Object(o.a)(n,[{key:"handleScroll",value:function(){var e=this.contentRef.current.getBoundingClientRect(),t=e.top;t>=-e.height&&t<window.innerHeight?this.setState({activeSkillsLevel:!0}):this.setState({activeSkillsLevel:!1})}},{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleScroll)}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{className:"section",id:"skills",children:[Object(i.jsx)("h2",{className:"header",children:"Skills"}),Object(i.jsxs)("div",{className:"content",ref:this.contentRef,children:[Object(i.jsx)(N.a,{className:"details",children:this.state.skillsText.map((function(t,n){return e.renderSkillsTextBlock(t)}))}),Object(i.jsx)("ul",{children:this.state.skillsLevel.map((function(t,n){return e.renderSkillsLevelBlock(t)}))})]})]})}},{key:"renderSkillsTextBlock",value:function(e){return Object(i.jsx)(P,{name:e.name,icon:e.icon,content:e.content})}},{key:"renderSkillsLevelBlock",value:function(e){return Object(i.jsx)(E,{name:e.name,logo:e.logo,level:e.level,active:this.state.activeSkillsLevel})}}]),n}(a.PureComponent);function P(e){return Object(i.jsxs)("div",{children:[Object(i.jsxs)("h3",{children:[Object(i.jsx)("i",{className:e.icon+" icon"}),Object(i.jsx)("span",{children:e.name})]}),Object(i.jsx)("div",{children:h()(e.content)})]})}function E(e){var t=Object(y.b)({config:{friction:128,tension:240},width:e.active?e.level+"%":"0%",delay:e.active?250*Math.random():0});return Object(i.jsxs)("li",{children:[Object(i.jsx)("div",{className:"logo-wrapper",children:Object(i.jsx)("img",{src:e.logo,alt:"logo"})}),Object(i.jsx)("span",{children:e.name}),Object(i.jsx)("div",{className:"progress-bar",children:Object(i.jsx)(y.a.div,{className:"progress-bar-fill",style:t})})]})}var T=n.p+"static/media/profile.718fff4f.jpeg",U=n.p+"static/media/cv_v3.1ac3c71f.pdf",M=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(i.jsx)("div",{className:"section",id:"profile",children:Object(i.jsxs)("div",{className:"header",children:[Object(i.jsx)("div",{className:"profile-img",children:Object(i.jsx)("img",{src:T,alt:"Profile"})}),Object(i.jsx)("div",{className:"basic-info",children:Object(i.jsxs)("div",{className:"title-box",children:[Object(i.jsxs)("span",{className:"name",children:[Object(i.jsx)("div",{children:"\u9ec3\u54c1\u786f"}),Object(i.jsx)("div",{className:"alt",children:"Pin-Yen (Jason) Huang"})]}),Object(i.jsxs)("span",{className:"title",children:[Object(i.jsx)("a",{href:"https://learner.csie.ntu.edu.tw",children:"CLLab"}),"\u2022National Taiwan University"]}),Object(i.jsxs)("div",{className:"info",children:[Object(i.jsx)("a",{href:"https://www.linkedin.com/in/PM-Huang","data-tootik":"LinkedIn","data-tootik-conf":"bottom",children:Object(i.jsx)("i",{className:"fab fa-linkedin"})}),Object(i.jsx)("a",{href:"https://scholar.google.com.tw/citations?user=nQdpH2MAAAAJ","data-tootik":"Google Scholar","data-tootik-conf":"bottom",children:Object(i.jsx)("i",{className:"fas fa-graduation-cap"})}),Object(i.jsx)("a",{href:U,"data-tootik":"R\xe9sum\xe9","data-tootik-conf":"bottom",children:Object(i.jsx)("i",{className:"far fa-id-badge"})}),Object(i.jsx)("a",{href:"https://github.com/PM25","data-tootik":"Github","data-tootik-conf":"bottom",children:Object(i.jsx)("i",{className:"fab fa-github"})}),Object(i.jsx)("a",{href:"https://www.facebook.com/pyhuang97","data-tootik":"Facebook","data-tootik-conf":"bottom",children:Object(i.jsx)("i",{className:"fab fa-facebook-square"})})]})]})})]})})}}]),n}(a.PureComponent),A=n(58),R=n.p+"static/media/2019-9-4-workshop.ace15434.jpg",_=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={activities:[{title:"[Workshop/Presentation] Deep Learning with Keras",location:"University of Illinois Urbana-Champaign (UIUC), Illinois, USA",time:"Sep 4, 2019",description:"",image:R}],activeIdx:null},i}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{id:"activities",className:"section",children:[Object(i.jsx)("h2",{className:"header",children:"Activities"}),Object(i.jsx)("div",{className:"content",children:this.state.activities.map((function(t,n){return e.renderActivitiesBlock(t)}))})]})}},{key:"renderActivitiesBlock",value:function(e){return Object(i.jsx)(H,{title:e.title,time:e.time,location:e.location,description:e.description,image:e.image})}}]),n}(a.PureComponent);function H(e){var t=Object(a.useState)(!1),n=Object(A.a)(t,2),c=n[0],s=n[1],r=Object(y.b)({config:{friction:32,tension:320},height:c?"20em":"0em"});return Object(i.jsxs)("div",{className:c?"item showing":"item",onClick:function(){return s((function(e){return!e}))},children:[Object(i.jsx)("div",{className:"title",children:e.title}),Object(i.jsxs)("div",{className:"info",children:[Object(i.jsxs)("div",{className:"subtitle",children:[Object(i.jsx)("i",{className:"fa fa-map-marker-alt icon"}),e.location]}),Object(i.jsx)("i",{children:e.time})]}),Object(i.jsx)(y.a.div,{style:r,className:"img-container",children:Object(i.jsx)("img",{src:e.image,alt:"",style:{height:"20em"}})})]})}var J=n.p+"static/media/uiuc_logo.fc614b52.webp",z=n.p+"static/media/ut_logo.d077088c.webp",D=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={experiences:[{title:"Undergraduate Summer Research Internship",organization:"University of Illinois Urbana-Champaign (UIUC)",supervisor:"Advisor: Prof. Douglas L. Jones",period:"July 2019 - Sep 2019",logo:J,description:["Developed onset & offset detection algorithms for specific type of audio signals by python.","Built a system to automate the process of trim and labeling audio data."]},{title:"Research Scholarship from Ministry of Science and Technology",organization:"National Chengchi University",supervisor:"Advisor: Prof. Chao-Lin Liu",period:"July 2019 - Feb 2020",logo:p,description:["Developed a named-entity recognition (NER) system for Literary Chinese.","Improve the F1 score by 9% by applying machine learning technique(LSTM-CRF).","Built an optical character recognition (OCR) system for Literary Chinese with machine learning.","Applied self-organizing map & clustering aggregation to increase the speed of labeling data by human by 12x."]},{title:"Undergraduate Research Assistant",organization:"University of Taipei",supervisor:"Advisor: Prof. Cheng-Ying Yang",period:"Sep 2017 - Present",logo:z,description:["Improved the performance of encryption algorithm in IoT devices.","Used greedy algorithm to get secured encryption even with poor computing resources.","Analysised and visualized the performance and published final results to journal."]}],focusBlockIdx:0},i}return Object(o.a)(n,[{key:"onMouseEnter",value:function(e){this.setState({focusBlockIdx:e})}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{id:"exp",className:"section",children:[Object(i.jsx)("h2",{className:"header",children:"Experiences"}),Object(i.jsxs)("div",{className:"content",children:[Object(i.jsx)("div",{className:"title-list",children:Object(i.jsx)(N.a,{forceVisible:"y",autoHide:!1,style:{maxHeight:"100%"},children:this.state.experiences.map((function(t,n){return e.renderExperienceBlock(t,n===e.state.focusBlockIdx,(function(){return e.onMouseEnter(n)}))}))})}),this.renderInfoBlock()]})]})}},{key:"renderExperienceBlock",value:function(e,t,n,a){return Object(i.jsx)(G,{logo:e.logo,title:e.title,focus:t,organization:e.organization,onMouseEnter:n})}},{key:"renderInfoBlock",value:function(){var e=this.state.focusBlockIdx,t=this.state.experiences[e];return Object(i.jsxs)(N.a,{style:{maxHeight:"100%"},className:"info",children:[Object(i.jsx)("div",{className:"period",children:Object(i.jsx)("i",{children:t.period})}),Object(i.jsx)("div",{className:"supervisor",children:t.supervisor}),Object(i.jsx)("ul",{className:"description",children:t.description.map((function(e,t){return Object(i.jsx)("li",{children:e})}))})]})}}]),n}(a.PureComponent);function G(e){return Object(i.jsxs)("div",{className:e.focus?"item focus-light":"item",onMouseEnter:function(){return e.onMouseEnter()},children:[Object(i.jsx)("img",{src:e.logo,alt:"logo"}),Object(i.jsxs)("div",{className:"title",children:[Object(i.jsx)("div",{children:e.title}),Object(i.jsx)("div",{className:"subtitle",children:e.organization})]})]})}var Y=n.p+"static/media/publications.00a12fbd.bib",F=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(r.a)(this,n),(i=t.call(this,e)).state={error:null,isLoaded:!1,publications:[]},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch(Y).then((function(e){return e.text()})).then((function(t){e.setState({isLoaded:!0,publications:e.processingBibtex(t)})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"processingBibtex",value:function(e){for(var t=this.parseBibtex(e),n=0;n<t.length;++n){var i=this.processing_authors(t[n].author);i.length>=2&&(i[i.length-2]=i[i.length-2]+" and "+i[i.length-1],i.pop()),t[n].author=i.join(", "),t[n].pages&&(t[n].pages=t[n].pages.replace("--","-"))}return t}},{key:"parseBibtex",value:function(e){var t=e.replace(/(\w+)\s*=\s*\{/g,'"$1": "').replace(/\}(?=\s*[,\}])/g,'"').replace(/@(\w+)\s*\{([^,]*)/g,',{"$1": "$2"');return t="["+t.substring(1)+"]",JSON.parse(t)}},{key:"processing_authors",value:function(e){var t=[];return e.split("and").forEach((function(e){var n=e.split(",");if(n.length>1){var i=n[1].trim(),a=n[0].trim();n=i+" "+a}"Pin-Yen Huang"===n&&(n="<b>"+n+"</b>"),t.push(n)})),t}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{className:"section",id:"publications",children:[Object(i.jsx)("h2",{className:"header",children:"Publications"}),Object(i.jsx)("div",{className:"content",children:this.state.publications.map((function(t,n){return t.article?e.renderArticleBlock(t,++n):t.inproceedings?e.renderInproceedingsBlock(t,++n):null}))})]})}},{key:"renderInproceedingsBlock",value:function(e,t){return Object(i.jsx)(V,{index:t,title:e.title,author:e.author,booktitle:e.booktitle,pages:e.pages,year:e.year,organization:e.organization,url:e.url})}},{key:"renderArticleBlock",value:function(e,t){return Object(i.jsx)($,{index:t,title:e.title,author:e.author,journal:e.journal,volume:e.volume,pages:e.pages,year:e.year,publisher:e.publisher,url:e.url})}}]),n}(a.PureComponent);function V(e){return Object(i.jsxs)("a",{href:e.url,target:"_blank",rel:"noreferrer",children:["[",e.index,"] ",h()(e.author),', "',e.title,'"',e.booktitle?", ":"",e.booktitle?Object(i.jsx)("i",{children:e.booktitle}):"",e.year?", "+e.year:"",e.volume?", vol. "+e.volume:"",e.number?", no. "+e.number:"",e.pages?", pp. "+e.pages:""]})}function $(e){return Object(i.jsxs)("a",{href:e.url,target:"_blank",rel:"noreferrer",children:["[",e.index,"] ",h()(e.author),', "',e.title,'"',e.journal?", ":"",e.journal?Object(i.jsx)("i",{children:e.journal}):"",e.year?", "+e.year:"",e.volume?", vol. "+e.volume:"",e.number?", no. "+e.number:"",e.pages?", pp. "+e.pages:""]})}function q(){return Object(i.jsxs)("div",{className:"about",children:[Object(i.jsxs)(s.a,{children:[Object(i.jsx)("title",{children:"About - PlusMore"}),Object(i.jsx)("meta",{name:"description",content:"information about me"})]}),Object(i.jsx)(M,{}),Object(i.jsx)(x,{}),Object(i.jsx)(D,{}),Object(i.jsx)(L,{}),Object(i.jsx)(_,{}),Object(i.jsx)(F,{})]})}}}]);
//# sourceMappingURL=18.0d7fd2f8.chunk.js.map