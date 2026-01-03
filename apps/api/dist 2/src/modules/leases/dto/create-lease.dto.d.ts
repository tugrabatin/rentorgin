export declare class CreateLeaseDto {
    storeId: string;
    mallId?: string;
    assignedToId?: string;
    contractNumber: string;
    startDate: string;
    endDate: string;
    signedDate?: string;
    monthlyRent: number;
    currency?: string;
    escalationType: string;
    escalationRate: number;
    escalationIndex?: string;
    renewalOptionMonths?: number;
    renewalNoticeMonths?: number;
    commonAreaCharges?: number;
    securityDeposit?: number;
    fitOutPeriodDays?: number;
}
//# sourceMappingURL=create-lease.dto.d.ts.map