// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  colorMode: {
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
  modules: [
    "@ant-design-vue/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "nuxt-vue3-google-signin",
    "dayjs-nuxt",
    "nuxt-highcharts"
  ],

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      // pathPrefix: false,
    },
  ],
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === "production"
          ? { preset: ["default", { discardComments: { removeAll: true } }] }
          : false, // disable cssnano when not in production
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  ui: {
    icons: "all",
  },
  vite: {
    optimizeDeps: {
      include: ["ckeditor5-custom-build"],
    },
    build: {
      commonjsOptions: {
        exclude: ["ckeditor5-custom-build"],
      },
    },
  },
  // nitro: {
  //   routeRules: {
  //     "/backend/**": {
  //       proxy: `${process.env.API_URL}/**`
  //     }
  //   }
  // }
});
