import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth-store", {
  state: () => {
    return {
      authUser: {} as any,
      isLogged: false,
      isSubmitting: false,
      isLoading: false,
    };
  },
  persist: true,
  actions: {
    async login(body: any) {
      const data: any = await useCustomFetch("/api/v1/auth/login", {
        method: "POST",
        body: body,
      });
      if (data.error.value) {
        return data;
      }
      this.authUser = data.data._rawValue.data;
      this.isLogged = true;
      return data;
    },
    async register(body: any) {
      const data: any = await useCustomFetch("/api/v1/auth/register", {
        method: "POST",
        body: body,
      });
      return data;
    },
    async loginWithGoogle(body: any) {
      const data: any = await useCustomFetch("/api/v1/auth/google", {
        method: "POST",
        body: {
          idToken: body,
        },
      });
      if (data.error.value) {
        return data;
      }
      this.authUser = data.data._rawValue.data;
      this.isLogged = true;
      return data;
    },
    async refreshToken() {
      const data: any = await useCustomFetch("/api/v1/auth/refresh", {
        method: "POST",
        body: { refreshToken: this.authUser.token.refreshToken },
      });
      this.authUser.token.accessToken = data.data._rawValue.data.accessToken;
      return data;
    },
    async logout() {
      const decoded = jwtDecode(this.authUser.token.accessToken);
      if (decoded.exp * 1000 > Date.now()) {
        const data: any = await useCustomFetch("/api/v1/auth/logout", {
          method: "POST",
        });
      }
      this.authUser = {};
      this.isLogged = false;
      navigateTo("/login");
    },
    async getProfile() {
      const data: any = await useCustomFetch("/api/v1/account/get-profile");
      this.authUser.user = data.data._rawValue.data;
      return data;
    },
    async updateProfile(body: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          "/api/v1/account/update-profile",
          {
            method: "PUT",
            body: JSON.stringify(body),
          }
        );
        this.authUser.user = data.data._rawValue.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async resendOtp(body: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch("/api/v1/auth/resend-otp", {
          method: "POST",
          body: JSON.stringify(body),
        });

        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async verifyEmail(body: any) {
      const data: any = await useCustomFetch("/api/v1/auth/verify-email", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return data;
    },
    async resetPassword(body: any) {
      const data: any = await useCustomFetch("/api/v1/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return data;
    },
    async changePassword(body: any) {
      const data: any = await useCustomFetch("/api/v1/auth/change-password", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return data;
    },
    async sendResetPassword(body: any) {
      const data: any = await useCustomFetch(
        "/api/v1/auth/send-reset-password",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      return data;
    },
  },
});
