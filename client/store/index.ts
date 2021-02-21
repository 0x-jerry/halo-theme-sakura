import {
  categoriesGet,
  CategoryDTO,
  MenuDTO,
  menusGet,
  TagDTO,
  tagsGet,
  UserDTO,
  usersProfileGet,
} from '../api'
import { Actions, Mutation } from '../type'

interface ISiteState {
  user?: UserDTO
  menus?: MenuDTO[]
  tags?: TagDTO[]
  categories?: CategoryDTO[]
}

export const state: () => ISiteState = () => ({
  user: undefined,
  menus: [],
  tags: [],
  categories: [],
})

export const mutations: Mutation<ISiteState> = {
  setMenus(state, menus) {
    state.menus = menus
  },
  setUser(state, user) {
    state.user = user
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setCategories(state, categories) {
    state.categories = categories
  },
}

export const actions: Actions<ISiteState> = {
  async nuxtServerInit({ commit }) {
    const [menus, user, tags, categories] = await Promise.all([
      menusGet({}),
      usersProfileGet(),
      tagsGet({}),
      categoriesGet({}),
    ])

    menus.sort((a, b) => a.priority - b.priority)

    commit('setMenus', menus)
    commit('setUser', user)
    commit('setTags', tags)
    commit('setCategories', categories)
  },
}
