// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTqMJVTMWfoxbAwpr8n22CWaBMna1h9GpTdiIX67kWqAF7sR6vr2QTx4J6aDPYXlUuIU6XEpLxNwSf/pub?gid=0&single=true&output=csv';
const url = 'layers.csv';

async function getBaseLayers() {
    const response      = await fetch(url);
    const data          = await response.text();
    const rows          = data.split('\n');

    const layerTemplate = {
        active:         false,
        uuid:           "",
        displayOrder:   -1,
        layerGroup:     "",
        label:          "",
        type:           "",
        visible:        false,
        transparent:    true,
        showLayers:     "",
        url:            ""
    }

    let layerConfigArray = []

    for (let i = 1; i < rows.length; i++) {
        const row               = rows[i];
        const columns           = row.split(',');
        let show                = Number(columns[0])===1;

        if(show){
            // let structuredClone          = structuredClone(layerTemplate);
            let structuredClone             = JSON.parse(JSON.stringify(layerTemplate));
            let j                           = layerConfigArray.push(structuredClone)-1

            layerConfigArray[j].active        = Number(columns[0])===1;
            layerConfigArray[j].uuid          = columns[1];
            layerConfigArray[j].displayOrder  = Number(columns[2]);
            layerConfigArray[j].layerGroup    = columns[3];
            layerConfigArray[j].label         = columns[4];
            layerConfigArray[j].type          = columns[5];
            layerConfigArray[j].visible       = Number(columns[6])===1;
            layerConfigArray[j].transparent   = Number(columns[7])===1;
            layerConfigArray[j].showLayers    = columns[8];
            layerConfigArray[j].url           = columns[9].replace('\r', ''); // remove trailer '\r'

            // console.log(layerConfigArray[j]);


    
        }

    }
    return layerConfigArray;
}

