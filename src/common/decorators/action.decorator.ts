import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Action = (action: string) => {

  return SetMetadata('action', action);
};