const bonjour = require('bonjour')()

export class MdnsScanner {

    static mdns: Array<{ hostName: string, IP: string }> = [];
    static getLocalIP = (ips: Array<string>) => {
        let localIp = '';
        ips.forEach(ip => {
            if (ip.startsWith('192.168.')) {
                localIp = ip;
            }
        });
        return localIp;
    }

    constructor(port:any) {
        // advertise an HTTP server on port 3000
        bonjour.publish({ name: 'IotSrv', type: 'http', port: port })

        // browse for all http services
        bonjour.find({ type: 'http' }, function (service: any) {
            // console.log('Found an HTTP server:', service);
            const localIp = MdnsScanner.getLocalIP(service.addresses);
            console.log(service.host, localIp);
            if (localIp) {
                const existingIndex = MdnsScanner.mdns.findIndex(item => item.hostName === service.host);
                if (existingIndex !== -1) {
                    MdnsScanner.mdns[existingIndex] = {
                        hostName: service.host,
                        IP: localIp + ':' + service.port
                    };
                } else {
                    MdnsScanner.mdns.push({
                        hostName: service.host,
                        IP: localIp + ':' + service.port
                    });
                }
            }
            console.log(MdnsScanner.mdns);
        });

    }

    // distroy bonjour after 5 seconds
    public updateService = () => {
        console.log("Services update:");
        MdnsScanner.mdns.length = 0;
        bonjour.find({ type: 'http' }, function (service: any) {
            // console.log('Found an HTTP server:', service);
            const localIp = MdnsScanner.getLocalIP(service.addresses);
            console.log(service.host, localIp);
            if (localIp) {
                const existingIndex = MdnsScanner.mdns.findIndex(item => item.hostName === service.host);
                if (existingIndex !== -1) {
                    MdnsScanner.mdns[existingIndex] = {
                        hostName: service.host,
                        IP: localIp + ':' + service.port
                    };
                } else {
                    MdnsScanner.mdns.push({
                        hostName: service.host,
                        IP: localIp + ':' + service.port
                    });
                }
            }
            console.log(MdnsScanner.mdns);
        })
    }

}
