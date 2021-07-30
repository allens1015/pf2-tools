const URL = 'https://api.pathfinder2.fr/v1/pf2';

function request(method, url, data) {
    let defaultHeaders = {
        'Authorization': '4a2e270a-0c8e-4018-8a4f-d15f3c81d66c'
    };

    // For POSTs, PUTs, etc
    if (typeof data === 'string') {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    const xhr = new XMLHttpRequest();
    const req = new Promise(function (resolve, reject) {
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        // Not using this now, but maybe one day
        xhr.onabort = () => {
            reject({
                status: 'aborted'
            });
        };

        for (const key in defaultHeaders) {
            xhr.setRequestHeader(key, defaultHeaders[key]);
        }

        if ((method === 'POST' ||
            method === 'PUT' ||
            method === 'PATCH' ||
            method === 'DELETE') && data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    });

    return req;
}


class SpellService {
    async fetchSpells() {
        const res = await request('GET', `${URL}/spell`);

        return JSON.parse(res);
    }
}

class ItemService {
    async fetchEquipment() {
        const res = await request('GET', `${URL}/equipment`);

        return JSON.parse(res);
    }
}

module.exports = {
    spell: new SpellService(),
    item: new ItemService()
}
