/* ============================================================
 * 页面配置汇总入口（自动加载器）
 * 扫描 menu.js 中每个菜单项的 file 字段，依次加载页面配置
 * 新增页面：1) 在 menu.js 加菜单项并填 file 2) 新建对应文件
 * ============================================================ */
window.APP_PAGES = window.APP_PAGES || {};

(function () {
  var files = [];
  var groups = (window.APP_MENU || {}).groups || [];
  groups.forEach(function (g) {
    (g.items || []).forEach(function (it) {
      if (it.file && files.indexOf(it.file) === -1) files.push(it.file);
    });
  });
  // 非菜单入口的二级页面（如绑定练习），需显式补充加载
  ['pages/bangding.js', 'pages/banjidetail.js', 'pages/lianxidetail.js', 'pages/xueqing.js', 'pages/chuqin.js', 'pages/zujuan.js'].forEach(function (f) {
    if (files.indexOf(f) === -1) files.push(f);
  });
  // 交给 index.html 的防缓存加载器按序注入（不再用 document.write，
  // 以便给每个脚本追加时间戳参数，file:// 直开也永远读最新配置）
  window.APP_PAGE_FILES = files;
})();
