import i18n from '@/i18n'

/**
 * @description 创建菜单
 * @param {Function} h createElement
 * @param {Object} menu 菜单项
 */
export function elMenuItem (h, menu) {
  let icon = null
  if (menu.icon) icon = <i class={ `fa fa-${menu.icon}` }/>
  else if (menu.iconSvg) icon = <d2-icon-svg name={ menu.iconSvg }/>
  else icon = <i class="fa fa-file-o"/>
  return <el-menu-item
    key={ menu.path }
    index={ menu.path }>
    { icon }
    <span slot="title">{ i18n.t(menu.title) || i18n.t('layout.header-aside.menu-item.label-default') }</span>
  </el-menu-item>
}

/**
 * @description 创建子菜单
 * @param {Function} h createElement
 * @param {Object} menu 菜单项
 */
export function elSubmenu (h, menu) {
  let icon = null
  if (menu.icon) icon = <i slot="title" class={ `fa fa-${menu.icon}` }/>
  else if (menu.iconSvg) icon = <d2-icon-svg slot="title" name={ menu.iconSvg }/>
  else icon = <i slot="title" class="fa fa-folder-o"/>
  return <el-submenu
    key={ menu.path }
    index={ menu.path }>
    { icon }
    <span slot="title">{ i18n.t(menu.title) || i18n.t('layout.header-aside.menu-item.label-default') }</span>
    { menu.children.map(child => createMenu.call(this, h, child)) }
  </el-submenu>
}

/**
 * @description 在组件中调用此方法渲染菜单项目
 * @param {Function} h createElement
 * @param {Object} menu 菜单项
 */
export function createMenu (h, menu) {
  if (menu.children === undefined) return elMenuItem.call(this, h, menu)
  return elSubmenu.call(this, h, menu)
}
