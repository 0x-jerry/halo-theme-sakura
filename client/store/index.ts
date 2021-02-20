import { MenuDTO, menusGet, UserDTO, usersProfileGet } from '../api'
import { Actions, Mutation } from '../type'

interface ISiteState {
  user?: UserDTO
  menus?: MenuDTO[]
}

export const state: () => ISiteState = () => ({
  user: undefined,
  menus: [],
})

export const mutations: Mutation<ISiteState> = {
  setMenus(state, menus) {
    state.menus = menus
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions: Actions<ISiteState> = {
  async nuxtServerInit({ commit }) {
    const [menus, user] = await Promise.all([menusGet({}), usersProfileGet()])

    menus.sort((a, b) => a.priority - b.priority)

    commit('setMenus', menus)
    commit('setUser', user)
  },
}
