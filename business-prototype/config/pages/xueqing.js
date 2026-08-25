/* 学情报告 - 按线上标准功能还原图片（专属视图组件 xueqing-view）
 * 二级页面：面包屑路径由入口动态决定（我的课表 / 我的班级 / 班级详情 进入展示不同路径）
 * 入口：我的课表、我的班级、班级详情>课次列表 中的「学情报告」「打印错题」按钮 */
window.APP_PAGES['xueqing'] = {
  name: '学情报告',
  blocks: [
    {
      type: 'xueqing',
      classInfo: {
        title: '双语故事表演',
        school: 'TEST虚拟学校报名3',
        className: 'IHCPPP/S3双语故事表演秋季S3班'
      },
      lectures: [
        { no: 1, type: '正课' },
        { no: 2, type: '正课' },
        { no: 3, type: '正课' },
        { no: 4, type: '正课' },
        { no: 5, type: '正课' },
        { no: 6, type: '正课' },
        { no: 7, type: '正课' },
        { no: 8, type: '正课' },
        { no: 9, type: '正课' },
        { no: 10, type: '正课' }
      ],
      batchActions: ['批量发送报告', '批量打印错题', '班级课后反馈'],
      updateTime: '2026-07-28 18:14:32',
      /* 学员信息分组下的子列；required = 必填列（橙色顶边 + 浅红底 + 红星） */
      columns: [
        { label: '学员编码', prop: 'code' },
        { label: '学员分层', prop: 'level', required: true, kind: 'select' },
        { label: '新老生标签', prop: 'tag' },
        { label: '性格特点', prop: 'character', required: true, kind: 'select' },
        { label: '学习负责人', prop: 'owner', required: true, kind: 'select' },
        { label: '校内成绩(最近1次)', prop: 'score', kind: 'input', placeholder: '请输入成绩' },
        { label: '家长期待', prop: 'expect', required: true, kind: 'select' },
        { label: '是否入班群', prop: 'inGroup' }
      ],
      rows: [
        { name: '小珍', code: 'TESSBM5402 996069', tag: '新生', inGroup: false },
        { name: '课件测试...', code: 'TESSBM4277 374127', tag: '新生', inGroup: false }
      ],
      /* 行操作：>3 按规范折叠（前 2 平铺 + ⋮ 收纳剩余） */
      rowActions: [
        { label: '发送报告' },
        { label: '打印错题' },
        { label: '查看报告' },
        { label: '联系家长' }
      ]
    }
  ]
};
