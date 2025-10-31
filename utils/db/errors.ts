/**
 * Custom error types for database operations
 */

export class DatabaseError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends DatabaseError {
  constructor(storeName: string, id: any) {
    super(`Record not found in ${storeName} with id: ${id}`, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class OperationError extends DatabaseError {
  public readonly cause?: any;

  constructor(operation: string, storeName: string, originalError: any) {
    const message = `Failed to ${operation} in ${storeName}: ${originalError?.message || String(originalError)}`;
    super(message, "OPERATION_FAILED");
    this.name = "OperationError";
    this.cause = originalError;
  }
}
