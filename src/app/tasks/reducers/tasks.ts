import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../models/task';

import { TaskActions, TaskActionTypes } from '../actions/task';

import {
  CollectionActions,
  CollectionActionTypes,
} from '../actions/collection';

export interface State extends EntityState<Task> {
  selectedTaskId: string | null;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedTaskId: null,
});

export function reducer(
  state = initialState,
  action: TaskActions | CollectionActions
): State {
  switch (action.type) {
    case TaskActionTypes.SearchComplete:
    case CollectionActionTypes.LoadSuccess: {

      return adapter.addMany(action.payload, {
        ...state,
        selectedTaskId: state.selectedTaskId,
      });
    }

    case TaskActionTypes.Load: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedTaskId: state.selectedTaskId,
      });
    }

    case TaskActionTypes.Select: {
      return {
        ...state,
        selectedTaskId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}



export const getSelectedId = (state: State) => state.selectedTaskId;

