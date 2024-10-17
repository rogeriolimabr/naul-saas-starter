import https from 'https'
import csv from 'csv-parser'
import { init } from '@/lib/cache'
import crypto from 'crypto'
import { ICSAdvisory } from '../types'

// Criando a instância do cliente Redis
const cache = init()

const CSV_URL =
  'https://raw.githubusercontent.com/icsadvprj/ICS-Advisory-Project/refs/heads/main/ICS-CERT_ADV/CISA_ICS_ADV_Master.csv'



async function fetchAndUpdateCSV(): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(CSV_URL, (response) => {
      const advisories: ICSAdvisory[] = []

      response
        .pipe(csv())
        .on('data', (row) => {
          const advisory: ICSAdvisory = {
            id: parseInt(row['icsad_ID'], 10),
            originalReleaseDate: new Date(row['Original_Release_Date']),
            lastUpdated: new Date(row['Last_Updated']),
            year: parseInt(row['Year'], 10),
            icsCertNumber: row['ICS-CERT_Number'],
            advisoryTitle: row['ICS-CERT_Advisory_Title'],
            vendor: row['Vendor'],
            product: row['Product'],
            productsAffected: row['Products_Affected'],
            cveNumber: row['CVE_Number'],
            cumulativeCvss: parseFloat(row['Cumulative_CVSS']),
            cvssSeverity: row['CVSS_Severity'],
            cweNumber: row['CWE_Number'],
            criticalInfrastructureSector: row['Critical_Infrastructure_Sector']
              ? row['Critical_Infrastructure_Sector'].split(';').map((sector: string) => sector.trim()) // Acumula em array de strings
              : [], 
            productDistribution: row['Product_Distribution'],
            companyHeadquarters: row['Company_Headquarters'],
            license: row['License'],
          }

          advisories.push(advisory)
        })
        .on('end', async () => {
          console.log('CSV fetched successfully')
          const csvData = JSON.stringify(advisories)
          const newChecksum = getChecksum(csvData)

          try {
            const checksum = await cache.get('csv_checksum')

            if (checksum !== newChecksum) {
              await cache.set('csv_data', csvData)
              await cache.set('csv_checksum', newChecksum)
              console.log('CSV updated in Redis')
            }
            resolve()
          } catch (error) {
            reject(error)
          }
        })
        .on('error', (err) => reject(err))
    })
  })
}

function getChecksum(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}

export function startCSVPooling(intervalMinutes: number): void {
  setInterval(fetchAndUpdateCSV, intervalMinutes * 60 * 1000)
}

export async function startFetch(): Promise<void> {
  await fetchAndUpdateCSV()
}
