"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

// Fix for default marker icons in Next.js
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface Office {
  name: string
  address: string
  city: string
  country: string
  lat: number
  lng: number
  type: 'headquarters' | 'regional' | 'support'
}

const offices: Office[] = [
  {
    name: "Operational Center",
    address: "123 Test Road, 1st Floor ABC Building",
    city: "Nairobi",
    country: "Kenya",
    lat: -1.2864,
    lng: 36.8172,
    type: 'headquarters'
  },
  {
    name: "Support Center",
    address: "4th Floor Red Bridge, Eastgate Office Park",
    city: "Harare",
    country: "Zimbabwe",
    lat: -17.8292,
    lng: 31.0522,
    type: 'support'
  },
  {
    name: "US Office",
    address: "Your US Address",
    city: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.0060,
    type: 'regional'
  },
  {
    name: "UK Office",
    address: "Your UK Address",
    city: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
    type: 'regional'
  }
]

export function OfficeMap() {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[0, 20]}
        zoom={2}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ minHeight: '600px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {offices.map((office, index) => (
          <Marker 
            key={index} 
            position={[office.lat, office.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">{office.name}</h3>
                <p className="text-sm text-gray-600">{office.address}</p>
                <p className="text-sm text-gray-600">{office.city}, {office.country}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded">
                  {office.type === 'headquarters' ? 'HQ' : office.type === 'support' ? 'Support' : 'Regional'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}