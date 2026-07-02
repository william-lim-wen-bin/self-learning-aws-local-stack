import { produce } from 'immer';
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

export interface CreateProductDrawerState {
  values: {
    productName: string;
    productPrice: string;
    productDescription: string;
  };
  errors: {
    productName?: string;
    productPrice?: string;
    productDescription?: string;
  };
  isLoading: boolean;
  isGenericError: boolean;
}

export type CreateProductDrawerAction =
  | {
      type: 'SET_FIELD';
      field: keyof CreateProductDrawerState['values'];
      value: string;
    }
  | { type: 'SET_ERRORS'; errors: CreateProductDrawerState['errors'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_ERROR' }
  | { type: 'SUBMIT_END' }
  | { type: 'RESET' };

export const createProductDrawerInitialState: CreateProductDrawerState = {
  values: {
    productName: '',
    productPrice: '',
    productDescription: '',
  },
  errors: {},
  isLoading: false,
  isGenericError: false,
};

export const createProductDrawerReducer = (
  state: CreateProductDrawerState,
  action: CreateProductDrawerAction,
): CreateProductDrawerState =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'SET_FIELD':
        draft.values[action.field] = action.value;
        delete draft.errors[action.field];
        break;
      case 'SUBMIT_START':
        draft.isLoading = true;
        draft.isGenericError = false;
        draft.errors = {};
        break;
      case 'SET_ERRORS':
        draft.errors = action.errors;
        break;
      case 'SUBMIT_ERROR':
        draft.isGenericError = true;
        break;
      case 'SUBMIT_END':
        draft.isLoading = false;
        break;
      case 'RESET':
        return createProductDrawerInitialState;
    }
  });

export const validateCreateProductDrawer = (
  values: CreateProductDrawerState['values'],
): CreateProductDrawerState['errors'] => {
  const errors: CreateProductDrawerState['errors'] = {};

  if (!values.productName) {
    errors.productName = 'Product name is required';
  }

  if (!values.productPrice) {
    errors.productPrice = 'Product price is required';
  } else if (Number(values.productPrice) <= 0) {
    errors.productPrice = 'Product price must be greater than 0';
  }

  return errors;
};

const CreateProductDrawerContext = createContext<
  | {
      state: CreateProductDrawerState;
      dispatch: Dispatch<CreateProductDrawerAction>;
    }
  | undefined
>(undefined);

export const CreateProductDrawerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    createProductDrawerReducer,
    createProductDrawerInitialState,
  );

  return (
    <CreateProductDrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateProductDrawerContext.Provider>
  );
};

export const useCreateProductDrawerContext = () => {
  const context = useContext(CreateProductDrawerContext);

  if (!context) {
    throw new Error(
      'useCreateProductDrawerContext must be used within a CreateProductDrawerProvider',
    );
  }

  return context;
};
