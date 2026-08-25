/* 班级详情 - 参考我的班级/绑定练习风格（专属视图组件 banjidetail-view），二级页面（入口=我的班级） */

/* 由可视化编辑实时保存 8/21/2026, 12:45:01 AM */
window.APP_PAGES['banjidetail'] = {
  "name": "班级详情",
  "breadcrumb": "",
  "blocks": [
    {
      "type": "banjidetail",
      "flatActions": true,
      "title": "脑力思维春季（L4-B）",
      "tags": [
        "NL4BC250601",
        "16次",
        "春季",
        "彭振雷",
        "南坪百联上海城校区",
        "2025-07-14 ~ 2026-07-22"
      ],
      "tabs": [
        "课次列表",
        "学员列表",
        "续班明细"
      ],
      "columns": [
        {
          "label": "课次号",
          "prop": "no"
        },
        {
          "label": "上课日期",
          "prop": "date"
        },
        {
          "label": "上课时间",
          "prop": "time"
        },
        {
          "label": "主讲老师",
          "prop": "teacher"
        },
        {
          "label": "课次状态",
          "prop": "status"
        },
        {
          "label": "出勤学员",
          "prop": "attend"
        },
        {
          "label": "上课方式",
          "prop": "mode"
        },
        {
          "label": "教室",
          "prop": "room"
        }
      ],
      "data": [
        {
          "no": 1,
          "date": "2025-03-01",
          "time": "13:50~15:50",
          "teacher": "彭振雷",
          "status": "已结束",
          "attend": "20/20",
          "mode": "面授课",
          "room": "南坪上海城四楼少儿493教室（脑力）"
        },
        {
          "no": 2,
          "date": "2025-03-08",
          "time": "13:50~15:50",
          "teacher": "彭振雷",
          "status": "已结束",
          "attend": "20/20",
          "mode": "面授课",
          "room": "南坪上海城四楼少儿493教室（脑力）"
        },
        {
          "no": 3,
          "date": "2025-03-15",
          "time": "13:50~15:50",
          "teacher": "彭振雷",
          "status": "已结束",
          "attend": "20/20",
          "mode": "面授课",
          "room": "南坪上海城四楼少儿493教室（脑力）"
        },
        {
          "no": 4,
          "date": "2025-03-22",
          "time": "13:50~15:50",
          "teacher": "彭振雷",
          "status": "已结束",
          "attend": "20/20",
          "mode": "面授课",
          "room": "南坪上海城四楼少儿493教室（脑力）"
        },
        {
          "no": 5,
          "date": "2025-03-29",
          "time": "13:50~15:50",
          "teacher": "彭振雷",
          "status": "已结束",
          "attend": "20/20",
          "mode": "面授课",
          "room": "南坪上海城四楼少儿493教室（脑力）"
        }
      ],
      "actions": [
        {
          "label": "绑定练习",
          "page": "bangding"
        },
        {
          "label": "练习详情",
          "page": "lianxidetail"
        },
        {
          "label": "学情报告",
          "page": "xueqing"
        },
        {
          "label": "打印错题",
          "page": "xueqing"
        },
        {
          "label": "出勤记录",
          "page": "chuqin"
        }
      ],
      "stuFilters": [
        {
          "label": "学员姓名",
          "key": "name",
          "type": "input",
          "placeholder": "请输入"
        },
        {
          "label": "在班状态",
          "key": "status",
          "type": "select",
          "options": [
            "在班",
            "离班"
          ]
        },
        {
          "label": "是否续班",
          "key": "renew",
          "type": "select",
          "options": [
            "是",
            "否"
          ]
        }
      ],
      "stuColumns": [
        {
          "label": "学员号",
          "prop": "no"
        },
        {
          "label": "学员姓名",
          "prop": "name"
        },
        {
          "label": "出勤/行课",
          "prop": "attend"
        },
        {
          "label": "在班状态",
          "prop": "status"
        },
        {
          "label": "入班时间",
          "prop": "joinTime"
        },
        {
          "label": "是否续班",
          "prop": "renew"
        },
        {
          "label": "是否加好友",
          "prop": "friend"
        }
      ],
      "stuData": [
        {
          "no": "TESSBM37990250076",
          "name": "彭振雷1",
          "attend": "6/6",
          "status": "在班",
          "joinTime": "2025-01-07 18:07",
          "renew": "否",
          "friend": "否"
        },
        {
          "no": "TESSBM37990250076",
          "name": "张三",
          "attend": "6/6",
          "status": "在班",
          "joinTime": "2025-01-07 18:07",
          "renew": "否",
          "friend": "否"
        },
        {
          "no": "TESSBM37990250076",
          "name": "李四",
          "attend": "6/6",
          "status": "在班",
          "joinTime": "2025-01-07 18:07",
          "renew": "否",
          "friend": "否"
        },
        {
          "no": "TESSBM37990250076",
          "name": "高聃",
          "attend": "6/6",
          "status": "离班",
          "joinTime": "2025-01-07 18:07",
          "renew": "否",
          "friend": "否"
        }
      ],
      "stuActions": [
        {
          "label": "学员档案"
        },
        {
          "label": "加好友"
        }
      ],
      "renColumns": [
        {
          "label": "学员号",
          "prop": "no"
        },
        {
          "label": "学员姓名",
          "prop": "name"
        },
        {
          "label": "在班状态",
          "prop": "status"
        },
        {
          "label": "是否加购",
          "prop": "addon"
        },
        {
          "label": "加购续班班级编码",
          "prop": "addonCode"
        },
        {
          "label": "是否续班",
          "prop": "renew"
        },
        {
          "label": "续班班级编码",
          "prop": "renCode"
        },
        {
          "label": "续班时间",
          "prop": "renTime"
        }
      ],
      "renData": [
        {
          "no": "TESSBM37990250076",
          "name": "彭振雷1",
          "status": "在班",
          "addon": "",
          "addonCode": "",
          "renew": "否",
          "renCode": "",
          "renTime": "2025-01-07 18:07"
        },
        {
          "no": "TESSBM37990250076",
          "name": "张三",
          "status": "在班",
          "addon": "",
          "addonCode": "",
          "renew": "否",
          "renCode": "",
          "renTime": "2025-01-07 18:07"
        },
        {
          "no": "TESSBM37990250076",
          "name": "李四",
          "status": "在班",
          "addon": "",
          "addonCode": "",
          "renew": "否",
          "renCode": "",
          "renTime": "2025-01-07 18:07"
        },
        {
          "no": "TESSBM37990250076",
          "name": "高聃",
          "status": "离班",
          "addon": "",
          "addonCode": "",
          "renew": "否",
          "renCode": "",
          "renTime": "2025-01-07 18:07"
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
