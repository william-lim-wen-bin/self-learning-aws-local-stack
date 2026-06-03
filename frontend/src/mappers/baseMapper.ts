interface SuccessResponse<TData = unknown> {
  __typename: 'SuccessResponse';
  message: string;
  data: TData;
}

interface ErrorResponse {
  __typename: 'ErrorResponse';
  message: string;
}

type BaseResponse<TData = unknown> = SuccessResponse<TData> | ErrorResponse;

const mapToBaseResponse = async <TData = unknown>(
  response: Response,
): Promise<BaseResponse<TData>> => {
  try {
    const responseData = await response.json();
    const { message, data } = responseData;

    if (!message || !data) {
      throw new Error('Invalid response data');
    }

    return { __typename: 'SuccessResponse', message, data };
  } catch (error) {
    console.error({ error }, 'mapToBaseResponse');
    return {
      __typename: 'ErrorResponse',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to map response to base response',
    };
  }
};

export default mapToBaseResponse;
