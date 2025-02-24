<template>
  <n-card
    v-if="showDemo"
    class="demo-card"
    :id="demoFileName"
    :segmented="{
      footer: true
    }"
    footer-style="padding: 0;"
  >
    <template #header>
      <span style="cursor: pointer" @click="handleTitleClick">
        <slot name="title" />
      </span>
    </template>
    <template #header-extra>
      <n-tooltip trigger="hover" :placement="'top'" :show-arrow="true">
        <template #trigger>
          <edit-in-code-sandbox-button
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :code="sfcCode"
          />
        </template>
        {{ t('editInCodeSandbox') }}
      </n-tooltip>
      <n-tooltip trigger="hover" :placement="'top'" :show-arrow="true">
        <template #trigger>
          <edit-on-github-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </n-tooltip>
      <n-tooltip
        ref="expandCodeButtonRef"
        trigger="hover"
        :placement="'top'"
        :show-arrow="true"
      >
        <template #trigger>
          <n-button
            style="padding: 0"
            size="tiny"
            text
            depth="3"
            @click="toggleCodeDisplay"
          >
            <template #icon>
              <n-icon>
                <code-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        {{ !showCode ? t('show') : t('hide') }}
      </n-tooltip>
    </template>
    <slot name="content" />
    <slot name="demo" />
    <template v-if="showCode" #footer>
      <n-scrollbar x-scrollable content-style="padding: 20px 24px;">
        <n-code language="html" :code="sfcCode" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { CodeOutline } from '@vicons/ionicons5'
import { useDisplayMode } from '../store'
import { i18n } from '../utils/composables'
import EditOnGithubButton from './EditOnGithubButton.vue'
import editInCodeSandboxButton from './EditInCodeSandboxButton.vue'

export default {
  components: {
    CodeOutline,
    EditOnGithubButton,
    editInCodeSandboxButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    demoFileName: {
      type: String,
      required: true
    },
    relativeUrl: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const displayModeRef = useDisplayMode()
    const isDebugDemo = /(d|D)ebug/.test(props.demoFileName)
    const showDemoRef = computed(() => {
      return !(isDebugDemo && displayModeRef.value !== 'debug')
    })
    const showCodeRef = ref(false)
    const expandCodeButtonRef = ref(null)
    watch(showCodeRef, () => {
      nextTick(() => {
        expandCodeButtonRef.value.syncPosition()
      })
    })
    return {
      expandCodeButtonRef,
      showDemo: showDemoRef,
      showCode: showCodeRef,
      sfcCode: decodeURIComponent(props.code),
      toggleCodeDisplay () {
        showCodeRef.value = !showCodeRef.value
      },
      handleTitleClick: () => {
        window.location.hash = `#${props.demoFileName}`
      },
      ...i18n({
        'zh-CN': {
          show: '显示代码',
          hide: '收起代码',
          editOnGithub: '在 Github 中编辑',
          editInCodeSandbox: '在 CodeSandbox 中编辑'
        },
        'en-US': {
          show: 'Show Code',
          hide: 'Hide Code',
          editOnGithub: 'Edit on Github',
          editInCodeSandbox: 'Edit in CodeSandbox'
        }
      })
    }
  }
}
</script>
