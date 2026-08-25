/* ============================================================
 * 绑定管理（教学内容 / 绑定管理）
 * 两个 tab：课程产品绑定（默认）/ 班级绑定。
 * 每个 tab：筛选区（必填项带红色 *必填项 标记）+ 批量绑定/批量删除
 *          + 列表（xy-table 横向滚动 + 操作列右固定）+ 分页。
 * 操作列：绑定练习（跳绑定练习页）/ 预览（已绑课次>0 才可点）。
 * 单元格 stack: [a, b] 表示两行堆叠（第一行自动追加 /）。
 * ============================================================ */
window.APP_PAGES = window.APP_PAGES || {};

window.APP_PAGES['bangdingguanli'] = {
  name: '绑定管理',
  breadcrumb: '教学内容 / 绑定管理',
  blocks: [
    {
      type: 'banggl',
      tabs: [
        /* ========== 课程产品绑定 ========== */
        {
          name: '课程产品绑定',
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
        },

        /* ========== 班级绑定 ========== */
        {
          name: '班级绑定',
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
      ]
    }
  ]
};
