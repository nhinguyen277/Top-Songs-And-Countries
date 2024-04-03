
    const https = require('https');

    function getIP() {
        return new Promise((resolve, reject) => {
            const options = {
                path: '/json/',
                host: 'ipapi.co',
                port: 443,
                headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
            };
            https.get(options, function(resp){
                let body = '';
                resp.on('data', function (data){
                    body += data;
                });
                resp.on('end', function(){
                    try {
                        const printData = JSON.parse(body);
                        //console.log(printData);
                        resolve(printData); 
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }



module.exports={
    getIP
}