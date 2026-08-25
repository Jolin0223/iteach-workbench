/* 我的班级 - 按我的学员页面风格重构（专属视图组件 banji-view） */

/* 由可视化编辑实时保存 8/21/2026, 10:20:49 AM */
window.APP_PAGES['banji'] = {
  "name": "我的班级",
  "breadcrumb": "教学服务 / 我的班级",
  "blocks": [
    {
      "type": "banji",
      "flatActions": true,
      "statusTags": [
        {
          "label": "行课中",
          "count": 2
        },
        {
          "label": "未开始",
          "count": 0
        },
        {
          "label": "已结束",
          "count": 13
        }
      ],
      "filters": [
        {
          "label": "财年",
          "key": "year",
          "type": "select",
          "value": "2027",
          "options": [
            {
              "label": "2027",
              "value": "2027"
            },
            {
              "label": "2026",
              "value": "2026"
            }
          ]
        },
        {
          "label": "季度",
          "key": "quarter",
          "type": "select",
          "placeholder": "请选择",
          "options": [
            {
              "label": "第一季度",
              "value": "Q1"
            },
            {
              "label": "第二季度",
              "value": "Q2"
            },
            {
              "label": "第三季度",
              "value": "Q3"
            },
            {
              "label": "第四季度",
              "value": "Q4"
            }
          ]
        },
        {
          "label": "班级编码",
          "key": "classCode",
          "type": "input",
          "placeholder": "请录入"
        },
        {
          "label": "班级名称",
          "key": "className",
          "type": "input",
          "placeholder": "请录入"
        },
        {
          "label": "开课时间",
          "key": "dateRange",
          "type": "daterange",
          "placeholder": "开始时间 – 结束时间"
        }
      ],
      "columns": [
        {
          "label": "班级编码",
          "prop": "code"
        },
        {
          "label": "班级名称",
          "prop": "name"
        },
        {
          "label": "课次进度",
          "prop": "progress"
        },
        {
          "label": "在班学员",
          "prop": "students"
        },
        {
          "label": "续班人数",
          "prop": "renewCount"
        },
        {
          "label": "续班率",
          "prop": "renewRate"
        },
        {
          "label": "加好友数",
          "prop": "friendCount",
          "hl": true
        },
        {
          "label": "加好友率",
          "prop": "friendRate",
          "hl": true
        },
        {
          "label": "进群人数",
          "prop": "groupCount",
          "hl": true
        },
        {
          "label": "进群率",
          "prop": "groupRate",
          "hl": true
        },
        {
          "label": "开课时间",
          "prop": "start"
        },
        {
          "label": "结课时间",
          "prop": "end"
        },
        {
          "label": "主讲老师",
          "prop": "teacher"
        },
        {
          "label": "上课地点",
          "prop": "place"
        },
        {
          "label": "年级",
          "prop": "grade"
        },
        {
          "label": "科目",
          "prop": "subject"
        },
        {
          "label": "学校",
          "prop": "school"
        },
        {
          "label": "产品体系",
          "prop": "system"
        }
      ],
      "data": [
        {
          "code": "NL4BC250601",
          "name": "脑力思维春季（L4-B）",
          "start": "2025-07-14",
          "end": "2026-07-22",
          "teacher": "彭振雷",
          "progress": "6/16",
          "students": 18,
          "renewCount": 12,
          "renewRate": "66.7%",
          "friendCount": 16,
          "friendRate": "88.9%",
          "groupCount": 15,
          "groupRate": "83.3%",
          "place": "南坪百联上海城校区",
          "grade": "四年级",
          "subject": "脑力与思维",
          "school": "重庆学校",
          "system": "常规体系"
        },
        {
          "code": "NL4AC250602",
          "name": "脑力思维春季（L4-A）",
          "start": "2025-07-14",
          "end": "2026-07-22",
          "teacher": "彭振雷",
          "progress": "6/16",
          "students": 20,
          "renewCount": 15,
          "renewRate": "75%",
          "friendCount": 18,
          "friendRate": "90%",
          "groupCount": 17,
          "groupRate": "85%",
          "place": "南坪百联上海城校区",
          "grade": "四年级",
          "subject": "脑力与思维",
          "school": "重庆学校",
          "system": "常规体系"
        }
      ],
      "actions": [
        {
          "label": "班级详情",
          "action": {
            "kind": "page",
            "page": "banjidetail"
          }
        },
        {
          "label": "绑定练习",
          "action": {
            "kind": "page",
            "page": "bangding"
          }
        },
        {
          "label": "练习详情",
          "action": {
            "kind": "page",
            "page": "lianxidetail"
          }
        },
        {
          "label": "学情报告",
          "action": {
            "kind": "page",
            "page": "xueqing"
          }
        },
        {
          "label": "打印错题",
          "action": {
            "kind": "page",
            "page": "xueqing"
          }
        },
        {
          "label": "出勤记录",
          "action": {
            "kind": "page",
            "page": "chuqin"
          }
        }
      ],
      "pagination": {
        "page": 1,
        "totalPages": 7,
        "total": 4
      }
    }
  ]
};
