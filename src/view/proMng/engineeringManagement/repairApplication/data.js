import { getDIC, getDicT,  getXDicT, postDicT } from "@/config";
let userDicData = getDicT("ucmlUser", "employeename", "ucmlUseroid");
let userNameDicData = getDicT("ucmlUser", "employeename", "employeename");

export const commonCrudOp = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  page: true,
  labelWidth: 130,
}

export function repairOrderFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "报修编号",
        prop: "taskCode",
        span: 6,
      },
      {
        label: "报修部门",
        prop: "servicedOrg",
        span: 6,
        type: "select",
        filterable: true,
        remote: true,
        props: {
          label: 'orgname',
          value: 'orgname'
        },
        dicUrl: process.env.API_HOST + '/api/ucmlOrganize?orgname=%25' + '{{key}}'
      },
      {
        label: "报修类型",
        prop: "repairType",
        span: 6,
        type: "select",
        dicData: getDIC("eng_repairType")
      },
      {
        label: "审批状态",
        prop: "auditDesc",
        width: 90,
        span: 6,
        type: "select",
        dicData: getDIC("act_audit_desc")
      },
      // {
      //   label: "报修时间",
      //   prop: "repairingTime",
      //   span: 6,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss"
      // },
      {
        label: "申请人",
        prop: "founder",
        span: 6,
        allowCreate: true,
        filterable: true,
        defaultFirstOption: true,
        type: "select",
        dicData: userDicData
      },
      {
        label: "维修人员",
        prop: "serviceStaff",
        width: 120,
        span: 6,
        type: "select",
        filterable: true,
        allowCreate: true,
        overHidden: true,
        defaultFirstOption: true,
        dicData: userDicData
      },
      {
        label: "维修地点",
        prop: "repairLocal",
        width: 120,
        span: 6,
      },
      {
        label: "报修内容",
        prop: "repairContent",
        width: 120,
        span: 6,
      },
    ]
  };

}


export function repairOrderCrudOp(_this) {
  return {
    ...commonCrudOp,
    height: "calc(100vh - 290px)",
    index: true,
    column: [
      {
        label: "审批状态",
        prop: "auditDesc",
        placeholder: " ",
        width: 90,
        fixed: true,
        display: false,
        type: "select",
        dicData: getDIC("act_audit_desc")
      },{
        label: "报修编号",
        prop: "taskCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        fixed: true,
        readonly: true,
        rules: [{
          required: true,
          message: "请输入指令编号",
          trigger: "blur"
        }],
        sortable: true,
        disabled: true
      },
      {
        label: "报修部门",
        prop: "servicedOrg",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        rules: [{
          required: true,
          message: "报修部门",
          trigger: "blur"
        }],
        type: "select",
        filterable: true,
        remote: true,
        props: {
          label: 'orgname',
          value: 'orgname'
        },
        dicUrl: process.env.API_HOST + '/api/ucmlOrganize?orgname=%25' + '{{key}}'
      },

      {
        label: "报修时间",
        prop: "repairingTime",
        width: 160,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        sortable: true,
        rules: [{
          required: true,
          message: "报修时间",
          trigger: "blur"
        }]
      },
      {
        label: "报修类型",
        prop: "repairType",
        width: 180,
        span: 6,
        type: "select",
        type: "select",
        overHidden: true,
        formatter(r,v){
          return v+''
        },
        dicData: getDIC("eng_repairType"),
        rules: [{
          required: true,
          message: "报修类型",
          trigger: "blur"
        }]
      },
      {
        label: "申请人",
        prop: "founder",
        width: 110,
        span: 6,
        display: false,
        type: "select",
        filterable: true,
        allowCreate: true,
        overHidden: true,
        defaultFirstOption: true,
        dicData: userDicData,
        rules: [{
          required: true,
          message: "申请人",
          trigger: "blur"
        }]
      },
      {
        label: "维修地点",
        prop: "repairLocal",
        width: 120,
        span: 6,
        overHidden: true,
        rules: [{
          required: true,
          message: "维修地点",
          trigger: "blur"
        }]
      },
      {
        label: "维修人员",
        prop: "serviceStaff",
        width: 120,
        span: 6,
        type: "select",
        filterable: true,
        allowCreate: true,
        overHidden: true,
        defaultFirstOption: true,
        dicData: userNameDicData
      },
      
      {
        label: "审核人",
        prop: "auditor",
        width: 110,
        span: 6,
        filterable: true,
        allowCreate: true,
        overHidden: true,
        defaultFirstOption: true,
        type: "select",
        dicData: userDicData,
        disabled: true,
        placeholder: " ",
      },
      {
        label: "批准人",
        prop: "approve",
        filterable: true,
        allowCreate: true,
        placeholder: " ",
        overHidden: true,
        defaultFirstOption: true,
        width: 110,
        span: 6,
        type: "select",
        dicData: userDicData,
        disabled: true
      },
      {
        label: "报修内容",
        prop: "repairContent",
        width: 180,
        span: 12,
        type: "textarea",
        overHidden: true,
        minRows:4,
        rules: [{
          required: true,
          message: "报修内容",
          trigger: "blur"
        }]
      },
      {
        label: "损坏说明",
        prop: "damageDesc",
        minRows:4,
        type: "textarea",
        width: 180,
        span: 12,
        overHidden: true,
      },
      {
        label: "责任认定",
        prop: "accidentJudge",
        width: 180,
        span: 12,
        type: "textarea",
        overHidden: true,
        minRows:4,
      },
      
      {
        label: "维修部门意见",
        prop: "serviceIdea",
        overHidden: true,
        width: 180,
        span: 12,
        minRows:4,
        type: "textarea",
      },
      {
        label: "完成时间",
        prop: "completedTime",
        width: 160,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        sortable: true,
      },
    ]
  };
}
