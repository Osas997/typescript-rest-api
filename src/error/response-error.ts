export class ResponseError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }
}
