/* ============================================================
 * iTeach 工作台 2.0 原型框架 · 渲染引擎（含可视化编辑）
 * 读取 config/menu.js（菜单）+ config/pages/*.js（页面配置）
 * 编辑模式下：双击文字修改、块增删排序、自动保存 localStorage
 * ============================================================ */
(function () {
  const { createApp } = Vue;
  const EMBED_MODE = new URLSearchParams(location.search).get('embed') === '1';

  /* ---------- 内置线性图标（SVG path） ---------- */
  const ICONS = {
    home: '<path d="M3 9.5 12 3l9 6.5V21h-6v-6H9v6H3z"/>',
    folder: '<path d="M3 6a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>',
    gauge: '<path d="M12 15l4-4"/><path d="M20.5 18.5a9 9 0 1 0-17 0"/><circle cx="12" cy="15" r="1.6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    school: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 10v6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4a0 0 0 0 0 0 4h3M17 6h3a0 0 0 0 1 0 4h-3"/>',
    chart: '<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="12" y="7" width="3" height="11"/><rect x="17" y="13" width="3" height="5"/>',
    trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
    tools: '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    gift: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v8h14v-8"/><path d="M12 8v12"/><path d="M12 8c-2 0-4-1.5-4-3.5S10 2 12 2s4 1.5 4 3.5-2 2.5-4 2.5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    cap: '<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    play: '<path d="M6 4l14 8-14 8z"/>',
    note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
    /* 用于一级文件夹列表：橙色实心文件夹，带顶部投影 */
    'folder-tab': '<path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h4l2 1.6h9A2.5 2.5 0 0 1 22 8.1V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.5z" fill="#f59e0b"/>' +
      '<path d="M2 7.5h20" stroke="#fbbf24" stroke-width="0.6" stroke-linecap="round" opacity="0.7"/>',
    /* 二级文件列表：按类型 */
    'file-ppt': '<rect x="3" y="3" width="18" height="18" rx="2" fill="#fff"/><path d="M7 8h7l3 3v8H7z" fill="#dc2626"/><path d="M14 8v3h3" fill="#fca5a5"/>' +
      '<rect x="8.5" y="13" width="7" height="1.2" rx="0.6" fill="#fff"/><rect x="8.5" y="15" width="5" height="1.2" rx="0.6" fill="#fff"/>',
    'file-img': '<rect x="3" y="3" width="18" height="18" rx="2" fill="#fff"/><rect x="5" y="5" width="14" height="14" rx="1" fill="#a78bfa"/>' +
      '<circle cx="9" cy="9" r="1.4" fill="#fff"/><path d="M7 17l3-3 2 2 3-3 3 4H7z" fill="#fff"/>',
    'file-zip': '<rect x="3" y="3" width="18" height="18" rx="2" fill="#fff"/><path d="M9 3v18M12 3v4M12 9v3M12 14v3M12 19v2" stroke="#7c3aed" stroke-width="1.4"/>',
    'file-doc': '<rect x="3" y="3" width="18" height="18" rx="2" fill="#fff"/><path d="M13 3v6h6" fill="#e5e7eb"/>' +
      '<path d="M8 13h7M8 16h7M8 19h4" stroke="#2563eb" stroke-width="1.4"/>',
    /* 练习行：蓝色练习文档图标 */
    'file-ex': '<path d="M5 3h10.5L19 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="#3b82f6"/>' +
      '<path d="M8 10h8M8 13.5h8M8 17h5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>',
    'file-folder': '<path d="M2 7.5A1.5 1.5 0 0 1 3.5 6h4l2 2h11A1.5 1.5 0 0 1 22 9.5V19a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" fill="#f59e0b"/>',
    /* 云盘二级列表：Excel 文件绿色图标 */
    'file-xls': '<rect x="3" y="3" width="18" height="18" rx="2" fill="#10b981"/><path d="M9 8l6 8M15 8l-6 8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>',
    /* 云盘行内操作图标 */
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r="0.6" fill="currentColor"/>',
    more: '<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>',
    back: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5-5 5 5"/><path d="M12 5v12"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" stroke-width="2.4"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    /* 组卷页：购物车 / 拍照搜题 */
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.6 12h10.8L21 8H6"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7l1.5-2.5h3L15 7"/><circle cx="12" cy="13" r="3.5"/>'
  };

  /* ---------- 新增块的默认模板 ---------- */
  const BLOCK_TEMPLATES = {
    toolbar: { type: 'toolbar', buttons: [{ label: '新建', primary: true, action: { kind: 'message', text: '演示' } }] },
    filter: { type: 'filter', fields: [{ label: '关键词', key: 'kw', type: 'input', placeholder: '请输入' }] },
    table: { type: 'table', index: true, columns: [{ label: '名称', prop: 'name', bold: true }], data: [{ name: '示例数据' }], actions: [{ label: '查看', action: { kind: 'message', text: '查看详情' } }] },
    cards: { type: 'cards', items: [{ label: '指标', value: '0', note: '说明' }] },
    desc: { type: 'desc', title: '信息', items: [{ label: '字段', value: '值' }] },
    steps: { type: 'steps', items: [{ title: '步骤1', desc: '说明', status: 'active' }] },
    alert: { type: 'alert', style: 'info', text: '提示内容' },
    chart: { type: 'chart', title: '趋势', bars: [{ label: '1月', value: 50 }, { label: '2月', value: 70, high: true }] },
    note: { type: 'note', text: '说明文字' },
    placeholder: { type: 'placeholder', icon: 'tools', title: '原型待补充', desc: '描述', owner: '' },
    tabs: { type: 'tabs', tabs: [{ name: '页签1', blocks: [{ type: 'note', text: '页签内容' }] }] },
    columns: {
      type: 'columns',
      columns: [
        { flex: 1, blocks: [{ type: 'note', text: '左栏内容' }] },
        { flex: 1, blocks: [{ type: 'note', text: '右栏内容' }] }
      ]
    }
  };

  /* ---------- 布局模板库：一键插入成套结构 ---------- */
  const LAYOUT_TEMPLATES = {
    '双栏布局': [
      {
        type: 'columns',
        columns: [
          { flex: 1, blocks: [{ type: 'desc', title: '左栏信息', items: [{ label: '字段', value: '值' }] }] },
          { flex: 1, blocks: [{ type: 'desc', title: '右栏信息', items: [{ label: '字段', value: '值' }] }] }
        ]
      }
    ],
    '筛选条 + 表格': [
      { type: 'filter', fields: [{ label: '关键词', key: 'kw', type: 'input', placeholder: '请输入' }] },
      { type: 'table', index: true, columns: [{ label: '名称', prop: 'name', bold: true }, { label: '状态', prop: 'status' }], data: [{ name: '示例', status: '正常' }], actions: [{ label: '查看', action: { kind: 'message', text: '查看详情' } }] }
    ],
    '工具栏 + 表格': [
      { type: 'toolbar', buttons: [{ label: '新建', primary: true, action: { kind: 'message', text: '新建' } }, { label: '导入', action: { kind: 'message', text: '导入' } }] },
      { type: 'table', index: true, columns: [{ label: '名称', prop: 'name', bold: true }, { label: '创建人', prop: 'creator', width: '110px' }], data: [{ name: '示例', creator: '彭振雷' }], actions: [{ label: '查看', action: { kind: 'message', text: '查看详情' } }] }
    ],
    '统计卡片组': [
      { type: 'cards', items: [
        { label: '指标一', value: '0', note: '说明' },
        { label: '指标二', value: '0', note: '说明' },
        { label: '指标三', value: '0', note: '说明' }
      ] }
    ],
    '详情信息': [
      { type: 'desc', title: '详细信息', items: [
        { label: '字段一', value: '值一' },
        { label: '字段二', value: '值二' },
        { label: '字段三', value: '值三' }
      ] }
    ],
    '流程步骤': [
      { type: 'steps', items: [
        { title: '步骤一', desc: '说明', status: 'active' },
        { title: '步骤二', desc: '说明', status: 'todo' },
        { title: '步骤三', desc: '说明', status: 'todo' }
      ] }
    ],
    '提示条 + 表格': [
      { type: 'alert', style: 'info', text: '提示说明文字' },
      { type: 'table', columns: [{ label: '名称', prop: 'name', bold: true }], data: [{ name: '示例' }] }
    ]
  };

  /* ---------- 路径工具：按字符串路径读写配置 ---------- */
  function getByPath(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }
  function setByPath(obj, path, value) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      if (cur[parts[i]] == null) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  /* ---------- 根组件 ---------- */
  const app = createApp({
    data() {
      return {
        menu: JSON.parse(JSON.stringify(window.APP_MENU || { groups: [] })), // 可编辑副本
        roles: [
          { id: 'teacher', name: '授课教师' },
          { id: 'researcher', name: '教研' },
          { id: 'assistant', name: '助教' },
          { id: 'consultant', name: '顾问' },
          { id: 'operator', name: '学科运营' }
        ],
        currentRole: 'teacher',
        currentPage: null,
        navStack: [],
        navTitles: [],
        lianxiRestoreTab: null,  // 从绑定练习返回时要恢复的练习中心 tab 名（收伪层级后用）
        tabState: {},
        bangdingCtx: null,
        filters: {},
        dialogVisible: false,
        dialogConfig: null,
        dialogForm: {},
        toasts: [],

        /* 编辑模式 */
        editMode: false,
        livePage: null,          // 当前页实时配置（深拷贝，可编辑）
        editDialog: false,       // 文字编辑弹窗
        editPath: '',            // 正在编辑的路径
        editValue: '',
        addDialog: false,        // 添加模块弹窗
        addTarget: '',           // 添加到的父路径（如 'blocks' 或 'blocks.0.tabs.0.blocks'）
        addIndex: -1,            // 插入位置，-1=末尾

        /* 保存小助手（本地服务）状态：null=探测中 / true=已连通 / false=未启动 */
        svcOn: null,

        /* 云盘 / 练习下钻视图状态:
         *   key = 「挂载路径:tabIndex」复合键（备课中心与练习中心相互隔离）
         *   value = null 表示一级页面（只读文件夹列表）
         *   value = 路径数组 表示已下钻（校本为 [学校, 科目]）
         * 个人（云盘/练习）tab 始终为 null（flat，进入即支持操作） */
        beikeView: {},

        /* 拖拽排序（编辑模式） */
        dragSrcPath: null,   // 正在拖拽的模块路径，如 'blocks.2' 或 'blocks.0.tabs.1.blocks.2'
        dragOverPath: null,  // 当前悬停的目标模块路径（用于显示指示线）

        /* 模块设置面板（编辑模式） */
        settingsDialog: false,    // 设置弹窗显隐
        settingsPath: '',         // 正在设置的模块路径
        settingsSchema: [],       // 当前模块的字段配置（[{key,label,type,options,def}]）
        settingsForm: {}          // 表单值
      };
    },

    computed: {
      visibleGroups() {
        return this.menu.groups
          .map((g) => ({
            name: g.name,
            items: (g.items || []).filter(
              (it) => !it.roles || it.roles.indexOf(this.currentRole) !== -1
            )
          }))
          // 编辑模式下显示空分组（方便向新建分组添加菜单），演示模式隐藏空分组
          .filter((g) => this.editMode || g.items.length > 0);
      },
      currentPageName() {
        if (this.livePage && this.livePage.name) return this.livePage.name;
        var cfg = window.APP_PAGES[this.currentPage];
        return (cfg && cfg.name) || (this.findMenuItem(this.currentPage) || {}).name || '未命名页面';
      },
      breadcrumb() {
        if (this.livePage && this.livePage.breadcrumb) return this.livePage.breadcrumb;
        var cfg = window.APP_PAGES[this.currentPage];
        if (cfg && cfg.breadcrumb) return cfg.breadcrumb;
        return this.findGroupName(this.currentPage) || '';
      },
      crumbChain() {
        // 导航栈即面包屑层级链（[一级入口, ..., 当前页]）
        return this.navStack.length ? this.navStack : [this.currentPage];
      },
      crumbModule() {
        return this.groupName(this.crumbChain[0] || this.currentPage);
      },
      crumbList() {
        var self = this;
        return this.crumbChain.map(function (id, idx) {
          var cfg = window.APP_PAGES[id];
          var mi = self.findMenuItem(id);
          // 入口按钮文案优先（如 打印错题）；否则一级用菜单名（如 学情服务），二级及以后用页面配置名（如 学情报告）
          var t = (self.navTitles || [])[idx];
          var name = t || (idx === 0
            ? ((mi || {}).name || (cfg && cfg.name) || id)
            : ((cfg && cfg.name) || (mi || {}).name || id));
          return { id: id, name: name };
        });
      },
      pageBlocks() {
        if (this.livePage && this.livePage.blocks) return this.livePage.blocks;
        return [];
      },
      /* 全屏页（如 我要组卷）：隐藏侧栏 / 顶栏 / 面包屑，页面自带顶栏 */
      fullPage() {
        var cfg = window.APP_PAGES[this.currentPage];
        return !!(cfg && cfg.fullPage);
      },
      /* 布局模板名称 + 描述（供添加模块面板展示） */
      layoutNames() {
        return [
          { n: '双栏布局', d: '左右两栏，信息分区展示' },
          { n: '筛选条 + 表格', d: '标准列表页：筛选+表格' },
          { n: '工具栏 + 表格', d: '操作页：工具按钮+表格' },
          { n: '统计卡片组', d: '3 张指标卡片' },
          { n: '详情信息', d: '字段值详情展示' },
          { n: '流程步骤', d: '3 步流程步骤条' },
          { n: '提示条 + 表格', d: '提示说明+数据表格' }
        ];
      }
    },

    provide() {
      return { root: this };
    },

    watch: {
      /* 进入编辑模式即探测保存服务，驱动顶栏状态标识 */
      editMode(v) {
        if (v) this.checkService();
      }
    },

    methods: {
      iconSvg(name) {
        return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
          (ICONS[name] || ICONS.home) + '</svg>';
      },

      /* 根据表格行的 icon / kind 字段返回文件类型图标的 SVG 字符串（带 viewBox） */
      rowIconSvg(row) {
        if (!row) return '';
        var key = row.icon || row.kind || '';
        // kind → 内部图标 key 映射（行内约定的英文简写）
        var kindMap = { folder: 'folder-tab', ppt: 'file-ppt', img: 'file-img', doc: 'file-doc', zip: 'file-zip', xls: 'file-xls', ex: 'file-ex' };
        if (kindMap[key]) key = kindMap[key];
        // 兼容：扩展名识别
        if (!key && typeof row.name === 'string') {
          var n = row.name.toLowerCase();
          if (n.endsWith('.ppt') || n.endsWith('.pptx')) key = 'file-ppt';
          else if (n.endsWith('.png') || n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.gif')) key = 'file-img';
          else if (n.endsWith('.zip') || n.endsWith('.rar')) key = 'file-zip';
          else if (n.endsWith('.doc') || n.endsWith('.docx')) key = 'file-doc';
          else if (n.endsWith('.xls') || n.endsWith('.xlsx')) key = 'file-xls';
          else key = 'note'; // 默认通用文档图标
        }
        var path = ICONS[key || 'note'];
        if (!path) path = ICONS.note;
        // 文件类型图标默认 22 像素
        var size = (key === 'folder-tab' || key === 'file-folder') ? 22 : 18;
        return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="none">' + path + '</svg>';
      },

      /* 表格行是否带文件类型图标(决定是否在名称前显示图标) */
      hasFileIcon(row) {
        if (!row) return false;
        if (row.icon || row.kind) return true;
        if (typeof row.name === 'string') {
          var n = row.name.toLowerCase();
          return /\.pptx?$|\.png$|\.jpe?g$|\.gif$|\.zip$|\.rar$|\.docx?$/.test(n);
        }
        return false;
      },

      /* 把行中的 kind / icon 字段映射为中文显示标签（表格"类型"列展示用） */
      kindLabel(row) {
        if (!row) return '';
        var k = row.kind || row.icon || '';
        if (!k && typeof row.name === 'string') {
          var n = row.name.toLowerCase();
          if (n.endsWith('.ppt') || n.endsWith('.pptx')) k = 'ppt';
          else if (n.endsWith('.png') || n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.gif')) k = 'img';
          else if (n.endsWith('.zip') || n.endsWith('.rar')) k = 'zip';
          else if (n.endsWith('.doc') || n.endsWith('.docx')) k = 'doc';
        }
        var map = {
          folder: '文件夹', ppt: '课件', img: '图片',
          doc: '文件', zip: '压缩包', file: '文件'
        };
        if (map[k]) return map[k];
        if (typeof row.label === 'string') return row.label;
        return k || '';
      },

      openPage(id) {
        this.currentPage = id;
        this.tabState = {};
        // 切换页面时重置云盘 / 练习下钻视图状态
        this.beikeView = {};
        this.loadPage();
        this.syncHash();
      },
      applyInitialTab() {
        var params = new URLSearchParams(location.search);
        var raw = params.get('tab');
        if (raw == null || raw === '') return;
        var tab = Number(raw);
        if (!Number.isInteger(tab) || tab < 0) return;
        this.tabState = Object.assign({}, this.tabState, { 0: tab, 'blocks.0': tab });
        var school = params.get('school');
        if (school && tab === 1 && (this.currentPage === 'beike' || this.currentPage === 'lianxi')) {
          this.beikeView = Object.assign({}, this.beikeView, { ['blocks.0:' + tab]: [school] });
        }
      },
      /* 导航栈同步到 URL hash（形如 #banji/bangding；带入口按钮文案时形如 #kebiao/xueqing~%E6%89%93%E5%8D%B0%E9%94%99%E9%A2%98） */
      syncHash() {
        var self = this;
        var segs = this.navStack.map(function (id, i) {
          var t = (self.navTitles || [])[i];
          return t ? id + '~' + t : id;
        });
        var h = '#' + segs.map(encodeURIComponent).join('/');
        try {
          if (location.hash !== h) history.replaceState(null, '', h);
        } catch (e) { location.hash = h; }
      },
      /* 菜单点击：重置导航栈为一级 */
      goPage(item) {
        this.navStack = [item.id];
        this.navTitles = [null];
        this.openPage(item.id);
      },
      /* 页内跳转：压栈形成二级及以后层级；title = 入口按钮文案（决定面包屑末级展示） */
      navTo(id, title) {
        this.navStack = this.navStack.concat([id]);
        this.navTitles = (this.navTitles || []).concat([title || null]);
        this.openPage(id);
      },
      /* 面包屑返回：弹栈回上一级；若回到练习中心绑定伪层级则收成一级 */
      goBack() {
        if (this.navStack.length > 1) {
          this.navStack = this.navStack.slice(0, -1);
          this.navTitles = (this.navTitles || []).slice(0, -1);
          this.collapseLianxiBindPseudo();
          this.openPage(this.navStack[this.navStack.length - 1]);
        }
      },
      /* 点击面包屑某一级：截栈跳转；同样收掉练习中心绑定伪层级 */
      crumbGo(index) {
        if (index >= 0 && index < this.navStack.length - 1) {
          this.navStack = this.navStack.slice(0, index + 1);
          this.navTitles = (this.navTitles || []).slice(0, index + 1);
          this.collapseLianxiBindPseudo();
          this.openPage(this.navStack[this.navStack.length - 1]);
        }
      },
      /* 练习中心绑定 tab 伪层级收成一级：回到课程产品/班级绑定后去掉「返回 + 中间段」面包屑，避免像 BUG */
      collapseLianxiBindPseudo() {
        var st = this.navStack || [];
        var tt = this.navTitles || [];
        if (st.length === 2 && st[0] === 'lianxi' && st[1] === 'lianxi' && tt[1]) {
          this.lianxiRestoreTab = tt[1];
          this.navStack = ['lianxi'];
          this.navTitles = [null];
          return true;
        }
        return false;
      },
      /* 我要组卷：新浏览器窗口打开组卷页（hash 还原导航栈） */
      openZujuan() {
        window.open(location.href.split('#')[0] + '#zujuan', '_blank');
      },

      /* 备课中心 / 练习中心：进入文件夹（沿路径数组下钻一级）
       *   tabIndex: 视图状态 key（beike-view 传「挂载路径:tabIndex」复合键；通用表格 folderMode 传数字）
       *   folderName: 选中的文件夹名 */
      selectFolder(tabIndex, folderName) {
        var path = this.beikePath(tabIndex);
        path.push(folderName);
        this.beikeView = { ...this.beikeView, [tabIndex]: path };
      },

      /* 备课中心：beikeView 值归一化为路径数组（null→[]，字符串→[name]，数组→副本） */
      beikePath(tabIndex) {
        var v = this.beikeView[tabIndex];
        if (v == null) return [];
        if (typeof v === 'string') return [v];
        return v.slice();
      },

      /* 备课中心：返回上一级目录（一级时回到一级列表） */
      beikeBack(tabIndex) {
        var path = this.beikePath(tabIndex);
        path.pop();
        this.beikeView = { ...this.beikeView, [tabIndex]: path.length ? path : null };
      },

      /* 备课中心：跳到指定深度（0 = 一级列表） */
      beikeGo(tabIndex, depth) {
        var path = this.beikePath(tabIndex).slice(0, depth);
        this.beikeView = { ...this.beikeView, [tabIndex]: path.length ? path : null };
      },

      /* 备课中心：返回一级页面（文件夹列表） */
      backToFolderList(tabIndex) {
        this.beikeGo(tabIndex, 0);
      },

      /* 加载当前页配置：优先读配置文件（服务模式下每次编辑已实时写回文件），无服务时用 localStorage 兜底 */
      loadPage() {
        var id = this.currentPage;
        var base = window.APP_PAGES[id];
        var blocks = [];
        var name = (base && base.name) || (this.findMenuItem(id) || {}).name || '未命名页面';
        var breadcrumb = (base && base.breadcrumb) || this.findGroupName(id) || '';
        if (base && base.blocks) {
          blocks = JSON.parse(JSON.stringify(base.blocks));
        } else {
          var item = this.findMenuItem(id);
          blocks = [{
            type: 'placeholder',
            icon: (item || {}).icon || 'tools',
            title: name + ' · 原型待补充',
            desc: '该模块由对应产品负责人输出，页面配置未创建',
            owner: (item || {}).owner || '待确认'
          }];
        }
        this.livePage = { name: name, breadcrumb: breadcrumb, blocks: blocks };
        // 无服务期间的兜底缓存（iteach_ovr_*）读回：保证服务不可用时编辑也不丢
        try {
          var ovr = localStorage.getItem('iteach_ovr_' + id);
          if (ovr) {
            var o = JSON.parse(ovr);
            if (o && Array.isArray(o.blocks)) this.livePage = o;
          }
        } catch (e) {}
      },

      /* 保存当前页：有本地服务 → 实时写回 config/pages/*.js 配置文件；无服务 → localStorage 兜底 */
      /* 服务地址：http 打开用同源；file:// 打开直连本机服务（服务端已跨域放行） */
      apiBase() {
        return location.protocol.indexOf('http') === 0 ? location.origin : 'http://127.0.0.1:8642';
      },

      /* 探测「保存小助手」是否启动，结果驱动顶部横幅 */
      checkService() {
        var self = this;
        fetch(this.apiBase() + '/api/ping', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (res) {
          self.svcOn = !!(res && res.ok);
        }).catch(function () { self.svcOn = false; });
      },

      /* 顶栏「一键启动」：浏览器安全限制无法直接拉起本地程序，
         先重新探测（可能正在开机自启中），仍不可用则大白话告知双击 start.command */
      tryStartSvc() {
        var self = this;
        this.toast('正在检测保存服务…', 'info');
        this.checkService();
        setTimeout(function () {
          if (self.svcOn) {
            self.toast('保存服务已连通，你改的内容会自动写进配置文件', 'success');
          } else {
            self.toast('浏览器安全规则不让网页直接启动本地程序：请打开本页面所在文件夹，双击 start.command 一次（弹出黑窗口不关就是启动好了），再点一次「一键启动」检测', 'warning');
          }
        }, 1200);
      },
      savePage() {
        if (!this.currentPage || !this.livePage) return;
        var self = this;
        var payload = { id: this.currentPage, config: this.livePage };
        var api = this.apiBase() + '/api/save-page';
        if (api) {
          fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(function (r) { return r.json(); }).then(function (res) {
            if (res && res.success) {
              // 已写入配置文件，清掉兜底缓存，避免旧缓存遮盖文件内容
              try { localStorage.removeItem('iteach_ovr_' + self.currentPage); } catch (e) {}
              self.toast('已保存到配置文件 ' + res.file, 'success');
            } else {
              self.fallbackSave();
            }
          }).catch(function () { self.fallbackSave(); });
        } else {
          this.fallbackSave();
        }
      },

      /* 无服务时的兜底：写 localStorage，并明确提示（避免用户误以为已持久化） */
      fallbackSave() {
        try {
          localStorage.setItem('iteach_ovr_' + this.currentPage, JSON.stringify(this.livePage));
        } catch (e) {}
        this.toast('没连上「保存小助手」，已临时存在浏览器缓存。双击文件夹里的 start.command 启动它，编辑才会写进配置文件', 'warning');
      },

      /* 重置当前页为原始配置（仅清兜底缓存；配置文件模式下刷新即还原） */
      resetPage() {
        if (!confirm('确定重置当前页为原始配置？')) return;
        try { localStorage.removeItem('iteach_ovr_' + this.currentPage); } catch (e) {}
        // 若服务可用，直接调用保存接口把原始配置写回文件
        var self = this;
        var base = window.APP_PAGES[this.currentPage];
        if (base) {
          this.livePage = JSON.parse(JSON.stringify(base));
          this.savePage();
        } else {
          this.loadPage();
        }
        this.toast('已重置为原始配置', 'success');
      },

      /* ========== 菜单编辑 ========== */

      /* 保存菜单到 config/menu.js（有服务时实时写文件） */
      saveMenu() {
        var self = this;
        var api = this.apiBase() + '/api/save-menu';
        if (api) {
          fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ menu: this.menu })
          }).then(function (r) { return r.json(); }).then(function (res) {
            if (res && res.success) self.toast('菜单已保存到 ' + res.file, 'success');
            else self.toast('菜单保存失败：' + (res && res.error || '未知错误'), 'warning');
          }).catch(function () {
            self.toast('未检测到本地服务，菜单改动未写入文件', 'warning');
          });
        } else {
          this.toast('未检测到本地服务，菜单改动未写入文件', 'warning');
        }
      },

      /* 菜单改名（gi=分组下标, ii=菜单项下标, 传 -1 表示改分组名） */
      editMenuName(gi, ii) {
        if (!this.editMode) return;
        var cur = ii === -1 ? this.menu.groups[gi].name : this.menu.groups[gi].items[ii].name;
        var nv = prompt('请输入新名称：', cur);
        if (nv == null || nv === '') return;
        if (ii === -1) this.menu.groups[gi].name = nv;
        else this.menu.groups[gi].items[ii].name = nv;
        this.saveMenu();
      },

      /* 新增分组（组名允许留空——留空表示独立入口，不显示分组标题） */
      addGroup() {
        if (!this.editMode) return;
        var nv = prompt('请输入新分组名称（留空 = 独立入口，不显示分组标题）：', '');
        if (nv == null) return;  // 取消
        nv = (nv || '').trim();
        this.menu.groups.push({ name: nv, items: [] });
        this.saveMenu();
        this.toast(nv ? '已添加分组「' + nv + '」' : '已添加独立入口（无分组标题）', 'success');
      },

      /* 删除分组 */
      delGroup(gi) {
        if (!this.editMode) return;
        var g = this.menu.groups[gi];
        if (!confirm('确定删除分组「' + g.name + '」及其下 ' + (g.items || []).length + ' 个菜单？')) return;
        this.menu.groups.splice(gi, 1);
        this.saveMenu();
        // 若当前页在被删分组内，跳回首页
        if (!this.findMenuItem(this.currentPage)) {
          var first = this.visibleGroups[0];
          if (first && first.items[0]) this.goPage(first.items[0]);
        }
      },

      /* 分组内新增菜单项 */
      addItem(gi) {
        if (!this.editMode) return;
        var nv = prompt('请输入新菜单名称：', '新菜单');
        if (nv == null || nv === '') return;
        var id = 'm' + Date.now().toString(36);
        var g = this.menu.groups[gi];
        if (!g.items) g.items = [];
        g.items.push({ id: id, name: nv, icon: 'note' });
        this.saveMenu();
        this.toast('已添加菜单「' + nv + '」（点击即可进入占位页编辑内容）', 'success');
      },

      /* 删除菜单项 */
      delItem(gi, ii) {
        if (!this.editMode) return;
        var it = this.menu.groups[gi].items[ii];
        if (!confirm('确定删除菜单「' + it.name + '」？')) return;
        this.menu.groups[gi].items.splice(ii, 1);
        this.saveMenu();
        if (it.id === this.currentPage) {
          var first = this.visibleGroups[0];
          if (first && first.items[0]) this.goPage(first.items[0]);
        }
      },

      /* 导出当前页配置为 js 文件（可替换 config/pages/xx.js） */
      exportPage() {
        if (!this.currentPage || !this.livePage) return;
        var id = this.currentPage;
        var json = JSON.stringify(this.livePage, null, 2);
        var text = '/* 由可视化编辑导出（' + new Date().toLocaleString() + '） */\nwindow.APP_PAGES[\'' + id + '\'] = ' + json + ';\n';
        var blob = new Blob([text], { type: 'text/javascript' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = id + '.js';
        a.click();
        URL.revokeObjectURL(a.href);
        this.toast('已导出 ' + id + '.js，可替换 config/pages/ 下同名文件', 'success');
      },

      /* 双击文字 → 打开编辑弹窗 */
      editText(path) {
        if (!this.editMode) return;
        this.editPath = path;
        this.editValue = getByPath(this.livePage, path);
        if (this.editValue == null) this.editValue = '';
        this.editDialog = true;
      },

      /* 保存文字修改 */
      saveEdit() {
        setByPath(this.livePage, this.editPath, this.editValue);
        this.editDialog = false;
        this.savePage();
      },

      /* 打开添加模块面板 */
      openAdd(targetPath, index) {
        this.addTarget = targetPath;
        this.addIndex = (index == null ? -1 : index);
        this.addDialog = true;
      },

      /* 插入新模块 */
      addBlock(type) {
        var template = JSON.parse(JSON.stringify(BLOCK_TEMPLATES[type] || BLOCK_TEMPLATES.note));
        var parent = getByPath(this.livePage, this.addTarget);
        if (!Array.isArray(parent)) return;
        if (this.addIndex === -1) parent.push(template);
        else parent.splice(this.addIndex, 0, template);
        this.addDialog = false;
        this.savePage();
        this.toast('已添加「' + (type === 'table' ? '表格' : type === 'cards' ? '统计卡片' : type === 'toolbar' ? '工具栏' : type === 'tabs' ? '页签' : type === 'alert' ? '提示条' : type === 'chart' ? '图表' : type === 'desc' ? '详情' : type === 'steps' ? '步骤' : type === 'filter' ? '筛选' : type === 'note' ? '说明' : type === 'columns' ? '双栏布局' : '模块') + '」', 'success');
      },

      /* 插入整套布局模板（一个模板 = 多个 block） */
      addLayout(name) {
        var tpl = LAYOUT_TEMPLATES[name];
        if (!tpl) return;
        var blocks = JSON.parse(JSON.stringify(tpl));
        var parent = getByPath(this.livePage, this.addTarget);
        if (!Array.isArray(parent)) return;
        if (this.addIndex === -1) parent.push.apply(parent, blocks);
        else {
          for (var i = blocks.length - 1; i >= 0; i--) parent.splice(this.addIndex, 0, blocks[i]);
        }
        this.addDialog = false;
        this.savePage();
        this.toast('已插入布局模板「' + name + '」', 'success');
      },

      /* 删除模块 */
      delBlock(path) {
        if (!this.editMode || !confirm('确定删除该模块？')) return;
        var parts = path.split('.');
        var key = parts.pop();
        var parent = getByPath(this.livePage, parts.join('.'));
        if (Array.isArray(parent)) parent.splice(parseInt(key), 1);
        else if (parent && key in parent) delete parent[key];
        this.savePage();
        this.toast('已删除模块', 'success');
      },

      /* 复制模块到其后方 */
      dupBlock(path) {
        if (!this.editMode) return;
        var parts = path.split('.');
        var key = parts.pop();
        var parent = getByPath(this.livePage, parts.join('.'));
        if (!Array.isArray(parent)) return;
        var idx = parseInt(key);
        var clone = JSON.parse(JSON.stringify(parent[idx]));
        parent.splice(idx + 1, 0, clone);
        this.savePage();
        this.toast('已复制模块', 'success');
      },

      /* 上移 / 下移模块 */
      moveBlock(path, dir) {
        if (!this.editMode) return;
        var parts = path.split('.');
        var key = parseInt(parts.pop());
        var parent = getByPath(this.livePage, parts.join('.'));
        if (!Array.isArray(parent)) return;
        var to = key + dir;
        if (to < 0 || to >= parent.length) return;
        var tmp = parent[key];
        parent[key] = parent[to];
        parent[to] = tmp;
        this.savePage();
      },

      /* ========== 拖拽排序（编辑模式） ========== */

      /* 解析模块路径 → { parent: 父数组, index: 下标 } */
      parseBlockPath(path) {
        var parts = path.split('.');
        var index = parseInt(parts.pop());
        var parent = getByPath(this.livePage, parts.join('.'));
        if (!Array.isArray(parent)) return null;
        return { parent: parent, index: index };
      },

      /* 开始拖拽：记录源模块路径 */
      dragStart(path, ev) {
        if (!this.editMode) return;
        this.dragSrcPath = path;
        // 兼容部分浏览器：必须设置 dataTransfer 才能触发拖拽
        if (ev && ev.dataTransfer) {
          try { ev.dataTransfer.effectAllowed = 'move'; } catch (e) {}
        }
      },

      /* 拖拽经过目标模块：显示指示线 */
      dragOverBlock(path, ev) {
        if (!this.editMode || !this.dragSrcPath) return;
        if (ev && ev.preventDefault) ev.preventDefault();
        if (ev && ev.dataTransfer) { try { ev.dataTransfer.dropEffect = 'move'; } catch (e) {} }
        this.dragOverPath = path;
      },

      /* 松手：把源模块移动到目标位置 */
      dropBlock(path, ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        if (!this.editMode || !this.dragSrcPath) { this.dragOverPath = null; return; }
        var src = this.parseBlockPath(this.dragSrcPath);
        var dst = this.parseBlockPath(path);
        this.dragOverPath = null;
        if (!src || !dst || src.parent !== dst.parent) { this.dragSrcPath = null; return; }
        // 同一父数组内移动：先移除源，再插入目标下标
        var block = src.parent[src.index];
        src.parent.splice(src.index, 1);
        var to = dst.index;
        if (src.index < dst.index) to -= 1;  // 源被移除后，目标下标整体前移 1
        if (to < 0) to = 0;
        if (to > src.parent.length) to = src.parent.length;
        src.parent.splice(to, 0, block);
        this.dragSrcPath = null;
        this.savePage();
        this.toast('已移动模块位置', 'success');
      },

      /* 拖拽结束：清理状态 */
      dragEndBlock() {
        this.dragSrcPath = null;
        this.dragOverPath = null;
      },

      /* 判断模块是否处于拖拽悬停状态（显示指示线） */
      isDragOver(path) {
        return this.editMode && this.dragOverPath === path;
      },

      /* 判断模块是否为拖拽中的源模块（半透明） */
      isDragging(path) {
        return this.editMode && this.dragSrcPath === path;
      },

      /* ========== 模块设置面板（编辑模式） ========== */

      /* 打开模块设置弹窗：根据模块类型生成字段配置 */
      openBlockSettings(path) {
        if (!this.editMode) return;
        var block = getByPath(this.livePage, path);
        if (!block) return;
        var schema = [];
        var type = block.type;
        if (type === 'alert') {
          schema.push({ key: 'style', label: '提示样式', type: 'select', options: [
            { label: '信息（蓝）', value: 'info' },
            { label: '警告（黄）', value: 'warning' },
            { label: '成功（绿）', value: 'success' }
          ] });
        }
        if (type === 'toolbar') {
          schema.push({ key: 'right', label: '右侧说明', type: 'input', placeholder: '如：共 39 个文件' });
        }
        if (type === 'table') {
          schema.push({ key: 'index', label: '序号列', type: 'switch', tip: '显示行号列' });
          schema.push({ key: 'folderMode', label: '文件夹模式', type: 'switch', tip: '只读展示、整行点击进入下一级' });
          schema.push({ key: 'opMode', label: '操作模式', type: 'switch', tip: '勾选框 / 操作列样式' });
        }
        if (type === 'chart') {
          schema.push({ key: 'title', label: '图表标题', type: 'input', placeholder: '如：本月课时趋势' });
        }
        if (type === 'note') {
          schema.push({ key: 'text', label: '说明文字', type: 'input', placeholder: '灰字说明内容' });
        }
        if (type === 'desc' || type === 'steps' || type === 'cards') {
          schema.push({ key: 'title', label: '卡片标题', type: 'input', placeholder: '如：课程信息' });
        }
        if (type === 'tabs') {
          schema.push({ key: 'name', label: '页签组名', type: 'input', placeholder: '仅编辑模式展示' });
        }
        if (!schema.length) {
          this.toast('该模块暂无可配置项（文字内容可直接双击修改）', 'info');
          return;
        }
        // 预填当前值
        var form = {};
        schema.forEach(function (f) { form[f.key] = block[f.key] !== undefined ? block[f.key] : (f.type === 'switch' ? false : ''); });
        this.settingsPath = path;
        this.settingsSchema = schema;
        this.settingsForm = form;
        this.settingsDialog = true;
      },

      /* 保存模块设置 */
      saveBlockSettings() {
        var block = getByPath(this.livePage, this.settingsPath);
        if (!block) return;
        var self = this;
        this.settingsSchema.forEach(function (f) {
          block[f.key] = self.settingsForm[f.key];
        });
        this.settingsDialog = false;
        this.savePage();
        this.toast('模块设置已保存', 'success');
      },

      /* ========== 表格可视化编辑（编辑模式） ========== */

      /* 添加一行 */
      addTableRow(path) {
        var block = getByPath(this.livePage, path);
        if (!block || !Array.isArray(block.data)) return;
        var row = {};
        (block.columns || []).forEach(function (c) { row[c.prop] = '新数据'; });
        block.data.push(row);
        this.savePage();
      },

      /* 删除一行 */
      delTableRow(path, ri) {
        var block = getByPath(this.livePage, path);
        if (!block || !Array.isArray(block.data)) return;
        block.data.splice(ri, 1);
        this.savePage();
      },

      /* 添加一列：在每行数据中补上对应 prop（colKey/dataKey 支持一个 block 多张表） */
      addTableCol(path, colKey, dataKey) {
        colKey = colKey || 'columns'; dataKey = dataKey || 'data';
        var block = getByPath(this.livePage, path);
        if (!block) return;
        if (!Array.isArray(block[colKey])) block[colKey] = [];
        var n = block[colKey].length + 1;
        var prop = 'col' + n;
        block[colKey].push({ label: '新列' + n, prop: prop });
        (block[dataKey] || []).forEach(function (row) { row[prop] = ''; });
        this.savePage();
      },

      /* 删除一列 */
      delTableCol(path, ci, colKey, dataKey) {
        colKey = colKey || 'columns'; dataKey = dataKey || 'data';
        var block = getByPath(this.livePage, path);
        if (!block || !Array.isArray(block[colKey])) return;
        var col = block[colKey][ci];
        block[colKey].splice(ci, 1);
        (block[dataKey] || []).forEach(function (row) { delete row[col.prop]; });
        this.savePage();
      },

      /* 移动一列（编辑模式调整字段顺序） */
      moveTableCol(path, ci, dir, colKey) {
        colKey = colKey || 'columns';
        var block = getByPath(this.livePage, path);
        if (!block || !Array.isArray(block[colKey])) return;
        var to = ci + dir;
        if (to < 0 || to >= block[colKey].length) return;
        var t = block[colKey][ci];
        block[colKey][ci] = block[colKey][to];
        block[colKey][to] = t;
        this.savePage();
      },

      findMenuItem(id) {
        var found = null;
        this.menu.groups.forEach(function (g) {
          (g.items || []).forEach(function (it) {
            if (it.id === id) found = it;
          });
        });
        return found;
      },

      findGroupName(id) {
        var name = '';
        this.menu.groups.forEach(function (g) {
          (g.items || []).forEach(function (it) {
            if (it.id === id) name = g.name + ' / ' + it.name;
          });
        });
        return name;
      },
      /* 只返回菜单项所属分组名（面包屑模块用） */
      groupName(id) {
        var name = '';
        this.menu.groups.forEach(function (g) {
          (g.items || []).forEach(function (it) {
            if (it.id === id) name = g.name;
          });
        });
        return name;
      },

      onRoleChange() {
        const first = this.visibleGroups[0];
        if (!first) return;
        const firstItem = first.items[0];
        const curVisible = this.visibleGroups.some((g) =>
          g.items.some((it) => it.id === this.currentPage)
        );
        if (!curVisible && firstItem) this.goPage(firstItem);
      },

      runAction(action, label) {
        if (!action) return;
        const kind = action.kind || 'message';
        if (kind === 'message') {
          this.toast(action.text || '功能演示（原型阶段）');
        } else if (kind === 'export') {
          this.toast('已导出：' + (action.text || '文件'), 'success');
        } else if (kind === 'dialog') {
          this.openDialog(action.dialog);
        } else if (kind === 'page') {
          this.navTo(action.page, label || action.title);
        }
      },
      /* 课表课程操作链接：跳转二级页，面包屑末级展示按钮文案 */
      runScheduleAction(label) {
        if (label === '绑定练习') { this.bangdingCtx = null; this.navTo('bangding', label); return; }
        if (label === '练习详情') { this.navTo('lianxidetail', label); return; }
        if (label === '学情报告' || label === '打印错题') { this.navTo('xueqing', label); return; }
        if (label === '出勤记录') { this.navTo('chuqin', label); return; }
        this.toast(label + '（原型演示）', 'info');
      },

      toast(text, type) {
        const id = Date.now() + Math.random();
        this.toasts.push({ id, text, type: type || 'info' });
        setTimeout(() => {
          this.toasts = this.toasts.filter((t) => t.id !== id);
        }, 2600);
      },

      openDialog(cfg) {
        if (!cfg) return;
        this.dialogConfig = cfg;
        this.dialogForm = {};
        (cfg.fields || []).forEach((f) => { this.dialogForm[f.key] = f.value || ''; });
        this.dialogVisible = true;
      },

      submitDialog() {
        this.dialogVisible = false;
        this.toast('已提交：' + (this.dialogConfig.title || '表单') + '（原型演示，未接入后端）', 'success');
      },

      /* 生成日历网格（42 格 = 6 行 × 7 列），包含上下月补位 */
      buildCalDays(cal) {
        if (!cal) return [];
        const y = Number(cal.year), m = Number(cal.month);
        if (!y || !m) return [];
        const first = new Date(y, m - 1, 1);
        const last = new Date(y, m, 0);
        // 周一为每周第一天：getDay() 周日=0 → 6
        const startWeekday = (first.getDay() + 6) % 7;
        const totalDays = last.getDate();
        const eventSet = new Set(cal.eventDates || []);
        const days = [];
        // 上月尾部补位
        const prevLast = new Date(y, m - 1, 0).getDate();
        for (let i = startWeekday - 1; i >= 0; i--) {
          days.push({ label: prevLast - i, other: true, today: false, selected: false, hasEvent: false });
        }
        // 本月
        for (let d = 1; d <= totalDays; d++) {
          days.push({
            label: d,
            other: false,
            today: d === Number(cal.today),
            selected: d === Number(cal.selectedDate),
            hasEvent: eventSet.has(d)
          });
        }
        // 下月头部补位，凑满 42 格
        let next = 1;
        while (days.length < 42) {
          days.push({ label: next++, other: true, today: false, selected: false, hasEvent: false });
        }
        return days;
      }
    },

    mounted() {
      // 启动即自动探测「保存小助手」（本地服务），用横幅大白话告知状态，不让用户自己判断
      if (!EMBED_MODE) this.checkService();
      // 优先从 URL hash 还原导航栈（形如 #banji/bangding，段内 ~ 后为入口按钮文案），刷新后停留原页且保留入口路径
      var self = this;
      var pairs = [];
      try {
        pairs = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
          .map(function (s) {
            s = decodeURIComponent(s);
            var i = s.indexOf('~');
            return i === -1 ? { id: s, title: null } : { id: s.slice(0, i), title: s.slice(i + 1) || null };
          });
      } catch (e) { pairs = []; }
      var valid = pairs.length > 0 && pairs.every(function (p) {
        return self.findMenuItem(p.id) || window.APP_PAGES[p.id];
      });
      if (valid) {
        this.navStack = pairs.map(function (p) { return p.id; });
        this.navTitles = pairs.map(function (p) { return p.title; });
        // 刷新落在练习中心绑定伪层级时，收成一级并记住要恢复的 tab
        this.collapseLianxiBindPseudo();
        this.currentPage = this.navStack[this.navStack.length - 1];
        this.loadPage();
        this.applyInitialTab();
        this.syncHash();
        return;
      }
      var first = this.visibleGroups[0];
      var target = first && first.items[0];
      if (target) {
        this.goPage(target);
        this.applyInitialTab();
      }
    }
  });

  /* ---------- 通用块渲染组件（递归，支持编辑） ---------- */
  app.component('render-block', {
    props: ['block', 'ctx', 'path', 'tabInfo'],
    inject: ['root'],
    template: `
      <div>
        <!-- 工具栏 -->
        <div v-if="block.type==='toolbar'" class="card" style="padding:14px 20px">
          <div class="toolbar">
            <div class="tb-left">
              <button v-for="(b,i) in block.buttons||[]" :key="i"
                class="btn" :class="{primary:b.primary}"
                @click="root.runAction(b.action)"
                @dblclick.stop="root.editText((path||'')+'.buttons.'+i+'.label')">
                {{ b.label }}
              </button>
              <span v-if="block.hint" class="page-breadcrumb">{{ block.hint }}</span>
            </div>
            <div class="tb-right" v-if="block.right">
              <span class="page-breadcrumb">{{ block.right }}</span>
            </div>
          </div>
        </div>

        <!-- 筛选条 -->
        <div v-else-if="block.type==='filter'" class="filter-bar">
          <div v-for="(f,i) in block.fields||[]" :key="i" class="filter-item">
            <span @dblclick.stop="root.editText((path||'')+'.fields.'+i+'.label')">{{ f.label }}</span>
            <input v-if="f.type==='input'" v-model="root.filters[f.key]" :placeholder="f.placeholder||'请输入'"/>
            <select v-else-if="f.type==='select'" v-model="root.filters[f.key]">
              <option value="">{{ f.all || '全部' }}</option>
              <option v-for="(o,j) in f.options||[]" :key="j" :value="o.value||o">{{ o.label||o }}</option>
            </select>
          </div>
          <button class="btn primary" @click="root.toast('查询已执行（原型演示）','success')">查询</button>
          <button class="btn" @click="root.filters={}">重置</button>
        </div>

        <!-- 数据表格 -->
        <div v-else-if="block.type==='table'" class="table-wrap" :class="{ 'folder-mode': block.folderMode, 'op-mode': block.opMode }">
          <table>
            <thead>
              <tr>
                <th v-if="block.index && !block.folderMode" style="width:50px">#</th>
                <th v-for="(c,i) in block.columns||[]" :key="i"
                    :style="c.width?'width:'+c.width:''">
                  <span @dblclick.stop="root.editText((path||'')+'.columns.'+i+'.label')">{{ c.label }}</span>
                  <!-- 编辑模式：删列 -->
                  <span v-if="root.editMode" class="td-ops">
                    <span class="td-op danger" title="删除此列" @click.stop="root.delTableCol((path||''), i)">✕</span>
                  </span>
                </th>
                <th v-if="block.actions && block.actions.length && !block.folderMode" style="width:1%">操作</th>
                <!-- 编辑模式：加列 -->
                <th v-if="root.editMode" style="width:70px">
                  <span class="td-op" title="添加一列" @click.stop="root.addTableCol((path||''))">＋列</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,ri) in block.data||[]" :key="ri"
                  :class="{ 'folder-row': block.folderMode, 'clickable': block.folderMode || block.rowClick }"
                  @click="block.folderMode ? root.selectFolder((tabInfo && tabInfo.ti) || 0, row.name) : (block.rowClick && root.runAction(block.rowClick))">
                <td v-if="block.index && !block.folderMode" style="color:#9ca3af">{{ ri+1 }}</td>
                <td v-for="(c,i) in block.columns||[]" :key="i">
                  <span v-if="c.tag" class="cell-tag" :class="row[c.tagField||('__tag_'+c.prop)]||c.tag"
                        @dblclick.stop="root.editText((path||'')+'.data.'+ri+'.'+c.prop)">{{ row[c.prop] }}</span>
                  <span v-else-if="c.bold && (row.icon || row.kind || root.hasFileIcon(row))"
                        style="font-weight:500;display:inline-flex;align-items:center;gap:10px"
                        @dblclick.stop="root.editText((path||'')+'.data.'+ri+'.'+c.prop)">
                    <span class="file-icon" v-html="root.rowIconSvg(row)"></span>
                    <span>{{ row[c.prop] }}</span>
                  </span>
                  <span v-else-if="c.bold" style="font-weight:500"
                        @dblclick.stop="root.editText((path||'')+'.data.'+ri+'.'+c.prop)">{{ row[c.prop] }}</span>
                  <span v-else @dblclick.stop="root.editText((path||'')+'.data.'+ri+'.'+c.prop)">{{ row[c.prop] }}</span>
                </td>
                <td v-if="block.actions && block.actions.length && !block.folderMode">
                  <span v-for="(a,i) in block.actions" :key="i" class="cell-link"
                        :style="a.danger?'color:#dc2626':''"
                        @click.stop="root.runAction(a.action, a.label)"
                        @dblclick.stop="root.editText((path||'')+'.actions.'+i+'.label')">{{ a.label }}</span>
                </td>
                <!-- 编辑模式：删行 -->
                <td v-if="root.editMode" style="width:40px">
                  <span class="td-op danger" title="删除此行" @click.stop="root.delTableRow((path||''), ri)">✕</span>
                </td>
              </tr>
              <tr v-if="!(block.data||[]).length">
                <td :colspan="(block.columns||[]).length + (block.actions&&block.actions.length && !block.folderMode?1:0) + (block.index && !block.folderMode?1:0) + (root.editMode?1:0)"
                    class="table-empty">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <!-- 编辑模式：加行 -->
          <div v-if="root.editMode" class="table-add-row" @click="root.addTableRow((path||''))">＋ 添加一行</div>
        </div>

        <!-- 统计卡片 -->
        <div v-else-if="block.type==='cards'" class="cards-grid">
          <div v-for="(s,i) in block.items||[]" :key="i" class="stat-card">
            <div class="stat-label" @dblclick.stop="root.editText((path||'')+'.items.'+i+'.label')">{{ s.label }}</div>
            <div class="stat-value" :style="s.color?'color:'+s.color:''"
                 @dblclick.stop="root.editText((path||'')+'.items.'+i+'.value')">{{ s.value }}<span v-if="s.unit" class="unit">{{ s.unit }}</span></div>
            <div v-if="s.note" class="stat-note" :class="s.trend==='down'?'down':(s.trend?'up':'')"
                 @dblclick.stop="root.editText((path||'')+'.items.'+i+'.note')">{{ s.note }}</div>
          </div>
        </div>

        <!-- 详情描述 -->
        <div v-else-if="block.type==='desc'" class="card">
          <div v-if="block.title" class="card-title" @dblclick.stop="root.editText((path||'')+'.title')">{{ block.title }}</div>
          <div class="desc-grid">
            <div v-for="(d,i) in block.items||[]" :key="i" class="desc-item">
              <div class="desc-label" @dblclick.stop="root.editText((path||'')+'.items.'+i+'.label')">{{ d.label }}</div>
              <div class="desc-value" :style="d.bold?'font-weight:500':''"
                   @dblclick.stop="root.editText((path||'')+'.items.'+i+'.value')">{{ d.value }}</div>
            </div>
          </div>
        </div>

        <!-- 步骤条 -->
        <div v-else-if="block.type==='steps'" class="card">
          <div class="steps-row">
            <div v-for="(s,i) in block.items||[]" :key="i" class="step-node">
              <div class="step-dot" :class="s.status||(i===0?'active':'todo')">{{ i+1 }}</div>
              <div class="step-title" @dblclick.stop="root.editText((path||'')+'.items.'+i+'.title')">{{ s.title }}</div>
              <div class="step-desc" @dblclick.stop="root.editText((path||'')+'.items.'+i+'.desc')">{{ s.desc }}</div>
            </div>
          </div>
        </div>

        <!-- 提示条 -->
        <div v-else-if="block.type==='alert'" class="alert-box" :class="block.style||'info'">
          <div @dblclick.stop="root.editText((path||'')+'.text')">{{ block.text }}</div>
        </div>

        <!-- 柱状示意 -->
        <div v-else-if="block.type==='chart'" class="card">
          <div v-if="block.title" class="card-title" @dblclick.stop="root.editText((path||'')+'.title')">{{ block.title }}</div>
          <div class="bar-chart">
            <div v-for="(b,i) in block.bars||[]" :key="i" class="bar-col">
              <div class="bar" :class="b.high?'high':''" :style="{height:(b.value/100*120)+'px'}"></div>
              <div class="bar-label" @dblclick.stop="root.editText((path||'')+'.bars.'+i+'.label')">{{ b.label }}</div>
            </div>
          </div>
        </div>

        <!-- 多栏布局容器（编辑模式下为每个子栏渲染子块） -->
        <div v-else-if="block.type==='columns'" class="columns-layout">
          <div v-for="(col, ci) in block.columns||[]" :key="ci"
               class="columns-col"
               :style="{ flex: col.flex || 1 }">
            <template v-for="(inner, ii) in col.blocks||[]" :key="ii">
              <div class="col-block">
                <render-block :block="inner" :ctx="ctx" :path="(path||'')+'.columns.'+ci+'.blocks.'+ii" :tab-info="tabInfo" />
              </div>
            </template>
            <div v-if="root.editMode" class="col-add-btn" @click="root.openAdd((path||'')+'.columns.'+ci+'.blocks')">＋ 在此栏添加模块</div>
          </div>
        </div>

        <!-- 课表（左侧日历 + 右侧课次列表） -->
        <div v-else-if="block.type==='schedule'" class="schedule-layout">
          <!-- 左侧日历 -->
          <div class="schedule-cal card">
            <div class="cal-head">
              <div class="cal-title">{{ block.calendar.year }}年{{ block.calendar.month }}月</div>
              <div class="cal-nav">
                <button class="btn cal-nav-btn" @click="root.toast('上一月（原型演示）', 'info')" title="上一月">‹</button>
                <button class="btn cal-nav-btn" @click="root.toast('已跳到今天', 'info')">今天</button>
                <button class="btn cal-nav-btn" @click="root.toast('下一月（原型演示）', 'info')" title="下一月">›</button>
              </div>
            </div>
            <div class="cal-weekdays">
              <div v-for="w in ['一','二','三','四','五','六','日']" :key="w">{{ w }}</div>
            </div>
            <div class="cal-days">
              <div v-for="(d, di) in root.buildCalDays(block.calendar)" :key="di"
                   class="cal-day"
                   :class="{ other: d.other, today: d.today, selected: d.selected, 'has-event': d.hasEvent }"
                   @click="!d.other && root.toast('已选中 '+block.calendar.month+'月'+d.label+'日（原型演示）', 'info')">
                <span>{{ d.label }}</span>
                <span v-if="d.hasEvent && !d.other" class="cal-tag">1节</span>
              </div>
            </div>
          </div>

          <!-- 右侧课次列表 -->
          <div class="schedule-list">
            <!-- 筛选标签 -->
            <div class="list-filter">
              <div v-for="(f, fi) in block.filters" :key="fi"
                   class="filter-tag" :class="{ active: f.active }"
                   @click="root.toast('切换筛选：'+f.label, 'info')"
                   @dblclick.stop="root.editText((path||'')+'.filters.'+fi+'.label')">
                {{ f.label }}<span v-if="f.count != null" class="filter-count">（{{ f.count }}）</span>
              </div>
            </div>

            <!-- 课次卡片 -->
            <div class="list-body">
              <div v-for="(c, ci) in block.courses" :key="c.id" class="course-card" :class="c.status">
                <!-- 状态徽章 -->
                <div class="cc-status">
                  <div class="badge">{{ c.badge1 }}</div>
                  <div class="label">{{ c.badge2 }}</div>
                </div>
                <!-- 主信息 -->
                <div class="cc-main">
                  <div class="cc-title" @dblclick.stop="root.editText((path||'')+'.courses.'+ci+'.title')">{{ c.title }}</div>
                  <div class="cc-line1">
                    <span class="cc-type" v-html="root.iconSvg('calendar')"></span>
                    <span class="cc-typename">{{ c.type }}</span>
                    <span class="cc-time">{{ c.date }}</span>
                    <span class="cc-code">{{ c.code }}</span>
                  </div>
                  <div class="cc-meta">
                    <span class="meta-teacher"><span v-html="root.iconSvg('user')"></span> {{ c.teacher }}</span>
                    <span class="meta-count"><span v-html="root.iconSvg('user')"></span><span v-html="root.iconSvg('user')"></span> {{ c.studentCount }}</span>
                  </div>
                </div>
                <!-- 操作按钮组 + 状态标签 + 额外按钮（合并为一行） -->
                <div class="cc-actions">
                  <div class="action-row">
                    <div class="action-stack">
                      <button v-for="(op, oi) in (c.operations || c.actions || [])" :key="oi"
                              v-show="oi === 0"
                              class="op-btn" :class="op.type || 'link'"
                              @click="root.runAction(op.action || { kind:'message', text: op.label })"
                              @dblclick.stop="root.editText((path||'')+'.courses.'+ci+(c.operations ? '.operations.'+oi+'.label' : '.actions.'+oi))">
                        {{ op.label }}
                      </button>
                      <!-- 绑定练习状态统计（仅展示文字，不可点击） -->
                      <div v-if="c.bindState" class="op-btn status" :class="c.bindState.type || 'none'"
                           @dblclick.stop="root.editText((path||'')+'.courses.'+ci+'.bindState.text')">
                        {{ c.bindState.text }}
                      </div>
                    </div>
                    <button v-for="(op, oi) in (c.operations || c.actions || [])" :key="'r'+oi"
                            v-show="oi > 0"
                            class="op-btn" :class="op.type || 'link'"
                            @click="root.runAction(op.action || { kind:'message', text: op.label })"
                            @dblclick.stop="root.editText((path||'')+'.courses.'+ci+(c.operations ? '.operations.'+oi+'.label' : '.actions.'+oi))">
                      {{ op.label }}
                    </button>
                    <button v-for="(e, ei) in (c.extras || [])" :key="'e'+ei" class="op-btn link"
                            @click="root.runAction(e.action || { kind:'message', text: e.label || e })"
                            @dblclick.stop="root.editText((path||'')+'.courses.'+ci+'.extras.'+ei+'.label')">
                      {{ e.label || e }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <div v-if="block.pagination" class="pagination">
              <select>
                <option>30 条/页</option>
                <option>50 条/页</option>
                <option>100 条/页</option>
              </select>
              <button class="page-btn" :disabled="block.pagination.page <= 1"
                      @click="root.toast('上一页（原型演示）', 'info')">‹</button>
              <input class="page-input" :value="block.pagination.page" />
              <span class="page-sep">/</span>
              <span class="page-total-pages">{{ block.pagination.totalPages || 1 }}</span>
              <button class="page-btn" :disabled="block.pagination.page >= (block.pagination.totalPages||1)"
                      @click="root.toast('下一页（原型演示）', 'info')">›</button>
              <span class="page-meta">共 {{ block.pagination.total }} 条</span>
            </div>
          </div>
        </div>

        <!-- 新课表（左日历卡片 + 右课表卡片） -->
        <div v-else-if="block.type==='schedule2'" class="schedule2-layout integrated-workspace">
          <!-- 左侧日历卡片 -->
          <div class="s2-cal-card card">
            <div class="s2-cal-head">
              <div class="s2-cal-title">{{ block.calendar.year }}年{{ block.calendar.month }}月</div>
              <div class="s2-cal-nav">
                <button class="s2-today-link" @click="root.toast('已跳到今天', 'info')">今天</button>
                <button class="s2-cal-nav-btn" @click="root.toast('上一月（原型演示）', 'info')" title="上一月">‹</button>
                <button class="s2-cal-nav-btn" @click="root.toast('下一月（原型演示）', 'info')" title="下一月">›</button>
              </div>
            </div>
            <div class="s2-cal-weekdays">
              <div v-for="w in ['一','二','三','四','五','六','日']" :key="w">{{ w }}</div>
            </div>
            <div class="s2-cal-days">
              <div v-for="(d, di) in root.buildCalDays(block.calendar)" :key="di"
                   class="s2-cal-day"
                   :class="{ other: d.other, today: d.today, selected: d.selected, 'has-event': d.hasEvent }"
                   @click="!d.other && root.toast('已选中 '+block.calendar.month+'月'+d.label+'日（原型演示）', 'info')">
                <span>{{ d.label }}</span>
                <span v-if="d.hasEvent && !d.other" class="s2-cal-tag">1节</span>
              </div>
            </div>
          </div>

          <!-- 右侧课表卡片 -->
          <div class="s2-list-card card">
            <div class="s2-list-header">
              <div class="s2-list-title">课表（{{ block.courseCount }}次）</div>
            </div>
            <div class="s2-list-body">
              <div v-for="(c, ci) in block.courses" :key="c.id" class="s2-card" :class="c.status">
                <!-- 左侧状态区 -->
                <div class="s2-status">
                  <div class="s2-badge">{{ c.badge1 }}</div>
                  <div class="s2-label">{{ c.badge2 }}</div>
                </div>

                <!-- 中间信息区 -->
                <div class="s2-main">
                  <div class="s2-course-title" @dblclick.stop="root.editText((path||'')+'.courses.'+ci+'.title')">{{ c.title }}</div>
                  <div class="s2-info-line">
                    <span class="s2-time">{{ c.time }}</span>
                    <span class="s2-type" :class="c.type">{{ c.type }}</span>
                    <span class="s2-code">{{ c.code }}</span>
                  </div>
                  <div class="s2-meta">
                    <span class="s2-teacher"><span v-html="root.iconSvg('user')"></span> {{ c.teacher }}</span>
                    <span class="s2-students"><span v-html="root.iconSvg('user')"></span><span v-html="root.iconSvg('user')"></span> {{ c.studentCount }}</span>
                  </div>
                </div>

                <!-- 右侧操作链接 -->
                <div class="s2-actions">
                  <span v-for="(a, ai) in c.actions" :key="ai"
                        class="s2-action-link"
                        @click="root.runScheduleAction(a)"
                        @dblclick.stop="root.editText((path||'')+'.courses.'+ci+'.actions.'+ai)">{{ a }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 通用页签容器（tabs：头部标签 + 当前页签内容） -->
        <div v-else-if="block.type==='tabs'" class="integrated-tab-page generic-tabs-page">
          <div class="beike-tabs-head">
            <div v-for="(t, ti) in block.tabs" :key="ti"
                 class="beike-tab-item" :class="{ active: (root.tabState[path]||0) === ti }"
                 @click="root.tabState = { ...root.tabState, [path]: ti }">
              {{ t.name }}<span v-if="t.count != null" class="filter-count">（{{ t.count }}）</span>
            </div>
          </div>
          <section class="integrated-workspace tabs-body">
            <div class="block" v-for="(inner, ii) in (block.tabs[(root.tabState[path]||0)]||{}).blocks||[]" :key="ii">
              <render-block :block="inner" :ctx="ctx" :path="(path||'')+'.tabs.'+(root.tabState[path]||0)+'.blocks.'+ii" :tab-info="tabInfo" />
            </div>
            <div v-if="root.editMode" class="col-add-btn" @click="root.openAdd((path||'')+'.tabs.'+(root.tabState[path]||0)+'.blocks')">＋ 在此页签添加模块</div>
          </section>
        </div>

        <!-- 占位页 -->
        <div v-else-if="block.type==='placeholder'" class="placeholder-box">
          <div class="ph-icon" v-html="root.iconSvg(block.icon||'tools')"></div>
          <div class="ph-title" @dblclick.stop="root.editText((path||'')+'.title')">{{ block.title || '原型待补充' }}</div>
          <div class="ph-desc" @dblclick.stop="root.editText((path||'')+'.desc')">{{ block.desc || '该模块由对应产品负责人输出' }}</div>
          <div v-if="block.owner" style="margin-top:8px">
            <span class="cell-tag blue" @dblclick.stop="root.editText((path||'')+'.owner')">负责人：{{ block.owner }}</span>
          </div>
        </div>

        <!-- 灰字说明 -->
        <div v-else-if="block.type==='note'" class="page-breadcrumb" style="padding:0 4px"
             @dblclick.stop="root.editText((path||'')+'.text')">
          {{ block.text }}
        </div>
      </div>
    `
  });

  /* 绑定列表面板（bg-）：单 tab 内容（筛选 + 批量 + 列表），挂在练习中心 tab 下 */
  app.component('banggl-view', {
    props: ['tab'],
    inject: ['root'],
    data() {
      return { filters: {} };
    },
    computed: {
      curTab() { return this.tab || {}; },
      rows() { return this.curTab.rows || []; },
      totalCount() { return this.curTab.total != null ? this.curTab.total : this.rows.length; }
    },
    created() { this.initFilters(); },
    watch: {
      tab: { deep: true, handler: function () { this.initFilters(); } }
    },
    methods: {
      initFilters() {
        var f = {};
        (this.curTab.filters || []).forEach(function (x) { f[x.key] = x.value || ''; });
        this.filters = f;
      },
      resetFilters() { this.initFilters(); this.root.toast('已重置', 'success'); },
      boundNum(row) { return parseInt(String(row.bound || '0').split('/')[0], 10) || 0; },
      runBind(row) {
        /* 绑定练习页顶栏上下文：班级绑定=班级条；课程产品绑定=产品条（含版本/设班数） */
        var tab = this.curTab;
        var tabName = tab.name || '绑定';
        if (tabName === '班级绑定') {
          this.root.bangdingCtx = { kind: 'class', title: row.subject, school: tab.schoolFull || row.school, line3: (row.ccode || '') + '/' + (row.cname || '') };
        } else {
          this.root.bangdingCtx = { kind: 'product', title: row.subject, school: tab.schoolFull || row.school, line3: (row.pcode || '') + '/' + (row.pname || ''), version: (row.vcode || '') + '/' + (row.vname || ''), classes: row.classes };
        }
        /* 先压入当前 tab 名作为面包屑中间段（如 班级绑定），再跳绑定练习页；
           入口页为练习中心；已处于伪层级（返回后）则不重复压栈 */
        var st = this.root.navStack || [];
        var tt = this.root.navTitles || [];
        var inPseudo = st[st.length - 1] === 'lianxi' && tt[tt.length - 1];
        if (!inPseudo) this.root.navTo('lianxi', tabName);
        this.root.navTo('bangding', '绑定练习');
      },
      runPreview(row) { if (this.boundNum(row)) this.root.toast('预览（原型演示）', 'info'); }
    },
    template: `
      <div class="bg-wrap">
        <!-- 筛选区（标签在上；必填项红色 *必填项；重置/查询跟在字段后） -->
        <div class="xy-fields bg-fields">
          <div v-for="(f, fi) in curTab.filters" :key="fi" class="xy-field">
            <div class="xy-label">{{ f.label }}<i v-if="f.required" class="bg-req">*必填项</i></div>
            <div v-if="f.type === 'tags'" class="bg-tagbox">
              <span v-if="filters[f.key]" class="bg-tag"><span class="bg-tag-text">{{ filters[f.key] }}</span><span class="bg-tag-x" @click="filters[f.key] = ''">×</span></span>
              <svg class="bg-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <select v-else-if="f.type === 'select'" v-model="filters[f.key]" class="xy-ctrl">
              <option v-if="f.placeholder" value="">{{ f.placeholder }}</option>
              <option v-for="(o, j) in f.options || []" :key="j" :value="o">{{ o }}</option>
            </select>
            <input v-else v-model="filters[f.key]" class="xy-ctrl" :class="{ 'xy-ctrl-wide': f.wide }" :placeholder="f.placeholder || '请录入'" />
          </div>
          <div class="bg-btns">
            <button class="bg-reset" @click="resetFilters">重置</button>
            <button class="bg-search" @click="root.toast('查询已执行（原型演示）', 'success')">查询</button>
          </div>
        </div>

        <!-- 批量操作 -->
        <div class="bg-bulk">
          <span @click="root.toast('批量绑定（原型演示）', 'info')">批量绑定</span>
          <span @click="root.toast('批量删除（原型演示）', 'info')">批量删除</span>
        </div>

        <!-- 列表（横向滚动 + 操作列右固定） -->
        <div class="xy-table xy-scroll bg-table">
          <table>
            <thead>
              <tr>
                <th class="bg-th-chk"><input type="checkbox" /></th>
                <th v-for="(c, ci) in curTab.columns" :key="ci" :style="c.width ? 'width:' + c.width : ''">{{ c.label }}</th>
                <th class="xy-th-ops" style="width:110px">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in rows" :key="ri">
                <td><input type="checkbox" /></td>
                <td v-for="(c, ci) in curTab.columns" :key="ci">
                  <template v-if="c.stack">
                    <div class="bg-cell-1">{{ row[c.stack[0]] }}/</div>
                    <div class="bg-cell-2">{{ row[c.stack[1]] }}</div>
                  </template>
                  <span v-else>{{ row[c.prop] }}</span>
                </td>
                <td class="xy-td-ops">
                  <span class="xy-op" @click="runBind(row)">绑定练习</span>
                  <span class="xy-op" :class="{ 'bg-op-disabled': !boundNum(row) }" @click="runPreview(row)">预览</span>
                </td>
              </tr>
              <tr v-if="!rows.length"><td :colspan="(curTab.columns || []).length + 2" class="table-empty">暂无数据</td></tr>
            </tbody>
          </table>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <span class="page-meta">共 {{ totalCount }} 条</span>
          <button class="page-btn">‹</button>
          <button class="page-btn active" disabled>1</button>
          <button class="page-btn">›</button>
          <select><option>30条/页</option><option>50条/页</option><option>100条/页</option></select>
        </div>
      </div>
    `
  });

  /* ---------- 云盘 / 练习层级视图组件（备课中心、练习中心共用） ----------
   * 接管带 beike 字段的 tabs 块渲染（替换通用 tabs 渲染）：
   *   - 集团 / 校本：一级 = 只读文件夹列表；内容级 = 面包屑 + 工具栏 + 操作表格（校本 levels=3）
   *   - 个人 mode='flat'：始终操作模式
   * 通过 root.beikeView[viewKey] 状态判断当前层级（viewKey=「挂载路径:tabIndex」，按页隔离）
   * UI 差异由 beike 配置驱动：searchPlaceholder / bulk / createButtons / folderColumns / detailColumns / moreActions
   */
  app.component('beike-view', {
    props: ['block', 'parentPath'],
    inject: ['root'],
    template: `
      <div class="integrated-tab-page">
        <!-- tabs 头部 -->
        <div class="beike-tabs-head">
          <div v-for="(tab, ti) in block.tabs" :key="ti"
               class="beike-tab-item"
               :class="{ active: tabIndex === ti }"
               @click="switchTab(ti)">
            {{ tab.name }}
          </div>
        </div>

        <section class="integrated-workspace">

        <!-- 课程产品绑定 / 班级绑定（并入练习中心） -->
        <template v-if="curTab && curTab.banggl">
          <banggl-view :tab="bangglTab" :key="tabIndex" />
        </template>

        <!-- 集团云盘 / 校本云盘：只读目录级（一级；校本二级=学校下的科目，整行点击下钻） -->
        <template v-else-if="curTab && curTab.beike && curTab.beike.mode === 'tree' && viewPath.length + 1 < levels">
          <!-- 一级页面顶部：左侧标题 + 右侧搜索框 -->
          <div v-if="viewPath.length === 0" class="beike-lvl1-head">
            <div class="beike-lvl1-title">
              <span class="beike-lvl1-name">{{ curTab.name }}</span>
              <span class="beike-lvl1-count">（共 {{ listRows.length }} 个）</span>
            </div>
            <div class="beike-lvl1-search">
              <span class="beike-lvl1-search-icon" v-html="root.iconSvg('search')"></span>
              <input :placeholder="searchPh" />
            </div>
          </div>
          <!-- 二级及以后顶部：云盘自有路径面包屑 + 右侧搜索（只读级无导入/新建） -->
          <div v-else class="beike-lvl2-head">
            <div class="beike-crumb">
              <span class="bc-back" @click="root.beikeBack(viewKey)"><span class="bc-back-ico" v-html="root.iconSvg('back')"></span>返回</span>
              <span class="bc-bar">|</span>
              <template v-for="(seg, si) in drivePath" :key="si">
                <span class="bc-seg" :class="{ last: si === drivePath.length - 1 }"
                      @click="si < drivePath.length - 1 ? root.beikeGo(viewKey, si) : root.toast('跳转到 '+seg+'（原型演示）','info')">{{ seg }}</span>
                <span v-if="si < drivePath.length - 1" class="bc-sep">›</span>
              </template>
              <span class="bc-count">(共{{ listRows.length }}个)</span>
            </div>
            <div class="beike-lvl2-tools">
              <div class="beike-lvl1-search">
                <span class="beike-lvl1-search-icon" v-html="root.iconSvg('search')"></span>
                <input :placeholder="searchPh" />
              </div>
            </div>
          </div>

          <!-- 视图切换行（右对齐：列表/网格） -->
          <div class="beike-view-row">
            <div class="beike-lvl1-view-toggle">
              <span class="active" v-html="root.iconSvg('list')"></span>
              <span v-html="root.iconSvg('grid')"></span>
            </div>
          </div>

          <!-- 只读表格（无复选框 / 无操作列；整行点击下钻） -->
          <div class="table-wrap folder-mode">
            <table>
              <thead>
                <tr>
                  <th v-for="(c, ci) in folderColumns" :key="ci"
                      :style="c.width?'width:'+c.width:''">{{ c.label }}<span v-if="c.sort" class="bk-sort" :class="{ active: c.sort === 'asc' }">{{ c.sort === 'asc' ? '↑' : '↓' }}</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in listRows" :key="ri" class="folder-row" @click="root.selectFolder(viewKey, row.name)">
                  <td v-for="(c, ci) in folderColumns" :key="ci">
                    <span v-if="ci === 0" class="folder-cell">
                      <span class="file-icon" v-html="root.rowIconSvg({ icon: 'folder' })"></span>
                      <span class="folder-name">{{ row[c.prop] }}</span>
                    </span>
                    <span v-else-if="c.prop === 'time'"><span class="bk-modifier">{{ row.modifier }}</span>{{ row[c.prop] }}</span>
                    <span v-else>{{ row[c.prop] }}</span>
                  </td>
                </tr>
                <tr v-if="!listRows.length">
                  <td :colspan="folderColumns.length" class="table-empty">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 只读级分页 -->
          <div class="pagination">
            <span class="page-meta">共 {{ listRows.length }} 条</span>
            <button class="page-btn">‹</button>
            <button class="page-btn active" disabled>1</button>
            <button class="page-btn">›</button>
            <select>
              <option>30 条/页</option>
              <option>50 条/页</option>
              <option>100 条/页</option>
            </select>
          </div>
        </template>

        <!-- 集团云盘 / 校本云盘：内容级页面（集团二级 / 校本三级：面包屑 + 工具 + 操作表格） -->
        <template v-else-if="curTab && curTab.beike && curTab.beike.mode === 'tree'">
          <!-- 目录路径面包屑 + 右侧搜索/导入/新建 -->
          <div class="beike-lvl2-head">
            <div class="beike-crumb">
              <span class="bc-back" @click="root.beikeBack(viewKey)"><span class="bc-back-ico" v-html="root.iconSvg('back')"></span>返回</span>
              <span class="bc-bar">|</span>
              <template v-for="(seg, si) in drivePath" :key="si">
                <span class="bc-seg" :class="{ last: si === drivePath.length - 1 }"
                      @click="si < drivePath.length - 1 ? root.beikeGo(viewKey, si) : root.toast('跳转到 '+seg+'（原型演示）','info')">{{ seg }}</span>
                <span v-if="si < drivePath.length - 1" class="bc-sep">›</span>
              </template>
              <span class="bc-count">(共{{ detailRows.length }}个)</span>
            </div>
            <div class="beike-lvl2-tools">
              <div class="beike-lvl1-search">
                <span class="beike-lvl1-search-icon" v-html="root.iconSvg('search')"></span>
                <input :placeholder="searchPh" />
              </div>
              <button v-for="(bt, bi) in createButtons" :key="bi" class="btn" :class="{ primary: bt.primary }" @click="runCreate(bt)">
                <span v-if="bt.icon" class="btn-ico" v-html="root.iconSvg(bt.icon)"></span>{{ bt.label }}
              </button>
            </div>
          </div>

          <!-- 批量操作行 + 视图切换 -->
          <div class="beike-view-row">
            <div class="beike-bulk">
              <span v-for="(bl, bi) in bulkLabels" :key="bi" @click="root.toast(bl+'（需先选择）','info')">{{ bl }}</span>
            </div>
            <div class="beike-lvl1-view-toggle">
              <span class="active" v-html="root.iconSvg('list')"></span>
              <span v-html="root.iconSvg('grid')"></span>
            </div>
          </div>

          <!-- 二级表格（带复选框 / 图标操作列） -->
          <div class="table-wrap op-mode">
            <table>
              <thead>
                <tr>
                  <th style="width:40px"><input type="checkbox" /></th>
                  <th v-for="(c, ci) in detailColumns" :key="ci" :style="c.width?'width:'+c.width:''">{{ c.label }}</th>
                  <th style="width:96px"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in detailRows" :key="ri">
                  <td><input type="checkbox" /></td>
                  <td v-for="(c, ci) in detailColumns" :key="ci">
                    <span v-if="ci === 0" class="folder-cell">
                      <span class="file-icon" v-html="root.rowIconSvg(row)"></span>
                      <span>{{ row[c.prop] }}</span>
                    </span>
                    <span v-else-if="c.prop === 'time'"><span v-if="row.modifier" class="bk-modifier">{{ row.modifier }}</span>{{ row[c.prop] }}</span>
                    <span v-else>{{ row[c.prop] }}</span>
                  </td>
                  <td class="bk-ops">
                    <span v-if="row.kind && row.kind !== 'folder'" class="bk-ico-btn bk-edit" title="编辑"
                          v-html="root.iconSvg('pen')" @click.stop="root.toast('编辑','info')"></span>
                    <span class="bk-ico-btn" title="重命名" v-html="root.iconSvg('info')"
                          @click.stop="root.toast('重命名','info')"></span>
                    <el-dropdown trigger="hover" @command="function (cmd) { root.toast(cmd + '（原型演示）', 'info') }">
                      <span class="bk-ico-btn" v-html="root.iconSvg('more')"></span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="(m, mi) in rowMoreActions(row)" :key="mi"
                                            :divided="m.divided" :command="m.label">
                            <span :style="m.danger ? 'color:#dc2626' : ''">{{ m.label }}</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                <tr v-if="!detailRows.length">
                  <td :colspan="detailColumns.length + 2" class="table-empty">该文件夹暂无文件</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 二级分页 -->
          <div class="pagination" v-if="detailRows.length">
            <span class="page-meta">共 {{ detailRows.length }} 条</span>
            <button class="page-btn">‹</button>
            <button class="page-btn active" disabled>1</button>
            <button class="page-btn">›</button>
            <select>
              <option>30 条/页</option>
              <option>50 条/页</option>
              <option>100 条/页</option>
            </select>
          </div>
        </template>

        <!-- 个人云盘：同集团云盘二级规则（路径行 + 工具 + 批量行 + 全可操作表格） -->
        <template v-else-if="curTab && curTab.beike && curTab.beike.mode === 'flat'">
          <!-- 云盘自有路径行 + 右侧搜索/导入/新建 -->
          <div class="beike-lvl2-head">
            <div class="beike-crumb">
              <span class="bc-seg last">{{ curTab.name }}</span>
              <span class="bc-count">(共{{ detailRows.length }}个)</span>
            </div>
            <div class="beike-lvl2-tools">
              <div class="beike-lvl1-search">
                <span class="beike-lvl1-search-icon" v-html="root.iconSvg('search')"></span>
                <input :placeholder="searchPh" />
              </div>
              <button v-for="(bt, bi) in createButtons" :key="bi" class="btn" :class="{ primary: bt.primary }" @click="runCreate(bt)">
                <span v-if="bt.icon" class="btn-ico" v-html="root.iconSvg(bt.icon)"></span>{{ bt.label }}
              </button>
            </div>
          </div>

          <!-- 批量操作行 + 视图切换 -->
          <div class="beike-view-row">
            <div class="beike-bulk">
              <span v-for="(bl, bi) in bulkLabels" :key="bi" @click="root.toast(bl+'（需先选择）','info')">{{ bl }}</span>
            </div>
            <div class="beike-lvl1-view-toggle">
              <span class="active" v-html="root.iconSvg('list')"></span>
              <span v-html="root.iconSvg('grid')"></span>
            </div>
          </div>

          <!-- 可操作表格（复选框 + 图标操作列，编辑仅非文件夹行展示） -->
          <div class="table-wrap op-mode">
            <table>
              <thead>
                <tr>
                  <th style="width:40px"><input type="checkbox" /></th>
                  <th v-for="(c, ci) in detailColumns" :key="ci" :style="c.width?'width:'+c.width:''">{{ c.label }}<span v-if="c.sort" class="bk-sort" :class="{ active: c.sort === 'asc' }">{{ c.sort === 'asc' ? '↑' : '↓' }}</span></th>
                  <th style="width:96px"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in detailRows" :key="ri">
                  <td><input type="checkbox" /></td>
                  <td v-for="(c, ci) in detailColumns" :key="ci">
                    <span v-if="ci === 0" class="folder-cell">
                      <span class="file-icon" v-html="root.rowIconSvg(row)"></span>
                      <span>{{ row[c.prop] }}</span>
                    </span>
                    <span v-else-if="c.prop === 'time'"><span v-if="row.modifier" class="bk-modifier">{{ row.modifier }}</span>{{ row[c.prop] }}</span>
                    <span v-else>{{ row[c.prop] }}</span>
                  </td>
                  <td class="bk-ops">
                    <span v-if="row.kind !== 'folder'" class="bk-ico-btn bk-edit" title="编辑"
                          v-html="root.iconSvg('pen')" @click.stop="root.toast('编辑','info')"></span>
                    <span class="bk-ico-btn" title="重命名" v-html="root.iconSvg('info')"
                          @click.stop="root.toast('重命名','info')"></span>
                    <el-dropdown trigger="hover" @command="function (cmd) { root.toast(cmd + '（原型演示）', 'info') }">
                      <span class="bk-ico-btn" v-html="root.iconSvg('more')"></span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="(m, mi) in rowMoreActions(row)" :key="mi"
                                            :divided="m.divided" :command="m.label">
                            <span :style="m.danger ? 'color:#dc2626' : ''">{{ m.label }}</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                <tr v-if="!detailRows.length">
                  <td :colspan="detailColumns.length + 2" class="table-empty">暂无文件</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 个人云盘分页 -->
          <div class="pagination" v-if="detailRows.length">
            <span class="page-meta">共 {{ detailRows.length }} 条</span>
            <button class="page-btn">‹</button>
            <button class="page-btn active" disabled>1</button>
            <button class="page-btn">›</button>
            <select>
              <option>30 条/页</option>
              <option>50 条/页</option>
              <option>100 条/页</option>
            </select>
          </div>
        </template>
        </section>
      </div>
    `,
    data() {
      return { tabStateKey: this.parentPath || 0 };  // 按挂载路径隔离 tab 状态（备课 / 练习互不影响）
    },
    created() {
      /* 从绑定练习返回时，按面包屑末段文案恢复到对应绑定 tab */
      var idx = this.tabFromCrumb();
      if (idx != null) {
        this.root.tabState = Object.assign({}, this.root.tabState, { [this.tabStateKey]: idx });
      }
    },
    methods: {
      /* 视图状态复合键：各页各 tab 的下钻状态互不串扰 */
      keyFor(ti) { return (this.parentPath || 'beike') + ':' + ti; },
      /* 返回本页时恢复绑定 tab：优先读收伪层级时记下的名字，其次读栈末文案 */
      tabFromCrumb() {
        var name = this.root.lianxiRestoreTab;
        if (name) {
          this.root.lianxiRestoreTab = null;
        } else {
          var st = this.root.navStack || [];
          var tt = this.root.navTitles || [];
          if (st[st.length - 1] === 'lianxi' && tt[tt.length - 1]) name = tt[tt.length - 1];
        }
        if (!name) return null;
        var tabs = this.block.tabs || [];
        for (var i = 0; i < tabs.length; i++) if (tabs[i].name === name) return i;
        return null;
      },
      switchTab(ti) {
        this.root.beikeView = Object.assign({}, this.root.beikeView, { [this.keyFor(ti)]: null });
        this.root.tabState = Object.assign({}, this.root.tabState, { [this.tabStateKey]: ti });
        // 伪层级状态下同步更新栈末文案，保证面包屑与当前 tab 一致
        var st = this.root.navStack || [];
        var tt = this.root.navTitles || [];
        if (st[st.length - 1] === 'lianxi' && tt[tt.length - 1]) {
          var nt = tt.slice();
          nt[nt.length - 1] = ((this.block.tabs || [])[ti] || {}).name || null;
          this.root.navTitles = nt;
          this.root.syncHash();
        }
      },
      /* 右侧新建按钮：kind=toast 仅演示提示，否则打开新建弹窗 */
      runCreate(bt) {
        if (bt.kind === 'toast') { this.root.toast(bt.label + '（原型演示）', 'info'); return; }
        this.root.openDialog({ title: String(bt.label).replace(/^＋\s*/, ''), fields: [{ label: '名称', key: 'name', type: 'input', placeholder: '请输入名称' }] });
      },
      /* ⋯ 菜单按行类型过滤：文件夹行剔除 fileOnly 项（复制ID/播放/打印 等文件专属操作） */
      rowMoreActions(row) {
        var list = this.moreActions;
        if (row && row.kind === 'folder') {
          return list.filter(function (m) { return !m.fileOnly; });
        }
        return list;
      }
    },
    computed: {
      curTab() {
        return (this.block.tabs || [])[this.tabIndex];
      },
      /* 绑定 tab：把 name 并入 banggl 配置，供 banggl-view 使用 */
      bangglTab() {
        var t = this.curTab;
        if (!t || !t.banggl) return null;
        return Object.assign({ name: t.name }, t.banggl);
      },
      tabIndex() {
        return ((this.root && this.root.tabState) || {})[this.tabStateKey] || 0;
      },
      viewKey() { return this.keyFor(this.tabIndex); },
      viewPath() {
        var v = ((this.root && this.root.beikeView) || {})[this.viewKey];
        if (v == null) return [];
        if (typeof v === 'string') return [v];
        return v;
      },
      /* 搜索框占位文案（练习中心：请输入关键词或练习ID） */
      searchPh() {
        var t = this.curTab;
        return (t && t.beike && t.beike.searchPlaceholder) || '搜索云盘文件';
      },
      /* 批量操作项（练习中心：移动/复制/删除） */
      bulkLabels() {
        var t = this.curTab;
        return (t && t.beike && t.beike.bulk) || ['移动', '删除'];
      },
      /* 右侧新建按钮（练习中心：新建文件夹/新建练习） */
      createButtons() {
        var t = this.curTab;
        return (t && t.beike && t.beike.createButtons) || [
          { label: '导入', icon: 'upload', kind: 'toast' },
          { label: '＋ 新建', primary: true, kind: 'dialog' }
        ];
      },
      levels() {
        var t = this.curTab;
        return (t && t.beike && t.beike.levels) || 2;
      },
      /* 当前只读目录行：一级=folders；校本二级=subFolders[学校] */
      listRows() {
        var t = this.curTab;
        if (!t || !t.beike) return [];
        if (this.viewPath.length === 0) return t.beike.folders || [];
        return ((t.beike.subFolders || {})[this.viewPath[0]]) || [];
      },
      folderColumns() {
        var t = this.curTab;
        if (t && t.beike && t.beike.folderColumns) return t.beike.folderColumns;
        // 一级页面默认列：名称(↑) / 创建人 / 最近修改(↓) / 大小(↓)，与截图一致
        return [
          { label: '名称', prop: 'name', sort: 'asc' },
          { label: '创建人', prop: 'creator', width: '110px' },
          { label: '最近修改', prop: 'time', width: '220px', sort: 'desc' },
          { label: '大小', prop: 'size', width: '90px', sort: 'desc' }
        ];
      },
      /* 二级及以后云盘目录面包屑：云盘名 › 各级目录 › 子路径… */
      drivePath() {
        var t = this.curTab;
        var segs = [t ? t.name : ''].concat(this.viewPath);
        var pool = ((t && t.beike && t.beike.folders) || []).slice();
        var sf = (t && t.beike && t.beike.subFolders) || {};
        Object.keys(sf).forEach(function (k) { pool = pool.concat(sf[k] || []); });
        var lastName = this.viewPath[this.viewPath.length - 1];
        var folder = pool.filter(function (f) { return f.name === lastName; })[0];
        if (folder && folder.subPath) segs = segs.concat(folder.subPath);
        return segs.filter(function (s) { return !!s; });
      },
      moreActions() {
        var t = this.curTab;
        return (t && t.beike && t.beike.moreActions) || [];
      },
      detailRows() {
        var t = this.curTab;
        if (!t || !t.beike) return [];
        if (t.beike.mode === 'flat') return t.beike.rows || [];
        var map = t.beike.folderContents || {};
        return map[this.viewPath.join('/')] || [];
      },
      detailColumns() {
        var t = this.curTab;
        return (t && t.beike && t.beike.detailColumns) || [];
      },
      detailActions() {
        var t = this.curTab;
        return (t && t.beike && t.beike.detailActions) || [];
      }
    }
  });

  /* ---------- 我的学员专属视图组件 ----------
   * 按截图 1:1 还原：筛选区（标题在上）+ 状态页签 + 全网格表格 + 分页
   * 独立样式（xy- 前缀），不影响其他页面的通用块 */
  app.component('xueyuan-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      var filters = {};
      (this.block.filters || []).forEach(function (f) { filters[f.key] = f.value || ''; });
      return {
        filters: filters,
        activeTag: 0,
        page: (this.block.pagination && this.block.pagination.page) || 1
      };
    },
    computed: {
      totalPages() {
        return (this.block.pagination && this.block.pagination.totalPages) || 1;
      },
      visibleActions() {
        var acts = this.block.actions || [];
        return acts.length > 3 ? acts.slice(0, 2) : acts;
      },
      moreActions() {
        var acts = this.block.actions || [];
        return acts.length > 3 ? acts.slice(2) : [];
      }
    },
    methods: {
      resetFilters() {
        var self = this;
        (this.block.filters || []).forEach(function (f) { self.filters[f.key] = ''; });
      },
      runMore(a) {
        this.root.runAction(a.action, a.label);
      }
    },
    template: `
      <div class="xy-wrap">
        <!-- 筛选区：字段标题在控件上方，右侧查询/重置 -->
        <div class="xy-filter">
          <div class="xy-fields">
            <div v-for="(f, i) in block.filters || []" :key="i" class="xy-field">
              <div class="xy-label">{{ f.label }}</div>
              <select v-if="f.type === 'select'" v-model="filters[f.key]" class="xy-ctrl">
                <option v-if="f.placeholder" value="">{{ f.placeholder }}</option>
                <option v-for="(o, j) in f.options || []" :key="j" :value="o.value || o">{{ o.label || o }}</option>
              </select>
              <input v-else v-model="filters[f.key]" class="xy-ctrl" :placeholder="f.placeholder || '请录入'" />
            </div>
          </div>
          <div class="xy-btns">
            <button class="xy-search" @click="root.toast('查询已执行（原型演示）', 'success')">查询</button>
            <span class="xy-reset" @click="resetFilters">重置</span>
          </div>
        </div>

        <!-- 状态页签 -->
        <div class="xy-tags">
          <div v-for="(t, ti) in block.statusTags || []" :key="ti"
               class="xy-tag" :class="{ active: activeTag === ti }"
               @click="activeTag = ti">
            <span>{{ t.label }}</span>
            <span v-if="t.count != null" class="xy-count">{{ t.count }}</span>
          </div>
        </div>

        <!-- 全网格表格 -->
        <div class="xy-table">
          <table>
            <thead>
              <tr>
                <th v-for="(c, ci) in block.columns || []" :key="ci" :class="ci === 0 ? 'xy-th-id' : ''"
                    @dblclick.stop="root.editText(path + '.columns.' + ci + '.label')">
                  <span>{{ c.label }}</span>
                  <span v-if="root.editMode" class="col-tools">
                    <i @click.stop="root.moveTableCol(path, ci, -1)" title="左移">‹</i>
                    <i @click.stop="root.moveTableCol(path, ci, 1)" title="右移">›</i>
                    <i class="danger" @click.stop="root.delTableCol(path, ci)" title="删除该列">✕</i>
                  </span>
                </th>
                <th class="xy-th-ops">操作<i v-if="root.editMode" class="col-add" title="添加列" @click.stop="root.addTableCol(path)">＋</i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in block.data || []" :key="ri">
                <td v-for="(c, ci) in block.columns || []" :key="ci" :class="ci === 0 ? 'xy-td-id' : ''">{{ row[c.prop] }}</td>
                <td class="xy-td-ops">
                  <span v-for="(a, ai) in visibleActions" :key="ai" class="xy-op"
                        @click="root.runAction(a.action, a.label)">{{ a.label }}</span>
                  <el-dropdown v-if="moreActions.length" trigger="hover" @command="runMore">
                    <span class="xy-op xy-more">⋯</span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item v-for="(a, ai) in moreActions" :key="ai" :command="a">{{ a.label }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </td>
              </tr>
              <tr v-if="!(block.data || []).length">
                <td :colspan="(block.columns || []).length + 1" class="table-empty">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页 -->
        <div class="xy-pager">
          <select class="xy-page-size">
            <option>30条/页</option>
            <option>50条/页</option>
            <option>100条/页</option>
          </select>
          <button class="xy-page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">&lt;</button>
          <span class="xy-page-box"><span class="xy-page-cur">{{ page }}</span>/{{ totalPages }}</span>
          <button class="xy-page-btn" :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)">&gt;</button>
          <span class="xy-page-total">共{{ block.pagination ? block.pagination.total : 0 }}条</span>
        </div>
      </div>
    `
  });

  /* ---------- 我的班级专属视图（复用 xy- 设计：页签置顶 + 可横向滚动表格 + 高亮列） ---------- */
  app.component('banji-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      var filters = {};
      (this.block.filters || []).forEach(function (f) { filters[f.key] = f.value || ''; });
      return {
        filters: filters,
        activeTag: 0,
        page: (this.block.pagination && this.block.pagination.page) || 1
      };
    },
    computed: {
      totalPages() {
        return (this.block.pagination && this.block.pagination.totalPages) || 1;
      },
      visibleActions() {
        var acts = this.block.actions || [];
        if (this.block.flatActions) return acts;
        return acts.length > 3 ? acts.slice(0, 2) : acts;
      },
      moreActions() {
        var acts = this.block.actions || [];
        if (this.block.flatActions) return [];
        return acts.length > 3 ? acts.slice(2) : [];
      }
    },
    methods: {
      resetFilters() {
        var self = this;
        (this.block.filters || []).forEach(function (f) { self.filters[f.key] = ''; });
      },
      runMore(a) {
        this.root.runAction(a.action, a.label);
      }
    },
    template: `
      <div class="xy-wrap">
        <!-- 状态页签（置顶） -->
        <div class="xy-tags xy-tags-top">
          <div v-for="(t, ti) in block.statusTags || []" :key="ti"
               class="xy-tag" :class="{ active: activeTag === ti }"
               @click="activeTag = ti">
            <span>{{ t.label }}</span>
            <span v-if="t.count != null" class="xy-count">{{ t.count }}</span>
          </div>
        </div>

        <!-- 筛选区 -->
        <div class="xy-filter">
          <div class="xy-fields">
            <div v-for="(f, i) in block.filters || []" :key="i" class="xy-field">
              <div class="xy-label">{{ f.label }}</div>
              <select v-if="f.type === 'select'" v-model="filters[f.key]" class="xy-ctrl">
                <option v-if="f.placeholder" value="">{{ f.placeholder }}</option>
                <option v-for="(o, j) in f.options || []" :key="j" :value="o.value || o">{{ o.label || o }}</option>
              </select>
              <input v-else v-model="filters[f.key]" class="xy-ctrl" :class="{ 'xy-ctrl-wide': f.type === 'daterange' }" :placeholder="f.placeholder || '请录入'" />
            </div>
          </div>
          <div class="xy-btns">
            <button class="xy-search" @click="root.toast('查询已执行（原型演示）', 'success')">查询</button>
            <span class="xy-reset" @click="resetFilters">重置</span>
          </div>
        </div>

        <!-- 表格（可横向滚动，支持高亮列） -->
        <div class="xy-table xy-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="(c, ci) in block.columns || []" :key="ci" :class="[ci === 0 ? 'xy-th-id' : '', c.hl ? 'xy-hl' : '']"
                    @dblclick.stop="root.editText(path + '.columns.' + ci + '.label')">
                  <span>{{ c.label }}</span>
                  <span v-if="root.editMode" class="col-tools">
                    <i @click.stop="root.moveTableCol(path, ci, -1)" title="左移">‹</i>
                    <i @click.stop="root.moveTableCol(path, ci, 1)" title="右移">›</i>
                    <i class="danger" @click.stop="root.delTableCol(path, ci)" title="删除该列">✕</i>
                  </span>
                </th>
                <th class="xy-th-ops">操作<i v-if="root.editMode" class="col-add" title="添加列" @click.stop="root.addTableCol(path)">＋</i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in block.data || []" :key="ri">
                <td v-for="(c, ci) in block.columns || []" :key="ci" :class="[ci === 0 ? 'xy-td-id' : '', c.hl ? 'xy-hl' : '']">{{ row[c.prop] }}</td>
                <td class="xy-td-ops">
                  <span v-for="(a, ai) in visibleActions" :key="ai" class="xy-op"
                        @click="root.runAction(a.action, a.label)">{{ a.label }}</span>
                  <el-dropdown v-if="moreActions.length" trigger="hover" @command="runMore">
                    <span class="xy-op xy-more">⋯</span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item v-for="(a, ai) in moreActions" :key="ai" :command="a">{{ a.label }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </td>
              </tr>
              <tr v-if="!(block.data || []).length">
                <td :colspan="(block.columns || []).length + 1" class="table-empty">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页 -->
        <div class="xy-pager">
          <select class="xy-page-size">
            <option>30条/页</option>
            <option>50条/页</option>
            <option>100条/页</option>
          </select>
          <button class="xy-page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">&lt;</button>
          <span class="xy-page-box"><span class="xy-page-cur">{{ page }}</span>/{{ totalPages }}</span>
          <button class="xy-page-btn" :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)">&gt;</button>
          <span class="xy-page-total">共{{ block.pagination ? block.pagination.total : 0 }}条</span>
        </div>
      </div>
    `
  });

  /* ---------- 绑定练习专属视图（左讲次列表 + 右练习列表） ---------- */
  app.component('bangding-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      return { activeLecture: 0 };
    },
    computed: {
      /* 顶栏上下文：绑定管理入口带入（班级/产品两种），其余入口用配置默认班级信息 */
      head() {
        var ctx = this.root.bangdingCtx;
        if (ctx) return ctx;
        var ci = this.block.classInfo || {};
        return { kind: 'class', title: ci.title, school: ci.school, line3: ci.className };
      }
    },
    template: `
      <div class="bd-wrap">
        <!-- 顶部信息条（班级/课程产品两种上下文） -->
        <div class="bd-head">
          <div class="bd-head-left">
            <span v-if="head.kind === 'product'" class="bd-badge" v-html="root.iconSvg('doc')"></span>
            <span v-else class="bd-badge">★</span>
            <span class="bd-title">{{ head.title }}</span>
            <span class="bd-div">|</span>
            <span class="bd-sub">{{ head.school }}</span>
            <span class="bd-div">|</span>
            <span class="bd-sub">{{ head.line3 }}</span>
            <template v-if="head.kind === 'product'">
              <span class="bd-div">|</span>
              <span class="bd-sub">{{ head.version }}</span>
              <span class="bd-div">|</span>
              <span class="bd-sub">设班数&nbsp;&nbsp;{{ head.classes }}</span>
            </template>
          </div>
          <span class="bd-preview" @click="root.toast('学生端预览（原型演示）', 'info')">学生端预览 ›</span>
        </div>

        <div class="bd-body">
          <!-- 左：讲次列表 -->
          <div class="bd-left">
            <div class="bd-left-head">
              <label class="bd-check"><input type="checkbox" /> 全选</label>
              <span class="bd-del" @click="root.toast('删除所选（原型演示）', 'info')">🗑</span>
            </div>
            <div class="bd-lectures">
              <div v-for="(l, li) in block.lectures || []" :key="li"
                   class="bd-lecture" :class="{ active: activeLecture === li }"
                   @click="activeLecture = li">
                <input type="checkbox" class="bd-lcheck" :disabled="l.disabled" @click.stop />
                <div class="bd-lno" :class="{ active: activeLecture === li }">{{ l.no }}</div>
                <div class="bd-lmain">
                  <div class="bd-ltitle">{{ l.title }}</div>
                  <div class="bd-ltime">{{ l.time }}</div>
                </div>
                <div class="bd-lside">
                  <span class="bd-ltype">{{ l.type }}</span>
                  <span class="bd-lbound" :class="{ pending: l.bound === '待绑定' }">{{ l.bound }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右：练习列表 -->
          <div class="bd-right">
            <div class="bd-right-head">
              <div class="bd-rhead-left">
                <span class="bd-ltype">正课</span>
                <span class="bd-rtitle">{{ (block.lectures || [])[activeLecture] ? block.lectures[activeLecture].title : '' }}</span>
              </div>
              <div class="bd-rhead-btns">
                <button class="bd-share" @click="root.toast('分享练习（原型演示）', 'info')">分享练习</button>
                <button class="bd-bind" @click="root.toast('绑定练习（原型演示）', 'success')">绑定练习</button>
              </div>
            </div>
            <div class="bd-exercises">
              <div v-for="(e, ei) in block.exercises || []" :key="ei" class="bd-ex">
                <div class="bd-ex-tag">{{ e.tag }}</div>
                <div class="bd-ex-main">
                  <div class="bd-ex-title">{{ e.title }}</div>
                  <div class="bd-ex-meta">
                    <span class="bd-ex-role">{{ e.role }}</span>
                    <span class="bd-ex-name">{{ e.name }}</span>
                    <span class="bd-ex-time">{{ e.time }}</span>
                  </div>
                </div>
                <div class="bd-ex-ops">
                  <span @click="root.toast('预览（原型演示）', 'info')">预览</span>
                  <span @click="root.toast('删除（原型演示）', 'info')">删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });

  /* ---------- 班级详情专属视图（标题+标签+页签+课次表格） ---------- */
  app.component('banjidetail-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      return { tab: 0, page: (this.block.pagination && this.block.pagination.page) || 1,
               stuF: { name: '', status: '', renew: '' },
               renF: { name: '', status: '', renew: '' } };
    },
    computed: {
      totalPages() {
        return (this.block.pagination && this.block.pagination.totalPages) || 1;
      },
      visibleActions() {
        var acts = this.block.actions || [];
        if (this.block.flatActions) return acts;
        return acts.length > 3 ? acts.slice(0, 2) : acts;
      },
      moreActions() {
        var acts = this.block.actions || [];
        if (this.block.flatActions) return [];
        return acts.length > 3 ? acts.slice(2) : [];
      },
      stuVisibleActions() {
        var acts = this.block.stuActions || [];
        return acts.length > 3 ? acts.slice(0, 2) : acts;
      },
      stuMoreActions() {
        var acts = this.block.stuActions || [];
        return acts.length > 3 ? acts.slice(2) : [];
      },
      stuRows() {
        var f = this.stuF;
        return (this.block.stuData || []).filter(function (r) {
          if (f.name && (r.name || '').indexOf(f.name) === -1) return false;
          if (f.status && r.status !== f.status) return false;
          if (f.renew && r.renew !== f.renew) return false;
          return true;
        });
      },
      renRows() {
        var f = this.renF;
        return (this.block.renData || []).filter(function (r) {
          if (f.name && (r.name || '').indexOf(f.name) === -1) return false;
          if (f.status && r.status !== f.status) return false;
          if (f.renew && r.renew !== f.renew) return false;
          return true;
        });
      }
    },
    methods: {
      runRowAction(a) {
        if (a.page) { this.root.navTo(a.page, a.label); return; }
        this.root.toast(a.label + '（原型演示）', 'info');
      },
      runMore(a) {
        this.runRowAction(a);
      },
      runStuAction(a) {
        if (a.page) { this.root.navTo(a.page, a.label); return; }
        this.root.toast(a.label + '（原型演示）', 'info');
      },
      runStuMore(a) {
        this.runStuAction(a);
      },
      resetStuFilters() {
        this.stuF = { name: '', status: '', renew: '' };
      },
      resetRenFilters() {
        this.renF = { name: '', status: '', renew: '' };
      }
    },
    template: `
      <div class="xy-wrap cd-wrap">
        <div class="cd-title">{{ block.title }}</div>
        <div class="cd-tags">
          <span v-for="(t, ti) in block.tags || []" :key="ti" class="cd-tag">{{ t }}</span>
        </div>

        <div class="cd-tabs">
          <span v-for="(t, ti) in block.tabs || []" :key="ti"
                class="cd-tab" :class="{ active: tab === ti }" @click="tab = ti">{{ t }}</span>
        </div>

        <div v-if="tab === 0">
          <div class="cd-filter">
            <span class="cd-flabel">上课日期</span>
            <input class="xy-ctrl cd-fwide" placeholder="请选择上课日期" />
            <button class="xy-search" @click="root.toast('查询已执行（原型演示）', 'success')">查询</button>
            <span class="xy-reset" @click="root.toast('重置（原型演示）', 'info')">重置</span>
          </div>

          <div class="xy-table xy-scroll">
            <table>
              <thead>
                <tr>
                  <th v-for="(c, ci) in block.columns || []" :key="ci" :class="ci === 0 ? 'xy-th-id' : ''"
                      @dblclick.stop="root.editText(path + '.columns.' + ci + '.label')">
                    <span>{{ c.label }}</span>
                    <span v-if="root.editMode" class="col-tools">
                      <i @click.stop="root.moveTableCol(path, ci, -1)" title="左移">‹</i>
                      <i @click.stop="root.moveTableCol(path, ci, 1)" title="右移">›</i>
                      <i class="danger" @click.stop="root.delTableCol(path, ci)" title="删除该列">✕</i>
                    </span>
                  </th>
                  <th>操作<i v-if="root.editMode" class="col-add" title="添加列" @click.stop="root.addTableCol(path)">＋</i></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in block.data || []" :key="ri">
                  <td v-for="(c, ci) in block.columns || []" :key="ci">{{ row[c.prop] }}</td>
                  <td class="cd-ops">
                    <span v-for="(a, ai) in visibleActions" :key="ai" class="cd-op" @click="runRowAction(a)">{{ a.label }}</span>
                    <el-dropdown v-if="moreActions.length" trigger="hover" @command="runMore">
                      <span class="cd-op cd-more">⋯</span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="(a, ai) in moreActions" :key="ai" :command="a">{{ a.label }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                <tr v-if="!(block.data || []).length">
                  <td :colspan="(block.columns || []).length + 1" class="table-empty">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="xy-pager">
            <select class="xy-page-size">
              <option>30条/页</option>
              <option>50条/页</option>
              <option>100条/页</option>
            </select>
            <button class="xy-page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">&lt;</button>
            <span class="xy-page-box"><span class="xy-page-cur">{{ page }}</span>/{{ totalPages }}</span>
            <button class="xy-page-btn" :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)">&gt;</button>
            <span class="xy-page-total">共{{ block.pagination ? block.pagination.total : 0 }}条</span>
          </div>
        </div>
        <div v-else-if="tab === 1">
          <!-- 学员列表：筛选区（非一级页面：字段与控件同行） -->
          <div class="cd-filter">
            <template v-for="(f, i) in block.stuFilters || []" :key="i">
              <span class="cd-flabel">{{ f.label }}</span>
              <select v-if="f.type === 'select'" v-model="stuF[f.key]" class="xy-ctrl">
                <option value="">全部</option>
                <option v-for="(o, j) in f.options || []" :key="j" :value="o">{{ o }}</option>
              </select>
              <input v-else v-model="stuF[f.key]" class="xy-ctrl cd-fwide" :placeholder="f.placeholder || '请录入'" />
            </template>
            <button class="xy-search" @click="root.toast('查询已执行（原型演示）', 'success')">查询</button>
            <span class="xy-reset" @click="resetStuFilters">重置</span>
          </div>

          <!-- 学员列表：表格（统一 xy- 规则） -->
          <div class="xy-table xy-scroll">
            <table>
              <thead>
                <tr>
                  <th v-for="(c, ci) in block.stuColumns || []" :key="ci" :class="ci === 0 ? 'xy-th-id' : ''"
                      @dblclick.stop="root.editText(path + '.stuColumns.' + ci + '.label')">
                    <span>{{ c.label }}</span>
                    <span v-if="root.editMode" class="col-tools">
                      <i @click.stop="root.moveTableCol(path, ci, -1, 'stuColumns')" title="左移">‹</i>
                      <i @click.stop="root.moveTableCol(path, ci, 1, 'stuColumns')" title="右移">›</i>
                      <i class="danger" @click.stop="root.delTableCol(path, ci, 'stuColumns', 'stuData')" title="删除该列">✕</i>
                    </span>
                  </th>
                  <th class="xy-th-ops">操作<i v-if="root.editMode" class="col-add" title="添加列" @click.stop="root.addTableCol(path, 'stuColumns', 'stuData')">＋</i></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in stuRows" :key="ri">
                  <td v-for="(c, ci) in block.stuColumns || []" :key="ci" :class="ci === 0 ? 'xy-td-id' : ''">{{ row[c.prop] }}</td>
                  <td class="xy-td-ops">
                    <span v-for="(a, ai) in stuVisibleActions" :key="ai" class="xy-op" @click="runStuAction(a)">{{ a.label }}</span>
                    <el-dropdown v-if="stuMoreActions.length" trigger="hover" @command="runStuMore">
                      <span class="xy-op xy-more">⋯</span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="(a, ai) in stuMoreActions" :key="ai" :command="a">{{ a.label }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                <tr v-if="!stuRows.length">
                  <td :colspan="(block.stuColumns || []).length + 1" class="table-empty">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="xy-pager">
            <select class="xy-page-size">
              <option>30条/页</option>
              <option>50条/页</option>
              <option>100条/页</option>
            </select>
            <button class="xy-page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">&lt;</button>
            <span class="xy-page-box"><span class="xy-page-cur">{{ page }}</span>/{{ totalPages }}</span>
            <button class="xy-page-btn" :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)">&gt;</button>
            <span class="xy-page-total">共{{ block.pagination ? block.pagination.total : 0 }}条</span>
          </div>
        </div>
        <div v-else-if="tab === 2">
          <!-- 续班明细：筛选区（同学员列表查询条件，同行内联） -->
          <div class="cd-filter">
            <template v-for="(f, i) in block.stuFilters || []" :key="i">
              <span class="cd-flabel">{{ f.label }}</span>
              <select v-if="f.type === 'select'" v-model="renF[f.key]" class="xy-ctrl">
                <option value="">全部</option>
                <option v-for="(o, j) in f.options || []" :key="j" :value="o">{{ o }}</option>
              </select>
              <input v-else v-model="renF[f.key]" class="xy-ctrl cd-fwide" :placeholder="f.placeholder || '请录入'" />
            </template>
            <button class="xy-search" @click="root.toast('查询已执行（原型演示）', 'success')">查询</button>
            <span class="xy-reset" @click="resetRenFilters">重置</span>
          </div>

          <!-- 续班明细：表格（无操作列；编辑模式临时加列表头） -->
          <div class="xy-table xy-scroll">
            <table>
              <thead>
                <tr>
                  <th v-for="(c, ci) in block.renColumns || []" :key="ci" :class="ci === 0 ? 'xy-th-id' : ''"
                      @dblclick.stop="root.editText(path + '.renColumns.' + ci + '.label')">
                    <span>{{ c.label }}</span>
                    <span v-if="root.editMode" class="col-tools">
                      <i @click.stop="root.moveTableCol(path, ci, -1, 'renColumns')" title="左移">‹</i>
                      <i @click.stop="root.moveTableCol(path, ci, 1, 'renColumns')" title="右移">›</i>
                      <i class="danger" @click.stop="root.delTableCol(path, ci, 'renColumns', 'renData')" title="删除该列">✕</i>
                    </span>
                  </th>
                  <th v-if="root.editMode" class="xy-th-add"><i class="col-add" title="添加列" @click.stop="root.addTableCol(path, 'renColumns', 'renData')">＋</i></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in renRows" :key="ri">
                  <td v-for="(c, ci) in block.renColumns || []" :key="ci" :class="ci === 0 ? 'xy-td-id' : ''">{{ row[c.prop] }}</td>
                  <td v-if="root.editMode"></td>
                </tr>
                <tr v-if="!renRows.length">
                  <td :colspan="(block.renColumns || []).length + (root.editMode ? 1 : 0)" class="table-empty">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="xy-pager">
            <select class="xy-page-size">
              <option>30条/页</option>
              <option>50条/页</option>
              <option>100条/页</option>
            </select>
            <button class="xy-page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">&lt;</button>
            <span class="xy-page-box"><span class="xy-page-cur">{{ page }}</span>/{{ totalPages }}</span>
            <button class="xy-page-btn" :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)">&gt;</button>
            <span class="xy-page-total">共{{ block.pagination ? block.pagination.total : 0 }}条</span>
          </div>
        </div>
        <div v-else class="cd-empty">暂无数据（原型演示）</div>
      </div>
    `
  });

  /* ---------- 练习详情专属视图（讲次条 + 统计卡 + 学员完成情况表） ---------- */
  app.component('lianxidetail-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      return { activeLecture: 0, filter: '全部' };
    },
    computed: {
      filters() { return ['全部', '已完成', '进行中', '未完成']; },
      rows() {
        var self = this;
        var rows = this.block.rows || [];
        if (this.filter === '全部') return rows;
        return rows.filter(function (r) { return r.status === self.filter; });
      }
    },
    methods: {
      toneOf(status) {
        return status === '已完成' ? 'done' : (status === '进行中' ? 'doing' : 'todo');
      }
    },
    template: `
      <div class="xy-wrap ld-wrap">
        <!-- 顶部班级信息条 -->
        <div class="ld-head">
          <span class="ld-badge">★</span>
          <span class="ld-title">{{ block.classInfo.title }}</span>
          <span class="ld-div">|</span>
          <span class="ld-sub">{{ block.classInfo.school }}</span>
          <span class="ld-div">|</span>
          <span class="ld-sub">{{ block.classInfo.className }}</span>
        </div>

        <div class="ld-panel">
          <!-- 讲次条 -->
          <div class="ld-lectures">
            <div v-for="(l, li) in block.lectures || []" :key="li"
                 class="ld-lec" :class="{ active: activeLecture === li }" @click="activeLecture = li">
              <span class="ld-lno">第{{ l.no }}讲</span>
              <span class="ld-ltype">{{ l.type }}</span>
            </div>
          </div>
          <!-- 当前讲次信息 -->
          <div class="ld-meta">
            <span v-for="(m, mi) in block.meta || []" :key="mi" class="ld-chip">{{ m }}</span>
          </div>
          <!-- 完成统计卡 -->
          <div class="ld-stats">
            <div v-for="(s, si) in block.stats || []" :key="si" class="ld-stat" :class="'ld-stat-' + s.tone">
              <div class="ld-stat-num"><b>{{ s.num }}</b> 人<span class="ld-stat-label">/{{ s.label }}</span></div>
              <span class="ld-stat-icon">{{ s.icon }}</span>
            </div>
          </div>
        </div>

        <!-- 学员完成情况 标题行 -->
        <div class="ld-sec-head">
          <div class="ld-sec-left">
            <span class="ld-sec-title">学员完成情况</span>
            <span class="ld-legend"><i class="dot done"></i>已完成</span>
            <span class="ld-legend"><i class="dot doing"></i>进行中</span>
            <span class="ld-legend"><i class="dot todo"></i>未完成</span>
          </div>
          <div class="ld-sec-right">
            <select class="xy-ctrl ld-filter" v-model="filter">
              <option v-for="f in filters" :key="f">{{ f }}</option>
            </select>
            <button class="ld-urge" @click="root.toast('催交作业（原型演示）', 'success')">催交作业</button>
          </div>
        </div>

        <!-- 学员完成情况表 -->
        <div class="xy-table ld-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="(c, ci) in block.columns || []" :key="ci">{{ c }}</th>
                <th v-for="n in (block.emptyCols || 0)" :key="'e'+n" class="ld-empty-col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, ri) in rows" :key="ri">
                <td class="ld-name"><span class="ld-avatar"></span>{{ r.name }}</td>
                <td :class="'ld-st-' + toneOf(r.status)">{{ r.status }}</td>
                <td v-for="(cell, ci) in r.cells || []" :key="ci">
                  <div v-if="!cell" class="ld-cell-empty">暂无完成数据</div>
                  <div v-else class="ld-card">
                    <span v-if="cell.badge" class="ld-badge2">{{ cell.badge }}</span>
                    <div v-for="(line, li2) in cell.lines || []" :key="li2" class="ld-line">
                      <span v-for="(seg, si2) in line" :key="si2" :class="seg.hl ? 'ld-hl' : ''">{{ seg.t }}</span>
                    </div>
                    <button class="ld-report" @click="root.toast('查看报告（原型演示）', 'info')">查看报告</button>
                  </div>
                </td>
                <td v-for="n in (block.emptyCols || 0)" :key="'e'+n" class="ld-empty-col"></td>
              </tr>
              <tr v-if="!rows.length">
                <td :colspan="(block.columns || []).length + (block.emptyCols || 0)" class="table-empty">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  });

  /* ---------- 学情报告专属视图（班级信息条 + 讲次条 + 工具栏 + 学员信息分组表） ---------- */
  app.component('xueqing-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      return { activeLecture: 0, selected: [] };
    },
    computed: {
      allChecked() {
        var n = (this.block.rows || []).length;
        return n > 0 && this.selected.length === n;
      },
      visibleActions() {
        var acts = this.block.rowActions || [];
        return acts.length > 3 ? acts.slice(0, 2) : acts;
      },
      moreActions() {
        var acts = this.block.rowActions || [];
        return acts.length > 3 ? acts.slice(2) : [];
      }
    },
    methods: {
      toggleAll() {
        var n = (this.block.rows || []).length;
        this.selected = this.allChecked ? [] : Array.from({ length: n }, function (_, i) { return i; });
      },
      toggleRow(ri) {
        var i = this.selected.indexOf(ri);
        if (i > -1) this.selected.splice(i, 1);
        else this.selected.push(ri);
      },
      /* 批量按钮：未勾选学员时禁用 */
      runBatch(label) {
        if (!this.selected.length) return;
        this.root.toast(label + '（原型演示）', 'success');
      },
      runRowAction(a) {
        this.root.toast(a.label + '（原型演示）', 'info');
      }
    },
    template: `
      <div class="xy-wrap xq-wrap">
        <!-- 顶部班级信息条 -->
        <div class="ld-head">
          <span class="ld-badge">★</span>
          <span class="ld-title">{{ block.classInfo.title }}</span>
          <span class="ld-div">|</span>
          <span class="ld-sub">{{ block.classInfo.school }}</span>
          <span class="ld-div">|</span>
          <span class="ld-sub">{{ block.classInfo.className }}</span>
        </div>

        <!-- 讲次条 -->
        <div class="xq-lectures">
          <div v-for="(l, li) in block.lectures || []" :key="li"
               class="ld-lec" :class="{ active: activeLecture === li }" @click="activeLecture = li">
            <span class="ld-lno">第{{ l.no }}讲</span>
            <span class="ld-ltype">{{ l.type }}</span>
          </div>
        </div>

        <!-- 工具栏：批量操作（勾选后启用） + 更新时间/字段说明/字段管理 -->
        <div class="xq-toolbar">
          <div class="xq-batch">
            <button v-for="(b, bi2) in block.batchActions || []" :key="bi2"
                    class="xq-batch-btn" :class="{ on: selected.length > 0 }"
                    @click="runBatch(b)">{{ b }}</button>
          </div>
          <div class="xq-tools">
            <span class="xq-update">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>
              数据更新时间： {{ block.updateTime }}
            </span>
            <button class="xq-tool-btn" @click="root.toast('字段说明（原型演示）', 'info')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              字段说明
            </button>
            <button class="xq-tool-btn" @click="root.toast('字段管理（原型演示）', 'info')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.14 12.94a7 7 0 0 0 .06-.94 7 7 0 0 0-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.3 7.3 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.63.94l-2.39-.96a.5.5 0 0 0-.61.22L2.63 8.84a.5.5 0 0 0 .12.64l2.03 1.58a7 7 0 0 0 0 1.88l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.42.34.61.22l2.39-.96c.5.38 1.04.7 1.63.94l.36 2.54c.04.24.25.42.5.42h3.84c.25 0 .46-.18.5-.42l.36-2.54a7.3 7.3 0 0 0 1.63-.94l2.39.96c.24.1.5 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>
              字段管理
            </button>
          </div>
        </div>

        <!-- 学员信息分组表（两级表头 + 必填列标识 + 操作列固定） -->
        <div class="xy-table xq-scroll">
          <table>
            <thead>
              <tr>
                <th rowspan="2" class="xq-th-check"><input type="checkbox" :checked="allChecked" @change="toggleAll" /></th>
                <th rowspan="2" class="xq-th-name">学员姓名
                  <svg class="xq-sort" viewBox="0 0 12 12" width="10" height="10"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                </th>
                <th :colspan="(block.columns || []).length" class="xq-th-group">学员信息</th>
                <th rowspan="2" class="xy-th-ops">操作<i v-if="root.editMode" class="col-add" title="添加列" @click.stop="root.addTableCol(path)">＋</i></th>
              </tr>
              <tr>
                <th v-for="(c, ci) in block.columns || []" :key="ci" :class="{ 'xq-th-req': c.required }"
                    @dblclick.stop="root.editText(path + '.columns.' + ci + '.label')">
                  <i v-if="c.required" class="xq-req">*</i>{{ c.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, ri) in block.rows || []" :key="ri">
                <td class="xq-td-check"><input type="checkbox" :checked="selected.indexOf(ri) > -1" @change="toggleRow(ri)" /></td>
                <td><span class="xq-name" @click="root.toast('查看学员（原型演示）', 'info')">{{ r.name }}</span></td>
                <template v-for="(c, ci) in block.columns || []" :key="ci">
                  <td v-if="c.prop === 'code'" class="xq-code">{{ r.code }}</td>
                  <td v-else-if="c.prop === 'tag'"><span class="xq-tag-new">{{ r.tag }}</span></td>
                  <td v-else-if="c.prop === 'inGroup'">
                    <span v-if="r.inGroup" class="xq-yes">✓</span>
                    <span v-else class="xq-no">✕</span>
                  </td>
                  <td v-else class="xq-ph">{{ c.placeholder || '请选择' }}</td>
                </template>
                <td class="xy-td-ops xq-td-ops">
                  <div class="xq-ops">
                    <div class="xq-ops-links">
                      <span v-for="(a, ai) in visibleActions" :key="ai" class="xq-op" @click="runRowAction(a)">{{ a.label }}</span>
                    </div>
                    <el-dropdown v-if="moreActions.length" trigger="hover" @command="runRowAction">
                      <span class="xq-more">⋮</span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="(a, ai) in moreActions" :key="ai" :command="a">{{ a.label }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </td>
              </tr>
              <tr v-if="!(block.rows || []).length">
                <td :colspan="(block.columns || []).length + 3" class="table-empty">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  });

  /* ---------- 出勤记录专属视图（讲次条 + 出勤表格） ---------- */
  app.component('chuqin-view', {
    props: ['block', 'path'],
    inject: ['root'],
    data() {
      return { activeLecture: 0, page: (this.block.pagination && this.block.pagination.page) || 1 };
    },
    computed: {
      totalPages() {
        return (this.block.pagination && this.block.pagination.totalPages) || 1;
      },
      visibleActions() {
        var acts = this.block.actions || [];
        return acts.length > 3 ? acts.slice(0, 2) : acts;
      },
      moreActions() {
        var acts = this.block.actions || [];
        return acts.length > 3 ? acts.slice(2) : [];
      }
    },
    methods: {
      runRowAction(a) {
        if (a.page) { this.root.navTo(a.page, a.label); return; }
        this.root.toast(a.label + '（原型演示）', 'info');
      },
      runMore(a) {
        this.runRowAction(a);
      }
    },
    template: `
      <div class="xy-wrap cq-wrap">
        <!-- 顶部班级信息条 -->
        <div class="ld-head">
          <span class="ld-badge">★</span>
          <span class="ld-title">{{ block.classInfo.title }}</span>
          <span class="ld-div">|</span>
          <span class="ld-sub">{{ block.classInfo.school }}</span>
          <span class="ld-div">|</span>
          <span class="ld-sub">{{ block.classInfo.className }}</span>
        </div>

        <div class="ld-panel">
          <!-- 讲次条 -->
          <div class="ld-lectures">
            <div v-for="(l, li) in block.lectures || []" :key="li"
                 class="ld-lec" :class="{ active: activeLecture === li }" @click="activeLecture = li">
              <span class="ld-lno">第{{ l.no }}讲</span>
              <span class="ld-ltype">{{ l.type }}</span>
            </div>
          </div>
          <!-- 当前讲次信息 -->
          <div class="ld-meta">
            <span v-for="(m, mi) in block.meta || []" :key="mi" class="ld-chip">{{ m }}</span>
          </div>
        </div>

        <!-- 出勤表格（统一 xy- 列表规则：横滚 + 操作列固定 + 折叠 + 编辑模式列管理） -->
        <div class="xy-table xy-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="(c, ci) in block.columns || []" :key="ci" :class="ci === 0 ? 'xy-th-id' : ''"
                    :style="c.width ? { width: c.width, minWidth: c.width } : null"
                    @dblclick.stop="root.editText(path + '.columns.' + ci + '.label')">
                  <span>{{ c.label }}</span>
                  <span v-if="root.editMode" class="col-tools">
                    <i @click.stop="root.moveTableCol(path, ci, -1)" title="左移">‹</i>
                    <i @click.stop="root.moveTableCol(path, ci, 1)" title="右移">›</i>
                    <i class="danger" @click.stop="root.delTableCol(path, ci)" title="删除该列">✕</i>
                  </span>
                </th>
                <th class="xy-th-ops" style="width:100px;min-width:100px">操作<i v-if="root.editMode" class="col-add" title="添加列" @click.stop="root.addTableCol(path)">＋</i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in block.data || []" :key="ri">
                <td v-for="(c, ci) in block.columns || []" :key="ci" :class="ci === 0 ? 'xy-td-id' : ''"
                    :style="c.width ? { width: c.width, minWidth: c.width } : null">{{ row[c.prop] }}</td>
                <td class="xy-td-ops">
                  <span v-for="(a, ai) in visibleActions" :key="ai" class="xy-op" @click="runRowAction(a)">{{ a.label }}</span>
                  <el-dropdown v-if="moreActions.length" trigger="hover" @command="runMore">
                    <span class="xy-op xy-more">⋯</span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item v-for="(a, ai) in moreActions" :key="ai" :command="a">{{ a.label }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </td>
              </tr>
              <tr v-if="!(block.data || []).length">
                <td :colspan="(block.columns || []).length + 1" class="table-empty">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="xy-pager">
          <select class="xy-page-size">
            <option>30条/页</option>
            <option>50条/页</option>
            <option>100条/页</option>
          </select>
          <button class="xy-page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">&lt;</button>
          <span class="xy-page-box"><span class="xy-page-cur">{{ page }}</span>/{{ totalPages }}</span>
          <button class="xy-page-btn" :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)">&gt;</button>
          <span class="xy-page-total">共{{ block.pagination ? block.pagination.total : 0 }}条</span>
        </div>
      </div>
    `
  });

  /* ---------- 试卷中心：三页签（集团/校本/个人）+ 学校目录 + 数据页 ---------- */
  app.component('shijuan-view', {
    props: ['block'],
    inject: ['root'],
    data() {
      var params = new URLSearchParams(location.search);
      var requested = Number(params.get('tab'));
      return { tabIndex: Number.isInteger(requested) && requested >= 0 ? requested : 0, school: params.get('school') || null, sel: {}, page: 1 };
    },
    computed: {
      curTab() { return (this.block.tabs || [])[this.tabIndex] || null; },
      filters() { return this.block.filters || []; },
      moreActions() { return this.block.moreActions || []; },
      bulk() { return this.block.bulk || ['移动到', '复制到', '删除']; },
      pageList() {
        var n = (this.curTab && this.curTab.pages) || 1;
        var arr = [];
        for (var i = 1; i <= n; i++) arr.push(i);
        return arr;
      }
    },
    created() {
      if (this.school && (!this.curTab || this.curTab.mode !== 'school' || !(this.curTab.schools || []).some(s => s.name === this.school))) this.school = null;
      this.resetSel();
    },
    methods: {
      /* 筛选默认值：学科取页签 defSubject，其余取首项（全部） */
      resetSel() {
        var tab = this.curTab;
        var sel = {};
        (this.filters || []).forEach(function (f) {
          sel[f.key] = (tab && tab.defSubject && f.key === 'subject')
            ? tab.defSubject
            : ((f.options || [])[0] || '');
        });
        this.sel = sel;
        this.page = 1;
      },
      switchTab(ti) {
        this.tabIndex = ti;
        this.school = null;
        this.resetSel();
      },
      enterSchool(name) {
        this.school = name;
        this.resetSel();
      }
    },
    template: `
      <div class="sj-wrap integrated-tab-page">
        <!-- tab 头部：「我要组卷」固定在最右侧，切 tab 始终可见 -->
        <div class="beike-tabs-head sj-tabs-head">
          <div v-for="(t, ti) in block.tabs" :key="ti"
               class="beike-tab-item" :class="{ active: tabIndex === ti }"
               @click="switchTab(ti)">{{ t.name }}</div>
          <button class="btn primary sj-zujuan-btn" @click="root.openZujuan()">我要组卷</button>
        </div>

        <section class="integrated-workspace">

        <!-- 校本试卷：学校目录级（不展示查询框） -->
        <template v-if="curTab && curTab.mode === 'school' && !school">
          <div class="beike-lvl1-head">
            <div class="beike-lvl1-title"><span class="beike-lvl1-name">{{ curTab.name }}</span></div>
          </div>
          <div class="table-wrap folder-mode">
            <table>
              <thead>
                <tr><th>学校名称</th><th style="width:120px">创建人</th></tr>
              </thead>
              <tbody>
                <tr v-for="(s, si) in curTab.schools" :key="si" class="folder-row" @click="enterSchool(s.name)">
                  <td>
                    <span class="folder-cell">
                      <span class="file-icon" v-html="root.rowIconSvg({ icon: 'folder' })"></span>
                      <span class="folder-name">{{ s.name }}</span>
                    </span>
                  </td>
                  <td>{{ s.creator }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- 数据页（集团/个人直达；校本点学校后进入） -->
        <template v-else-if="curTab">
          <div class="sj-head">
            <div v-if="school" class="beike-crumb">
              <span class="bc-back" @click="school = null"><span class="bc-back-ico" v-html="root.iconSvg('back')"></span>返回</span>
              <span class="bc-bar">|</span>
              <span class="bc-seg">{{ curTab.name }}</span>
              <span class="bc-sep">›</span>
              <span class="bc-seg last">{{ school }}</span>
            </div>
            <div v-else class="beike-lvl1-title"><span class="beike-lvl1-name">{{ curTab.name }}</span></div>
            <div class="sj-head-right">
              <div class="beike-lvl1-search">
                <span class="beike-lvl1-search-icon" v-html="root.iconSvg('search')"></span>
                <input placeholder="搜索试卷" />
              </div>
            </div>
          </div>

          <!-- 筛选卡片（标签行 + 更多条件下拉） -->
          <div class="sj-filter-card">
            <div v-for="(f, fi) in filters" :key="fi" class="sj-frow">
              <div class="sj-flabel">{{ f.label }}</div>
              <div class="sj-fopts">
                <span v-for="(o, oi) in f.options" :key="oi" class="sj-tag"
                      :class="{ active: sel[f.key] === o }"
                      @click="sel = { ...sel, [f.key]: o }">{{ o }}</span>
              </div>
            </div>
            <div class="sj-frow">
              <div class="sj-flabel">更多条件</div>
              <div class="sj-fopts sj-more">
                <select v-for="n in 3" :key="n" class="sj-select"><option>全部</option></select>
              </div>
            </div>
          </div>

          <!-- 批量操作行 -->
          <div class="sj-bulkrow">
            <div class="beike-bulk">
              <span v-for="(b, bi) in bulk" :key="bi" @click="root.toast(b + '（需先选择）', 'info')">{{ b }}</span>
            </div>
          </div>

          <!-- 数据表格（名称两行：名称 + 属性串） -->
          <div class="table-wrap sj-table">
            <table>
              <thead>
                <tr>
                  <th style="width:40px"><input type="checkbox" /></th>
                  <th>试卷名称<span class="bk-sort active">↓</span></th>
                  <th style="width:90px">发布次数</th>
                  <th style="width:90px">复制次数</th>
                  <th style="width:90px">操作人</th>
                  <th style="width:170px">更新时间<span class="bk-sort active">↓</span></th>
                  <th style="width:110px">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in curTab.rows" :key="ri">
                  <td><input type="checkbox" /></td>
                  <td>
                    <div class="sj-name">{{ row.name }}</div>
                    <div class="sj-meta">{{ row.meta.join('｜') }}</div>
                  </td>
                  <td>{{ row.pubs }}</td>
                  <td>{{ row.copies }}</td>
                  <td>{{ row.operator }}</td>
                  <td>{{ row.time }}</td>
                  <td>
                    <span class="sj-ops">
                      <span class="sj-op-link" @click="root.toast('复制到（原型演示）', 'info')">复制到</span>
                      <el-dropdown trigger="hover" @command="function (cmd) { root.toast(cmd + '（原型演示）', 'info') }">
                        <span class="bk-ico-btn" v-html="root.iconSvg('more')"></span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item v-for="(m, mi) in moreActions" :key="mi"
                                              :divided="m.divided" :command="m.label">
                              <span :style="m.danger ? 'color:#dc2626' : ''">{{ m.label }}</span>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <span class="page-meta">共 {{ curTab.total }} 条</span>
            <button class="page-btn" :disabled="page <= 1" @click="page = Math.max(1, page - 1)">‹</button>
            <button v-for="p in pageList" :key="p" class="page-btn" :class="{ active: page === p }" @click="page = p">{{ p }}</button>
            <button class="page-btn" :disabled="page >= pageList.length" @click="page = Math.min(pageList.length, page + 1)">›</button>
            <select>
              <option>30 条/页</option>
              <option>50 条/页</option>
            </select>
          </div>
        </template>
        </section>
      </div>
    `
  });

  /* ---------- 我要组卷：全屏组卷页（新窗口打开，无外壳） ---------- */
  app.component('zujuan-view', {
    props: ['block'],
    inject: ['root'],
    data() {
      return { tab: 0, sel: {} };
    },
    created() {
      var sel = {};
      (this.block.filters || []).forEach(function (f) {
        if (f.type === 'tags') sel[f.key] = (f.options || [])[0];
      });
      this.sel = sel;
    },
    template: `
      <div class="zj-wrap">
        <!-- 独立顶栏 -->
        <div class="zj-top">
          <div class="zj-top-left">
            <span class="zj-logo" v-html="root.iconSvg('doc')"></span>
            <span class="zj-title">我要组卷</span>
            <span class="zj-div"></span>
            <span class="zj-subject">
              <span class="zj-subject-ico" v-html="root.iconSvg('doc')"></span>{{ block.subject || '语文' }}
              <span class="zj-caret">▾</span>
            </span>
          </div>
          <div class="zj-avatar">彭</div>
        </div>

        <!-- 页签行 + 题库选择 / 关键词搜索 -->
        <div class="zj-bar">
          <div class="zj-tabs">
            <span v-for="(t, ti) in block.tabs" :key="ti" :class="{ active: tab === ti }" @click="tab = ti">{{ t }}</span>
          </div>
          <div class="zj-bar-right">
            <select class="zj-select"><option>本地题库</option></select>
            <div class="zj-search">
              <input placeholder="请输入关键词" />
              <span class="zj-cam" v-html="root.iconSvg('camera')"></span>
            </div>
            <button class="zj-search-btn" v-html="root.iconSvg('search')"></button>
          </div>
        </div>

        <div class="zj-body">
          <!-- 左：知识树 -->
          <div class="zj-tree-card">
            <div class="zj-tree-title">知识树</div>
            <div class="zj-tree-search">
              <span class="zj-tree-search-ico" v-html="root.iconSvg('search')"></span>
              <input placeholder="请输入知识点关键字" />
            </div>
            <div class="zj-tree-list">
              <div v-for="(n, ni) in block.tree" :key="ni" class="zj-tree-item">
                <span class="zj-arrow">›</span>{{ n }}
              </div>
            </div>
          </div>

          <!-- 右：筛选 + 题目列表 -->
          <div class="zj-main">
            <div class="zj-filter-card">
              <div v-for="(f, fi) in block.filters" :key="fi" class="sj-frow">
                <div class="sj-flabel">{{ f.label }}</div>
                <div v-if="f.type === 'tags'" class="sj-fopts">
                  <span v-for="(o, oi) in f.options" :key="oi" class="sj-tag"
                        :class="{ active: sel[f.key] === o }"
                        @click="sel = { ...sel, [f.key]: o }">{{ o }}</span>
                </div>
                <div v-else class="sj-fopts sj-more">
                  <select v-for="(p, pi) in f.placeholders" :key="pi" class="sj-select"><option>{{ p }}</option></select>
                </div>
              </div>
            </div>

            <div class="zj-result-bar">
              <span class="zj-total">共筛选 <b>{{ block.total }}</b> 道题</span>
              <span class="zj-sort">综合排序 ↓</span>
              <span class="zj-sort active">最新 ↓</span>
              <button class="zj-add-all" @click="root.toast('加入本页全部题目（原型演示）', 'info')">加入本页全部题目</button>
            </div>

            <div v-for="(q, qi) in block.questions" :key="qi" class="zj-qrow">
              <span class="zj-q-diff">{{ q.diff }}</span>
              <span class="zj-q-type">{{ q.type }}</span>
              <span class="zj-q-src">来源：{{ q.src }}</span>
              <span class="zj-q-points">{{ q.points }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧悬浮组卷购物车 -->
        <div class="zj-cart" @click="root.toast('组卷（原型演示）', 'info')">
          <span class="zj-cart-ico" v-html="root.iconSvg('cart')"></span>
          <span class="zj-cart-nums"><b>10</b><i></i><b>60</b></span>
          <span class="zj-cart-label">组卷</span>
        </div>
      </div>
    `
  });

  /* ---------- 挂载 ---------- */
  app.use(ElementPlus, { locale: ElementPlusLocaleZhCn });
  app.mount('#app');
  if (EMBED_MODE && window.parent !== window) {
    var params = new URLSearchParams(location.search);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        window.parent.postMessage({
          type: 'iteach-business-ready',
          page: params.get('page') || '',
          request: params.get('request') || ''
        }, '*');
      });
    });
  }
})();
