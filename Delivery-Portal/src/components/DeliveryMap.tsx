import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  status: 'pending' | 'delivered' | 'missed';
}

interface DeliveryMapProps {
  customers: Customer[];
}

const DeliveryMap = ({ customers }: DeliveryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = async (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      // Dynamically import mapbox-gl to avoid SSR issues
      const mapboxgl = (await import('mapbox-gl')).default;
      await import('mapbox-gl/dist/mapbox-gl.css');

      mapboxgl.accessToken = token;

      // Calculate center point from customers
      const validLocations = customers.filter((c) => c.latitude && c.longitude);
      
      let center: [number, number] = [-74.006, 40.7128]; // Default to NYC
      if (validLocations.length > 0) {
        const avgLat = validLocations.reduce((sum, c) => sum + (c.latitude || 0), 0) / validLocations.length;
        const avgLng = validLocations.reduce((sum, c) => sum + (c.longitude || 0), 0) / validLocations.length;
        center = [avgLng, avgLat];
      }

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 12,
      });

      // Add markers for each customer
      validLocations.forEach((customer, index) => {
        const el = document.createElement('div');
        el.className = 'delivery-marker';
        el.style.backgroundColor = customer.status === 'delivered' ? '#10b981' : '#3b82f6';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.color = 'white';
        el.style.fontSize = '12px';
        el.style.fontWeight = 'bold';
        el.textContent = (index + 1).toString();

        new mapboxgl.Marker(el)
          .setLngLat([customer.longitude!, customer.latitude!])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${customer.name}</h3>
                <p style="font-size: 12px; color: #666;">${customer.address}</p>
              </div>`
            )
          )
          .addTo(map);
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      return () => map.remove();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapboxToken', mapboxToken);
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
      initializeMap(savedToken);
    }
  }, []);

  if (showTokenInput) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-foreground">Mapbox Token Required</h3>
        <p className="mb-6 text-sm text-muted-foreground max-w-md mx-auto">
          To display the interactive delivery route map, please enter your Mapbox public access token.
          <br />
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline hover:no-underline inline-flex items-center gap-1 mt-2"
          >
            Get your token at mapbox.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </p>
        <div className="mx-auto max-w-md space-y-3">
          <input
            type="text"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="pk.eyJ1..."
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
          />
          <button
            onClick={handleTokenSubmit}
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg transition-all hover:shadow-xl"
          >
            Save & Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default DeliveryMap;
