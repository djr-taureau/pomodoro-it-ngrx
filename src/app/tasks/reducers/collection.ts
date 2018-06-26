import {
  CollectionActionTypes,
  CollectionActions,
} from './../actions/collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  pomoIds: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  pomoIds: []
};

export function reducer(
  state = initialState,
  action: CollectionActions
): State {
  switch (action.type) {

    case CollectionActionTypes.Load: {
      return {
        ...state,
        loading: true,
      };
    }



    case CollectionActionTypes.LoadSuccess: {
      return {
        loaded: true,
        loading: false,
        ids: action.payload.map(task => task.id),
        pomoIds: []
      };
    }

    case CollectionActionTypes.LoadPomosSuccess: {
      return {
        loaded: true,
        loading: false,
        pomoIds: action.payload.map(pomo => pomo.id),
        ids: []
      };
    }

    // case CollectionActionTypes.LoadPomosSuccess: {
    //   return {
    //     loaded: true,
    //     loading: false,
    //     pomoIds: action.payload.map(pomo => pomo.id),
    //     ids: []
    //   };
    // }

    case CollectionActionTypes.AddTaskSuccess:
    case CollectionActionTypes.RemoveTaskFail: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case CollectionActionTypes.RemoveTaskSuccess:
    case CollectionActionTypes.AddTaskFail: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getPomoIds = (state: State) => state.pomoIds;

