

type GeoCodeResponse = {
    latitude: number;
    longitude: number;
}

export async function getGeoCode(locationName:string):Promise<GeoCodeResponse> {



    return {latitude: 0, longitude: 0}
}