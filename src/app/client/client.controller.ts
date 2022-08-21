import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { ClientService } from './client.service';
import { BalanceDto } from './dto/balance.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateUserDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }
  //authGurad
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(id);
  }
  @Patch(`IncressBalance`)
  async incressBalance(@Body() balanceDto: BalanceDto) {
    return await this.clientService.incressBalance(balanceDto);
  }
  //authGurad
  @Patch(`DecressBalance`)
  async decressBalance(@Body() balanceDto: BalanceDto) {
    return await this.clientService.decressBalance(balanceDto);
  }
  //authGurad
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateUserDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }
  //authGurad

  //authGurad
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
