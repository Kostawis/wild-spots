import L from "leaflet";

export const createClusterCustomIcon = (cluster: any) =>
  L.divIcon({
    html: `
      <div class="cluster-icon">
        ${cluster.getChildCount()}
      </div>
    `,
    className: "",
    iconSize: L.point(40, 40, true),
  });
