// 處理的是呼叫 markers 群組下的 marker
// 打開 addMarker 設置的 bindPopup 的 HTML

export default function markerOpen(markers, lat, lng) {
  // 搜尋 markers 圖層下的子圖層
  markers.eachLayer(layer => {
    // 抓取圖層的 經緯度
    const eachLat = layer._latlng.lat;
    const eachLng = layer._latlng.lng;
    // 如果與參數的經緯度相同，就抓取那個 layer
    if (eachLat === lat && eachLng === lng) {
      // zoomToShowLayer 這個是 MarkerClusterGroup 給的函式
      // 方法是調用 MarkerClusterGroup 下的子圖層
      markers.zoomToShowLayer(layer, () =>
        // 打開 bindPopup 的 HTML
        layer.openPopup()
      );
    }
  });
};
