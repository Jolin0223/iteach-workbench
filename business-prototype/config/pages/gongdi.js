/* 功底考（将原来分散的功底考能力统一收口，保持现状即可） */
window.APP_PAGES['gongdi'] = {
  name: '功底考',
  breadcrumb: '师训专区 / 功底考',
  blocks: [
    {
      type: 'alert',
      style: 'warning',
      text: '功底考保持现状即可（彭振雷负责）：将原来分散的功底考能力统一收口，支持教师练习、考试和结果查询。'
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: '功底考练习',
          blocks: [
            {
              type: 'table',
              index: true,
              columns: [
                { label: '练习名称', prop: 'name', bold: true },
                { label: '学科', prop: 'subject', width: '70px' },
                { label: '题型', prop: 'type', width: '120px' },
                { label: '题量', prop: 'count', width: '70px' },
                { label: '难度', prop: 'level', tag: true, tagField: 'tag' },
                { label: '更新时间', prop: 'time', width: '130px' }
              ],
              data: [
                { name: '小学数学功底考练习（一）', subject: '数学', type: '选择题+解答题', count: '20题', level: '中等', tag: 'blue', time: '2026-08-15' },
                { name: '小学数学功底考练习（二）', subject: '数学', type: '选择题', count: '30题', level: '基础', tag: 'green', time: '2026-08-10' }
              ],
              actions: [
                { label: '开始练习', action: { kind: 'message', text: '开始功底考练习（原型演示）' } },
                { label: '查看结果', action: { kind: 'message', text: '查看练习结果' } }
              ]
            }
          ]
        },
        {
          name: '功底考配置',
          blocks: [
            {
              type: 'placeholder',
              icon: 'settings',
              title: '功底考配置 · 原型待补充',
              desc: '配置考试时间、参与范围、试卷等（保持现状）',
              owner: '彭振雷'
            }
          ]
        },
        {
          name: '功底考考试',
          blocks: [
            {
              type: 'table',
              index: true,
              columns: [
                { label: '考试名称', prop: 'name', bold: true },
                { label: '考试时间', prop: 'time', width: '200px' },
                { label: '状态', prop: 'status', tag: true, tagField: 'tag' },
                { label: '我的成绩', prop: 'score', width: '100px' }
              ],
              data: [
                { name: '2026年秋季功底考', time: '2026-08-20 09:00 ~ 11:00', status: '未开始', tag: 'gray', score: '—' },
                { name: '2026年春季功底考', time: '2026-04-15 09:00 ~ 11:00', status: '已完成', tag: 'green', score: '92分' }
              ],
              actions: [
                { label: '参加考试', action: { kind: 'message', text: '参加功底考（原型演示）' } },
                { label: '成绩详情', action: { kind: 'message', text: '查看成绩详情' } }
              ]
            }
          ]
        }
      ]
    }
  ]
};
