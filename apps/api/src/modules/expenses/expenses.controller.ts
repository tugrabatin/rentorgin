import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new expense' })
  @ApiResponse({ status: 201, description: 'Expense created successfully' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  create(@Request() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(req.user.tenantId, createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiQuery({ name: 'storeId', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Expenses retrieved successfully' })
  findAll(
    @Request() req,
    @Query('storeId') storeId?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.expensesService.findAll(req.user.tenantId, {
      storeId,
      type,
      status,
      startDate,
      endDate,
    });
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get expense statistics' })
  @ApiQuery({ name: 'storeId', required: false })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStatistics(
    @Request() req,
    @Query('storeId') storeId?: string,
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    return this.expensesService.getStatistics(req.user.tenantId, {
      storeId,
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
    });
  }

  @Get('monthly-summary')
  @ApiOperation({ summary: 'Get monthly expenses summary' })
  @ApiQuery({ name: 'year', required: true, type: Number })
  @ApiQuery({ name: 'storeId', required: false })
  @ApiResponse({ status: 200, description: 'Monthly summary retrieved' })
  getMonthlySummary(
    @Request() req,
    @Query('year') year: string,
    @Query('storeId') storeId?: string,
  ) {
    return this.expensesService.getMonthlySummary(
      req.user.tenantId,
      parseInt(year, 10),
      storeId,
    );
  }

  @Get('overdue')
  @ApiOperation({ summary: 'Get overdue expenses' })
  @ApiResponse({ status: 200, description: 'Overdue expenses retrieved' })
  getOverdue(@Request() req) {
    return this.expensesService.getOverdue(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.expensesService.findOne(req.user.tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update expense' })
  @ApiResponse({ status: 200, description: 'Expense updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(req.user.tenantId, id, updateExpenseDto);
  }

  @Put(':id/mark-paid')
  @ApiOperation({ summary: 'Mark expense as paid' })
  @ApiResponse({ status: 200, description: 'Expense marked as paid' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  markAsPaid(@Request() req, @Param('id') id: string) {
    return this.expensesService.markAsPaid(req.user.tenantId, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete expense' })
  @ApiResponse({ status: 200, description: 'Expense deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  remove(@Request() req, @Param('id') id: string) {
    return this.expensesService.remove(req.user.tenantId, id);
  }
}















