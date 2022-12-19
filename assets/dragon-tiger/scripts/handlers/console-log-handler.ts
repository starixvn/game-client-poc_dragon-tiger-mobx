import { inversify } from "../../../common/external";
import { IHandler } from "../../../common/mobx-cocos";

const { injectable } = inversify;

@injectable()
export class ConsoleLogHandler implements IHandler<number> {
  async handle(param: number): Promise<void> {
    console.log(`In default method: ${param}`);
  }

  async customHandle(param: number): Promise<void> {
    console.log(`In custom method: ${param}`);
  }
}
