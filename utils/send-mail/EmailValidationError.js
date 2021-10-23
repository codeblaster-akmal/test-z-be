class EmailValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailValidationError";
  }
}

module.exports = EmailValidationError;