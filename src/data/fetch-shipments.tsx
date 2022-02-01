import { format } from 'date-fns'
import { Shipment } from "./Shipment"
import { SHIPMENTS_DATA } from './shipments-data'

type ErrorResult = {
    status: 'ERROR'
    message: string
}

type SuccessResult = {
    status: 'SUCCESS'
    shipments: Shipment[]
}

export type FetchShipmentsResult =
    | ErrorResult
    | SuccessResult

// To make your life easier, we'll adjust the dates to be more current
const millisToAdd = new Date().getTime() - new Date("4/19/19").getTime()
const adjustDateString = (dateString: string): string => {
    const originalTimeInMillis = new Date(dateString).getTime()
    const newTimeInMillis = originalTimeInMillis + millisToAdd
    const adjustedDate = new Date(newTimeInMillis)
    return format(adjustedDate, 'MM/dd/yy')
}

const adjustShipmentDates = (shipments: Shipment[]): Shipment[] => shipments.map(shipment => ({
    ...shipment,
    estimatedArrival: adjustDateString(shipment.estimatedArrival),
    estimatedDeparture: adjustDateString(shipment.estimatedDeparture)
}))

// Feel free to change this constant to a really high % during your testing to
// make sure your failure handling works, and to a low number while you're
// developing / testing your success case
const FAILURE_RATIO = 0.05

const setTimeoutAsync = async (millis: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, millis))
}

export const fetchShipments = async (): Promise<FetchShipmentsResult> => {
    const waitTimeMillis = 200 + 1800 * Math.random()
    await setTimeoutAsync(waitTimeMillis)
    const shouldFail = Math.random() < FAILURE_RATIO
    if (shouldFail) {
        return {
            status: 'ERROR',
            message: 'Something went wrong'
        }
    }
    return {
        status: 'SUCCESS',
        shipments: adjustShipmentDates(SHIPMENTS_DATA)
    }
}