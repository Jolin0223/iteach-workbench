/* 练习中心
 * 五个入口：集团 / 校本 / 个人练习 + 课程产品绑定 / 班级绑定（原绑定管理并入，排在个人练习后）。
 * 前三个复用备课中心云盘层级组件（beike-view）：
 *   - 集团练习：同集团云盘（一级只读科目标签列表 → 二级可操作内容）。
 *   - 校本练习：同校本云盘（一级学校 → 二级科目 → 三级内容，一/二级只读）。
 *   - 个人练习：同个人云盘（flat，进入即全部可操作）。
 * 后两个为 banggl 绑定列表（筛选 + 批量 + xy-table）。
 * 列字段与按钮按练习模块展示：
 *   内容级列 = 名称/类型/绑定次数/复制次数/创建人/最近修改；
 *   批量行 = 移动/复制/删除；右侧 = 新建文件夹/新建练习；搜索 = 请输入关键词或练习ID。
 */
/* 练习模块通用 UI 配置（三个页签共用） */
var LX_UI = {
  searchPlaceholder: '请输入关键词或练习ID',
  bulk: ['移动', '复制', '删除'],
  createButtons: [
    { label: '新建文件夹', kind: 'dialog' },
    { label: '新建练习', primary: true, kind: 'dialog' }
  ],
  /* 只读目录级列：名称 + 创建人（按截图） */
  folderColumns: [
    { label: '名称', prop: 'name', sort: 'asc' },
    { label: '创建人', prop: 'creator', width: '110px' }
  ],
  /* 内容级列：练习模块字段 */
  detailColumns: [
    { label: '名称', prop: 'name', bold: true, sort: 'asc' },
    { label: '类型', prop: 'type' },
    { label: '绑定次数', prop: 'binds' },
    { label: '复制次数', prop: 'copies' },
    { label: '创建人', prop: 'creator', width: '110px' },
    { label: '最近修改', prop: 'time', width: '200px', sort: 'desc' }
  ],
  moreActions: [
    { label: '创建副本' },
    { label: '复制到' },
    { label: '复制ID', fileOnly: true },
    { label: '移动到' },
    { label: '删除', danger: true, divided: true }
  ]
};

window.APP_PAGES['lianxi'] = {
  name: '练习中心',
  breadcrumb: '教学内容 / 练习中心',
  blocks: [
    {
      type: 'tabs',
      tabs: [
        /* ========== 集团练习（同集团云盘：两级） ========== */
        {
          name: '集团练习',
          beike: Object.assign({}, LX_UI, {
            mode: 'tree',
            /* 第一层 = 科目标签（只读，共 13 个） */
            folders: [
              { name: '编程', creator: '系统', modifier: 'pengzhenlei', time: '2026-08-05' },
              { name: '博文妙笔', creator: '系统', modifier: 'zhangyanwen', time: '2026-08-24' },
              { name: '创客', creator: '系统', modifier: 'pengzhenlei', time: '2025-06-20' },
              { name: '机器人', creator: '系统', modifier: 'zhangmanman', time: '2026-08-19' },
              { name: '美术', creator: '', modifier: 'wangjunhui2', time: '2026-08-21' },
              { name: '脑力与思维', creator: '系统', modifier: 'humengfei1', time: '刚刚' },
              { name: '思辨与口才', creator: '系统', modifier: 'cuiyijia', time: '2026-08-17' },
              { name: '书法', creator: '系统', modifier: 'lipeitong1', time: '2026-07-20' },
              { name: '数学', creator: '系统', modifier: 'houjiaxin', time: '2026-05-07' },
              { name: '双语故事表演', creator: '系统', modifier: 'tengyueyin', time: '5分钟前' },
              { name: '语文', creator: '系统', modifier: 'pengzhenlei', time: '2026-04-21' },
              { name: '英语', creator: '系统', modifier: 'tengyueyin', time: '2025-10-24',
                /* 内容级演示路径（练习自有目录面包屑） */
                subPath: ['PM 彩虹【春】', 'PM 彩虹 1级', '第一讲–The Toytown Helicopter'] },
              { name: '科学', creator: '系统', modifier: 'zhuqinglong', time: '2026-06-30' }
            ],
            folderContents: {
              /* 英语：按截图还原（共 3 个） */
              '英语': [
                { name: 'L1春1背单词',   kind: 'ex', type: '作业包', binds: '172', copies: '10', creator: '张玉', modifier: '张玉',   time: '2025-07-09 10:29:55' },
                { name: 'L1春1课堂回顾', kind: 'ex', type: '作业包', binds: '134', copies: '10', creator: '张玉', modifier: '张玉',   time: '2025-07-09 10:29:53' },
                { name: 'L1春1知识巩固', kind: 'ex', type: '作业包', binds: '83',  copies: '10', creator: '张玉', modifier: '刘亚潇', time: '2026-04-09 16:59:19' }
              ],
              '数学': [
                { name: '数学–L2–第3章 口算闯关',   kind: 'ex', type: '作业包', binds: '58', copies: '6', creator: 'houjiaxin', modifier: 'houjiaxin',   time: '2026-05-07 09:41:12' },
                { name: '数学–L2–第3章 应用题专项', kind: 'ex', type: '作业包', binds: '—',  copies: '—', creator: 'houjiaxin', modifier: 'pengzhenlei', time: '2026-07-18 15:03:47' }
              ],
              '脑力与思维': [
                { name: '课后练习–脑力与思维–L1–第1章', kind: 'ex', type: '作业包', binds: '28', copies: '2', creator: '彭振雷', modifier: '彭振雷', time: '2026-07-30 18:22:41' }
              ]
            }
          })
        },
        /* ========== 校本练习（同校本云盘：学校 → 科目 → 内容） ========== */
        {
          name: '校本练习',
          beike: Object.assign({}, LX_UI, {
            mode: 'tree',
            levels: 3,
            folders: [
              { name: 'TESS虚拟学校报名3', creator: '系统', modifier: 'pengzhenlei', time: '2026-08-11' },
              { name: '百学汇', creator: '系统', modifier: 'limingjun', time: '2026-06-04' },
              { name: '保定学校', creator: '系统', modifier: 'zhuqinglong', time: '2026-05-19' },
              { name: '北京学校', creator: '系统', modifier: 'humengfei1', time: '2026-04-02' }
            ],
            subFolders: {
              'TESS虚拟学校报名3': [
                { name: '脑力与思维', creator: '彭振雷', modifier: '彭振雷', time: '2026-08-14' },
                { name: '编程', creator: '彭振雷', modifier: 'zhuqinglong', time: '2026-07-02' },
                { name: '美术', creator: '系统', modifier: 'limingjun', time: '2026-03-18' },
                { name: '数学', creator: '系统', modifier: 'limingjun', time: '2025-12-09' }
              ],
              '百学汇': [
                { name: '双语故事表演', creator: '系统', modifier: 'limingjun', time: '2026-06-04' },
                { name: '数学', creator: '系统', modifier: 'pengzhenlei', time: '2025-11-21' }
              ]
            },
            folderContents: {
              /* 脑力与思维：按截图还原（共 11 个） */
              'TESS虚拟学校报名3/脑力与思维': [
                { name: '1', kind: 'folder', type: '—', binds: '—', copies: '—', creator: '彭振雷', modifier: '彭振雷', time: '2025-04-26 15:33:27' },
                { name: '2', kind: 'folder', type: '—', binds: '—', copies: '—', creator: '彭振雷', modifier: '彭振雷', time: '2025-04-26 15:33:30' },
                { name: '3', kind: 'folder', type: '—', binds: '—', copies: '—', creator: '彭振雷', modifier: '彭振雷', time: '2025-04-26 15:33:34' },
                { name: '0811产品验收', kind: 'folder', type: '—', binds: '—', copies: '—', creator: '朱庆龙', modifier: '朱庆龙', time: '2026-08-11 10:56:40' },
                { name: 'FY24', kind: 'folder', type: '—', binds: '—', copies: '—', creator: '系统', modifier: '系统', time: '2025-04-24 11:35:08' },
                { name: '1', kind: 'ex', type: '作业包', binds: '—', copies: '—', creator: '彭振雷', modifier: '彭振雷', time: '2025-04-26 15:34:21' },
                { name: '1111', kind: 'ex', type: '作业包', binds: '—', copies: '—', creator: '李明俊', modifier: '李明俊', time: '2026-06-04 11:22:16' },
                { name: '课后练习–A体系–L3–A–夏–第1章', kind: 'ex', type: '作业包', binds: '—', copies: '—', creator: '李明俊', modifier: '李明俊', time: '2026-08-14 17:07:01' },
                { name: '期末复习–B体系–L1–B–夏', kind: 'ex', type: '作业包', binds: '—', copies: '1', creator: '李明俊', modifier: '李明俊', time: '2026-06-04 11:20:55' },
                { name: '期中复习–A体系–L2–春', kind: 'ex', type: '作业包', binds: '2', copies: '0', creator: '李明俊', modifier: '李明俊', time: '2026-05-11 09:12:40' },
                { name: '词汇闯关–L1–春', kind: 'ex', type: '作业包', binds: '15', copies: '3', creator: '彭振雷', modifier: '彭振雷', time: '2026-03-02 18:45:12' }
              ],
              '百学汇/双语故事表演': [
                { name: '双语故事表演–S2–第1章 背单词', kind: 'ex', type: '作业包', binds: '34', copies: '5', creator: '李明俊', modifier: '李明俊', time: '2026-06-04 11:22:16' },
                { name: '双语故事表演–S2–第1章 课堂回顾', kind: 'ex', type: '作业包', binds: '21', copies: '2', creator: '李明俊', modifier: 'tengyueyin', time: '2026-05-22 16:08:37' }
              ]
            }
          })
        },
        /* ========== 个人练习（同个人云盘：flat） ========== */
        {
          name: '个人练习',
          beike: Object.assign({}, LX_UI, {
            mode: 'flat',
            rows: [
              { name: '不区分', kind: 'folder', type: '—', binds: '—', copies: '—', creator: '彭振雷', modifier: '彭振雷', time: '2025-04-26 15:33:27' },
              { name: '三(2)班 第5次课随堂练习', kind: 'ex', type: '作业包', binds: '12', copies: '1', creator: '彭振雷', modifier: '彭振雷', time: '2026-08-14 17:07:01' },
              { name: '分数综合练习', kind: 'ex', type: '作业包', binds: '46', copies: '2', creator: '彭振雷', modifier: 'limingjun', time: '2026-08-15 10:22:31' },
              { name: '期中复习卷配套练习', kind: 'ex', type: '作业包', binds: '—', copies: '—', creator: '彭振雷', modifier: '彭振雷', time: '2026-08-10 09:02:18' }
            ]
          })
        },
        /* ========== 课程产品绑定（原绑定管理并入） ========== */
        {
          name: '课程产品绑定',
          banggl: {
            total: 18,
            schoolFull: 'TEST虚拟学校报名3',
            filters: [
              { key: 'year', label: '财年', required: true, type: 'select', value: '2027', options: ['2025', '2026', '2027'] },
              { key: 'school', label: '学校', required: true, type: 'tags', value: 'TESS虚拟学校报名3' },
              { key: 'subject', label: '学科', required: true, type: 'select', value: '双语故事表演', options: ['双语故事表演', '数学', '语文', '英语'] },
              { key: 'pcode', label: '课程产品编码', type: 'input', placeholder: '多个编码需用逗号分隔', wide: true },
              { key: 'vcode', label: '版本编码', type: 'input', placeholder: '请输入版本号', wide: true },
              { key: 'grade', label: '年级', type: 'select', placeholder: '请选择年级', options: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'] },
              { key: 'quarter', label: '季度', type: 'select', placeholder: '请选择季度', options: ['春季', '夏季', '秋季', '冬季'] },
              { key: 'lessons', label: '总课次数', type: 'input', placeholder: '请输入课次总数' }
            ],
            columns: [
              { label: '财年', prop: 'year', width: '70px' },
              { label: '学校', prop: 'school', width: '110px' },
              { label: '科目', prop: 'subject', width: '120px' },
              { label: '教务课程产品编码/名称', stack: ['pcode', 'pname'], width: '240px' },
              { label: '版本/版本编码', stack: ['vname', 'vcode'], width: '110px' },
              { label: '设班数', prop: 'classes', width: '70px' },
              { label: '已绑/总课次', prop: 'bound', width: '100px' },
              { label: '班容类型', prop: 'capacity', width: '90px' },
              { label: '标准部门', prop: 'dept', width: '100px' },
              { label: '管理项目', prop: 'project', width: '90px' },
              { label: '产品体系', prop: 'system', width: '90px' }
            ],
            rows: [
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '590069', pname: '六年级双语故事表演春季专题班', vname: '默认', vcode: '859340', classes: '2', bound: '1/10', capacity: '12人', dept: '素养智学部', project: '素养', system: '专项体系' },
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '572062', pname: '一年级双语故事表演春季合作…', vname: '包含', vcode: '782234', classes: '0', bound: '0/6', capacity: '8人', dept: '素养智学部', project: '素养', system: '专项体系' },
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '572062', pname: '一年级双语故事表演春季合作…', vname: '在线', vcode: '782235', classes: '0', bound: '0/6', capacity: '8人', dept: '素养智学部', project: '素养', system: '专项体系' },
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '572062', pname: '一年级双语故事表演春季合作…', vname: '走读', vcode: '782233', classes: '0', bound: '0/6', capacity: '8人', dept: '素养智学部', project: '素养', system: '专项体系' },
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '56539535', pname: 'S3双语故事表演秋季体验班', vname: '默认', vcode: '879592', classes: '1', bound: '0/1', capacity: '12人', dept: '素养智学部', project: '素养', system: '常规体系' },
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '55563035', pname: '【测试】 五年级双语故事表演…', vname: '默认', vcode: '77433935', classes: '0', bound: '0/10', capacity: '16人', dept: '素养智学部', project: '素养', system: '常规体系' },
              { year: '2027', school: 'TEST虚拟学…', subject: '双语故事表演', pcode: '55548535', pname: '三年级双语故事表演秋季L3班', vname: '默认', vcode: '902327', classes: '3', bound: '0/10', capacity: '8人', dept: '素养智学部', project: '素养', system: '常规体系' }
            ]
          }
        },
        /* ========== 班级绑定（原绑定管理并入） ========== */
        {
          name: '班级绑定',
          banggl: {
            total: 1,
            schoolFull: 'TEST虚拟学校报名3',
            filters: [
              { key: 'year', label: '财年', required: true, type: 'select', value: '2026', options: ['2025', '2026', '2027'] },
              { key: 'school', label: '学校', required: true, type: 'tags', value: 'TESS虚拟学校报名3' },
              { key: 'subject', label: '学科', required: true, type: 'select', value: '双语故事表演', options: ['双语故事表演', '数学', '语文', '英语'] },
              { key: 'ccode', label: '班级编码', type: 'input', placeholder: '多个编码需用逗号分隔', wide: true },
              { key: 'pcode', label: '课程产品编码', type: 'input', placeholder: '请输入课程产品编码', wide: true },
              { key: 'vcode', label: '版本编码', type: 'input', placeholder: '请输入版本号', wide: true },
              { key: 'grade', label: '年级', type: 'select', placeholder: '请选择年级', options: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'] },
              { key: 'quarter', label: '季度', type: 'select', placeholder: '请选择季度', options: ['春季', '夏季', '秋季', '冬季'] },
              { key: 'lessons', label: '总课次数', type: 'input', placeholder: '请输入课次总数' },
              { key: 'teacher', label: '老师姓名', type: 'input', value: '彭振雷', placeholder: '请输入老师姓名' }
            ],
            columns: [
              { label: '财年', prop: 'year', width: '70px' },
              { label: '学校', prop: 'school', width: '110px' },
              { label: '科目', prop: 'subject', width: '120px' },
              { label: '班级编码/名称', stack: ['ccode', 'cname'], width: '220px' },
              { label: '教务课程产品编码/名称', stack: ['pcode', 'pname'], width: '240px' },
              { label: '版本/版本编码', stack: ['vname', 'vcode'], width: '110px' },
              { label: '授课老师', prop: 'teacher', width: '90px' },
              { label: '开课时间', prop: 'start', width: '110px' },
              { label: '结课时间', prop: 'end', width: '110px' },
              { label: '已绑/总课次', prop: 'bound', width: '100px' },
              { label: '标准部门', prop: 'dept', width: '100px' },
              { label: '管理项目', prop: 'project', width: '90px' },
              { label: '产品体系', prop: 'system', width: '90px' }
            ],
            rows: [
              { year: '2026', school: 'TEST虚拟学…', subject: '双语故事表演', ccode: 'IHCPPP', cname: 'S3双语故事表演秋季S3班', pcode: '55543435', pname: '双语故事表演S3秋季（标化…', vname: '默认', vcode: '76696535', teacher: '彭振雷', start: '2025-07-14', end: '2026-07-22', bound: '9/14', dept: '素养智学部', project: '素养', system: '常规体系' }
            ]
          }
        }
      ]
    }
  ]
};
