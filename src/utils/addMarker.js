import L from 'leaflet';

/**
 * marker 群組管理
 * @param {Array} importData 藥房資料
 * @param {object} map 地圖物件
 * @param {object} markers instance of L.MarkerClusterGroup
 */
export default function addMarker(importData, map, markers) {
  importData.forEach(element => {
    // 解構賦值寫法，宣告要從來源變數(element)接收解開的值之變數。
    const { geometry, properties } = element;
    // 判斷 background-color
    const adultStockNoMore = properties.mask_adult ? 'adult' : 'empty';
    const childStockNoMore = properties.mask_child ? 'child' : 'empty';

    // 判斷 icon 顏色
    const iconColor = (() => {
      if (properties.mask_adult > 0 && properties.mask_child > 0) {
        return new L.Icon({
          iconUrl:
            'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      }
      else if (properties.mask_adult === 0 && properties.mask_child === 0) {
        return new L.Icon({
          iconUrl:
            'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      }
      else {
        return new L.Icon({
          iconUrl:
            'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      }
    })();
    // 套上 marker
    markers.addLayer(
      L.marker([geometry.coordinates[1], geometry.coordinates[0]], {
        icon: iconColor
      }).bindPopup(`
      <div class="marker-card" style="max-width: 200px">
        <header>
          <h2 class="h-flex-1">${properties.name}</h2>
          <a class="fas fa-location-arrow" href="https://www.google.com.tw/maps/dir//${properties.address}" target="_blank"></a>
        </header>
        <section>
          <div>${properties.address}</div>
          <div>${properties.phone}</div>
          <div>${properties.note}</div>
          <div class="mask">
            <div class="${adultStockNoMore}">成人口罩 ${properties.mask_adult}</div>
            <div class="${childStockNoMore}">兒童口罩 ${properties.mask_child}</div>
          </div>
        </section>
      </div>
      `)
    );
  });
  map.addLayer(markers);
};
