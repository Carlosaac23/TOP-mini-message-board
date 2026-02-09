export class DatabaseError extends Error {
  constructor(operation, originalError) {
    super(`Database error in ${operation}: ${originalError.message}`);
    this.name = 'DatabaseError';
    this.operation = operation;
    this.originalError = originalError;

    Error.captureStackTrace(this, this.constructor);
  }
}

function isConnectionError(error) {
  if (!error) return false;

  const connectionErrorCodes = [
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
    'ECONNRESET',
  ];

  return connectionErrorCodes.includes(error.code);
}

export async function safeQuerySingle(queryFunction, operationName) {
  try {
    const result = await queryFunction();

    if (!result.rows || result.rows.length === 0) {
      console.log(`No results found in ${operationName}!`);
      return null;
    }

    return result.rows[0];
  } catch (error) {
    if (isConnectionError(error)) {
      console.error(`CONNECTION ERROR in ${operationName}:`, error.message);
      throw new DatabaseError(operationName, error);
    }

    console.error(`DATABASE ERROR in ${operationName}:`, error.message);
    throw new DatabaseError(operationName, error);
  }
}

export async function safeQueryMany(queryFunction, operationName) {
  try {
    const result = await queryFunction();

    return result.rows || [];
  } catch (error) {
    if (isConnectionError(error)) {
      console.error(`CONNECTION ERROR in ${operationName}:`, error.message);
      throw new DatabaseError(operationName, error);
    }

    console.error(`DATABASE ERROR in ${operationName}:`, error.message);
    throw new DatabaseError(operationName, error);
  }
}
