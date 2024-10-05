import { jwtDecode } from "jwt-decode";

export default defineNuxtPlugin(() => {
    const userAuth = useAuthStore()
    const config = useRuntimeConfig()
    
    const $customFetch = $fetch.create({
        baseURL: config.public.apiUrl,
        onRequest({ request, options }) {
            options.headers = options.headers || {}
            options.headers['Accept'] = 'application/json'
            if (userAuth.isLogged) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${userAuth.authUser.token.accessToken}`
            }
        },
        onRequestError({ request, options, error }) {
            console.log('onRequestError', error);
        },
        onResponse({ request, response, options }) {
            // console.log('onResponse', response);
        },
        async onResponseError({ request, response, options }) {
            if (response.status === 401 && userAuth.isLogged) {
                const decoded = jwtDecode(userAuth.authUser.token.refreshToken);

                if (decoded.exp * 1000 > Date.now()) {
                    try {
                        await userAuth.refreshToken()
                        // Retry original request with new token
                        return $customFetch(request)
                    } catch (error) {
                        // Handle refreshToken error, e.g., log out user
                        userAuth.logout()
                    }
                } else {
                    userAuth.logout()
                }
            }

            if (response.status === 403) {
                userAuth.logout()
            }
        }
    })
    // Expose to useNuxtApp().$customFetch
    return {
        provide: {
            customFetch: $customFetch
        }
    }
})