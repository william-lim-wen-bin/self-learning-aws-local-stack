import {
  Button,
  Drawer,
  IconAdd,
  Notice,
  Stack,
  Text,
  TextField,
  Textarea,
} from 'braid-design-system';

import {
  CreateProductDrawerProvider,
  useCreateProductDrawerContext,
  validateCreateProductDrawer,
} from 'src/providers';
import type { NewProduct } from 'src/types';

interface CreateProductDrawerProps {
  open?: boolean;
  onClose?: () => void;
  onCreate?: (newProduct: NewProduct) => Promise<void>;
}

export const CreateProductDrawer = ({
  open = false,
  onClose = () => {},
  onCreate,
}: CreateProductDrawerProps) => (
  <CreateProductDrawerProvider>
    <CreateProductDrawerContent
      open={open}
      onClose={onClose}
      onCreate={onCreate}
    />
  </CreateProductDrawerProvider>
);

const CreateProductDrawerContent = ({
  open = false,
  onClose = () => {},
  onCreate,
}: CreateProductDrawerProps) => {
  const { state, dispatch } = useCreateProductDrawerContext();

  const handleDrawerClose = () => {
    dispatch({ type: 'RESET' });
    onClose();
  };

  const handleCreate = async () => {
    try {
      dispatch({ type: 'SUBMIT_START' });

      const errors = validateCreateProductDrawer(state.values);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', errors });
        return;
      }

      const { productName, productPrice, productDescription } = state.values;
      await onCreate?.({
        productName,
        productPrice: Number(productPrice),
        productDescription: productDescription,
      });

      handleDrawerClose();
    } catch {
      dispatch({ type: 'SUBMIT_ERROR' });
    } finally {
      dispatch({ type: 'SUBMIT_END' });
    }
  };

  return (
    <Drawer
      title="Create Product"
      width="small"
      open={open}
      onClose={handleDrawerClose}
    >
      <Stack space="xxlarge">
        <Stack space="gutter">
          <TextField
            label="Product Name"
            type="text"
            placeholder="Apple"
            value={state.values.productName}
            tone={state.errors.productName ? 'critical' : 'neutral'}
            message={state.errors.productName}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'productName',
                value: e.target.value,
              })
            }
            onClear={() =>
              dispatch({
                type: 'SET_FIELD',
                field: 'productName',
                value: '',
              })
            }
          />
          <TextField
            label="Product Price"
            prefix="$"
            type="number"
            value={state.values.productPrice}
            tone={state.errors.productPrice ? 'critical' : 'neutral'}
            message={state.errors.productPrice}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'productPrice',
                value: e.target.value,
              })
            }
            onClear={() =>
              dispatch({
                type: 'SET_FIELD',
                field: 'productPrice',
                value: '',
              })
            }
          />
          <Textarea
            label="Product Description"
            placeholder="Fresh and crisp"
            value={state.values.productDescription}
            tone={state.errors.productDescription ? 'critical' : 'neutral'}
            message={state.errors.productDescription}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'productDescription',
                value: e.target.value,
              })
            }
          />
          {state.isGenericError && (
            <Notice tone="critical">
              <Text>Something went wrong, please try again later.</Text>
            </Notice>
          )}
        </Stack>

        <Button
          tone="formAccent"
          loading={state.isLoading}
          icon={<IconAdd />}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Stack>
    </Drawer>
  );
};
