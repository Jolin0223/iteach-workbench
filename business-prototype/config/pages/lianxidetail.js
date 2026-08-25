/* 练习详情 - 按线上标准功能还原图片（专属视图组件 lianxidetail-view）
 * 二级页面：面包屑路径由入口动态决定（我的课表/我的班级/班级详情 进入展示不同路径） */
window.APP_PAGES['lianxidetail'] = {
  name: '练习详情',
  blocks: [
    {
      type: 'lianxidetail',
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
      meta: ['2025-10-11 10:30-12:00', '正课', '377058184'],
      stats: [
        { num: 0, label: '已完成', tone: 'done', icon: '✔' },
        { num: 1, label: '进行中', tone: 'doing', icon: '✎' },
        { num: 2, label: '未完成', tone: 'todo', icon: '≡' }
      ],
      columns: ['学员', '作答状态', '口语跟读', '口语跟读', '口语跟读'],
      emptyCols: 2,
      rows: [
        {
          name: 'TESS高聃', status: '未完成',
          cells: [null, null, null]
        },
        {
          name: 'aabblibccdd', status: '进行中',
          cells: [
            null,
            { lines: [[{ t: '练习题 共3题 ' }, { t: '正确率66.67%', hl: true }], [{ t: '看视频 共1个' }]] },
            { lines: [[{ t: '背单词 共2个 ' }, { t: 'B评级', hl: true }]], badge: 'B' }
          ]
        },
        {
          name: 'TESS陈佳玲', status: '未完成',
          cells: [null, null, null]
        }
      ]
    }
  ]
};
