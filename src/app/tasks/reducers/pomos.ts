import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Pomo } from '../models/pomo';
import { TaskActions, TaskActionTypes } from '../actions/task';
import {  PomoActions, PomoActionTypes } from '../actions/pomo';

export interface State extends EntityState<Pomo> {
  selectedPomoId: string | null;
}

export const adapter: EntityAdapter<Pomo> = createEntityAdapter<Pomo>({
  selectId: (pomo: Pomo) => pomo.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedPomoId: null,
});

export function reducer(
  state = initialState,
  action: PomoActions | TaskActions
): State {
  switch (action.type) {
    case PomoActionTypes.LoadSuccess: {

      return adapter.addMany(action.payload, {
        ...state,
        selectedPomoId: state.selectedPomoId,
      });
    }

    case PomoActionTypes.Load: {

      return adapter.addOne(action.payload, {
        ...state,
        selectedPomoId: state.selectedPomoId,
      });
    }

    case PomoActionTypes.Select: {
      return {
        ...state,
        selectedPomoId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}


export const getSelectedId = (state: State) => state.selectedPomoId;

