# Change File on Finish
You can change file's property when upload finishes.
```html
<div style="overflow: hidden">
  <n-upload
    :on-finish="handleFinish"
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  >
    <n-button>Upload</n-button>
  </n-upload>
</div>
```
```js
export default {
  methods: {
    handleFinish (file, response) {
      file.url = 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    }
  }
}
```