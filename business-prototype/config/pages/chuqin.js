/* 出勤记录 - 按线上标准功能还原图片（专属视图组件 chuqin-view）
 * 二级页面：面包屑路径由入口动态决定（我的课表/我的班级/班级详情 进入展示不同路径） */
window.APP_PAGES['chuqin'] = {
  name: '出勤记录',
  blocks: [
    {
      type: 'chuqin',
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
      columns: [
        { label: '学员号', prop: 'no', width: '210px' },
        { label: '学员姓名', prop: 'name', width: '120px' },
        { label: '出勤状态', prop: 'status', width: '110px' },
        { label: '打卡时间', prop: 'time', width: '190px' },
        { label: '请假状态', prop: 'leave', width: '110px' },
        { label: '在班状态', prop: 'onduty', width: '110px' }
      ],
      data: [
        { no: 'TESSBM37990250076', name: '彭振雷1', status: '已打卡', time: '2025-03-01 13:45:45', leave: '未请假', onduty: '在班' },
        { no: 'TESSBM37990250077', name: '张三', status: '已打卡', time: '2025-03-01 13:45:45', leave: '未请假', onduty: '在班' },
        { no: 'TESSBM37990250078', name: '李四', status: '已打卡', time: '2025-03-01 13:45:45', leave: '未请假', onduty: '在班' },
        { no: 'TESSBM37990250079', name: '高聃', status: '未打卡', time: '2025-03-01 13:45:45', leave: '未请假', onduty: '在班' }
      ],
      actions: [{ label: '学员档案' }],
      pagination: { page: 1, totalPages: 7, total: 4 }
    }
  ]
};
