import { Action, createSelector } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.actions';

export interface State {
  text: string;
}

export const initialState: State = {
  text: ''
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.LoadApps:
      return {
        ...state
      };

    default:
      return state;
  }
}
