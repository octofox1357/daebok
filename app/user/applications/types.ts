// Application 모델 타입
export type Application = {
  id: number
  applicationTitle: string
  applicationType: string
  rangeStartDate: string
  rangeEndDate: string
  applicationApprove?: boolean | null
  createdAt: string
  updatedAt: string
}
