/* ============================================================
 * iTeach 工作台 2.0 · 左侧菜单配置
 * 修改此文件即可调整全局菜单结构（所有页面共用这一套）
 * roles 为空/缺省 = 所有角色可见；填写角色 id = 仅这些角色可见
 * 角色: teacher授课教师 / researcher教研 / assistant助教 /
 *       consultant顾问 / operator学科运营
 * ============================================================ */
window.APP_MENU = {
  groups: [
    {
      name: '',
      items: [
        { id: 'home', name: '首页', icon: 'home', file: 'pages/home.js' }
      ]
    },
    {
      name: '教学内容',
      items: [
        { id: 'beike', name: '备课中心', icon: 'folder', roles: ['teacher', 'researcher'], file: 'pages/beike.js' },
        { id: 'lianxi', name: '练习中心', icon: 'pen', roles: ['teacher', 'researcher'], file: 'pages/lianxi.js' },
        { id: 'shijuan', name: '试卷中心', icon: 'doc', roles: ['teacher', 'researcher'], file: 'pages/shijuan.js' },
        { id: 'ceping', name: '测评中心', icon: 'gauge', roles: ['teacher', 'researcher'], file: 'pages/ceping.js' },
        { id: 'ziyuan', name: '资源中心', icon: 'gift', roles: ['teacher', 'researcher'], owner: '陈佳玲' }
      ]
    },
    {
      name: '教学服务',
      items: [
        { id: 'kebiao', name: '我的课表', icon: 'calendar', roles: ['teacher', 'assistant'], file: 'pages/kebiao-new.js' },
        { id: 'banji', name: '我的班级', icon: 'school', roles: ['teacher', 'assistant'], file: 'pages/banji.js' },
        { id: 'xueyuan', name: '我的学员', icon: 'user', roles: ['teacher', 'assistant'], file: 'pages/xueyuan.js' },
        { id: 'zuoye', name: '作业管理', icon: 'pen', roles: ['teacher', 'assistant'], owner: '高聃' },
        { id: 'xueqing', name: '学情服务', icon: 'chart', roles: ['teacher', 'assistant'], owner: '陈雯雯' }
      ]
    },
    {
      name: '师训专区',
      items: [
        { id: 'gongdi', name: '功底考', icon: 'trophy', roles: ['teacher', 'researcher'], file: 'pages/gongdi.js' },
        { id: 'xuetang', name: '教师学堂', icon: 'cap', roles: ['teacher', 'researcher'], owner: '朱庆龙' }
      ]
    },
    {
      name: '运营专区',
      items: [
        { id: 'huodong', name: '活动管理', icon: 'gift', owner: '韩荣荣' },
        { id: 'ceping-app', name: '测评应用', icon: 'gauge', file: 'pages/ceping.js' },
        { id: 'shijuan-fx', name: '试卷分析', icon: 'search', owner: '朱庆龙' },
        { id: 'kaoqing', name: '考情分析', icon: 'chart', owner: '朱庆龙' }
      ]
    },
    {
      name: '应用管理',
      items: [
        { id: 'data', name: '数据中心', icon: 'chart', roles: ['teacher', 'researcher', 'assistant', 'consultant', 'operator'], file: 'pages/data.js' },
        { id: 'quanxian', name: '权限管理', icon: 'lock', roles: ['teacher', 'researcher', 'assistant', 'consultant', 'operator'], owner: '陈佳玲' },
        { id: 'app-center', name: '应用中心', icon: 'tools', owner: '公共能力' },
        { id: 'recycle', name: '回收站', icon: 'trash', roles: ['teacher', 'researcher', 'assistant', 'consultant', 'operator'], file: 'pages/recycle.js' }
      ]
    }
  ]
};
