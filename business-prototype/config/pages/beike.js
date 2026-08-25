/* 备课中心
 * 三个云盘入口（集团 / 校本 / 个人），在 tab 内横向切换：
 *   - 集团云盘：一级页面只展示"科目文件夹"列表，不可勾选/移动/删除/上传；
 *                点击某个文件夹后进入二级页面（面包屑 + 工具栏 + 操作列）。
 *   - 校本云盘：三级目录（一级学校 → 二级科目 → 三级内容），一/二级只读下钻，三级才可编辑操作。
 *   - 个人云盘：不区分一级 / 二级，进入即支持全部操作（多选 / 移动 / 删除 / 上传 / 导入 / 新建）。
 *
 * 数据结构：
 *   每个 tab 用 beike 字段承载数据：
 *     - folders:   一级页面的科目文件夹列表（[{ name, creator, time, size }]）
 *     - folderContents: 二级页面映射表（{ 文件夹名: 文件列表 }）
 *     - mode='flat'（个人云盘）：无两级切换，布局同二级，rows 承载全可操作列表。
 *
 * 顶部通用块（标题栏）由 tabs 之外承载。
 */
window.APP_PAGES['beike'] = {
  name: '备课中心',
  breadcrumb: '教学内容 / 备课中心',
  blocks: [
    /* ========== 顶部：三个云盘 ========== */
    {
      type: 'tabs',
      tabs: [
        /* ========== 集团云盘 ========== */
        {
          name: '集团云盘',
          beike: {
            mode: 'tree',                  // tree=支持两级切换
            folders: [
              { name: '编程',     creator: '系统', modifier: 'pengzhenlei',  time: '2026-08-05', size: '0 B' },
              { name: '博文妙笔', creator: '系统', modifier: 'zhangyanwen',  time: '2026-08-24', size: '783.0 GB' },
              { name: '创客',     creator: '系统', modifier: 'pengzhenlei',  time: '2025-06-20', size: '44.7 GB' },
              { name: '机器人',   creator: '系统', modifier: 'zhangmanman',  time: '2026-08-19', size: '87.2 GB' },
              { name: '美术',     creator: '',     modifier: 'wangjunhui2',  time: '2026-08-21', size: '134.9 GB' },
              { name: '脑力与思维', creator: '系统', modifier: 'humengfei1',  time: '刚刚', size: '1.6 TB' },
              { name: '思辨与口才', creator: '系统', modifier: 'cuiyijia',    time: '2026-08-17', size: '51.4 GB' },
              { name: '书法',     creator: '系统', modifier: 'lipeitong1',   time: '2026-07-20', size: '27.5 GB' },
              { name: '数学',     creator: '系统', modifier: 'houjiaxin',    time: '2026-05-07', size: '83.9 GB' },
              { name: '双语故事表演', creator: '系统', modifier: 'tengyueyin', time: '5分钟前', size: '957.5 GB',
                /* 二级页面演示路径（云盘自有目录面包屑） */
                subPath: ['[02-2] S2听唱演+S3双语新动力', '[01] S2听唱演'] },
              { name: '语文',     creator: '系统', modifier: 'pengzhenlei',  time: '2026-04-21', size: '11.3 GB' },
              { name: '英语',     creator: '系统', modifier: 'tengyueyin',   time: '2025-10-24', size: '536.2 MB' }
            ],
            folderContents: {
              /* 双语故事表演：按截图还原（共 14 个） */
              '双语故事表演': [
                { name: '1-课程大纲', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '1.2 MB' },
                { name: '2-教具素材', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '860.5 MB' },
                { name: '3-音频资源', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '2.4 GB' },
                { name: '4-课件PPT', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '3.1 GB' },
                { name: '5-趣味技能-自然拼读', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '2.9 MB' },
                { name: '6-趣味技能-视觉词', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '2.2 MB' },
                { name: '7-家长会', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '263.9 KB' },
                { name: '8-讲解视频', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '1.4 GB' },
                { name: '9-一年三季', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '2.7 GB' },
                { name: '10-一年四季-48次课版', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '1.1 GB' },
                { name: '11. 公开课-What do you want to be?', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '1.3 GB' },
                { name: '12. Chant-TPR-0.7倍速', kind: 'folder', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '1.4 GB' },
                { name: '13-家校沟通手册', kind: 'folder', creator: '张茜', modifier: 'tengyueyin', time: '2026-01-14', size: '4.3 MB' },
                { name: '双语故事表演K-pre级（S2）资源列表251225更新.xlsx', kind: 'xls', creator: '滕玥吟', modifier: 'tengyueyin', time: '2026-01-14', size: '13.2 MB' }
              ],
              /* 语文：示范数据（约 86 个文件中预览部分） */
              '语文': [
                { name: '【全国】语文博文书香五年级寒假版面2025(学习机游戏合集)', kind: 'folder', creator: '彭振雷', time: '2025-05-16', size: '22.7 KB' },
                { name: '【全国】语文博文书香六年级寒假版面2025(学习机游戏合集)', kind: 'folder', creator: '彭振雷', time: '2025-05-16', size: '25.6 KB' },
                { name: '【全国】英语KSA门级-A三年级寒假版面2021',                  kind: 'folder', creator: '彭振雷', time: '2025-09-16', size: '124.5 MB' },
                { name: '1', kind: 'folder', creator: '彭振雷', time: '2026-07-29', size: '84.1 MB' },
                { name: '1级8秋第3章我是小花园-iteachPPT.pptx', kind: 'ppt', creator: '彭振雷', time: '2026-08-26', size: '55.0 MB' },
                { name: '3级8秋第1章-太空旅行-授课PPT.pptx', kind: 'ppt', creator: '彭振雷', time: '2026-06-04', size: '81.2 MB' },
                { name: '3年级秋季第12章全能的祝福-iteachPPT(1).pptx', kind: 'ppt', creator: '彭振雷', time: '2025-08-29', size: '22.5 MB' },
                { name: '11', kind: 'folder', creator: '彭振雷', time: '2025-08-14', size: '135.6 KB' },
                { name: '49ADE140-E1BB-4d6d-928C-B8973AE71A9.png', kind: 'img', creator: '彭振雷', time: '2024-07-09', size: '218.4 KB' },
                { name: '111', kind: 'doc', creator: '彭振雷', time: '2025-07-17', size: '67.7 KB' },
                { name: '1136824-bugy-2024-06-04-pptx-预览播放模式预览的最大化苹果.pptx', kind: 'ppt', creator: '彭振雷', time: '2024-06-17', size: '124.5 MB' },
                { name: 'L4第1课-画图键标记-说课稿.pptx', kind: 'ppt', creator: '彭振雷', time: '2025-02-26', size: '31.7 MB' }
              ],
              '数学': [
                { name: '【全国】数学三年级同步练习 2025 春', kind: 'folder', creator: '系统', time: '2025-03-12', size: '8.4 MB' },
                { name: '【全国】数学四年级寒假版面2025', kind: 'folder', creator: '系统', time: '2025-05-16', size: '12.6 MB' },
                { name: '分数的初步认识 V3.pptx', kind: 'ppt', creator: '系统', time: '2026-08-14', size: '12.4 MB' },
                { name: '四(1)班 期中复习卷.docx', kind: 'doc', creator: '系统', time: '2026-08-11', size: '1.5 MB' }
              ]
            },
            /* 二级页面表格列定义（与截图一致：名称/创建人/最近修改/大小） */
            detailColumns: [
              { label: '名称', prop: 'name', bold: true },
              { label: '创建人', prop: 'creator', width: '110px' },
              { label: '最近修改', prop: 'time', width: '200px' },
              { label: '大小', prop: 'size', width: '90px' }
            ],
            /* 二级行内 ⋯ 菜单（截图还原） */
            moreActions: [
              { label: '创建副本' }, { label: '复制到' }, { label: '复制ID', fileOnly: true },
              { label: '移动到' }, { label: '播放', fileOnly: true }, { label: '打印', fileOnly: true },
              { label: '删除', danger: true, divided: true }
            ],
            detailActions: [
              { label: '预览', action: { kind: 'message', text: '预览文件' } },
              { label: '重命名', action: { kind: 'message', text: '重命名' } },
              { label: '移动', action: { kind: 'message', text: '移动文件' } },
              { label: '删除', action: { kind: 'message', text: '已移入回收站' }, danger: true }
            ]
          }
        },

        /* ========== 校本云盘（三级：学校 → 科目 → 内容；一/二级只读） ========== */
        {
          name: '校本云盘',
          beike: {
            mode: 'tree',
            levels: 3,                 // 三级目录：一级学校 / 二级科目 / 三级内容
            folders: [
              { name: 'TESS虚拟学校报名3', creator: '系统', modifier: 'chenjialin',  time: '2026-08-24', size: '167.5 GB' },
              { name: '保定学校',   creator: '系统', modifier: 'wangsime',   time: '2026-07-01', size: '2.8 GB' },
              { name: '北京学校',   creator: '系统', modifier: 'keyunmeng',  time: '2026-08-06', size: '0 B' },
              { name: '百学汇',     creator: '系统', modifier: 'wangyujiao5', time: '2026-08-23', size: '1023.8 GB' },
              { name: '成都学校',   creator: '系统', modifier: 'yangjingh',  time: '2026-08-24', size: '762.4 GB' },
              { name: '常州学校',   creator: '系统', modifier: 'renxinyi8',  time: '1分钟前', size: '783.3 GB' },
              { name: '东莞学校',   creator: '系统', modifier: 'luowenying', time: '2026-08-23', size: '538.9 GB' },
              { name: '大连学校',   creator: '系统', modifier: 'wangyun97',  time: '2026-07-16', size: '47.6 GB' },
              { name: '佛山学校',   creator: '系统', modifier: 'liwanshan1', time: '2026-08-24', size: '435.8 GB' }
            ],
            /* 二级：学校下的科目文件夹（只读） */
            subFolders: {
              'TESS虚拟学校报名3': [
                { name: '编程',     creator: '系统', modifier: 'pengzhenlei', time: '2026-08-21', size: '1.9 GB' },
                { name: '博文妙笔', creator: '系统', modifier: 'lihui174',    time: '2026-07-23', size: '31.7 GB' },
                { name: '创客',     creator: '系统', modifier: 'pengzhenlei', time: '2026-05-28', size: '7.4 GB' },
                { name: '机器人',   creator: '系统', modifier: 'pucailin',    time: '2026-07-31', size: '3.6 GB' },
                { name: '美术',     creator: '系统', modifier: 'xiaohui5',    time: '2026-07-23', size: '7.8 GB' },
                { name: '脑力与思维', creator: '系统', modifier: 'chenjialin',  time: '2026-08-24', size: '1.5 GB' },
                { name: '思辨与口才', creator: '系统', modifier: 'xiaohui5',    time: '2026-07-10', size: '3.4 GB' },
                { name: '书法',     creator: '系统', modifier: 'v_iteach_13', time: '2026-08-20', size: '30.0 GB' },
                { name: '数学',     creator: '系统', modifier: 'yangshutong', time: '2026-08-10', size: '1.1 GB' }
              ],
              '百学汇': [
                { name: '双语故事表演', creator: '系统', modifier: 'wangyujiao5', time: '2026-08-23', size: '173.2 GB' },
                { name: '宝贝素养全能', creator: '系统', modifier: 'wangyujiao5', time: '2026-08-23', size: '173.2 GB' },
                { name: '数学',     creator: '系统', modifier: 'wangyujiao5', time: '2026-08-23', size: '12.6 GB' }
              ]
            },
            /* 三级：具体内容（key = 学校/科目） */
            folderContents: {
              'TESS虚拟学校报名3/数学': [
                { name: '本校数学教研组共享',                  kind: 'folder', creator: '李老师', time: '2026-08-13', size: '2.1 GB' },
                { name: '四(1)班 期中复习卷.docx',            kind: 'doc',    creator: '王老师', time: '2026-08-11', size: '1.5 MB' },
                { name: '分数的初步认识 V3.pptx',             kind: 'ppt',    creator: '张老师', time: '2026-08-14', size: '12.4 MB' },
                { name: 'Unit4 课堂互动素材包',                kind: 'img',    creator: '陈老师', time: '2026-08-12', size: '8.2 MB' },
                { name: '秋季开课家长会PPT.pptx',              kind: 'ppt',    creator: '赵老师', time: '2026-08-10', size: '5.6 MB' }
              ],
              'TESS虚拟学校报名3/语文': [
                { name: '语文教研组共享（本部）',              kind: 'folder', creator: '李老师', time: '2026-08-12', size: '1.8 GB' },
                { name: '古诗三百首说课稿.pptx',              kind: 'ppt',    creator: '王老师', time: '2026-08-10', size: '4.5 MB' },
                { name: '部编版三年级上册备课.zip',            kind: 'zip',    creator: '张老师', time: '2026-08-09', size: '38.4 MB' }
              ],
              '百学汇/双语故事表演': [
                { name: '00【重要】师王争霸专属文件夹', kind: 'folder', creator: '张莹',   modifier: 'zengqi3',     time: '2025-12-18', size: '2.2 GB' },
                { name: '01-双语故事【线上】',       kind: 'folder', creator: '徐鹤瑶', modifier: 'hansu3',      time: '2026-07-10', size: '20.2 GB' },
                { name: '02-C体系录课',             kind: 'folder', creator: '刘嘉翼', modifier: 'zhangshu',    time: '2026-05-29', size: '1.1 GB' },
                { name: 'PU体验课',                 kind: 'folder', creator: '石媛',   modifier: 'niuyanze',    time: '2026-06-25', size: '305.0 MB' },
                { name: '宝贝素养全能',             kind: 'folder', creator: '王昱骄', modifier: 'wangyujiao5', time: '2026-08-23', size: '173.2 GB' },
                { name: '大课间',                   kind: 'folder', creator: '张毅',   modifier: 'zhangyi61',   time: '2026-05-13', size: '152.7 MB' },
                { name: '过往文件',                 kind: 'folder', creator: '韩素',   modifier: 'liqi121',     time: '2026-08-02', size: '505.0 MB' },
                { name: '解码能力4-国际音标1',       kind: 'folder', creator: '韩素',   modifier: 'lisiqi50',    time: '2025-07-07', size: '5.7 MB' },
                { name: '双语C体系招生视频',         kind: 'folder', creator: '李壮',   modifier: 'lizhuang6',   time: '2026-05-27', size: '43.5 MB' }
              ]
            },
            /* 三级页面表格列（与截图一致：名称/创建人/最近修改/大小） */
            detailColumns: [
              { label: '名称', prop: 'name', bold: true },
              { label: '创建人', prop: 'creator', width: '110px' },
              { label: '最近修改', prop: 'time', width: '200px' },
              { label: '大小', prop: 'size', width: '90px' }
            ],
            /* 三级行内 ⋯ 菜单 */
            moreActions: [
              { label: '创建副本' }, { label: '复制到' }, { label: '复制ID', fileOnly: true },
              { label: '移动到' }, { label: '播放', fileOnly: true }, { label: '打印', fileOnly: true },
              { label: '删除', danger: true, divided: true }
            ],
            detailActions: [
              { label: '预览', action: { kind: 'message', text: '预览文件' } },
              { label: '重命名', action: { kind: 'message', text: '重命名' } },
              { label: '移动', action: { kind: 'message', text: '移动文件' } },
              { label: '删除', action: { kind: 'message', text: '已移入回收站' }, danger: true }
            ]
          }
        },

        /* ========== 个人云盘（一级目录同集团云盘二级规则，所有内容均可编辑操作） ========== */
        {
          name: '个人云盘',
          beike: {
            mode: 'flat',                // flat=无两级切换，进入即全可操作列表
            detailColumns: [
              { label: '名称', prop: 'name', bold: true, sort: 'asc' },
              { label: '创建人', prop: 'creator', width: '110px' },
              { label: '最近修改', prop: 'time', width: '200px', sort: 'desc' },
              { label: '大小', prop: 'size', width: '90px', sort: 'desc' }
            ],
            moreActions: [
              { label: '创建副本' }, { label: '复制到' }, { label: '复制ID', fileOnly: true },
              { label: '移动到' }, { label: '播放', fileOnly: true }, { label: '打印', fileOnly: true },
              { label: '删除', danger: true, divided: true }
            ],
            rows: [
              /* 文件夹（参考线上截图） */
              { name: '上海学校 –【教研版】【全国】语文博文书香A五年级春季面授2025', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-05-16', size: '0 B' },
              { name: '沈阳学校 –【教研版】【全国】语文博文妙笔长期课二年级春季面授2025', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-05-16', size: '0 B' },
              { name: '【全国】语文博文书香五年级寒假版面2025(学习机游戏合集)', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-05-16', size: '22.7 KB' },
              { name: '【全国】语文博文书香六年级寒假版面2025(学习机游戏合集)', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-05-16', size: '25.6 KB' },
              { name: '【全国】英语KSA门级-A三年级寒假版面2021', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-09-16', size: '124.5 MB' },
              { name: '1', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2026-08-18', size: '5.6 GB' },
              { name: '9', kind: 'folder', creator: '彭振雷', modifier: 'pengzhenlei', time: '2026-08-07', size: '1.5 GB' },
              /* 文件 */
              { name: '1级8秋第3章我是小花园-iteachPPT.pptx', creator: '彭振雷', modifier: 'pengzhenlei', time: '2026-08-26', size: '55.0 MB' },
              { name: '3级8秋第1章-太空旅行-授课PPT.pptx',   creator: '彭振雷', modifier: 'pengzhenlei', time: '2026-06-04', size: '81.2 MB' },
              { name: '3年级秋季第12章全能的祝福-iteachPPT(1).pptx', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-08-29', size: '22.5 MB' },
              { name: '11', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-08-14', size: '135.6 KB' },
              { name: '49ADE140-E1BB-4d6d-928C-B8973AE71A9.png', creator: '彭振雷', modifier: 'pengzhenlei', time: '2024-07-09', size: '218.4 KB' },
              { name: '111', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-07-17', size: '67.7 KB' },
              { name: '1136824-bugy-2024-06-04-pptx-预览播放模式预览的最大化苹果.pptx', creator: '彭振雷', modifier: 'pengzhenlei', time: '2024-06-17', size: '124.5 MB' },
              { name: 'L4第1课-画图键标记-说课稿.pptx', creator: '彭振雷', modifier: 'pengzhenlei', time: '2025-02-26', size: '31.7 MB' },
              { name: 'WPS就能Teach1.2.pptx', creator: '彭振雷', modifier: 'pengzhenlei', time: '2024-06-27', size: '2.7 MB' }
            ]
          }
        }
      ]
    }
  ]
};
