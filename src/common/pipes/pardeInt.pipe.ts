import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata): any {

    const custValue = Number(value);

    const isNum = Number.isInteger(custValue);

    if (isNum) return value;

    throw new BadRequestException('Invalid number');
  }
}