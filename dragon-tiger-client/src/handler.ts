export interface IHandler<Input, Output = void> {
  handle(input: Input): Output;
}
