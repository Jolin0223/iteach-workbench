(function () {
  "use strict";

  const readContent = ["enter", "view", "play", "copy", "copy-id"];
  const readPractice = ["enter", "view", "copy", "copy-id"];
  const readPaper = ["enter", "preview", "download", "copy", "copy-id"];
  const readResource = ["enter", "view", "download", "copy"];

  const permissionGroups = [
    {
      id: "content",
      name: "教学内容",
      description: "沿用旧系统的集团、校本、个人目录层级",
      pages: [
        {
          id: "beike",
          name: "备课中心",
          legacy: "云盘（课件管理）",
          branches: [
            { id: "group", name: "集团云盘", actions: [["enter", "进入"], ["view", "查看"], ["play", "播放"], ["copy", "复制"], ["copy-id", "复制 ID"]] },
            { id: "school", name: "校本云盘", actions: [["enter", "进入"], ["view", "查看"], ["play", "播放"], ["create", "新建"], ["upload", "上传"], ["copy", "复制"], ["move", "移动"], ["rename", "重命名"], ["edit", "编辑"], ["delete", "删除", true]] },
            { id: "personal", name: "个人云盘", actions: [["enter", "进入"], ["view", "查看"], ["play", "播放"], ["create", "新建"], ["upload", "上传"], ["copy", "复制"], ["move", "移动"], ["rename", "重命名"], ["edit", "编辑"], ["delete", "删除", true]] }
          ]
        },
        {
          id: "practice",
          name: "练习中心",
          legacy: "课后练习、绑定练习",
          branches: [
            { id: "group", name: "集团练习", actions: [["enter", "进入"], ["view", "查看"], ["copy", "复制"], ["copy-id", "复制 ID"]] },
            { id: "school", name: "校本练习", actions: [["enter", "进入"], ["view", "查看"], ["create", "新建"], ["copy", "复制"], ["move", "移动"], ["rename", "重命名"], ["edit", "编辑"], ["delete", "删除", true]] },
            { id: "personal", name: "个人练习", actions: [["enter", "进入"], ["view", "查看"], ["create", "新建"], ["copy", "复制"], ["move", "移动"], ["rename", "重命名"], ["edit", "编辑"], ["delete", "删除", true]] },
            { id: "binding", name: "练习绑定", actions: [["enter", "进入"], ["product-bind", "课程产品绑定", true], ["class-bind", "班级绑定", true], ["class-detail", "班级练习详情"]] }
          ]
        },
        {
          id: "paper",
          name: "试卷中心",
          legacy: "题库组卷",
          branches: [
            { id: "compose", name: "我要组卷", actions: [["enter", "进入"], ["ai-download", "AI 批改试卷下载"], ["group-paper", "集团试卷"], ["school-paper", "校本试卷"], ["personal-paper", "个人试卷"]] },
            { id: "group", name: "集团试卷", actions: [["enter", "进入"], ["preview", "预览"], ["download", "下载"], ["copy", "复制"], ["copy-id", "复制 ID"]] },
            { id: "school", name: "校本试卷", actions: [["enter", "进入"], ["download", "下载"], ["create-copy", "创建副本"], ["move", "移动"], ["rename", "重命名"], ["edit-attribute", "编辑属性"], ["delete", "删除", true], ["preview", "预览"], ["publish", "发布", true], ["copy", "复制"], ["copy-id", "复制 ID"]] },
            { id: "personal", name: "个人试卷", actions: [["enter", "进入"], ["download", "下载"], ["create-copy", "创建副本"], ["move", "移动"], ["rename", "重命名"], ["edit-attribute", "编辑属性"], ["delete", "删除", true], ["preview", "预览"], ["publish", "发布", true], ["copy", "复制"], ["copy-id", "复制 ID"]] }
          ]
        },
        {
          id: "assessment",
          name: "测评中心",
          legacy: "能力测评",
          branches: [
            { id: "group", name: "集团测评", actions: [["enter", "进入"], ["view", "查看"], ["use", "使用"]] },
            { id: "school", name: "校本测评", actions: [["enter", "进入"], ["view", "查看"], ["use", "使用"], ["create", "新建"], ["edit", "编辑"], ["delete", "删除", true]] },
            { id: "binding", name: "测评绑定", actions: [["enter", "进入"], ["bind", "绑定", true]] },
            { id: "results", name: "成绩管理", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出"]] }
          ]
        },
        {
          id: "resources",
          name: "资源中心",
          legacy: "资源管理",
          branches: [
            { id: "group", name: "集团资源", actions: [["enter", "进入"], ["view", "查看"], ["download", "下载"], ["copy", "复制"]] },
            { id: "school", name: "校本资源", actions: [["enter", "进入"], ["view", "查看"], ["download", "下载"], ["copy", "复制"], ["create", "新建"], ["edit", "编辑"], ["publish", "发布", true], ["delete", "删除", true]] },
            { id: "personal", name: "个人资源", actions: [["enter", "进入"], ["view", "查看"], ["download", "下载"], ["copy", "复制"], ["create", "新建"], ["edit", "编辑"], ["publish", "发布", true], ["delete", "删除", true]] }
          ]
        }
      ]
    },
    {
      id: "service",
      name: "教学服务",
      description: "课表、班级、学员、作业与学情",
      pages: [
        { id: "schedule", name: "我的课表", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["manage", "管理课次", true]] },
        { id: "classes", name: "我的班级", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["manage", "管理班级", true]] },
        { id: "students", name: "我的学员", legacy: "2.0 新增", mapping: "new", actions: [["enter", "进入"], ["view", "查看"], ["manage", "管理学员", true]] },
        { id: "homework", name: "作业管理", legacy: "可能承接班级练习详情", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["create", "新建"], ["edit", "编辑"], ["publish", "发布", true]] },
        { id: "learning", name: "学情服务", legacy: "可能承接学情报告/学员学情", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出"]] }
      ]
    },
    {
      id: "training",
      name: "师训专区",
      description: "功底考与教师成长",
      pages: [
        { id: "basic-test", name: "功底考", legacy: "师训专区", actions: [["enter", "进入"], ["view", "查看"], ["participate", "参加考试"], ["configure", "考试配置", true]] },
        { id: "academy", name: "教师学堂", legacy: "无直接对应项", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["manage", "内容管理", true]] }
      ]
    },
    {
      id: "operations",
      name: "运营专区",
      description: "活动、测评应用与运营分析",
      pages: [
        { id: "activity", name: "活动管理", legacy: "可能承接素养打卡营/活动列表", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["participate", "参与"], ["create", "新建"], ["publish", "发布", true]] },
        { id: "assessment-app", name: "测评应用", legacy: "可能来自能力测评", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["configure", "配置", true]] },
        { id: "paper-analysis", name: "试卷分析", legacy: "无直接对应项", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出"]] },
        { id: "exam-analysis", name: "考情分析", legacy: "无直接对应项", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出"]] }
      ]
    },
    {
      id: "applications",
      name: "应用管理",
      description: "数据、推荐、权限与平台应用",
      pages: [
        { id: "data-center", name: "数据中心", legacy: "旧权限仅有授课使用明细", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["export", "导出"]] },
        { id: "permissions", name: "权限管理", legacy: "可能承接旧授权管理", mapping: "pending", actions: [["enter", "进入"], ["view", "查看"], ["manage-role", "角色管理", true], ["grant", "角色赋权", true]] },
        { id: "app-center", name: "应用中心", legacy: "应用中心", actions: [["enter", "进入"], ["view", "查看"], ["configure", "配置", true]] },
        { id: "recycle", name: "回收站", legacy: "回收站/回收中心", actions: [["enter", "进入"], ["view", "查看"], ["restore", "恢复", true]] }
      ]
    }
  ];

  const pageCatalog = new Map();
  const permissionCatalog = [];
  const permissionByKey = new Map();

  function normalizeActions(actions) {
    return actions.map(([id, label, sensitive = false]) => ({ id, label, sensitive }));
  }

  function permissionKey(pageId, branchId, actionId) {
    return branchId ? `${pageId}:${branchId}:${actionId}` : `${pageId}:${actionId}`;
  }

  permissionGroups.forEach(group => group.pages.forEach(page => {
    page.group = group;
    pageCatalog.set(page.id, page);
    if (page.branches) {
      page.branches.forEach(branch => {
        branch.actions = normalizeActions(branch.actions);
        branch.actions.forEach(action => {
          const item = { key: permissionKey(page.id, branch.id, action.id), groupId: group.id, groupName: group.name, pageId: page.id, pageName: page.name, branchId: branch.id, branchName: branch.name, actionId: action.id, actionName: action.label, sensitive: action.sensitive };
          permissionCatalog.push(item);
          permissionByKey.set(item.key, item);
        });
      });
    } else {
      page.actions = normalizeActions(page.actions);
      page.actions.forEach(action => {
        const item = { key: permissionKey(page.id, null, action.id), groupId: group.id, groupName: group.name, pageId: page.id, pageName: page.name, branchId: null, branchName: null, actionId: action.id, actionName: action.label, sensitive: action.sensitive };
        permissionCatalog.push(item);
        permissionByKey.set(item.key, item);
      });
    }
  }));

  function pageKeys(page) {
    if (page.branches) return page.branches.flatMap(branch => branch.actions.map(action => permissionKey(page.id, branch.id, action.id)));
    return page.actions.map(action => permissionKey(page.id, null, action.id));
  }

  function branchKeys(page, branch) {
    return branch.actions.map(action => permissionKey(page.id, branch.id, action.id));
  }

  function groupKeys(group) {
    return group.pages.flatMap(page => pageKeys(page));
  }

  function makePermissions(spec) {
    const grants = new Set();
    Object.entries(spec).forEach(([pageId, config]) => {
      const page = pageCatalog.get(pageId);
      if (!page) return;
      if (config === "*") {
        pageKeys(page).forEach(key => grants.add(key));
        return;
      }
      if (Array.isArray(config)) {
        config.forEach(actionId => {
          const key = permissionKey(pageId, null, actionId);
          if (permissionByKey.has(key)) grants.add(key);
        });
        return;
      }
      Object.entries(config).forEach(([branchId, actionIds]) => {
        const branch = page.branches && page.branches.find(item => item.id === branchId);
        if (!branch) return;
        const selected = actionIds === "*" ? branch.actions.map(action => action.id) : actionIds;
        selected.forEach(actionId => {
          const key = permissionKey(pageId, branchId, actionId);
          if (permissionByKey.has(key)) grants.add(key);
        });
      });
    });
    return grants;
  }

  const roleSeed = [
    {
      id: "group-researcher",
      name: "集团教研员",
      description: "管理集团教学内容，查看校本内容，并配置集团功底考",
      evidence: "集团教研员/集团教研员.png",
      permissions: makePermissions({
        beike: { group: "*", school: readContent, personal: "*" },
        practice: { group: "*", school: readPractice, personal: "*", binding: "*" },
        paper: { compose: "*", group: "*", school: readPaper, personal: "*" },
        assessment: { group: "*", school: ["enter", "view", "use"], binding: "*", results: "*" },
        resources: { group: "*", school: readResource, personal: "*" },
        homework: ["enter", "view"], "basic-test": "*", activity: "*", "data-center": "*", "app-center": ["enter", "view"], recycle: "*"
      })
    },
    {
      id: "branch-researcher",
      name: "分校教研员",
      description: "使用集团内容，管理本分校与个人内容及练习绑定",
      evidence: "分校教研员/分校教研员.png",
      permissions: makePermissions({
        beike: { group: readContent, school: "*", personal: "*" },
        practice: { group: readPractice, school: "*", personal: "*", binding: "*" },
        paper: { compose: "*", group: readPaper, school: "*", personal: "*" },
        assessment: { group: ["enter", "view", "use"], school: "*", binding: "*", results: "*" },
        resources: { group: readResource, school: "*", personal: "*" },
        homework: ["enter", "view"], learning: ["enter", "view"], "basic-test": ["enter", "view", "participate"], activity: ["enter", "view", "participate"], "app-center": ["enter", "view"], recycle: "*"
      })
    },
    {
      id: "teacher",
      name: "授课老师",
      description: "使用集团和校本内容，管理个人内容与本人所授班级",
      evidence: "授课老师/授课老师.png",
      permissions: makePermissions({
        beike: { group: readContent, school: readContent, personal: "*" },
        practice: { group: readPractice, school: readPractice, personal: "*", binding: "*" },
        paper: { compose: "*", group: readPaper, school: readPaper, personal: "*" },
        assessment: { group: ["enter", "view", "use"], school: ["enter", "view", "use"], binding: "*", results: "*" },
        resources: { group: readResource, school: readResource, personal: "*" },
        schedule: ["enter", "view"], classes: ["enter", "view"], students: ["enter", "view"], homework: "*", learning: ["enter", "view"], "basic-test": ["enter", "view", "participate"], activity: ["enter", "view", "participate"], "app-center": ["enter", "view"], recycle: "*"
      })
    },
    {
      id: "branch-operator",
      name: "分校运营",
      description: "查看集团试卷，管理校本和个人试卷，并查看活动列表",
      evidence: "分校运营/分校运营.png",
      permissions: makePermissions({
        paper: { compose: ["enter", "ai-download", "group-paper", "school-paper", "personal-paper"], group: ["enter", "preview"], school: "*", personal: "*" },
        activity: ["enter", "view"]
      })
    }
  ];

  const roles = roleSeed.map(role => ({
    ...role,
    builtin: true,
    active: true,
    permissions: new Set(role.permissions),
    savedPermissions: new Set(role.permissions),
    savedName: role.name,
    savedDescription: role.description,
    savedActive: true,
    updatedAt: "2026-09-03"
  }));

  let currentRoleId = "branch-operator";
  let permissionSearch = "";
  let roleSearch = "";
  let showPendingOnly = false;
  let roleModalMode = "create";
  let reviewRoleId = null;
  const collapsedNodes = new Set();

  const view = document.getElementById("permissionsView");
  if (!view) return;

  view.innerHTML = `
    <section class="permission-page-head">
      <div class="breadcrumb"><span>应用管理</span><i data-lucide="chevron-right"></i><span>权限管理</span></div>
      <div class="permission-title-row">
        <div class="permission-title-copy"><h2>权限管理</h2><p>维护角色，并按现有菜单层级给角色赋权</p></div>
        <div class="permission-head-actions"><button class="permission-button primary" id="createPermissionRole"><i data-lucide="plus"></i>新建角色</button></div>
      </div>
    </section>
    <section class="permission-workspace permission-workspace-tree">
      <aside class="permission-role-panel">
        <div class="permission-role-panel-head"><h3>角色列表</h3><span class="permission-role-count" id="permissionRoleCount">0</span></div>
        <label class="permission-role-search"><i data-lucide="search"></i><input id="permissionRoleSearch" placeholder="搜索角色名称" /></label>
        <div class="permission-role-list" id="permissionRoleList"></div>
      </aside>
      <section class="permission-detail permission-detail-tree">
        <header class="permission-detail-head" id="permissionDetailHead"></header>
        <div class="permission-detail-body" id="permissionDetailBody"></div>
      </section>
    </section>
  `;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="permission-modal-backdrop" id="permissionRoleModal" hidden>
      <form class="permission-modal" id="permissionRoleForm" role="dialog" aria-modal="true" aria-labelledby="permissionRoleModalTitle">
        <header class="permission-modal-head"><div><h2 id="permissionRoleModalTitle">新建角色</h2><p id="permissionRoleModalSubtitle">先建立角色，再按菜单树配置权限</p></div><button type="button" class="permission-modal-close" data-close-permission-role aria-label="关闭"><i data-lucide="x"></i></button></header>
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
        <header class="permission-modal-head"><div><h2 id="permissionReviewTitle">确认权限变更</h2><p>保存后将影响该角色的全部关联成员</p></div><button type="button" class="permission-modal-close" data-close-permission-review aria-label="关闭"><i data-lucide="x"></i></button></header>
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
    return role.isNew || role.name !== role.savedName || role.description !== role.savedDescription || role.active !== role.savedActive || !setEquals(role.permissions, role.savedPermissions);
  }

  function roleMeta(role) {
    if (role.builtin) return "标准角色";
    return role.isNew ? "自定义角色 · 尚未保存" : "自定义角色";
  }

  function renderRoleList() {
    const query = roleSearch.trim().toLowerCase();
    const filtered = roles.filter(role => !query || `${role.name}${role.description}`.toLowerCase().includes(query));
    document.getElementById("permissionRoleCount").textContent = filtered.length;
    document.getElementById("permissionRoleList").innerHTML = filtered.length ? filtered.map(role => `
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
        <div class="permission-role-title-line"><h3>${escapeHtml(role.name)}</h3><span class="permission-role-type${role.builtin ? "" : " custom"}">${role.builtin ? "标准角色" : "自定义角色"}</span><span class="permission-role-state${role.active ? "" : " inactive"}">${role.active ? "已启用" : "已停用"}</span></div>
        <p>${escapeHtml(role.description)}</p>
      </div>
      <div class="permission-detail-actions">
        <button class="permission-button" data-edit-permission-role ${role.builtin ? 'disabled title="标准角色资料不可修改，可复制后调整"' : ""}><i data-lucide="pencil-line"></i>编辑资料</button>
        <button class="permission-button" data-copy-permission-role><i data-lucide="copy-plus"></i>复制角色</button>
        <button class="permission-role-toggle${role.active ? " active" : ""}" data-toggle-permission-role ${role.builtin ? 'disabled title="标准角色必须保持启用"' : ""}><span class="permission-switch"></span>${role.active ? "启用中" : "已停用"}</button>
        <button class="permission-button primary" data-save-permission-role ${dirty ? "" : "disabled"}><i data-lucide="save"></i>${role.isNew ? "保存新角色" : "保存变更"}</button>
      </div>
    `;
  }

  function pageSearchText(page) {
    const actionText = page.branches ? page.branches.map(branch => `${branch.name}${branch.actions.map(action => action.label).join("")}`).join("") : page.actions.map(action => action.label).join("");
    return `${page.group.name}${page.name}${page.legacy || ""}${actionText}`.toLowerCase();
  }

  function pageIsVisible(page) {
    const query = permissionSearch.trim().toLowerCase();
    return (!showPendingOnly || page.mapping === "pending") && (!query || pageSearchText(page).includes(query));
  }

  function visibleGroupKeys(group) {
    return group.pages.filter(pageIsVisible).flatMap(page => pageKeys(page));
  }

  function mappingBadge(page) {
    if (page.mapping === "pending") return '<em class="permission-mapping-badge pending">待确认映射</em>';
    if (page.mapping === "new") return '<em class="permission-mapping-badge new">2.0 新增</em>';
    return "";
  }

  function renderAction(page, branch, action) {
    const key = permissionKey(page.id, branch && branch.id, action.id);
    return `<label class="permission-tree-leaf${action.sensitive ? " sensitive" : ""}"><input type="checkbox" data-permission-key="${key}" ${currentRole().permissions.has(key) ? "checked" : ""} /><span>${action.label}</span>${action.sensitive ? '<i data-lucide="shield-alert"></i>' : ""}</label>`;
  }

  function renderPage(page) {
    const role = currentRole();
    const keys = pageKeys(page);
    const selected = keys.filter(key => role.permissions.has(key)).length;
    const collapsed = collapsedNodes.has(`page:${page.id}`);
    return `<section class="permission-tree-page${page.mapping === "pending" ? " pending" : ""}">
      <header class="permission-tree-page-head">
        <button type="button" class="permission-node-toggle${collapsed ? " collapsed" : ""}" data-collapse-node="page:${page.id}" aria-label="${collapsed ? "展开" : "收起"}${page.name}"><i data-lucide="chevron-down"></i></button>
        <input type="checkbox" data-permission-page="${page.id}" aria-label="全选${page.name}" />
        <span class="permission-tree-page-copy"><strong>${page.name}${mappingBadge(page)}</strong><small>旧系统：${page.legacy || "无同名节点"}</small></span>
        <span class="permission-node-count">${selected}/${keys.length}</span>
      </header>
      <div class="permission-tree-page-children" ${collapsed ? "hidden" : ""}>
        ${page.branches ? page.branches.map(branch => {
          const branchSelection = branchKeys(page, branch).filter(key => role.permissions.has(key)).length;
          return `<div class="permission-tree-branch">
            <div class="permission-tree-branch-head"><span class="permission-tree-line"></span><input type="checkbox" data-permission-branch="${page.id}|${branch.id}" aria-label="全选${branch.name}" /><strong>${branch.name}</strong><small>${branchSelection}/${branch.actions.length}</small></div>
            <div class="permission-tree-actions">${branch.actions.map(action => renderAction(page, branch, action)).join("")}</div>
          </div>`;
        }).join("") : `<div class="permission-tree-actions direct">${page.actions.map(action => renderAction(page, null, action)).join("")}</div>`}
      </div>
    </section>`;
  }

  function syncNodeCheckbox(checkbox, keys) {
    if (!checkbox) return;
    const selected = keys.filter(key => currentRole().permissions.has(key)).length;
    checkbox.checked = keys.length > 0 && selected === keys.length;
    checkbox.indeterminate = selected > 0 && selected < keys.length;
  }

  function syncTreeCheckboxes(groups) {
    groups.forEach(group => {
      syncNodeCheckbox(document.querySelector(`[data-permission-group="${group.id}"]`), visibleGroupKeys(group));
      group.visiblePages.forEach(page => {
        syncNodeCheckbox(document.querySelector(`[data-permission-page="${page.id}"]`), pageKeys(page));
        if (page.branches) page.branches.forEach(branch => syncNodeCheckbox(document.querySelector(`[data-permission-branch="${page.id}|${branch.id}"]`), branchKeys(page, branch)));
      });
    });
  }

  function renderPermissionTree() {
    const role = currentRole();
    const groups = permissionGroups.map(group => ({ ...group, visiblePages: group.pages.filter(pageIsVisible) })).filter(group => group.visiblePages.length);
    document.getElementById("permissionDetailBody").innerHTML = `
      <div class="permission-tree-title"><div><h4>功能权限</h4><p>按旧系统权限树逐级勾选；父节点会联动当前节点下的全部子项</p></div><span>已选 <strong>${role.permissions.size}</strong> 项</span></div>
      <div class="permission-toolbar permission-tree-toolbar">
        <label class="permission-search"><i data-lucide="search"></i><input id="permissionSearchInput" value="${escapeHtml(permissionSearch)}" placeholder="搜索菜单或权限" /></label>
        <div class="permission-toolbar-meta"><button type="button" class="permission-pending-filter${showPendingOnly ? " active" : ""}" data-toggle-pending-mappings><i data-lucide="message-circle-question-mark"></i>${showPendingOnly ? "显示全部" : "待确认菜单"}</button></div>
      </div>
      <div class="permission-tree-native">
        ${groups.length ? groups.map(group => {
          const keys = visibleGroupKeys(group);
          const selected = keys.filter(key => role.permissions.has(key)).length;
          const collapsed = collapsedNodes.has(`group:${group.id}`);
          return `<section class="permission-tree-group">
            <header class="permission-tree-group-head">
              <button type="button" class="permission-node-toggle${collapsed ? " collapsed" : ""}" data-collapse-node="group:${group.id}" aria-label="${collapsed ? "展开" : "收起"}${group.name}"><i data-lucide="chevron-down"></i></button>
              <input type="checkbox" data-permission-group="${group.id}" aria-label="全选${group.name}" />
              <span><strong>${group.name}</strong><small>${group.description}</small></span>
              <em>${selected}/${keys.length}</em>
            </header>
            <div class="permission-tree-group-children" ${collapsed ? "hidden" : ""}>${group.visiblePages.map(renderPage).join("")}</div>
          </section>`;
        }).join("") : '<div class="permission-empty">没有找到匹配权限</div>'}
      </div>
    `;
    syncTreeCheckboxes(groups);
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.9 } });
  }

  function renderPermissions() {
    renderRoleList();
    renderDetailHead();
    renderPermissionTree();
    refreshIcons();
  }

  function openRoleModal(mode) {
    const role = currentRole();
    roleModalMode = mode;
    document.getElementById("permissionRoleModalTitle").textContent = mode === "edit" ? "编辑角色资料" : "新建角色";
    document.getElementById("permissionRoleModalSubtitle").textContent = mode === "edit" ? "角色名称与说明用于帮助管理员正确分配角色" : "先建立角色，再按菜单树配置权限";
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
    if (!item) return key;
    return `${item.groupName} / ${item.pageName}${item.branchName ? ` / ${item.branchName}` : ""} / ${item.actionName}`;
  }

  function openReviewModal() {
    const role = currentRole();
    const added = [...role.permissions].filter(key => !role.savedPermissions.has(key));
    const removed = [...role.savedPermissions].filter(key => !role.permissions.has(key));
    const infoChanged = role.name !== role.savedName || role.description !== role.savedDescription;
    const statusChanged = role.active !== role.savedActive;
    const changes = [];
    if (role.isNew) changes.push({ type: "add", label: "角色", text: `新建角色“${role.name}”` });
    if (infoChanged && !role.isNew) changes.push({ type: "add", label: "资料", text: "更新角色名称或说明" });
    if (statusChanged) changes.push({ type: role.active ? "add" : "remove", label: "状态", text: role.active ? "启用角色" : "停用角色" });
    added.forEach(key => changes.push({ type: "add", label: "新增", text: permissionLabel(key) }));
    removed.forEach(key => changes.push({ type: "remove", label: "移除", text: permissionLabel(key) }));
    const visibleChanges = changes.slice(0, 12);
    reviewRoleId = role.id;
    document.getElementById("permissionReviewBody").innerHTML = `
      <div class="permission-review-role"><span>${escapeHtml(role.name.slice(0, 1))}</span>${escapeHtml(role.name)} · 关联成员数待接口返回</div>
      <div class="permission-review-summary"><div class="permission-review-stat add"><strong>+${added.length}</strong><span>新增权限</span></div><div class="permission-review-stat remove"><strong>-${removed.length}</strong><span>移除权限</span></div><div class="permission-review-stat"><strong>${changes.length}</strong><span>本次变更</span></div></div>
      <div class="permission-review-list">${visibleChanges.map(change => `<div class="permission-review-item${change.type === "remove" ? " remove" : ""}"><b>${change.label}</b><span>${escapeHtml(change.text)}</span></div>`).join("")}${changes.length > visibleChanges.length ? `<div class="permission-review-item"><b>更多</b><span>另有 ${changes.length - visibleChanges.length} 项未展开</span></div>` : ""}</div>
      ${(removed.length || !role.active) ? `<div class="permission-review-warning"><i data-lucide="triangle-alert"></i><span>${!role.active ? "停用后，通过该角色获得的权限将不再生效。" : "移除权限后，成员可能无法继续访问相关菜单。"}</span></div>` : ""}
    `;
    document.getElementById("permissionReviewModal").hidden = false;
    refreshIcons();
  }

  function duplicateCurrentRole() {
    const source = currentRole();
    const id = `custom-${Date.now()}`;
    roles.push({ id, name: `${source.name}副本`, description: `复制自${source.name}，请按实际职责调整权限`, builtin: false, active: true, permissions: new Set(source.permissions), savedPermissions: new Set(), savedName: "", savedDescription: "", savedActive: false, updatedAt: "尚未保存", isNew: true });
    currentRoleId = id;
    permissionSearch = "";
    showPendingOnly = false;
    renderPermissions();
    if (window.toast) window.toast("已复制角色，请检查权限后保存");
  }

  function keysForNode(target) {
    const groupId = target.dataset.permissionGroup;
    if (groupId) {
      const group = permissionGroups.find(item => item.id === groupId);
      return group ? visibleGroupKeys(group) : [];
    }
    const pageId = target.dataset.permissionPage;
    if (pageId) {
      const page = pageCatalog.get(pageId);
      return page ? pageKeys(page) : [];
    }
    const branchValue = target.dataset.permissionBranch;
    if (branchValue) {
      const [branchPageId, branchId] = branchValue.split("|");
      const page = pageCatalog.get(branchPageId);
      const branch = page && page.branches && page.branches.find(item => item.id === branchId);
      return branch ? branchKeys(page, branch) : [];
    }
    return [];
  }

  view.addEventListener("click", event => {
    const roleButton = event.target.closest("[data-select-permission-role]");
    if (roleButton) {
      currentRoleId = roleButton.dataset.selectPermissionRole;
      permissionSearch = "";
      showPendingOnly = false;
      renderPermissions();
      return;
    }
    const collapseButton = event.target.closest("[data-collapse-node]");
    if (collapseButton) {
      const id = collapseButton.dataset.collapseNode;
      collapsedNodes.has(id) ? collapsedNodes.delete(id) : collapsedNodes.add(id);
      renderPermissionTree();
      refreshIcons();
      return;
    }
    if (event.target.closest("[data-toggle-pending-mappings]")) {
      showPendingOnly = !showPendingOnly;
      permissionSearch = "";
      renderPermissionTree();
      refreshIcons();
      return;
    }
    if (event.target.closest("[data-edit-permission-role]")) {
      if (!currentRole().builtin) openRoleModal("edit");
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
      renderPermissions();
      if (window.toast) window.toast(role.active ? "角色已设为启用，保存后生效" : "角色已设为停用，保存后生效");
      return;
    }
    if (event.target.closest("[data-save-permission-role]")) {
      openReviewModal();
    }
  });

  view.addEventListener("change", event => {
    const role = currentRole();
    const permissionKeyValue = event.target.dataset.permissionKey;
    if (permissionKeyValue) {
      if (event.target.checked) {
        role.permissions.add(permissionKeyValue);
        const item = permissionByKey.get(permissionKeyValue);
        if (item && item.actionId !== "enter") {
          const enterKey = permissionKey(item.pageId, item.branchId, "enter");
          if (permissionByKey.has(enterKey)) role.permissions.add(enterKey);
        }
      } else {
        role.permissions.delete(permissionKeyValue);
        const item = permissionByKey.get(permissionKeyValue);
        if (item && item.actionId === "enter") {
          const keys = item.branchId ? branchKeys(pageCatalog.get(item.pageId), pageCatalog.get(item.pageId).branches.find(branch => branch.id === item.branchId)) : pageKeys(pageCatalog.get(item.pageId));
          keys.forEach(key => role.permissions.delete(key));
        }
      }
    } else {
      const keys = keysForNode(event.target);
      if (!keys.length) return;
      keys.forEach(key => event.target.checked ? role.permissions.add(key) : role.permissions.delete(key));
    }
    renderRoleList();
    renderDetailHead();
    renderPermissionTree();
    refreshIcons();
  });

  view.addEventListener("input", event => {
    if (event.target.id !== "permissionSearchInput") return;
    permissionSearch = event.target.value;
    renderPermissionTree();
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
    roles.push({ id, name, description: description || "未填写角色说明", builtin: false, active: true, permissions: template ? new Set(template.permissions) : new Set(), savedPermissions: new Set(), savedName: "", savedDescription: "", savedActive: false, updatedAt: "尚未保存", isNew: true });
    currentRoleId = id;
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
