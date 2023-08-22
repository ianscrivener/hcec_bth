  
async function main() {  
        
    const layerConfig   = await getBaseLayers();  

    let map             = L.map('map').setView([ -33.0833   , 151.5833], 11);
    var baseMaps        = {};
    var overlayMaps     = {};


    for (let j = 0; j < layerConfig.length; j++) {

        console.log(layerConfig[j].layerGroup);

        // WMS
        if(layerConfig[j].type === "wms"){
            let opts = {
                layers:         layerConfig[j].showLayers,
                format:         "image/png",
                transparent:    layerConfig[j].transparent,
                attribution:    layerConfig[j].label
            }    

            let layer = L.tileLayer.wms(layerConfig[j].url, opts).addTo(map);

            if(layerConfig[j].layerGroup==="BASE"){
                baseMaps[layerConfig[j].label] = layer;
            }
            else{
                overlayMaps[layerConfig[j].label] = layer;
            }


        };

        // tiledMapLayer
        if(layerConfig[j].type === "tiledMapLayer"){
            let opts = {
                layers:         layerConfig[j].showLayers,
                format:         "image/png",
                transparent:    layerConfig[j].transparent,
                attribution:    layerConfig[j].label
            }    
            // console.log(layerConfig[j].url);
            // console.log(opts);

            // let layer = L.esri.tiledMapLayer({
            //     url:layerConfig[j].url
            // }).addTo(map);

            if(layerConfig[j].layerGroup==="BASE"){
                baseMaps[layerConfig[j].label] = layer;
            }
            else{
                overlayMaps[layerConfig[j].label] = layer;
            }
        };

        // vectorTileLayer - "Esri vector tile service"
        if(layerConfig[j].type === "vectorTileLayer"){

            var layer = L.esri.Vector.vectorTileLayer(layerConfig[j].url).addTo(map);

            if(layerConfig[j].layerGroup==="BASE"){
                baseMaps[layerConfig[j].label] = layer;
            }
            else{
                overlayMaps[layerConfig[j].label] = layer;
            }

        };

    }


//   L.control.layers(baseMaps).addTo(map);
L.control.layers(baseMaps, overlayMaps).addTo(map);


}
main();
