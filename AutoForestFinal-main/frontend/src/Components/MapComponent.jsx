import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useTable } from "react-table";
import { FaTrash } from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function MapEvents({ onMapClick, onMouseMove }) {
  useMapEvents({
    click: onMapClick,
    mousemove: onMouseMove,
  });
  return null;
}

const PointsTable = ({ markers, onDelete }) => {
  const data = React.useMemo(() => markers, [markers]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'index',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Latitude',
        accessor: 'lat',
      },
      {
        Header: 'Longitude',
        accessor: 'lng',
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ row }) => (
          <button
            onClick={() => onDelete(row.original.id)}
            className="text-red-500 hover:underline"
            title="Delete"
          >
            <FaTrash />
          </button>
        ),
      },
    ],
    [onDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="mt-4 bg-gray-800 rounded shadow-md overflow-hidden">
      <table {...getTableProps()} className="min-w-full">
        <thead className="bg-gray-800">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-4 text-left text-green-400">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-4 border-b text-green-400">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const MapComponent = ({ showWavepoints }) => {
  const defaultPosition = [18.5204, 73.8567];
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [mousePosition, setMousePosition] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [zoom, setZoom] = useState(13);

  const handleMapClick = (e) => {
    const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng, id: Date.now() };
    setMarkers((prevMarkers) => {
      const updatedMarkers = [...prevMarkers, newMarker];
      updatePolylineAndDistance(updatedMarkers);
      return updatedMarkers;
    });
  };

  const updatePolylineAndDistance = (updatedMarkers) => {
    setPolyline(updatedMarkers.map(marker => [marker.lat, marker.lng]));
    let newTotalDistance = 0;
    for (let i = 0; i < updatedMarkers.length - 1; i++) {
      newTotalDistance += calculateDistance(
        updatedMarkers[i].lat, updatedMarkers[i].lng,
        updatedMarkers[i + 1].lat, updatedMarkers[i + 1].lng
      );
    }
    setTotalDistance(newTotalDistance);
  };

  const handleMouseMove = (e) => {
    setMousePosition([e.latlng.lat, e.latlng.lng]);
  };

  const formatCoordinate = (coord, isLatitude) => {
    const absCoord = Math.abs(coord);
    const degrees = Math.floor(absCoord);
    const minutes = Math.floor((absCoord - degrees) * 60);
    const seconds = ((absCoord - degrees - minutes / 60) * 3600).toFixed(2);
    const direction = isLatitude
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  };

  const handleDeleteMarker = (id) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(updatedMarkers);
    updatePolylineAndDistance(updatedMarkers);
  };

  return (
    <div className="flex h-screen">
      <div className="w-4/5 p-4 h-4/5">
        <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
          <MapContainer
            center={defaultPosition}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", position: "relative", zIndex: 0 }} 
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents onMapClick={handleMapClick} onMouseMove={handleMouseMove} />
            {markers.map((position) => (
              <Marker key={position.id} position={[position.lat, position.lng]} />
            ))}
            {polyline.length > 1 && <Polyline positions={polyline} color="blue" />}
          </MapContainer>
        </div>
        {showWavepoints && <PointsTable markers={markers} onDelete={handleDeleteMarker} />}
      </div>

      <div className="w-1/5 bg-gray-800 p-4 text-white">
        <h2 className="text-lg font-bold mb-4">Statistics</h2>
        <div className="p-4 bg-gray-700 rounded shadow-md">
          <p className="font-semibold">Total Points: <span className="font-normal text-green-400">{markers.length}</span></p>
        </div>
        {mousePosition && (
          <div className="p-4 bg-gray-700 rounded shadow-md">
            <p className="font-semibold">Current Position:</p>
            <p className="text-green-400">{formatCoordinate(mousePosition[0], true)},</p>
            <p className="text-green-400">{formatCoordinate(mousePosition[1], false)}</p>
          </div>
        )}
        <div className="p-4 bg-gray-700 rounded shadow-md">
          <p className="font-semibold">Total Distance: <span className="font-normal text-green-400">{totalDistance.toFixed(2)} km</span></p>
        </div>
        <div className="p-4 bg-gray-700 rounded shadow-md">
          <p className="font-semibold">Current Zoom: <span className="font-normal text-green-400">{zoom}</span></p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;