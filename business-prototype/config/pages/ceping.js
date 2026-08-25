/* 测评中心（原能力测评，增加阶段测试；能力测评/成绩管理为韩荣荣负责） */
window.APP_PAGES['ceping'] = {
  name: '测评中心',
  breadcrumb: '教学内容 / 测评中心',
  blocks: [
    {
      type: 'tabs',
      tabs: [
        {
          name: '阶段测试',
          blocks: [
            {
              type: 'alert',
              style: 'info',
              text: '阶段测试（新增，彭振雷负责）：将教师端现有阶段测试功能放置到PC端工作台，支持选择试卷、配置测试、查看作答进度和分析测试结果。'
            },
            {
              type: 'toolbar',
              buttons: [
                { label: '新建阶段测试', primary: true, action: { kind: 'dialog', dialog: { title: '新建阶段测试', fields: [
                  { label: '测试名称', key: 'name', type: 'input', placeholder: '如：三年级数学第3单元阶段测试' },
                  { label: '选择试卷', key: 'paper', type: 'select', options: ['三年级数学 · 阶段测试A卷', '三年级数学 · 阶段测试B卷', '期中模拟卷'] },
                  { label: '参与班级', key: 'cls', type: 'select', options: ['三(2)班', '三(3)班', '四(1)班'] },
                  { label: '开始时间', key: 'start', type: 'date' },
                  { label: '结束时间', key: 'end', type: 'date' }
                ] } } },
                { label: '导出成绩', action: { kind: 'export', text: '阶段测试成绩已导出' } }
              ],
              right: '共 4 个阶段测试'
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '测试名称', prop: 'name', bold: true },
                { label: '关联试卷', prop: 'paper', width: '200px' },
                { label: '参与班级', prop: 'cls', width: '100px' },
                { label: '作答进度', prop: 'progress', width: '90px' },
                { label: '时间', prop: 'time', width: '200px' },
                { label: '状态', prop: 'status', tag: true, tagField: 'tag' }
              ],
              data: [
                { name: '三年级数学第3单元阶段测试', paper: '阶段测试A卷', cls: '三(2)班', progress: '28/36', time: '08-17 09:00 ~ 08-17 11:00', status: '进行中', tag: 'blue' },
                { name: '三年级数学期中阶段测试', paper: '期中模拟卷', cls: '三(2)班', progress: '36/36', time: '08-10 09:00 ~ 08-10 11:00', status: '已完成', tag: 'green' },
                { name: '四年级英语阶段测试', paper: '期中模拟卷', cls: '四(1)班', progress: '30/30', time: '08-08 14:00 ~ 08-08 16:00', status: '已完成', tag: 'green' },
                { name: '三年级数学第2单元阶段测试', paper: '阶段测试B卷', cls: '三(3)班', progress: '0/32', time: '08-20 09:00 ~ 08-20 11:00', status: '未开始', tag: 'gray' }
              ],
              actions: [
                { label: '配置', action: { kind: 'message', text: '编辑测试配置' } },
                { label: '查看作答', action: { kind: 'message', text: '查看作答进度' } },
                { label: '分析结果', action: { kind: 'message', text: '进入结果分析' } }
              ]
            }
          ]
        },
        {
          name: '能力测评',
          blocks: [
            {
              type: 'placeholder',
              icon: 'gauge',
              title: '能力测评 · 原型待补充',
              desc: '复用现有能力测评，支持二维码开放参加和结果查看',
              owner: '韩荣荣'
            }
          ]
        },
        {
          name: '成绩管理',
          blocks: [
            {
              type: 'placeholder',
              icon: 'chart',
              title: '成绩管理 · 原型待补充',
              desc: '集中查看阶段测试和能力测评成绩，支持进入班级及学员结果',
              owner: '韩荣荣'
            }
          ]
        }
      ]
    }
  ]
};
