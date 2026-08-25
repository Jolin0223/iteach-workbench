/* 回收站（目前仅支持课件，扩展为资源/试卷/练习均进入回收站） */
window.APP_PAGES['recycle'] = {
  name: '回收站',
  breadcrumb: '应用管理 / 回收站',
  blocks: [
    {
      type: 'alert',
      style: 'warning',
      text: '目前仅支持课件删除后进入回收站，未来支持资源、试卷、练习删除后都进入回收站，统一管理并支持查看和恢复。'
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: '课件',
          blocks: [
            {
              type: 'toolbar',
              buttons: [
                { label: '清空回收站', action: { kind: 'message', text: '原型演示：清空回收站' }, },
                { label: '批量恢复', primary: true, action: { kind: 'message', text: '已批量恢复所选内容' } }
              ],
              right: '共 3 个课件'
            },
            {
              type: 'table',
              index: true,
              columns: [
                { label: '名称', prop: 'name', bold: true },
                { label: '类型', prop: 'type', width: '70px' },
                { label: '删除时间', prop: 'time', width: '130px' },
                { label: '删除人', prop: 'by', width: '90px' }
              ],
              data: [
                { name: '旧版分数课件 V1', type: '课件', time: '2026-08-12 15:20', by: '彭振雷' },
                { name: 'Unit3 旧版素材', type: '课件', time: '2026-08-08 10:00', by: '彭振雷' }
              ],
              actions: [
                { label: '恢复', action: { kind: 'message', text: '已恢复到原位置', } },
                { label: '彻底删除', action: { kind: 'message', text: '原型演示：彻底删除（不可恢复）' }, danger: true }
              ]
            }
          ]
        },
        {
          name: '资源',
          blocks: [
            {
              type: 'table',
              index: true,
              columns: [
                { label: '名称', prop: 'name', bold: true },
                { label: '删除时间', prop: 'time', width: '130px' },
                { label: '删除人', prop: 'by', width: '90px' }
              ],
              data: [
                { name: '旧版互动素材包', time: '2026-08-10 09:30', by: '陈佳玲' }
              ],
              actions: [
                { label: '恢复', action: { kind: 'message', text: '已恢复到原位置' } },
                { label: '彻底删除', action: { kind: 'message', text: '原型演示：彻底删除（不可恢复）' }, danger: true }
              ]
            }
          ]
        },
        {
          name: '试卷',
          blocks: [
            {
              type: 'table',
              index: true,
              columns: [
                { label: '名称', prop: 'name', bold: true },
                { label: '删除时间', prop: 'time', width: '130px' },
                { label: '删除人', prop: 'by', width: '90px' }
              ],
              data: [
                { name: '2025年秋季摸底卷', time: '2026-07-30 11:00', by: '教研组' }
              ],
              actions: [
                { label: '恢复', action: { kind: 'message', text: '已恢复到原位置' } },
                { label: '彻底删除', action: { kind: 'message', text: '原型演示：彻底删除（不可恢复）' }, danger: true }
              ]
            }
          ]
        },
        {
          name: '练习',
          blocks: [
            {
              type: 'table',
              index: true,
              columns: [
                { label: '名称', prop: 'name', bold: true },
                { label: '删除时间', prop: 'time', width: '130px' },
                { label: '删除人', prop: 'by', width: '90px' }
              ],
              data: [
                { name: '旧版随堂练习（废弃）', time: '2026-08-05 14:20', by: '彭振雷' }
              ],
              actions: [
                { label: '恢复', action: { kind: 'message', text: '已恢复到原位置' } },
                { label: '彻底删除', action: { kind: 'message', text: '原型演示：彻底删除（不可恢复）' }, danger: true }
              ]
            }
          ]
        }
      ]
    }
  ]
};
