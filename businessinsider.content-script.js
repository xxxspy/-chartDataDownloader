const url = document.baseURI;

if(url.indexOf('businessinsider.com')>0){
    const btnContainer = $('.price-section-with-button__button-grid');
    const dwnBtn = $('<button class="price-section-with-button__plus500 price-section-with-button__fixed-width button--color-orange" title="Plus500. 77% of retail CFD accounts lose money" data-plus-500="">Dlownload Now</button>');
    btnContainer.append(dwnBtn);
    btnContainer.append('<a class="price-section-with-button__plus500 downlink"></a>');
    dwnBtn.on('click', ()=>{
        let datestr = (new Date()).toLocaleDateString('en-GB').split('/').reverse().join('');
        let url = 'https://markets.businessinsider.com/Ajax/Chart_GetChartData?instrumentType=Commodity&tkData=300002,78,0,814&from=19700201&to=' + datestr;
        fetch(url, ).then(r=>r.json()).then(key=>{
            downloadData(key)
        })
    })
}

function arr2csv(data){
    const keys = [ 
        'Close',
        'Date',
        'Estimate',
        'High',
        'Low',
        'Open',
        'Volume',
    ]
    let csv = keys.join(',')
    data.forEach(item=>{
        csv += '\r\n';
        let row = [];
        keys.forEach(key=>{
            row.push(item[key])
        })
        csv += row.join(',');
    })
    return csv
}

function downloadData(data){

    
    $('.downlink').attr('download', 'data.json')
    $('.downlink').attr('href', "data:text/csv;charset=utf-8," + encodeURIComponent(arr2csv(data)))
    $('.downlink')[0].click()
}