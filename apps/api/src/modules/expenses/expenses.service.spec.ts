import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '../../database/prisma.service';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    expense: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    store: {
      findFirst: jest.fn(),
    },
  };

  const mockTenantId = 'tenant-123';
  const mockStoreId = 'store-123';
  const mockExpenseId = 'expense-123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    prisma = module.get<PrismaService>(PrismaService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create expense successfully', async () => {
      const createDto = {
        storeId: mockStoreId,
        type: 'RENT' as any,
        amount: 10000,
        dueDate: '2025-01-15',
        currency: 'TRY',
      };

      const mockStore = { id: mockStoreId, tenantId: mockTenantId };
      const mockExpense = { id: mockExpenseId, ...createDto, tenantId: mockTenantId };

      mockPrismaService.store.findFirst.mockResolvedValue(mockStore);
      mockPrismaService.expense.create.mockResolvedValue(mockExpense);

      const result = await service.create(mockTenantId, createDto);

      expect(result).toEqual(mockExpense);
      expect(mockPrismaService.store.findFirst).toHaveBeenCalledWith({
        where: { id: mockStoreId, tenantId: mockTenantId },
      });
      expect(mockPrismaService.expense.create).toHaveBeenCalled();
    });

    it('should throw NotFoundException if store not found', async () => {
      const createDto = {
        storeId: 'invalid-store',
        type: 'RENT' as any,
        amount: 10000,
        dueDate: '2025-01-15',
      };

      mockPrismaService.store.findFirst.mockResolvedValue(null);

      await expect(service.create(mockTenantId, createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all expenses for tenant', async () => {
      const mockExpenses = [
        { id: 'exp-1', amount: 5000, type: 'RENT' },
        { id: 'exp-2', amount: 3000, type: 'UTILITIES' },
      ];

      mockPrismaService.expense.findMany.mockResolvedValue(mockExpenses);

      const result = await service.findAll(mockTenantId);

      expect(result).toEqual(mockExpenses);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith({
        where: { tenantId: mockTenantId },
        include: expect.any(Object),
        orderBy: { dueDate: 'desc' },
      });
    });

    it('should filter by type and status', async () => {
      const filters = { type: 'RENT', status: 'PENDING' };
      mockPrismaService.expense.findMany.mockResolvedValue([]);

      await service.findAll(mockTenantId, filters);

      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith({
        where: {
          tenantId: mockTenantId,
          type: 'RENT',
          status: 'PENDING',
        },
        include: expect.any(Object),
        orderBy: { dueDate: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return expense by id', async () => {
      const mockExpense = { id: mockExpenseId, amount: 5000 };
      mockPrismaService.expense.findFirst.mockResolvedValue(mockExpense);

      const result = await service.findOne(mockTenantId, mockExpenseId);

      expect(result).toEqual(mockExpense);
    });

    it('should throw NotFoundException if expense not found', async () => {
      mockPrismaService.expense.findFirst.mockResolvedValue(null);

      await expect(service.findOne(mockTenantId, 'invalid-id')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('update', () => {
    it('should update expense successfully', async () => {
      const updateDto = { amount: 12000, status: 'PAID' as any };
      const mockExpense = { id: mockExpenseId, amount: 10000 };
      const mockUpdated = { id: mockExpenseId, ...updateDto };

      mockPrismaService.expense.findFirst.mockResolvedValue(mockExpense);
      mockPrismaService.expense.update.mockResolvedValue(mockUpdated);

      const result = await service.update(mockTenantId, mockExpenseId, updateDto);

      expect(result).toEqual(mockUpdated);
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id: mockExpenseId },
        data: expect.objectContaining(updateDto),
        include: expect.any(Object),
      });
    });
  });

  describe('remove', () => {
    it('should delete expense successfully', async () => {
      const mockExpense = { id: mockExpenseId };
      mockPrismaService.expense.findFirst.mockResolvedValue(mockExpense);
      mockPrismaService.expense.delete.mockResolvedValue(mockExpense);

      const result = await service.remove(mockTenantId, mockExpenseId);

      expect(result).toEqual(mockExpense);
      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id: mockExpenseId },
      });
    });
  });

  describe('getStatistics', () => {
    it('should calculate expense statistics', async () => {
      const mockExpenses = [
        { amount: 5000, type: 'RENT', status: 'PAID', currency: 'TRY' },
        { amount: 3000, type: 'UTILITIES', status: 'PENDING', currency: 'TRY' },
        { amount: 2000, type: 'RENT', status: 'OVERDUE', currency: 'TRY' },
      ];

      mockPrismaService.expense.findMany.mockResolvedValue(mockExpenses);

      const result = await service.getStatistics(mockTenantId);

      expect(result.totalAmount).toBe(10000);
      expect(result.paidAmount).toBe(5000);
      expect(result.pendingAmount).toBe(3000);
      expect(result.overdueAmount).toBe(2000);
      expect(result.totalCount).toBe(3);
      expect(result.byType.RENT).toBe(7000);
      expect(result.byType.UTILITIES).toBe(3000);
    });
  });

  describe('markAsPaid', () => {
    it('should mark expense as paid', async () => {
      const mockExpense = { id: mockExpenseId, status: 'PENDING' };
      const mockUpdated = { id: mockExpenseId, status: 'PAID' };

      mockPrismaService.expense.findFirst.mockResolvedValue(mockExpense);
      mockPrismaService.expense.update.mockResolvedValue(mockUpdated);

      const result = await service.markAsPaid(mockTenantId, mockExpenseId);

      expect(result.status).toBe('PAID');
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id: mockExpenseId },
        data: expect.objectContaining({
          status: 'PAID',
        }),
        include: expect.any(Object),
      });
    });
  });

  describe('getOverdue', () => {
    it('should return overdue expenses', async () => {
      const mockOverdue = [
        { id: 'exp-1', dueDate: new Date('2024-01-01'), status: 'OVERDUE' },
      ];

      mockPrismaService.expense.findMany.mockResolvedValue(mockOverdue);

      const result = await service.getOverdue(mockTenantId);

      expect(result).toEqual(mockOverdue);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          tenantId: mockTenantId,
          status: { in: ['PENDING', 'OVERDUE'] },
        }),
        include: expect.any(Object),
        orderBy: { dueDate: 'asc' },
      });
    });
  });
});















