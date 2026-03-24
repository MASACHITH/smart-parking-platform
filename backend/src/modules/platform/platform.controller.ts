import { Controller, Get } from '@nestjs/common';

@Controller('platform')
export class PlatformController {
  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
