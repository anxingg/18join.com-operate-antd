import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

const menuAdapter=(data)=>{
  const gmenus=data.filter((x)=>x.isShow==='1').sort(x=>x.sort).group(item => item.parent.id)
  for(const x of gmenus[1] ){
    x.child=gmenus[x.id]
  }
  return gmenus[1]
}

const topMenus = []
const getMenus = function (menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.id} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.id) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, '/main/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.id}>
            <Link to={(item.href.replace(/\/operate/,'')).replace(/.html/,'')}>
              {item.icon ? <Icon type={item.icon} /> : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus ({menus, siderFold, darkTheme, location, isNavbar, switchSubMenu }) {
  const treeMenus=menuAdapter(menus)
  const menuItems = getMenus(treeMenus, siderFold)
  return (
    <Menu
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={switchSubMenu}
      defaultOpenKeys={isNavbar ? menuItems.map(item => item.key) : []}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}>
      {menuItems}
    </Menu>
  )
}

export default Menus
