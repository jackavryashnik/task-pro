export const selectUser = state => state.auth.user;
// export const selectToken = state => state.auth.token;
export const selectUserName = state => state.auth.user.name;
export const selectUserEmail = state => state.auth.user.email;
export const selectUserGoogleAuth = state => state.auth.user.oauth;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.isLoading;
export const selectUserTheme = state => state.auth.user.theme;
