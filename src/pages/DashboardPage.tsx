import { ReactElement, useEffect, useState, useLayoutEffect } from "react"
import { Box, makeStyles, useTheme } from "@material-ui/core"
import { DataGrid, GridColDef } from "@material-ui/data-grid"
import Loader from 'react-loader-spinner'
import { fetchShipments, FetchShipmentsResult } from "../data/fetch-shipments"
import moment from 'moment';

const COLUMNS: GridColDef[] = [
    {
        field: 'houseBillNumber',
        headerName: 'House Bill',
        width: 150
    },
    {
        field: 'client',
        headerName: 'Shipper',
        width: 200
    },
    {
        field: 'origin',
        headerName: 'Origin',
        width: 400
    },
    {
        field: 'destination',
        headerName: 'Destination',
        width: 400
    },
    {
        field: 'estimatedArrival',
        headerName: 'Estimated Arrival',
        width: 200
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200
    }
]

const useStyles = makeStyles({
    grid: {
        marginInline: 16,
        height: '75vh'
    },
    loader: {
        margin: 'auto',
        width: 'fit-content',
        marginTop: 200
    },
    heading: {
        marginLeft: 20,
        marginBottom: 15,
        marginTop: 30,
        fontWeight: 800,
        opacity: 0.7
    }
})

type LoadingResult = {
    status: 'LOADING'
}
const INITIAL_RESULT: LoadingResult = {
    status: 'LOADING'
}

export const DashboardPage: React.FC = () => {
    const classes = useStyles()
    const theme = useTheme()
    interface ShipmentsOfWeekProperties {
        client: string, 
        destination:string, 
        estimatedArrival: string, 
        estimatedDeparture:string, 
        houseBillNumber: string, 
        id: string, 
        mode: string, 
        origin: string, 
        status: string
    }

    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult | LoadingResult>(INITIAL_RESULT)
    const [shipmentsOfWeek, setShipmentsOfWeek] = useState<ShipmentsOfWeekProperties[]>([]);
    const [windowHeight, setWindowHeight] = useState(0);
    

    useEffect(() => {
        fetchShipments().then(result => {
            setFetchShipmentsResult(result)
        })
    }, [])

    // Listen for resize of th viewport
    useLayoutEffect(() => {
        const updateHeight = () => {
            setWindowHeight(Math.floor((((88*window.innerHeight)/100)-108)/52))
        }
        window.addEventListener('resize', updateHeight);
        updateHeight();

        return () => window.removeEventListener('resize', updateHeight)
    }, [])

    // Get the shipments for next week
    useEffect(() => {
        if(fetchShipmentsResult.status === 'SUCCESS' ) {
            
            const nextWeek = moment().add(7, "days");

            const startOfWeek = moment(nextWeek).startOf('week');
            const endOfWeek = moment(nextWeek).endOf('week');
    
            const weekShipments: any[] = []

            fetchShipmentsResult.shipments.map(shipment => {
                if(moment(new Date(shipment.estimatedArrival)).isBetween(startOfWeek, endOfWeek)) {
                    weekShipments.push(shipment)
                }
                return weekShipments;
            })
            //Sort array by date
            weekShipments.sort((a,b) => {
               return +new Date(a.estimatedArrival) - +new Date(b.estimatedArrival)
            })

            setShipmentsOfWeek(weekShipments);
        }
    }, [fetchShipmentsResult])

    
    let component: ReactElement
    switch (fetchShipmentsResult.status) {
        case 'SUCCESS':
            component = (
                <div>
                    <div className={classes.heading}>Next week's arrivals</div>
                    <DataGrid
                        className={classes.grid}
                        rows={shipmentsOfWeek}
                        columns={COLUMNS}
                        pageSize={windowHeight}
                        disableSelectionOnClick
                    />
                </div>
            )
            break;
        case 'LOADING':
            component = <Box className={classes.loader}>
                <Loader type="Grid" color={theme.palette.primary.main} />
            </Box >
            break
        case 'ERROR':
            component = <p>Error</p>
            break
    }

    return component
}