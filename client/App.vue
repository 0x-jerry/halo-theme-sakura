<template>
  <div>
    <router-view />
    <scroll-to-top />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from './store'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      store: store.state
    }
  }
})
</script>

<style lang="less">
html {
  font-family: 'Merriweather Sans', Helvetica, Tahoma, Arial, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif;

  scroll-behavior: smooth;
  /* font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box; */
  overflow-y: visible;
}

.w-content {
  max-width: 800px;
  margin: auto;
}

#animate {
  .fade(@name, @from, @to) {
    animation: @name 0.1s linear 1 forwards;
    opacity: 0;

    @media (min-width: 520px) {
      animation: @name 0.6s linear 1 forwards;
    }

    @keyframes @name {
      0% {
        transform: @from;
        opacity: 0;
      }

      100% {
        transform: @to;
        opacity: 1;
      }
    }
  }
}

// animate
.a {
  &-fadeIn {
    #animate.fade(fadeIn, none, none);
    @offset: 20px;

    &-left {
      #animate.fade(fadeIn-left, translateX(@offset), translateX(0));
    }

    &-right {
      #animate.fade(fadeIn-right, translateX(-@offset), translateX(0));
    }

    &-top {
      #animate.fade(fadeIn-top, translateY(@offset), translateY(0));
    }

    &-bottom {
      #animate.fade(fadeIn-bottom, translateY(-@offset), translateY(0));
    }
  }
}
</style>
