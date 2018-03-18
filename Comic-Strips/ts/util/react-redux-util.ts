import { State as StoreState } from '../model/store';
import { ActionTypes } from '../model/reducer';
import { Dispatch } from 'redux';

export type StoreDispatch = ( type: ActionTypes, value: Partial<StoreState> ) => void;
export function mapDispatchToProps( dispatch: Dispatch<StoreState>) {
    return {
        storeDispatch: ( type: ActionTypes, value: Partial<StoreState> ) => {
            dispatch( { type, value } )
        }
    }
}