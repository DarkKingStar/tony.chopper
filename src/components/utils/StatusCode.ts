export type HttpStatusCode = {
    code: number;
    message: string;
};

export const HTTP_STATUS_CODE: Record<string, HttpStatusCode> = {
    success: {
        code: 200,
        message: 'Data has been fetched successfully',
    },
    created: {
        code: 201,
        message: 'Data has been created successfully',
    },
    no_content: {
        code: 204,
        message: 'There is no content in the response',
    },
    partial_content: {
        code: 206,
        message: 'There is partial content in the response',
    },
    bad_request: {
        code: 400,
        message: 'The request is invalid',
    },
    unauthorized: {
        code: 401,
        message: 'You are not authorized to access this resource',
    },
    forbidden: {
        code: 403,
        message: 'You have no permission to access this resource',
    },
    not_found: {
        code: 404,
        message: 'The requested resource was not found',
    },
    conflict: {
        code: 409,
        message: 'The request could not be completed due to a conflict with the current state of the target resource',
    },
    unprocessable_entity: {
        code: 422,
        message: 'The request was well-formed but was unable to be followed due to semantic errors',
    },
    too_many_requests: {
        code: 429,
        message: 'The request limit has been exceeded',
    },
    internal_server_error: {
        code: 500,
        message: 'An unexpected error has occurred',
    }
};