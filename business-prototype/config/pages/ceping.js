window.APP_PAGES['ceping'] = {
  name: '测评中心',
  breadcrumb: '教学内容 / 测评中心',
  blocks: [
    {
      type: 'tabs',
      tabs: [
        {
          name: '集团测评',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '新建集团测评', primary: true, action: { kind: 'dialog', dialog: { title: '新建集团测评', fields: [
                  { label: '测评名称', key: 'name', type: 'input', placeholder: '如：三年级数学第3单元测评' },
                  { label: '选择试卷', key: 'paper', type: 'select', options: ['三年级数学 · 单元测评A卷', '三年级数学 · 单元测评B卷', '期中综合卷'] },
                  { label: '适用范围', key: 'scope', type: 'select', options: ['全部分校', '华东区域', '指定分校'] }
                ] } } },
                { label: '导出列表', action: { kind: 'export', text: '集团测评列表已导出' } }
              ],
              right: '共 4 个集团测评'
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '测评名称', prop: 'name', bold: true },
                { label: '关联试卷', prop: 'paper', width: '210px' },
                { label: '适用范围', prop: 'scope', width: '130px' },
                { label: '参与人数', prop: 'participants', width: '90px' },
                { label: '创建时间', prop: 'time', width: '150px' },
                { label: '状态', prop: 'status', tag: true, tagField: 'tag', width: '90px' }
              ],
              data: [
                { name: '三年级数学第3单元集团测评', paper: '单元测评A卷', scope: '全部分校', participants: '1,286', time: '2026-08-29 09:30', status: '进行中', tag: 'blue' },
                { name: '四年级英语秋季入学测评', paper: '秋季入学卷', scope: '华东区域', participants: '864', time: '2026-08-26 14:12', status: '已发布', tag: 'green' },
                { name: '三年级语文阅读能力测评', paper: '阅读能力卷', scope: '全部分校', participants: '1,542', time: '2026-08-22 10:05', status: '已结束', tag: 'gray' },
                { name: '五年级数学期中模拟测评', paper: '期中模拟卷', scope: '指定分校', participants: '0', time: '2026-08-20 16:48', status: '草稿', tag: 'gray' }
              ],
              actions: [
                { label: '查看', action: { kind: 'message', text: '查看集团测评详情' } },
                { label: '配置', action: { kind: 'message', text: '编辑集团测评配置' } },
                { label: '结果', action: { kind: 'message', text: '查看集团测评结果' } }
              ]
            }
          ]
        },
        {
          name: '校本测评',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '新建校本测评', primary: true, action: { kind: 'dialog', dialog: { title: '新建校本测评', fields: [
                  { label: '测评名称', key: 'name', type: 'input', placeholder: '请输入校本测评名称' },
                  { label: '选择试卷', key: 'paper', type: 'select', options: ['上海分校三年级语文测评卷', '上海分校四年级数学测评卷'] },
                  { label: '参与班级', key: 'cls', type: 'select', options: ['三(2)班', '三(3)班', '四(1)班'] }
                ] } } },
                { label: '导出列表', action: { kind: 'export', text: '校本测评列表已导出' } }
              ],
              right: '共 3 个校本测评'
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '测评名称', prop: 'name', bold: true },
                { label: '关联试卷', prop: 'paper', width: '210px' },
                { label: '参与班级', prop: 'cls', width: '120px' },
                { label: '作答进度', prop: 'progress', width: '100px' },
                { label: '创建时间', prop: 'time', width: '150px' },
                { label: '状态', prop: 'status', tag: true, tagField: 'tag', width: '90px' }
              ],
              data: [
                { name: '上海分校三年级语文周测', paper: '三年级语文周测卷', cls: '三(2)班', progress: '28/32', time: '2026-08-30 13:20', status: '进行中', tag: 'blue' },
                { name: '上海分校四年级数学单元测评', paper: '四年级数学单元卷', cls: '四(1)班', progress: '30/30', time: '2026-08-27 10:16', status: '已结束', tag: 'gray' },
                { name: '秋季班英语入班测评', paper: '英语入班测评卷', cls: '三(3)班', progress: '0/26', time: '2026-08-25 18:05', status: '未开始', tag: 'green' }
              ],
              actions: [
                { label: '查看', action: { kind: 'message', text: '查看校本测评详情' } },
                { label: '配置', action: { kind: 'message', text: '编辑校本测评配置' } },
                { label: '结果', action: { kind: 'message', text: '查看校本测评结果' } }
              ]
            }
          ]
        },
        {
          name: '测评绑定',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '新建绑定', primary: true, action: { kind: 'message', text: '新建测评绑定' } }
              ],
              right: '共 3 条绑定关系'
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '测评名称', prop: 'name', bold: true },
                { label: '绑定对象', prop: 'target', width: '210px' },
                { label: '内容范围', prop: 'scope', width: '110px' },
                { label: '生效时间', prop: 'time', width: '190px' },
                { label: '状态', prop: 'status', tag: true, tagField: 'tag', width: '90px' }
              ],
              data: [
                { name: '三年级数学第3单元集团测评', target: 'S3数学秋季课程产品', scope: '集团', time: '2026-09-01 ~ 2026-09-30', status: '已生效', tag: 'green' },
                { name: '上海分校三年级语文周测', target: '三年级（2）班', scope: '校本', time: '2026-08-30 ~ 2026-09-06', status: '已生效', tag: 'green' },
                { name: '秋季班英语入班测评', target: '三年级（3）班', scope: '校本', time: '2026-09-02 ~ 2026-09-05', status: '待生效', tag: 'blue' }
              ],
              actions: [
                { label: '查看', action: { kind: 'message', text: '查看绑定详情' } },
                { label: '调整', action: { kind: 'message', text: '调整测评绑定' } }
              ]
            }
          ]
        },
        {
          name: '成绩管理',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '导出成绩', primary: true, action: { kind: 'export', text: '测评成绩已导出' } }
              ],
              right: '最近更新 2026-08-31 10:20'
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '测评名称', prop: 'name', bold: true },
                { label: '范围', prop: 'scope', width: '100px' },
                { label: '应作答', prop: 'expected', width: '90px' },
                { label: '已作答', prop: 'answered', width: '90px' },
                { label: '平均分', prop: 'average', width: '90px' },
                { label: '完成时间', prop: 'time', width: '150px' }
              ],
              data: [
                { name: '三年级语文阅读能力测评', scope: '集团', expected: '1,542', answered: '1,506', average: '86.4', time: '2026-08-29 18:00' },
                { name: '上海分校四年级数学单元测评', scope: '校本', expected: '30', answered: '30', average: '89.7', time: '2026-08-28 20:30' },
                { name: '四年级英语秋季入学测评', scope: '集团', expected: '864', answered: '812', average: '82.1', time: '2026-08-27 17:45' }
              ],
              actions: [
                { label: '查看成绩', action: { kind: 'message', text: '查看测评成绩明细' } },
                { label: '结果分析', action: { kind: 'message', text: '进入测评结果分析' } }
              ]
            }
          ]
        }
      ]
    }
  ]
};
