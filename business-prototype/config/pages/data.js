/* 数据中心（数据看板/出勤明细/退费明细；彭振雷负责） */
window.APP_PAGES['data'] = {
  name: '数据中心',
  breadcrumb: '应用管理 / 数据中心',
  blocks: [
    {
      type: 'alert',
      style: 'info',
      text: '数据中心用于承接业务数据查询和明细导出，不放在首页做复杂展示。核心目标：数据可查、可筛选、可导出，逐步建立清晰数据口径。'
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: '数据看板',
          blocks: [
            {
              type: 'cards',
              items: [
                { label: '带班量', value: '4', unit: '个', note: '较上周 +1', trend: 'up' },
                { label: '带生量', value: '36', unit: '人', note: '较上周 +2', trend: 'up' },
                { label: '班均人数', value: '9', unit: '人', note: '持平' },
                { label: '退班率', value: '2.6', unit: '%', note: '较上周 -0.4%', trend: 'down' },
                { label: '续费率', value: '86', unit: '%', note: '较上周 +1.2%', trend: 'up' },
                { label: '加购率', value: '18', unit: '%', note: '较上周 +0.8%', trend: 'up' }
              ]
            },
            {
              type: 'chart',
              title: '近 6 周续费率趋势',
              bars: [
                { label: 'W1', value: 78 },
                { label: 'W2', value: 81 },
                { label: 'W3', value: 79 },
                { label: 'W4', value: 83, high: true },
                { label: 'W5', value: 84, high: true },
                { label: 'W6', value: 86, high: true }
              ]
            },
            {
              type: 'note',
              text: '指标口径需与大数据、业务侧确认；退班率、续费率、加购率等口径确认后正式上线。'
            }
          ]
        },
        {
          name: '出勤明细',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '导出出勤明细', primary: true, action: { kind: 'export', text: '出勤明细已导出' } }
              ],
              right: '共 128 条记录'
            },
            {
              type: 'filter',
              fields: [
                { label: '学员姓名', key: 'kw', type: 'input', placeholder: '请输入学员姓名' },
                { label: '班级', key: 'cls', type: 'select', options: [{ label: '三(2)班', value: '三(2)班' }, { label: '三(3)班', value: '三(3)班' }, { label: '四(1)班', value: '四(1)班' }] },
                { label: '出勤状态', key: 'status', type: 'select', options: [{ label: '出勤', value: '出勤' }, { label: '请假', value: '请假' }, { label: '缺勤', value: '缺勤' }] }
              ]
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '日期', prop: 'date', width: '110px' },
                { label: '学员', prop: 'name', bold: true, width: '90px' },
                { label: '班级', prop: 'cls', width: '80px' },
                { label: '课次', prop: 'lesson', width: '160px' },
                { label: '出勤状态', prop: 'status', tag: true, tagField: 'tag' }
              ],
              data: [
                { date: '2026-08-17', name: '王小明', cls: '三(2)班', lesson: '第8次课 · 分数比较', status: '出勤', tag: 'green' },
                { date: '2026-08-17', name: '李思雨', cls: '三(2)班', lesson: '第8次课 · 分数比较', status: '出勤', tag: 'green' },
                { date: '2026-08-17', name: '张子轩', cls: '三(3)班', lesson: '第6次课 · 分数应用', status: '请假', tag: 'orange' },
                { date: '2026-08-16', name: '刘浩然', cls: '四(1)班', lesson: '第3次课 · 阶段测试', status: '缺勤', tag: 'red' }
              ]
            }
          ]
        },
        {
          name: '退费明细',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '导出退费明细', primary: true, action: { kind: 'export', text: '退费明细已导出' } }
              ],
              right: '共 6 条记录'
            },
            {
              type: 'filter',
              fields: [
                { label: '学员姓名', key: 'kw', type: 'input', placeholder: '请输入学员姓名' },
                { label: '退费原因', key: 'reason', type: 'select', options: [{ label: '课程不合适', value: '课程不合适' }, { label: '时间冲突', value: '时间冲突' }, { label: '教学不满意', value: '教学不满意' }, { label: '其他', value: '其他' }] }
              ]
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '学员', prop: 'name', bold: true, width: '100px' },
                { label: '班级', prop: 'cls', width: '80px' },
                { label: '退班时间', prop: 'date', width: '110px' },
                { label: '离开课次', prop: 'lesson', width: '150px' },
                { label: '退费金额', prop: 'amount', width: '100px' },
                { label: '退费原因', prop: 'reason', width: '110px' }
              ],
              data: [
                { name: '赵一凡', cls: '三(2)班', date: '2026-08-12', lesson: '第5次课', amount: '¥3,200', reason: '时间冲突' },
                { name: '孙悦', cls: '四(1)班', date: '2026-08-08', lesson: '第2次课', amount: '¥4,500', reason: '课程不合适' },
                { name: '周子墨', cls: '三(3)班', date: '2026-08-01', lesson: '第3次课', amount: '¥2,800', reason: '教学不满意' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
