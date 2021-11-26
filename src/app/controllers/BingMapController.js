const axios = require('axios')

class CategoryController {
    // [GET] /new
    async getCoordinatesByAddress(req, res) {
        const { address } = req.body;

        const getAddress = async () => {
            try {
                return await axios.get('http://dev.virtualearth.net/REST/v1/Locations', {
                    params: {
                        countryRegion: 'VN',
                        addressLine: address,
                        key: 'AtUVSOyr-oTDbLTFydFECzMEU0ueEbG9CLutAXP7MyMtQnv6uKZSyYVEbyGZyqfc'
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }

        const results = await getAddress()
        res.json({
            lat: results.data.resourceSets[0].resources[0].point.coordinates[0],
            long: results.data.resourceSets[0].resources[0].point.coordinates[1],
        })
    }

    async getDistanceByAddress(req, res) {
        const { addressFisrt, addressSecond } = req.body;

        const getAddressFirst = async () => {
            try {
                return await axios.get('http://dev.virtualearth.net/REST/v1/Locations', {
                    params: {
                        countryRegion: 'VN',
                        addressLine: addressFisrt,
                        key: 'AtUVSOyr-oTDbLTFydFECzMEU0ueEbG9CLutAXP7MyMtQnv6uKZSyYVEbyGZyqfc'
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }

        const getAddressSecond = async () => {
            try {
                return await axios.get('http://dev.virtualearth.net/REST/v1/Locations', {
                    params: {
                        countryRegion: 'VN',
                        addressLine: addressSecond,
                        key: 'AtUVSOyr-oTDbLTFydFECzMEU0ueEbG9CLutAXP7MyMtQnv6uKZSyYVEbyGZyqfc'
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }

        const coordinatesFirst = await getAddressFirst()
        const coordinatesSecond = await getAddressSecond()

        const origins = coordinatesFirst.data.resourceSets[0].resources[0].point.coordinates;
        const destinations = coordinatesSecond.data.resourceSets[0].resources[0].point.coordinates;


        const getDistance = async () => {
            const data = {
                origins: [
                    {
                        latitude: origins[0],
                        longitude: origins[1],
                    }
                ],

                destinations: [
                    {
                        latitude: destinations[0],
                        longitude: destinations[1],
                    }
                ],
                travelMode: 'driving',
                timeUnit: 'minute',
            }
            try {
                return await axios.post('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix', JSON.stringify(data), {
                    params: {
                        key: 'AtUVSOyr-oTDbLTFydFECzMEU0ueEbG9CLutAXP7MyMtQnv6uKZSyYVEbyGZyqfc'
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }

        const distance = await getDistance()
        console.log(distance.data.resourceSets[0].resources[0].results[0]);
        res.json(distance.data.resourceSets[0].resources[0].results[0]);

    }

    async getDistanceByCoordinates(req, res) {
        const { origins, destinations } = req.body;

        // const origins = {
        //     latitude: 10.84993,
        //     longitude: 106.79094
        // } 
        // const destinations = {
        //     latitude: 10.83876,
        //     longitude: 106.77443
        // }

        const getDistance = async () => {
            // console.log(origins, destinations)
            const data = {
                origins: [
                    {
                        // latitude: origins[0],
                        // longitude: origins[1],
                        // latitude: parseFloat(lat1),
                        // longitude: parseFloat(lat2),
                        ...origins,
                    }
                ],

                destinations: [
                    {
                        // latitude: destinations[0],
                        // longitude: destinations[1],
                        // latitude: parseFloat(long1),
                        // longitude: parseFloat(long2),
                        ...destinations,
                    }
                ],
                travelMode: 'driving',
                timeUnit: 'minute',
            }
            try {
                return await axios.post('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix', JSON.stringify(data), {
                    params: {
                        key: 'AtUVSOyr-oTDbLTFydFECzMEU0ueEbG9CLutAXP7MyMtQnv6uKZSyYVEbyGZyqfc'
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }

        const distance = await getDistance()
        console.log(distance.data.resourceSets[0].resources[0].results[0]);
        res.json(distance.data.resourceSets[0].resources[0].results[0]);
    }


}

module.exports = new CategoryController();
