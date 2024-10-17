export interface ICSAdvisory {
  id: number
  originalReleaseDate: Date // Pode ser convertido para Date se necessário
  lastUpdated: Date // Pode ser convertido para Date se necessário
  year: number
  icsCertNumber: string
  advisoryTitle: string
  vendor: string
  product: string
  productsAffected: string
  cveNumber: string
  cumulativeCvss: number
  cvssSeverity: string
  cweNumber: string
  criticalInfrastructureSector: string[]
  productDistribution: string
  companyHeadquarters: string
  license: string
}
