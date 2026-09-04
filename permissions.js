(function () {
  "use strict";

  const permissionGroups = [
    {
      id: "content",
      name: "教学内容",
      description: "备课、练习、试卷、测评与资源中心",
      icon: "folders",
      pages: [
        { id: "beike", name: "备课中心", description: "集团、校本与个人云盘", legacy: "云盘（课件管理）", actions: [["enter", "进入"], ["view", "查看"], ["play", "播放"], ["create", "新建"], ["upload", "上传"], ["copy", "复制"], ["move", "移动"], ["edit", "编辑"], ["delete", "删除", true]] },
        { id: "practice", name: "练习中心", description: "练习内容、课程产品与班级绑定", legacy: "课后练习、绑定练习", actions: [["enter", "进入"], ["view", "查看"], ["create", "新建"], ["copy", "复制"], ["move", "移动"], ["edit", "编辑"], ["bind", "绑定", true], ["delete", "删除", true]] },
        { id: "paper", name: "试卷中心", description: "集团、校本、个人试卷与组卷", legacy: "题库组卷", actions: [["enter", "进入"], ["view", "预览"], ["create", "新建/组卷"], ["download", "下载"], ["copy", "复制"], ["move", "移动"], ["edit", "编辑"], ["publish", "发布", true], ["delete", "删除", true]] },
        { id: "assessment", name: "测评中心", description: "测评内容、绑定与成绩", legacy: "能力测评", actions: [["enter", "进入"], ["view", "查看"], ["create", "新建"], ["configure", "配置", true], ["bind", "绑定", true], ["results", "成绩管理"]] },
        { id: "resources", name: "资源中心", description: "集团、校本与个人资源", legacy: "资源管理", actions: [["enter", "进入"], ["view", "查看"], ["download", "下载"], ["copy", "复制"], ["create", "新建"], ["edit", "编辑"], ["publish", "发布", true], ["delete", "删除", true]] }
      ]
    },
    {
      id: "service",
      name: "教学服务",
      description: "课表、班级、学员、作业与学情",
      icon: "school",
      pages: [
        { id: "schedule", name: "我的课表", description: "课次查看与授课操作", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["manage", "管理课次", true]] },
        { id: "classes", name: "我的班级", description: "班级资料与人员信息", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["manage", "管理班级", true]] },
        { id: "students", name: "我的学员", description: "学员档案与学习关系", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["manage", "管理学员", true]] },
        { id: "homework", name: "作业管理", description: "旧权限树中没有同名入口", legacy: "可能承接班级练习详情", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["create", "新建"], ["edit", "编辑"], ["publish", "发布", true]] },
        { id: "learning", name: "学情服务", description: "班级与学员学习分析", legacy: "可能承接学情报告/学员学情", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出", true]] }
      ]
    },
    {
      id: "training",
      name: "师训专区",
      description: "功底考与教师成长内容",
      icon: "graduation-cap",
      pages: [
        { id: "basic-test", name: "功底考", description: "教师练习、考试与配置", legacy: "师训专区", actions: [["enter", "进入"], ["view", "查看"], ["participate", "参加考试"], ["configure", "考试配置", true]] },
        { id: "academy", name: "教师学堂", description: "旧权限树中没有同名入口", legacy: "无直接对应项", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["manage", "内容管理", true]] }
      ]
    },
    {
      id: "operations",
      name: "运营专区",
      description: "活动、测评应用与运营分析",
      icon: "chart-no-axes-combined",
      pages: [
        { id: "activity", name: "活动管理", description: "当前运营活动入口", legacy: "可能承接素养打卡营/活动列表", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["participate", "参与"], ["create", "新建"], ["publish", "发布", true]] },
        { id: "assessment-app", name: "测评应用", description: "与测评中心的权限边界待定", legacy: "可能来自能力测评", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["configure", "配置", true]] },
        { id: "paper-analysis", name: "试卷分析", description: "旧权限树中没有同名入口", legacy: "无直接对应项", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出", true]] },
        { id: "exam-analysis", name: "考情分析", description: "旧权限树中没有同名入口", legacy: "无直接对应项", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出", true]] }
      ]
    },
    {
      id: "applications",
      name: "应用管理",
      description: "数据、推荐、权限与平台应用",
      icon: "settings-2",
      pages: [
        { id: "data-center", name: "数据中心", description: "当前包含数据看板、出勤和退费明细", legacy: "旧权限仅有授课使用明细", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出", true]] },
        { id: "recommendation", name: "精选推荐配置", description: "首页推荐清单运营", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["configure", "配置", true]] },
        { id: "permissions", name: "权限管理", description: "角色与角色权限配置", legacy: "可能承接旧授权管理", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["manage-role", "管理角色", true], ["grant", "角色赋权", true]] },
        { id: "app-center", name: "应用中心", description: "平台应用入口", legacy: "应用中心", actions: [["enter", "进入"], ["view", "查看"], ["configure", "配置", true]] },
        { id: "recycle", name: "回收站", description: "已删除内容查看与恢复", legacy: "回收站", actions: [["enter", "进入"], ["view", "查看"], ["restore", "恢复", true]] }
      ]
    }
  ];

  const scopeDefinitions = [
    {
      id: "groupContent",
      name: "集团内容",
      description: "集团云盘、练习、试卷、测评与资源的权限边界",
      icon: "building-2",
      options: [["none", "不可访问"], ["read", "查看与使用"], ["manage", "管理集团内容"]]
    },
    {
      id: "schoolContent",
      name: "校本内容",
      description: "仅作用于当前账号所属分校，不能跨分校管理",
      icon: "school",
      options: [["none", "不可访问"], ["read", "查看与使用"], ["manage", "管理所属分校内容"]]
    },
    {
      id: "personalContent",
      name: "个人内容",
      description: "本人创建或被复制到个人空间的教学内容",
      icon: "user-round",
      options: [["none", "不可访问"], ["read", "仅查看"], ["manage", "管理个人内容"]]
    },
    {
      id: "students",
      name: "班级与学员范围",
      description: "决定课表、班级、学员和学情的数据边界",
      icon: "users-round",
      options: [["none", "不可访问"], ["assigned", "本人所授班级"], ["school", "所属分校"], ["group", "全集团"]]
    },
    {
      id: "analytics",
      name: "数据统计范围",
      description: "决定数据中心与运营分析的统计口径",
      icon: "chart-column-big",
      options: [["none", "不可访问"], ["self", "仅本人业务数据"], ["school", "所属分校"], ["group", "全集团"]]
    }
  ];

  const permissionCatalog = [];
  const pageCatalog = new Map();
  permissionGroups.forEach(group => group.pages.forEach(page => {
    page.group = group;
    pageCatalog.set(page.id, page);
    page.actions = page.actions.map(([id, label, sensitive = false]) => ({ id, label, sensitive }));
    page.actions.forEach(action => permissionCatalog.push({
      key: `${page.id}:${action.id}`,
      pageId: page.id,
      pageName: page.name,
      groupId: group.id,
      groupName: group.name,
      actionId: action.id,
      actionName: action.label,
      sensitive: action.sensitive
    }));
  }));
  const permissionByKey = new Map(permissionCatalog.map(item => [item.key, item]));

  function makePermissions(spec) {
    const grants = new Set();
    Object.entries(spec).forEach(([pageId, actionIds]) => {
      const page = pageCatalog.get(pageId);
      if (!page) return;
      const allowed = actionIds === "*" ? page.actions.map(action => action.id) : actionIds;
      allowed.forEach(actionId => grants.add(`${pageId}:${actionId}`));
    });
    return grants;
  }

  const roleSeed = [
    {
      id: "group-researcher",
      name: "集团教研员",
      description: "管理集团教学内容，查看校本内容，并配置集团功底考",
      builtin: true,
      active: true,
      evidence: "集团教研员/集团教研员.png",
      scopes: { groupContent: "manage", schoolContent: "read", personalContent: "manage", students: "none", analytics: "group" },
      permissions: makePermissions({
        beike: "*", practice: "*", paper: "*", assessment: "*", resources: "*",
        homework: ["enter", "view"], "basic-test": "*", activity: "*", "data-center": ["enter", "view", "export"], "app-center": ["enter", "view"], recycle: "*"
      })
    },
    {
      id: "branch-researcher",
      name: "分校教研员",
      description: "使用集团内容，管理本分校内容与课程产品配置",
      builtin: true,
      active: true,
      evidence: "分校教研员/分校教研员.png",
      scopes: { groupContent: "read", schoolContent: "manage", personalContent: "manage", students: "school", analytics: "none" },
      permissions: makePermissions({
        beike: "*", practice: "*", paper: "*", assessment: "*", resources: "*",
        homework: ["enter", "view"], learning: ["enter", "view"], "basic-test": ["enter", "view", "participate"], activity: ["enter", "view", "participate"], "app-center": ["enter", "view"], recycle: "*"
      })
    },
    {
      id: "teacher",
      name: "授课老师",
      description: "使用集团和校本内容，管理个人内容与本人所授班级",
      builtin: true,
      active: true,
      evidence: "授课老师/授课老师.png",
      scopes: { groupContent: "read", schoolContent: "read", personalContent: "manage", students: "assigned", analytics: "none" },
      permissions: makePermissions({
        beike: "*", practice: "*", paper: "*", assessment: ["enter", "view", "bind", "results"], resources: "*",
        schedule: ["enter", "view"], classes: ["enter", "view"], students: ["enter", "view"], homework: "*", learning: ["enter", "view"], "basic-test": ["enter", "view", "participate"], activity: ["enter", "view", "participate"], "app-center": ["enter", "view"], recycle: "*"
      })
    },
    {
      id: "branch-operator",
      name: "分校运营",
      description: "查看集团试卷，管理所属分校及个人试卷，并查看活动列表",
      builtin: true,
      active: true,
      evidence: "分校运营/分校运营.png",
      scopes: { groupContent: "read", schoolContent: "manage", personalContent: "manage", students: "none", analytics: "none" },
      permissions: makePermissions({
        paper: "*", activity: ["enter", "view"]
      })
    }
  ];

  const roles = roleSeed.map(role => ({
    ...role,
    permissions: new Set(role.permissions),
    scopes: { ...role.scopes },
    savedPermissions: new Set(role.permissions),
    savedScopes: { ...role.scopes },
    savedName: role.name,
    savedDescription: role.description,
    savedActive: role.active,
    updatedAt: "2026-09-03"
  }));

  let currentRoleId = "branch-operator";
  let activeTab = "functional";
  let permissionSearch = "";
  let showPendingOnly = false;
  let roleSearch = "";
  let roleModalMode = "create";
  let reviewRoleId = null;

  const view = document.getElementById("permissionsView");
  if (!view) return;

  view.innerHTML = `
    <section class="permission-page-head">
      <div class="breadcrumb"><span>应用管理</span><i data-lucide="chevron-right"></i><span>权限管理</span></div>
      <div class="permission-title-row">
        <div class="permission-title-copy"><h2>权限管理</h2><p>权限管理员视角：以角色为单位配置功能权限与数据范围，用户可同时拥有多个角色</p></div>
        <div class="permission-head-actions"><button class="permission-button primary" id="createPermissionRole"><i data-lucide="plus"></i>新建角色</button></div>
      </div>
    </section>
    <section class="permission-overview" id="permissionOverview"></section>
    <section class="permission-principle"><i data-lucide="shield-check"></i><span><strong>生效规则：</strong>用户有效权限取所有启用角色的并集；功能权限决定“能做什么”，数据范围决定“能对哪些对象做”。</span></section>
    <section class="permission-mapping-alert"><i data-lucide="triangle-alert"></i><span><strong>菜单改名后仍有待确认项。</strong>旧截图权限已保留；标为“待确认映射”的新菜单只按当前最可能关系展示，确认后再作为研发口径。</span><button type="button" data-show-pending-mappings>查看待确认</button></section>
    <section class="permission-workspace">
      <aside class="permission-role-panel">
        <div class="permission-role-panel-head"><h3>角色列表</h3><span class="permission-role-count" id="permissionRoleCount">0</span></div>
        <label class="permission-role-search"><i data-lucide="search"></i><input id="permissionRoleSearch" placeholder="搜索角色名称" /></label>
        <div class="permission-role-list" id="permissionRoleList"></div>
      </aside>
      <section class="permission-detail">
        <header class="permission-detail-head" id="permissionDetailHead"></header>
        <nav class="permission-tabs" id="permissionTabs" aria-label="权限配置类型"></nav>
        <div class="permission-detail-body" id="permissionDetailBody"></div>
      </section>
    </section>
  `;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="permission-modal-backdrop" id="permissionRoleModal" hidden>
      <form class="permission-modal" id="permissionRoleForm" role="dialog" aria-modal="true" aria-labelledby="permissionRoleModalTitle">
        <header class="permission-modal-head"><div><h2 id="permissionRoleModalTitle">新建角色</h2><p id="permissionRoleModalSubtitle">先建立角色，再配置功能权限与数据范围</p></div><button type="button" class="permission-modal-close" data-close-permission-role aria-label="关闭"><i data-lucide="x"></i></button></header>
        <div class="permission-modal-body">
          <label class="permission-form-field">角色名称<input id="permissionRoleName" maxlength="20" placeholder="例如：校本内容审核员" required /></label>
          <label class="permission-form-field" id="permissionTemplateField">权限模板<select id="permissionRoleTemplate"><option value="empty">空白角色</option><option value="group-researcher">复制集团教研员权限</option><option value="branch-researcher">复制分校教研员权限</option><option value="teacher">复制授课老师权限</option><option value="branch-operator">复制分校运营权限</option></select></label>
          <label class="permission-form-field">角色说明<textarea id="permissionRoleDescription" maxlength="80" placeholder="说明该角色负责什么，以及适用哪些成员"></textarea></label>
          <div class="permission-form-tip"><i data-lucide="info"></i><span>自定义角色可停用但不提供直接删除，避免已关联成员突然失去权限。</span></div>
        </div>
        <footer class="permission-modal-footer"><button type="button" class="permission-button" data-close-permission-role>取消</button><button type="submit" class="permission-button primary" id="permissionRoleSubmit">创建并配置</button></footer>
      </form>
    </div>
    <div class="permission-modal-backdrop" id="permissionReviewModal" hidden>
      <section class="permission-modal" role="dialog" aria-modal="true" aria-labelledby="permissionReviewTitle">
        <header class="permission-modal-head"><div><h2 id="permissionReviewTitle">确认权限变更</h2><p>变更保存后将影响该角色下的全部成员</p></div><button type="button" class="permission-modal-close" data-close-permission-review aria-label="关闭"><i data-lucide="x"></i></button></header>
        <div class="permission-modal-body" id="permissionReviewBody"></div>
        <footer class="permission-modal-footer"><button type="button" class="permission-button" data-close-permission-review>返回检查</button><button type="button" class="permission-button primary" id="confirmPermissionSave">确认保存</button></footer>
      </section>
    </div>
  `);

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function currentRole() {
    return roles.find(role => role.id === currentRoleId) || roles[0];
  }

  function setEquals(a, b) {
    return a.size === b.size && [...a].every(item => b.has(item));
  }

  function isRoleDirty(role) {
    return role.isNew || role.name !== role.savedName || role.description !== role.savedDescription || role.active !== role.savedActive || !setEquals(role.permissions, role.savedPermissions) || scopeDefinitions.some(scope => role.scopes[scope.id] !== role.savedScopes[scope.id]);
  }

  function scopeOptionLabel(scopeId, optionId) {
    const scope = scopeDefinitions.find(item => item.id === scopeId);
    const option = scope && scope.options.find(item => item[0] === optionId);
    return option ? option[1] : "未设置";
  }

  function roleMeta(role) {
    if (role.evidence) return `截图复刻 · ${role.builtin ? "标准角色" : "自定义角色"}`;
    return role.isNew ? "自定义角色 · 尚未关联成员" : "自定义角色 · 成员数待接口返回";
  }

  function renderOverview() {
    const evidenceRoles = roles.filter(role => role.evidence).length;
    const pendingMappings = permissionGroups.flatMap(group => group.pages).filter(page => page.mapping === "pending").length;
    document.getElementById("permissionOverview").innerHTML = `
      <article class="permission-stat"><span class="permission-stat-icon"><i data-lucide="users-round"></i></span><span>角色总数</span><strong>${roles.length}<small>个</small></strong></article>
      <article class="permission-stat"><span class="permission-stat-icon"><i data-lucide="image-check"></i></span><span>截图复刻角色</span><strong>${evidenceRoles}<small>个</small></strong></article>
      <article class="permission-stat"><span class="permission-stat-icon"><i data-lucide="file-check-2"></i></span><span>已归档权限截图</span><strong>4<small>份</small></strong></article>
      <article class="permission-stat"><span class="permission-stat-icon"><i data-lucide="message-circle-question-mark"></i></span><span>待确认菜单映射</span><strong>${pendingMappings}<small>项</small></strong></article>
    `;
  }

  function renderRoleList() {
    const list = document.getElementById("permissionRoleList");
    const query = roleSearch.trim().toLowerCase();
    const filtered = roles.filter(role => !query || role.name.toLowerCase().includes(query) || role.description.toLowerCase().includes(query));
    document.getElementById("permissionRoleCount").textContent = filtered.length;
    list.innerHTML = filtered.length ? filtered.map(role => `
      <button class="permission-role-card${role.id === currentRoleId ? " active" : ""}${role.active ? "" : " inactive"}" data-select-permission-role="${role.id}">
        <span class="permission-role-avatar">${escapeHtml(role.name.slice(0, 1))}</span>
        <span class="permission-role-copy"><strong>${escapeHtml(role.name)}</strong><small>${roleMeta(role)}</small></span>
        ${isRoleDirty(role) ? '<span class="permission-dirty-mark">待保存</span>' : `<span class="permission-role-dot${role.active ? "" : " inactive"}"></span>`}
      </button>
    `).join("") : '<div class="permission-empty">没有找到匹配角色</div>';
  }

  function renderDetailHead() {
    const role = currentRole();
    const dirty = isRoleDirty(role);
    document.getElementById("permissionDetailHead").innerHTML = `
      <div class="permission-detail-title">
        <div class="permission-role-title-line"><h3>${escapeHtml(role.name)}</h3><span class="permission-role-type${role.builtin ? "" : " custom"}">${role.builtin ? "系统角色" : "自定义角色"}</span><span class="permission-role-state${role.active ? "" : " inactive"}">${role.active ? "已启用" : "已停用"}</span></div>
        <p>${escapeHtml(role.description)} · ${role.evidence ? `权限来源：${escapeHtml(role.evidence)}` : "成员数待接口返回"} · 更新于 ${role.updatedAt}</p>
      </div>
      <div class="permission-detail-actions">
        <button class="permission-button" data-edit-permission-role ${role.builtin ? 'disabled title="系统角色资料不可修改，可复制为自定义角色"' : ""}><i data-lucide="pencil-line"></i>编辑资料</button>
        <button class="permission-button" data-copy-permission-role><i data-lucide="copy-plus"></i>复制角色</button>
        <button class="permission-role-toggle${role.active ? " active" : ""}" data-toggle-permission-role ${role.builtin ? 'disabled title="系统角色必须保持启用"' : ""}><span class="permission-switch"></span>${role.active ? "启用中" : "已停用"}</button>
        <button class="permission-button primary" data-save-permission-role ${dirty ? "" : "disabled"}><i data-lucide="save"></i>${role.isNew ? "保存新角色" : "保存变更"}</button>
      </div>
    `;
    document.getElementById("permissionTabs").innerHTML = `
      <button class="permission-tab${activeTab === "functional" ? " active" : ""}" data-permission-tab="functional">功能权限</button>
      <button class="permission-tab${activeTab === "scope" ? " active" : ""}" data-permission-tab="scope">数据范围</button>
    `;
  }

  function pageMatchesCurrentFilter(group, page) {
    const query = permissionSearch.trim().toLowerCase();
    const matchesPending = !showPendingOnly || page.mapping === "pending";
    const matchesSearch = !query || `${group.name}${group.description}${page.name}${page.description}${page.legacy || ""}${page.actions.map(action => action.label).join("")}`.toLowerCase().includes(query);
    return matchesPending && matchesSearch;
  }

  function visibleGroupKeys(group) {
    return group.pages.filter(page => pageMatchesCurrentFilter(group, page)).flatMap(page => page.actions.map(action => `${page.id}:${action.id}`));
  }

  function renderFunctionalPermissions() {
    const role = currentRole();
    const groups = permissionGroups.map(group => ({
      ...group,
      visiblePages: group.pages.filter(page => pageMatchesCurrentFilter(group, page))
    })).filter(group => group.visiblePages.length);

    document.getElementById("permissionDetailBody").innerHTML = `
      <div class="permission-toolbar">
        <label class="permission-search"><i data-lucide="search"></i><input id="permissionSearchInput" value="${escapeHtml(permissionSearch)}" placeholder="搜索模块、页面或操作" /></label>
        <div class="permission-toolbar-meta">${showPendingOnly ? '<button type="button" class="permission-filter-chip" data-clear-pending-mappings><i data-lucide="x"></i>仅看待确认</button>' : ""}<span class="permission-selected-count">已选 <strong>${role.permissions.size}</strong> / ${permissionCatalog.length} 项权限</span></div>
      </div>
      <div class="permission-tree">
        ${groups.length ? groups.map(group => {
          const keys = group.visiblePages.flatMap(page => page.actions.map(action => `${page.id}:${action.id}`));
          const selected = keys.filter(key => role.permissions.has(key)).length;
          return `<section class="permission-group">
            <header class="permission-group-head">
              <input class="permission-group-check" type="checkbox" data-permission-group="${group.id}" ${selected === keys.length ? "checked" : ""} aria-label="全选${group.name}" />
              <span class="permission-group-icon"><i data-lucide="${group.icon}"></i></span>
              <span class="permission-group-copy"><strong>${group.name}</strong><span>${group.description}</span></span>
              <span class="permission-group-summary">${selected} / ${keys.length}</span>
            </header>
            <div>${group.visiblePages.map(page => `<div class="permission-page-row${page.mapping === "pending" ? " pending" : ""}">
              <div class="permission-page-copy"><strong>${page.name}${page.mapping === "pending" ? '<em class="permission-mapping-badge pending">待确认映射</em>' : page.mapping === "new" ? '<em class="permission-mapping-badge new">2.0 新增</em>' : ""}</strong><span>${page.legacy ? `旧系统：${page.legacy} · ` : ""}${page.description}</span></div>
              <div class="permission-action-list">${page.actions.map(action => {
                const key = `${page.id}:${action.id}`;
                return `<label class="permission-action${action.sensitive ? " sensitive" : ""}"><input class="permission-action-check" type="checkbox" data-permission-key="${key}" ${role.permissions.has(key) ? "checked" : ""} />${action.sensitive ? '<span class="permission-risk-dot"></span>' : ""}<span>${action.label}</span></label>`;
              }).join("")}</div>
            </div>`).join("")}</div>
          </section>`;
        }).join("") : '<div class="permission-empty">没有找到匹配的权限</div>'}
      </div>
    `;
    groups.forEach(group => {
      const checkbox = document.querySelector(`[data-permission-group="${group.id}"]`);
      if (!checkbox) return;
      const keys = group.visiblePages.flatMap(page => page.actions.map(action => `${page.id}:${action.id}`));
      const selected = keys.filter(key => role.permissions.has(key)).length;
      checkbox.indeterminate = selected > 0 && selected < keys.length;
    });
  }

  function renderScopePermissions() {
    const role = currentRole();
    document.getElementById("permissionDetailBody").innerHTML = `
      <div class="permission-scope-intro"><i data-lucide="scan-eye"></i><span>数据范围不会自动授予功能。例如选择“全集团”只扩大已有“查看”权限的数据边界，不会自动获得编辑、发布或导出能力。</span></div>
      <div class="permission-scope-grid">
        ${scopeDefinitions.map(scope => `<article class="permission-scope-card">
          <header class="permission-scope-head"><span><i data-lucide="${scope.icon}"></i></span><div><strong>${scope.name}</strong><small>${scope.description}</small></div></header>
          <div class="permission-scope-options">${scope.options.map(([value, label]) => `<label class="permission-scope-option"><input type="radio" name="permission-scope-${scope.id}" value="${value}" data-permission-scope="${scope.id}" ${role.scopes[scope.id] === value ? "checked" : ""} /><span>${label}</span></label>`).join("")}</div>
        </article>`).join("")}
      </div>
      <div class="permission-scope-impact"><strong>当前生效边界：</strong>${scopeDefinitions.map(scope => `${scope.name}：${scopeOptionLabel(scope.id, role.scopes[scope.id])}`).join("；")}。</div>
    `;
  }

  function renderDetailBody() {
    if (activeTab === "scope") renderScopePermissions();
    else renderFunctionalPermissions();
  }

  function renderDetail() {
    renderDetailHead();
    renderDetailBody();
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.9 } });
  }

  function renderPermissions() {
    renderOverview();
    renderRoleList();
    renderDetail();
    refreshIcons();
  }

  function markRoleChanged() {
    renderOverview();
    renderRoleList();
    renderDetailHead();
    refreshIcons();
  }

  function openRoleModal(mode) {
    const role = currentRole();
    roleModalMode = mode;
    document.getElementById("permissionRoleModalTitle").textContent = mode === "edit" ? "编辑角色资料" : "新建角色";
    document.getElementById("permissionRoleModalSubtitle").textContent = mode === "edit" ? "角色名称与说明用于帮助管理员正确分配角色" : "先建立角色，再配置功能权限与数据范围";
    document.getElementById("permissionRoleName").value = mode === "edit" ? role.name : "";
    document.getElementById("permissionRoleDescription").value = mode === "edit" ? role.description : "";
    document.getElementById("permissionRoleTemplate").value = "empty";
    document.getElementById("permissionTemplateField").hidden = mode === "edit";
    document.getElementById("permissionRoleSubmit").textContent = mode === "edit" ? "保存资料" : "创建并配置";
    document.getElementById("permissionRoleModal").hidden = false;
    window.setTimeout(() => document.getElementById("permissionRoleName").focus(), 0);
  }

  function closeRoleModal() {
    document.getElementById("permissionRoleModal").hidden = true;
  }

  function closeReviewModal() {
    document.getElementById("permissionReviewModal").hidden = true;
    reviewRoleId = null;
  }

  function permissionLabel(key) {
    const item = permissionByKey.get(key);
    return item ? `${item.groupName} / ${item.pageName} / ${item.actionName}` : key;
  }

  function openReviewModal() {
    const role = currentRole();
    const added = [...role.permissions].filter(key => !role.savedPermissions.has(key));
    const removed = [...role.savedPermissions].filter(key => !role.permissions.has(key));
    const scopeChanges = scopeDefinitions.filter(scope => role.scopes[scope.id] !== role.savedScopes[scope.id]);
    const infoChanged = role.name !== role.savedName || role.description !== role.savedDescription;
    const statusChanged = role.active !== role.savedActive;
    const changes = [];
    if (role.isNew) changes.push({ type: "add", label: "角色", text: `新建角色“${role.name}”` });
    if (infoChanged && !role.isNew) changes.push({ type: "add", label: "资料", text: "更新角色名称或说明" });
    if (statusChanged) changes.push({ type: role.active ? "add" : "remove", label: "状态", text: role.active ? "启用角色" : "停用角色" });
    added.forEach(key => changes.push({ type: "add", label: "新增", text: permissionLabel(key) }));
    removed.forEach(key => changes.push({ type: "remove", label: "移除", text: permissionLabel(key) }));
    scopeChanges.forEach(scope => changes.push({ type: "add", label: "范围", text: `${scope.name}：${scopeOptionLabel(scope.id, role.savedScopes[scope.id])} → ${scopeOptionLabel(scope.id, role.scopes[scope.id])}` }));
    const visibleChanges = changes.slice(0, 10);
    reviewRoleId = role.id;
    document.getElementById("permissionReviewBody").innerHTML = `
      <div class="permission-review-role"><span>${escapeHtml(role.name.slice(0, 1))}</span>${escapeHtml(role.name)} · 将影响所有已关联该角色的成员（成员数待接口返回）</div>
      <div class="permission-review-summary">
        <div class="permission-review-stat add"><strong>+${added.length}</strong><span>新增权限</span></div>
        <div class="permission-review-stat remove"><strong>-${removed.length}</strong><span>移除权限</span></div>
        <div class="permission-review-stat"><strong>${scopeChanges.length}</strong><span>范围调整</span></div>
      </div>
      <div class="permission-review-list">${visibleChanges.map(change => `<div class="permission-review-item${change.type === "remove" ? " remove" : ""}"><b>${change.label}</b><span>${escapeHtml(change.text)}</span></div>`).join("")}${changes.length > visibleChanges.length ? `<div class="permission-review-item"><b>更多</b><span>另有 ${changes.length - visibleChanges.length} 项变更未展开</span></div>` : ""}</div>
      ${(removed.length || !role.active) ? `<div class="permission-review-warning"><i data-lucide="triangle-alert"></i><span>${!role.active ? "停用后，成员通过该角色获得的权限将不再生效。" : "移除权限后，成员可能无法继续访问相关页面或数据。"} 请确认这符合本次调整目的。</span></div>` : ""}
    `;
    document.getElementById("permissionReviewModal").hidden = false;
    refreshIcons();
  }

  function duplicateCurrentRole() {
    const source = currentRole();
    const id = `custom-${Date.now()}`;
    const duplicate = {
      id,
      name: `${source.name}副本`,
      description: `复制自${source.name}，请按实际职责调整权限`,
      builtin: false,
      active: true,
      scopes: { ...source.scopes },
      permissions: new Set(source.permissions),
      savedPermissions: new Set(),
      savedScopes: { groupContent: "none", schoolContent: "none", personalContent: "none", students: "none", analytics: "none" },
      savedName: "",
      savedDescription: "",
      savedActive: false,
      updatedAt: "尚未保存",
      isNew: true
    };
    roles.push(duplicate);
    currentRoleId = id;
    activeTab = "functional";
    permissionSearch = "";
    showPendingOnly = false;
    renderPermissions();
    if (window.toast) window.toast("已复制角色，请检查权限后保存");
  }

  view.addEventListener("click", event => {
    const roleButton = event.target.closest("[data-select-permission-role]");
    if (roleButton) {
      currentRoleId = roleButton.dataset.selectPermissionRole;
      activeTab = "functional";
      permissionSearch = "";
      showPendingOnly = false;
      renderPermissions();
      return;
    }
    const tabButton = event.target.closest("[data-permission-tab]");
    if (tabButton) {
      activeTab = tabButton.dataset.permissionTab;
      renderDetail();
      refreshIcons();
      return;
    }
    if (event.target.closest("[data-edit-permission-role]")) {
      if (currentRole().builtin) return;
      openRoleModal("edit");
      refreshIcons();
      return;
    }
    if (event.target.closest("[data-copy-permission-role]")) {
      duplicateCurrentRole();
      return;
    }
    if (event.target.closest("[data-toggle-permission-role]")) {
      const role = currentRole();
      if (role.builtin) return;
      role.active = !role.active;
      markRoleChanged();
      if (window.toast) window.toast(role.active ? "角色已设为启用，保存后生效" : "角色已设为停用，保存后生效");
      return;
    }
    if (event.target.closest("[data-save-permission-role]")) {
      openReviewModal();
      return;
    }
    if (event.target.closest("[data-show-pending-mappings]")) {
      activeTab = "functional";
      permissionSearch = "";
      showPendingOnly = true;
      renderDetail();
      refreshIcons();
      return;
    }
    if (event.target.closest("[data-clear-pending-mappings]")) {
      showPendingOnly = false;
      renderFunctionalPermissions();
      refreshIcons();
      return;
    }
  });

  view.addEventListener("change", event => {
    const role = currentRole();
    const groupId = event.target.dataset.permissionGroup;
    if (groupId) {
      const group = permissionGroups.find(item => item.id === groupId);
      if (group) visibleGroupKeys(group).forEach(key => event.target.checked ? role.permissions.add(key) : role.permissions.delete(key));
      renderFunctionalPermissions();
      markRoleChanged();
      refreshIcons();
      return;
    }
    const permissionKey = event.target.dataset.permissionKey;
    if (permissionKey) {
      const [pageId, actionId] = permissionKey.split(":");
      const page = pageCatalog.get(pageId);
      if (event.target.checked) {
        role.permissions.add(permissionKey);
        if (actionId !== "enter") role.permissions.add(`${pageId}:enter`);
      } else if (actionId === "enter" && page) {
        page.actions.forEach(action => role.permissions.delete(`${pageId}:${action.id}`));
      } else {
        role.permissions.delete(permissionKey);
      }
      renderFunctionalPermissions();
      markRoleChanged();
      refreshIcons();
      return;
    }
    const scopeId = event.target.dataset.permissionScope;
    if (scopeId) {
      role.scopes[scopeId] = event.target.value;
      renderScopePermissions();
      markRoleChanged();
      refreshIcons();
    }
  });

  view.addEventListener("input", event => {
    if (event.target.id !== "permissionSearchInput") return;
    permissionSearch = event.target.value;
    renderFunctionalPermissions();
    const input = document.getElementById("permissionSearchInput");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    refreshIcons();
  });

  document.getElementById("permissionRoleSearch").addEventListener("input", event => {
    roleSearch = event.target.value;
    renderRoleList();
  });

  document.getElementById("createPermissionRole").addEventListener("click", () => {
    openRoleModal("create");
    refreshIcons();
  });

  document.getElementById("permissionRoleForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("permissionRoleName").value.trim();
    const description = document.getElementById("permissionRoleDescription").value.trim();
    if (!name) return;
    if (roleModalMode === "edit") {
      const role = currentRole();
      role.name = name;
      role.description = description || "未填写角色说明";
      closeRoleModal();
      renderPermissions();
      if (window.toast) window.toast("角色资料已修改，保存后生效");
      return;
    }
    const templateId = document.getElementById("permissionRoleTemplate").value;
    const template = roles.find(role => role.id === templateId);
    const id = `custom-${Date.now()}`;
    const defaultScopes = { groupContent: "none", schoolContent: "none", personalContent: "none", students: "none", analytics: "none" };
    const role = {
      id,
      name,
      description: description || "未填写角色说明",
      builtin: false,
      active: true,
      scopes: template ? { ...template.scopes } : { ...defaultScopes },
      permissions: template ? new Set(template.permissions) : new Set(),
      savedPermissions: new Set(),
      savedScopes: { ...defaultScopes },
      savedName: "",
      savedDescription: "",
      savedActive: false,
      updatedAt: "尚未保存",
      isNew: true
    };
    roles.push(role);
    currentRoleId = id;
    activeTab = "functional";
    permissionSearch = "";
    showPendingOnly = false;
    closeRoleModal();
    renderPermissions();
    if (window.toast) window.toast("角色已创建，请完成权限配置并保存");
  });

  document.querySelectorAll("[data-close-permission-role]").forEach(button => button.addEventListener("click", closeRoleModal));
  document.querySelectorAll("[data-close-permission-review]").forEach(button => button.addEventListener("click", closeReviewModal));
  document.getElementById("permissionRoleModal").addEventListener("click", event => { if (event.target.id === "permissionRoleModal") closeRoleModal(); });
  document.getElementById("permissionReviewModal").addEventListener("click", event => { if (event.target.id === "permissionReviewModal") closeReviewModal(); });
  document.getElementById("confirmPermissionSave").addEventListener("click", () => {
    const role = roles.find(item => item.id === reviewRoleId);
    if (!role) return;
    role.savedPermissions = new Set(role.permissions);
    role.savedScopes = { ...role.scopes };
    role.savedName = role.name;
    role.savedDescription = role.description;
    role.savedActive = role.active;
    role.updatedAt = "刚刚";
    role.isNew = false;
    closeReviewModal();
    renderPermissions();
    if (window.toast) window.toast(`“${role.name}”的权限配置已保存`);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!document.getElementById("permissionReviewModal").hidden) closeReviewModal();
    else if (!document.getElementById("permissionRoleModal").hidden) closeRoleModal();
  });

  window.renderPermissions = renderPermissions;
  renderPermissions();
}());
