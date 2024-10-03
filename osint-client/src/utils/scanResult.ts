import { ScannedResult } from '@/models/scan';
import { format } from 'date-fns';

export const transformScanResultDates = (scannedResult : ScannedResult): ScannedResult => {
  return {
    ...scannedResult,
    startTime: format(scannedResult.startTime, "dd/MM/yyyy HH:mm:ss"),
    endTime: format(scannedResult.endTime, "dd/MM/yyyy HH:mm:ss"),
  }
}