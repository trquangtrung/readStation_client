export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const { default: CKEditor } = await import('@ckeditor/ckeditor5-vue');
    const { default: Editor } = await import('ckeditor5-custom-build');

    nuxtApp.vueApp.use(CKEditor);

    return {
      provide: {
        ckeditor: {
          classicEditor: Editor,
        },
      },
    };
  }
});
