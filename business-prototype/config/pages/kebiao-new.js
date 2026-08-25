/* 我的课表(新)：顶部导航横跨 + 下方左右分栏（左日历 + 右课程列表）
 * 布局特点：
 *   1. 顶部：年月 + 左右切换 + 今天按钮 + 课次统计（横跨整行）
 *   2. 下方左侧：月历视图
 *   3. 下方右侧：课程卡片列表（左状态区 + 中信息区 + 右操作链接）
 *   4. 操作按钮为纯文字链接样式（无边框背景）
 *   5. 面授课用红色标签标识
 *   6. 行课中卡片为青绿色背景
 */
window.APP_PAGES['kebiao'] = {
  name: '我的课表',
  breadcrumb: '教学服务 / 我的课表',
  blocks: [
    {
      type: 'schedule2',
      calendar: {
        year: 2025,
        month: 3,
        today: 1,
        selectedDate: 1,
        eventDates: [1, 8, 15, 22, 29]
      },
      courseCount: 4,
      courses: [
        /* 1. 已结束 - 直播课 */
        {
          id: 'c1',
          status: 'finished',
          badge1: '第1讲',
          badge2: '已结束',
          type: '直播课',
          time: '08:20-10:20',
          code: 'NL4AC250601',
          title: '脑力思维春季（L4-B）',
          teacher: '彭振雷',
          studentCount: 16,
          actions: ['绑定练习', '练习详情', '学情报告', '打印错题', '出勤记录']
        },
        /* 2. 行课中 - 面授课 */
        {
          id: 'c2',
          status: 'active',
          badge1: '第1讲',
          badge2: '行课中',
          type: '面授课',
          time: '10:40-12:40',
          code: 'NL4AC250602',
          title: '脑力思维春季（L4-A）',
          teacher: '彭振雷',
          studentCount: 16,
          actions: ['绑定练习', '练习详情', '学情报告', '打印错题', '出勤记录']
        },
        /* 3. 未开始 - 面授课 */
        {
          id: 'c3',
          status: 'pending',
          badge1: '第1讲',
          badge2: '未开始',
          type: '面授课',
          time: '13:50-15:50',
          code: 'NL4AC250603',
          title: '脑力思维春季（L4-A）',
          teacher: '彭振雷',
          studentCount: 16,
          actions: ['绑定练习', '练习详情', '学情报告', '打印错题', '出勤记录']
        },
        /* 4. 未开始 - 面授课 */
        {
          id: 'c4',
          status: 'pending',
          badge1: '第1讲',
          badge2: '未开始',
          type: '面授课',
          time: '16:10-18:10',
          code: 'NL4AC250605',
          title: '脑力思维春季（L4-A）',
          teacher: '彭振雷',
          studentCount: 16,
          actions: ['绑定练习', '练习详情', '学情报告', '打印错题', '出勤记录']
        }
      ]
    }
  ]
};
