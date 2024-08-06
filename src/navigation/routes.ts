export const ONBOURDING_ROUTES = {} as const;

export const DASHBOARD_ROUTES = {
  SIGNUP_TAB_SCREEN: 'Signup_Tab_Screen',
  USERS_TAB_SCREEN: 'Users_Tab_Screen',

  USERS_SCREEN: 'Users_Screen',
  SIGNUP_SCREEN: 'Signup_Screen',
  STATUS_SCREEN: 'Status_Screen',
  INTERNET_CHECK_SCREEN: 'Internet_Check_Screen',
} as const;

export type valueof<T> = T[keyof T];

// export type ChildrenRoutes =
//   | valueof<typeof PROPOSE_ROUTES>
//   | valueof<typeof PROFILE_ROUTES>

export type OnboardingRoutes = valueof<typeof ONBOURDING_ROUTES>;
export type RootDashboard = valueof<typeof DASHBOARD_ROUTES>;

export type RootRoutes = OnboardingRoutes | RootDashboard;

// export type AllRoutes = RootRoutes | ChildrenRoutes
export type AllRoutes = RootRoutes;
