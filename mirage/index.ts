import { createServer, Factory, Model } from "miragejs"

export function startMirage() {
  return createServer({
    models: {
      movie: Model,
      user: Model,
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `name ${i}`;
        }
      }),
    },

    seeds(server) {
      server.createList('user', 3);
    },

    routes() {
        this.namespace = "/api"
        
        this.get("user");
        this.post("user", (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
        
          attrs.id = (Math.random() * 100).toFixed(0);

          schema.create('user', attrs);

          return schema.all('user');
        })
    },
  });
}