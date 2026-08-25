/* 由可视化编辑实时保存 8/18/2026, 2:30:00 PM */
window.APP_PAGES['home'] = {
  "name": "工作台首页",
  "breadcrumb": "工作台 / 首页",
  "blocks": [
    {
      "type": "alert",
      "style": "info",
      "text": "本页为首页演示版，用于展示框架整体效果；正式首页模块由陈佳玲负责输出。"
    },
    {
      "type": "cards",
      "items": [
        {
          "label": "今日课次",
          "value": "3",
          "unit": "节",
          "note": "2 节已绑定练习",
          "trend": "up"
        },
        {
          "label": "本周新增资源",
          "value": "12",
          "unit": "个",
          "note": "课件 8 / 素材 4",
          "trend": "up"
        },
        {
          "label": "我的学员",
          "value": "36",
          "unit": "人",
          "note": "3 人需关注",
          "trend": "down"
        },
        {
          "label": "待处理作业",
          "value": "5",
          "unit": "份",
          "note": "2 个班级待批改"
        }
      ]
    },
    {
      "type": "tabs",
      "tabs": [
        {
          "name": "今日课表",
          "blocks": [
            {
              "type": "table",
              "index": true,
              "columns": [
                {
                  "label": "时间",
                  "prop": "time",
                  "width": "110px"
                },
                {
                  "label": "课程",
                  "prop": "course",
                  "bold": true
                },
                {
                  "label": "班级",
                  "prop": "cls"
                },
                {
                  "label": "状态",
                  "prop": "status",
                  "tag": true,
                  "tagField": "tag"
                }
              ],
              "data": [
                {
                  "time": "08:00-09:30",
                  "course": "三年级数学 · 分数的初步认识",
                  "cls": "三(2)班",
                  "status": "已完成",
                  "tag": "green"
                },
                {
                  "time": "10:00-11:30",
                  "course": "三年级数学 · 练习讲解",
                  "cls": "三(2)班",
                  "status": "进行中",
                  "tag": "blue"
                },
                {
                  "time": "14:00-15:30",
                  "course": "四年级数学 · 阶段测试",
                  "cls": "四(1)班",
                  "status": "未开始",
                  "tag": "gray"
                }
              ],
              "actions": [
                {
                  "label": "绑定练习",
                  "action": {
                    "kind": "message",
                    "text": "进入课次：绑定练习"
                  }
                },
                {
                  "label": "详情",
                  "action": {
                    "kind": "message",
                    "text": "进入课次详情"
                  }
                }
              ]
            }
          ]
        },
        {
          "name": "快捷入口",
          "blocks": [
            {
              "type": "note",
              "text": "快捷入口支持按角色默认配置，也支持用户自定义（教师/助教/教研/顾问默认入口不同）。"
            },
            {
              "type": "toolbar",
              "buttons": [
                {
                  "label": "我的课表",
                  "primary": true,
                  "action": {
                    "kind": "message",
                    "text": "跳转：我的课表"
                  }
                },
                {
                  "label": "我的班级",
                  "action": {
                    "kind": "message",
                    "text": "跳转：我的班级"
                  }
                },
                {
                  "label": "我的学员",
                  "action": {
                    "kind": "message",
                    "text": "跳转：我的学员"
                  }
                },
                {
                  "label": "备课中心",
                  "action": {
                    "kind": "message",
                    "text": "跳转：备课中心"
                  }
                },
                {
                  "label": "数据中心",
                  "action": {
                    "kind": "message",
                    "text": "跳转：数据中心"
                  }
                }
              ],
              "hint": "点击按钮仅演示交互，实际跳转在正式版中实现"
            }
          ]
        },
        {
          "name": "最近使用",
          "blocks": [
            {
              "type": "table",
              "index": true,
              "columns": [
                {
                  "label": "内容",
                  "prop": "name",
                  "bold": true
                },
                {
                  "label": "类型",
                  "prop": "type",
                  "tag": true,
                  "tagField": "tag"
                },
                {
                  "label": "最近打开",
                  "prop": "time",
                  "width": "130px"
                }
              ],
              "data": [
                {
                  "name": "分数的初步认识课件 V3",
                  "type": "课件",
                  "tag": "blue",
                  "time": "今天 09:40"
                },
                {
                  "name": "三年级下 Unit4 课后练习",
                  "type": "练习",
                  "tag": "green",
                  "time": "昨天 16:20"
                },
                {
                  "name": "阶段测试A卷",
                  "type": "试卷",
                  "tag": "purple",
                  "time": "昨天 11:05"
                }
              ],
              "actions": [
                {
                  "label": "打开",
                  "action": {
                    "kind": "message",
                    "text": "打开资源"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "note",
      "text": "首页暂不放数据看板、学情提醒等复杂内容；数据统一进入数据中心，学情从我的学员/我的班级进入。"
    }
  ]
};
