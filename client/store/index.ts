import {
  ArchiveMonthVO,
  archivesMonthsGet,
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
  archives?: ArchiveMonthVO[]
}

export const state: () => ISiteState = () => ({
  user: undefined,
  menus: [],
  tags: [],
  categories: [],
  archives: undefined,
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
  setArchives(state, archives) {
    state.archives = archives
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
  async fetchArchives({ commit, state }, force = false) {
    if (force || !state.archives) {
      const archives = await archivesMonthsGet()
      commit('setArchives', archives)
    }
  },
}
