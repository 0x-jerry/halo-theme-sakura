<template>
  <div class="install m-auto mt-30">
    <v-steps
      v-model:current-step="currentStep"
      :steps="['博主信息', '博客信息', '数据导入']"
    >
      <template #step-0>
        <h1 class="text-center">
          博主信息
        </h1>
        <div>
          <input
            v-model="setupData.username"
            class="v-input"
            type="text"
            placeholder="用户名"
          />
        </div>
        <div>
          <input
            v-model="setupData.nickname"
            class="v-input"
            type="text"
            placeholder="用户昵称"
          />
        </div>
        <div>
          <input
            v-model="setupData.email"
            class="v-input"
            type="text"
            placeholder="用户邮箱"
          />
        </div>
        <div>
          <input
            v-model="setupData.password"
            class="v-input"
            type="text"
            placeholder="用户密码（8-100）"
          />
        </div>
        <div>
          <input
            v-model="setupData.confirmPassword"
            class="v-input"
            type="text"
            placeholder="确认密码"
          />
        </div>
        <div>
          <button class="v-button" @click="nextStep">
            下一步
          </button>
        </div>
      </template>
      <template #step-1>
        <h1 class="text-center">
          博客信息
        </h1>
        <div>
          <input
            v-model="setupData.url"
            class="v-input"
            type="text"
            placeholder="博客地址"
          />
        </div>
        <div>
          <input
            v-model="setupData.title"
            class="v-input"
            type="text"
            placeholder="博客标题"
          />
        </div>
        <div>
          <button class="v-button" @click="nextStep">
            下一步
          </button>
        </div>
      </template>
      <template #step-2>
        <h1 class="text-center">
          数据导入
        </h1>
        <div>
          <input type="file" placeholder="备份数据" />
        </div>
        <div>
          <button class="v-button" @click="complete">
            完成
          </button>
        </div>
      </template>
    </v-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { installationsPost } from '~/api'
import { isSSR } from '~/utils'

function getUrl() {
  if (isSSR) {
    return ''
  }

  const url = new URL(location.href)

  return url.protocol + '//' + url.host
}

export default defineComponent({
  setup() {
    const currentStep = ref(0)

    const setupData = reactive({
      avatar: '',
      description: '',
      locale: '',
      file: '',

      username: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      url: getUrl(),
      title: ''
    })

    const router = useRouter()

    return {
      setupData,
      currentStep,
      nextStep() {
        currentStep.value++
      },
      async complete() {
        const data = Object.keys(setupData).reduce((o, key) => {
          // @ts-ignore
          if (setupData[key]) {
            // @ts-ignore
            o[key] = setupData[key]
          }

          return o
        }, {})

        await installationsPost({
          // @ts-ignore
          __body: data
        })

        router.push('/')
      }
    }
  }
})
</script>

<style lang="less">
.install {
  width: 50%;
}
.v-input {
  border: 1px solid;
  @apply border-gray-200;

  @apply mt-5 w-full px-3 py-2;

  &:focus {
    outline: none;
  }
}

.v-button {
  border: 1px solid;
  @apply border-gray-200;

  @apply mt-5 w-full px-3 py-2;

  &:focus {
    outline: none;
  }
}
</style>
