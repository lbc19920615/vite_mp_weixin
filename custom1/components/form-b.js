
    import { createFormComponent } from '../zform/zform.js'

    const formDef = {type:'form',name:'form_V033_p',serviceTpl:{def:{},args:{src:'bservice.twig'}},def:{type:'object',ui:{attrs:[['labelPostion','top'],['label-position','top']],class:[],styleSheets:[[':host',{backgroundColor:'rgba(163, 52, 52, 1)'}]]},properties:{field__znE17X3L4G:{type:'string',INIT_CONFIG:{type:'string'},ui:{widget:'CusInput',label:'多行文本',widgetConfig:{type:'textarea'},desc:'这是一段描述'},computedFun:'',rules:[],server:{field_name:'field__znE17X3L4G'},rules_json:'[]'},field__rCN7FDLAj3:{type:'string',ui:{widget:'CusDateTimePicker',label:'时间日期选择',widgetConfig:{type:'datetime',valueFormat:'YYYY-MM-DD HH:mm:ss'}},sub_type:'datetime',computedFun:'',rules:[{required:true}],server:{field_name:'field__rCN7FDLAj3'},rules_json:'[{required:true}]'},field__TSjNqnDLCQ:{type:'string',ui:{widget:'CusTimePicker',label:'时间选择',widgetConfig:{valueFormat:'HH:mm:ss'}},sub_type:'time',computedFun:'',rules:[],server:{field_name:'field__TSjNqnDLCQ'},rules_json:'[]'},field__dD5oS9xNi7:{type:'number',ui:{widget:'CusSlider',label:'滑块',widgetConfig:{}},computedFun:'',rules:[],server:{field_name:'field__dD5oS9xNi7'},rules_json:'[]'},field__rKrKlUFzvu:{type:'number',ui:{label:'打分',widget:'CusRate',widgetConfig:{}},server:{field_name:'field__rKrKlUFzvu'}},field__KZxgpust9N:{type:'string',INIT_CONFIG:{type:'string'},ui:{widget:'CusRichText',label:'',hiddenLabel:true,widgetConfig:{html_content:"{content:[{type:'paragraph',children:[{text:'图文展示2021'}]}],html:'<p class=\"w-e-p\">图文展示2021</p>'}",css_style:':host {\n background-color: rgba(22, 159, 131, 0.6);\n color: rgba(254, 254, 254, 1);\n}'}},computedFun:'',rules:[],server:{field_name:'field__KZxgpust9N'},css:"{cached:{':host':{backgroundColor:'rgba(22, 159, 131, 0.6)',color:'rgba(254, 254, 254, 1)'},':host(:hover) ':{},':host(:active) ':{},'.w-e-content-container':{}},css:':host {\\n background-color: rgba(22, 159, 131, 0.6);\\n color: rgba(254, 254, 254, 1);\\n}'}",rules_json:'[]'}},metas:{form_data:'json_54911'}},computed:{}}

    ;createFormComponent({
        formDef,
        onCreated() {
         
        }
    });
