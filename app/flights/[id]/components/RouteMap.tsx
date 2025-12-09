"use client";

import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ITrail, IPosition } from '../types/IFlightDetail';

interface Props {
  trail: ITrail[],
  origin: IPosition,
  destination: IPosition
}

export default function RouteMap({trail, origin, destination}: Props) {
    const mapContainer = useRef(null as any);
    const map = useRef(null as any);
  
    useEffect(() => {
      console.log('TRAIL', trail);
      if (map.current) return;

      //calculate center and initialize map
      const center: any = [
        (origin.longitude + destination.longitude) / 2,
        (origin.latitude + destination.latitude) / 2
      ];
  
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        //style: 'https://demotiles.maplibre.org/style.json', // Free MapLibre style
        style: 'https://luis-3c.github.io/map-libre-themes/awsHybrid.json',
        center,
        zoom: 2
      });


      // Add and draw origin and destination markers
      map.current.on('load', () => {
        map.current.addSource('origin-point', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [origin.longitude, origin.latitude]
              }
            }
          });
          
          map.current.addLayer({
            id: 'origin-marker',
            type: 'circle',
            source: 'origin-point',
            paint: {
              'circle-radius': 8,
              'circle-color': '#2b7fff',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff'
            }
          });

          map.current.addSource('destination-point', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [destination.longitude, destination.latitude]
              }
            }
          });
          
          map.current.addLayer({
            id: 'destination-marker',
            type: 'circle',
            source: 'destination-point',
            paint: {
              'circle-radius': 8,
              'circle-color': '#10B060',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff'
            }
          });

        //Generate coordinates array from trail
        const coordinates = trail.map((point) => [point.lng, point.lat]);

        //Add route
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        });
  
        //Draw route
        map.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#FAEB64',
            'line-width': 4
          }
        });

        // Add and draw marker on last point
        map.current.addSource('last-point', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates[0]
            }
          }
        });
        
        map.current.addLayer({
          id: 'last-marker',
          type: 'circle',
          source: 'last-point',
          paint: {
            'circle-radius': 6,
            'circle-color': '#FAEB64',
          }
        });

      });
    }, []);
  
    return <div ref={mapContainer} style={{ height: '500px', width: '100%' }} />;
}
