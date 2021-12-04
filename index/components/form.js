import { createFormComponent } from './zform/zform.js'
import { parseConfigJSON5 } from './zform/utils.js'

const formDef = {
  constants: {},
  parts: [
    {
      type: 'form',
      name: 'form_V033_p',
      serviceTpl: {
        def: {},
        args: {
          src: 'bservice.twig'
        }
      },
      def: {
        type: 'object',
        ui: {
          attrs: [
            [
              'labelPostion',
              'top'
            ],
            [
              'label-position',
              'top'
            ]
          ],
          class: [],
          styles: []
        },
        properties: {
          field__znE17X3L4G: {
            type: 'string',
            INIT_CONFIG: {
              type: 'string'
            },
            ui: {
              widget: 'CusInput',
              label: '多行文本',
              widgetConfig: {
                type: 'textarea'
              }
            },
            server: {
              field_name: 'field__znE17X3L4G'
            }
          },
          field__Q2r0LTemeo: {
            type: 'string',
            ui: {
              widget: 'CusTimePicker',
              label: '日期选择',
              widgetConfig: {
                valueFormat: 'HH:mm:ss'
              }
            },
            sub_type: 'time',
            computedFun: '',
            rules: [],
            server: {
              field_name: 'field__Q2r0LTemeo'
            },
            rules_json: '[]'
          },
          field__TSjNqnDLCQ: {
            type: 'string',
            ui: {
              widget: 'CusTimePicker',
              label: '时间选择',
              widgetConfig: {
                valueFormat: 'HH:mm:ss'
              }
            },
            sub_type: 'time',
            computedFun: '',
            rules: [],
            server: {
              field_name: 'field__TSjNqnDLCQ'
            },
            rules_json: '[]'
          },
          field__KZxgpust9N: {
            type: 'string',
            INIT_CONFIG: {
              type: 'string'
            },
            ui: {
              widget: 'CusRichText',
              label: '',
              hiddenLabel: true,
              widgetConfig: {
                html_content: "{content:[{type:'paragraph',children:[{text:'图文展示'}]}],html:'<div class=\"w-e-content-container\">\\r\\n <p>图文展示</p>\\r\\n</div>'}",
                css_style: ':host {\n background-color: rgba(22, 159, 131, 0.6);\n color: rgba(254, 254, 254, 1);\n}'
              }
            },
            computedFun: '',
            rules: [],
            server: {
              field_name: 'field__KZxgpust9N'
            },
            css: "{cached:{':host':{backgroundColor:'rgba(22, 159, 131, 0.6)',color:'rgba(254, 254, 254, 1)'},':host(:hover) ':{},':host(:active) ':{}},css:':host {\\n background-color: rgba(22, 159, 131, 0.6);\\n color: rgba(254, 254, 254, 1);\\n}'}",
            rules_json: '[]'
          }
        },
        metas: {
          form_data: 'json_54911'
        }
      },
      computed: {}
    }
  ]
}

createFormComponent({
  formDef
})