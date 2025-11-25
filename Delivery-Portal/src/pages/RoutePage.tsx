import { useLocation } from "react-router-dom";

export default function RoutePage() {
  const query = new URLSearchParams(useLocation().search);
  const address = query.get("address") || "";

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <div className="w-full h-screen">
      <iframe
        title="Google Map"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen
      />
    </div>
  );
}
