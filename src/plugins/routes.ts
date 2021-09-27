import * as Hapi from '@hapi/hapi';

export const routes: Hapi.Plugin<undefined> = {
    name: 'app/status',
    register: async function(server: Hapi.Server) {
        server.route({
            method: 'GET',
            path: '/',
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                return h.response({ up: true
                })
                    .code(200)
            },
        })
    },
}
