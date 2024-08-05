import React from 'react';
import {
  NavigationContainerRef,
  CommonActions,
  NavigationState,
  PartialState,
  StackActions,
} from '@react-navigation/native';
// import logger from 'utils/logger';

export const isReadyNavigation = {
  current: false,
};

export const navigationRef = React.createRef<NavigationContainerRef>();

interface Params {
  data?: any;
  item?: any;
}

type NavigationParams = {
  screen?: any;
  params?: Params;
};

type ResetParams = {
  index: number;
  routes: {name: any}[];
};

const navigate = (name: any, params?: Params & NavigationParams) => {
  if (isReadyNavigation.current && navigationRef.current) {
    navigationRef.current.navigate(name, {
      ...params,
      ...params?.params,
    });
  } else {
    // logger.log('Navigation not init');
  }
};

const push = (name: any, params?: Params) => {
  if (isReadyNavigation.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  } else {
    // logger.log('Navigation not init');
  }
};

const getActiveRouteName = (): string => {
  const state = navigationRef.current?.getRootState();
  let routeName = '';
  // logger.log('state?.routes', state?.routes);
  if (state?.routes) {
    routeName = getActiveRouteNameFromState(state);
  }
  return routeName;
};

const getActiveRouteNameFromState = (
  state: NavigationState | PartialState<NavigationState>,
): string => {
  if (!state.routes) {
    return '';
  }

  const route = state.routes[state.index!];

  if (route.state) {
    return getActiveRouteNameFromState(route.state);
  }

  return route.name;
};

const reset = (params: ResetParams) =>
  navigationRef.current?.dispatch(CommonActions.reset(params));

const resetRoot = () => {
  navigationRef.current?.resetRoot();
};

const setParams = (params: object) => {
  navigationRef.current?.dispatch(CommonActions.setParams(params));
};

const goBack = () => navigationRef.current?.dispatch(CommonActions.goBack());

export default {
  getActiveRouteName,
  navigate,
  reset,
  goBack,
  resetRoot,
  setParams,
  push,
};
