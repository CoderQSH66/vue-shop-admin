import router from '..'

const modules = import.meta.glob('@/views/**/*.vue')
const getComponent = (path: string) => {
  path = path === '/' ? 'home-filled' : path.split('/').join('-').slice(1)
  // console.log(path)
  let component = null
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(modules)) {
    if (key.includes(path)) {
      component = value
      break
    }
  }
  return component
}
export default function asyncAddRouter(menus: any[]): void {
  if (!menus) return
  menus.forEach((menu: any) => {
    const route: any = {
      path: menu.frontpath,
      component: null,
      meta: {
        title: menu.name
      }
    }
    if (menu.child.length !== 0) {
      asyncAddRouter(menu.child)
    } else {
      route.component = getComponent(route.path)
      // console.log(route)
      router.addRoute('layout', route)
    }
  })
}
