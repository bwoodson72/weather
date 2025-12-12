import {getGeoCode} from './getGeoCode';
describe('getGeoCode', () => {
    it('should return geo coordinates for a location', async () => {
        const locationName = 'New York';
        const geoCode = await getGeoCode(locationName);
        expect(geoCode.latitude).toBeDefined();
        expect(geoCode.longitude).toBeDefined();
    });
});