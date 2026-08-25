/* 我的学员 - 完全按照截图实现（专属视图组件 xueyuan-view） */
window.APP_PAGES['xueyuan'] = {
  name: '我的学员',
  breadcrumb: '教学服务 / 我的学员',
  blocks: [
    {
      type: 'xueyuan',
      filters: [
        { label: '财年', key: 'year', type: 'select', value: '2027', options: [{ label: '2027', value: '2027' }, { label: '2026', value: '2026' }] },
        { label: '季度', key: 'quarter', type: 'select', placeholder: '请选择', options: [{ label: '第一季度', value: 'Q1' }, { label: '第二季度', value: 'Q2' }, { label: '第三季度', value: 'Q3' }, { label: '第四季度', value: 'Q4' }] },
        { label: '班级编码', key: 'classCode', type: 'input', placeholder: '请录入' },
        { label: '学员姓名', key: 'name', type: 'input', placeholder: '请录入' },
        { label: '学员编码', key: 'code', type: 'input', placeholder: '请录入' }
      ],
      statusTags: [
        { label: '全部', count: 8 },
        { label: '在读', count: 2 },
        { label: '已退班', count: 2 },
        { label: '已加好友', count: 2 },
        { label: '未加好友', count: 2 }
      ],
      columns: [
        { label: '学员号', prop: 'studentId' },
        { label: '学员姓名', prop: 'name' },
        { label: '已出勤/总课次', prop: 'attendance' },
        { label: '行课中班级数', prop: 'activeClasses' },
        { label: '结课班级数', prop: 'finishedClasses' },
        { label: '未开课班级数', prop: 'unstartedClasses' },
        { label: '是否加好友', prop: 'isFriend' }
      ],
      data: [
        { studentId: 'TESSBM37990250076', name: '彭振雷1', attendance: '12/16', activeClasses: 1, finishedClasses: 1, unstartedClasses: 0, isFriend: '是' },
        { studentId: 'TESSBM37990250076', name: '彭振雷2', attendance: '8/12', activeClasses: 1, finishedClasses: 0, unstartedClasses: 1, isFriend: '是' },
        { studentId: 'TESSBM37990250076', name: '彭振雷3', attendance: '16/16', activeClasses: 0, finishedClasses: 2, unstartedClasses: 0, isFriend: '否' },
        { studentId: 'TESSBM37990250076', name: '彭振雷4', attendance: '6/20', activeClasses: 2, finishedClasses: 0, unstartedClasses: 1, isFriend: '否' },
        { studentId: 'TESSBM37990250076', name: '彭振雷5', attendance: '10/15', activeClasses: 1, finishedClasses: 1, unstartedClasses: 0, isFriend: '是' },
        { studentId: 'TESSBM37990250076', name: '彭振雷6', attendance: '0/12', activeClasses: 0, finishedClasses: 0, unstartedClasses: 2, isFriend: '否' },
        { studentId: 'TESSBM37990250076', name: '彭振雷7', attendance: '14/18', activeClasses: 1, finishedClasses: 0, unstartedClasses: 1, isFriend: '是' },
        { studentId: 'TESSBM37990250076', name: '彭振雷8', attendance: '9/10', activeClasses: 0, finishedClasses: 1, unstartedClasses: 0, isFriend: '否' }
      ],
      actions: [
        { label: '学员档案', action: { kind: 'message', text: '查看学员档案' } },
        { label: '加好友', action: { kind: 'message', text: '加好友' } }
      ],
      pagination: { page: 1, totalPages: 7, total: 8 }
    }
  ]
};
