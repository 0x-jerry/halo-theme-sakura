import {
  ArchiveMonthVO,
  archivesMonthsGet,
  categoriesGet,
  CategoryDTO,
  MenuDTO,
  menusGet,
  PostDetailVO,
  postsPostIdGet,
  postsSlugGet,
  sheetsSheetIdGet,
  sheetsSlugGet,
  TagDTO,
  tagsGet,
  UserDTO,
  usersProfileGet,
} from '../api'
import { Actions, Mutation } from '../type'

interface ISiteState {
  user?: UserDTO
  menus: MenuDTO[]
  tags: TagDTO[]
  categories: CategoryDTO[]
  archives?: ArchiveMonthVO[]
  postsMap: Record<string, PostDetailVO>
}

export const state: () => ISiteState = () => ({
  user: undefined,
  menus: [],
  tags: [],
  categories: [],
  archives: undefined,
  postsMap: {},
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
  setPost(state, post: PostDetailVO) {
    state.postsMap[post.id] = post
    state.postsMap[post.slug] = post
  },
}

export const actions: Actions<ISiteState> = {
  async nuxtServerInit({ commit }) {
    const [menus, user, tags, categories] = await Promise.all([
      menusGet({}),
      usersProfileGet(),
      tagsGet({ more: true }),
      categoriesGet({ more: true }),
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
  async fetchPost(
    { commit, state },
    opt: { id: number; slug: string; type: string }
  ) {
    const { id, slug, type } = opt
    let post = null
    const exist = state.postsMap[id] || state.postsMap[slug]

    if (exist) {
      return
    }

    if (type === 'sheet') {
      if (id) {
        post = await sheetsSheetIdGet({ sheetId: id })
      } else {
        post = await sheetsSlugGet({ slug })
      }
    } else if (id) {
      post = await postsPostIdGet({ postId: id })
    } else {
      post = await postsSlugGet({ slug })
    }

    commit('setPost', post)
  },
}
