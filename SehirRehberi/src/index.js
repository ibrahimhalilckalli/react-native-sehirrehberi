function distanceToCordinate(distance, cordinate) {
  const ONE_DEGREE_KM = 111;
  const x = distance / 1000 / ONE_DEGREE_KM;
  return [cordinate - x, cordinate + x];
}

function isNearest(options, place) {
  const {latitude, longitude, distance} = {
    distance: 5,
    ...options,
  };

  const {
    location: {lat, long},
  } = place;

  const [minLatitude, maxLatitude] = distanceToCordinate(distance, latitude);
  const [minLongitude, maxLongitude] = distanceToCordinate(distance, longitude);

  return (
    lat >= minLatitude &&
    lat <= maxLatitude &&
    long >= minLongitude &&
    long <= maxLongitude
  );
}

function getNearest(options) {
  const {places, latitude, longitude, distance, limit, types} = {
    limit: options.places.length,
    types: options.places.map(item => item.type),
    ...options,
  };
  console.log(places.length);

  const _places = places.filter(item => types.indexOf(item.type) > -1);

  const nearestPlaces = [];
  let index = 0;
  while (nearestPlaces.length < limit && index < _places.length) {
    const place = _places[index];
    if (place && isNearest({latitude, longitude, distance}, place)) {
      nearestPlaces.push(place);
    }
    index++;
  }

  return nearestPlaces;
}

export default getNearest;
/*
    getNearest({
    places: window.places,
    latitude: 38,
    longitude: 42,
    distance: 10250,
    types: ["Cami", "Türbe"],
    limit: 10
    });
 */
