/* 绑定练习 - 按线上标准功能还原图片（专属视图组件 bangding-view）
 * 二级页面：面包屑路径由入口动态决定（我的课表/我的班级 进入展示不同路径） */
window.APP_PAGES['bangding'] = {
  name: '绑定练习',
  blocks: [
    {
      type: 'bangding',
      classInfo: {
        title: '双语故事表演',
        school: 'TEST虚拟学校报名3',
        className: 'IHCPPP/S3双语故事表演秋季S3班'
      },
      lectures: [
        { no: 1, title: '第1讲xx2025年4月15...', time: '2025/7/14 08:00-10:00', type: '正课', bound: '已绑6个' },
        { no: 2, title: '第2讲李汝南验收', time: '2025/7/21 08:00-10:00', type: '正课', bound: '已绑2个' },
        { no: 3, title: '第3讲', time: '2025/7/28 08:00-10:00', type: '正课', bound: '已绑3个' },
        { no: 4, title: '第4讲', time: '2025/8/4 08:00-10:00', type: '正课', bound: '已绑4个' },
        { no: 5, title: '第5讲', time: '2025/8/11 08:00-10:00', type: '正课', bound: '待绑定', disabled: true },
        { no: 6, title: '第6讲', time: '2025/8/18 08:00-10:00', type: '正课', bound: '已绑8个' },
        { no: 7, title: '第7讲', time: '2025/8/25 08:00-10:00', type: '正课', bound: '待绑定', disabled: true },
        { no: 8, title: 'pc专项测试', time: '2025/9/1 08:00-10:00', type: '正课', bound: '已绑6个' }
      ],
      exercises: [
        { tag: '123', title: '测试解析视频-彭振雷', role: '授课老师', name: '彭振雷', time: '2025-07-11 14:10:43' },
        { tag: '单词听写', title: '123', role: '集团教研员', name: '彭振雷', time: '2026-03-10 17:28:48' },
        { tag: '能力提升', title: 'L1暑1知识巩固-背单词', role: '集团教研员', name: '彭振雷', time: '2026-05-18 20:04:41' },
        { tag: '明日看板', title: '课后练习-A体系-L1-A-夏-第6章', role: '学员', name: '彭振雷', time: '2026-06-23 15:45:03' },
        { tag: '知识巩固', title: '课后练习-A体系-L6-A-夏-第3章', role: '学员', name: '彭振雷', time: '2026-06-23 16:43:16' },
        { tag: '明日看板', title: '课后练习-A体系-L6-A-夏-第3章', role: '学员', name: '彭振雷', time: '2026-06-29 11:15:13' }
      ]
    }
  ]
};
