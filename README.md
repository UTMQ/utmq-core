utmq-core
====

### UTMQ Assessment Tool

[![Build Status](https://travis-ci.org/UTMQ/utmq-core.png)](https://travis-ci.org/UTMQ/utmq-core)
[![Dependency Status](https://david-dm.org/utmq/utmq-core.png)](https://david-dm.org/utmq/utmq-core)

## Setup Instructions

0. You need [node.js](http://nodejs.org/), [CouchDB](http://couchdb.apache.org/), [GAP System](http://www.gap-system.org/)
installed on your server.

1. Get the node.js dependencies:

```
npm install 
```

2. Copy `dist/config.EXAMPLE.yaml` into `dist/config.yaml` and adjust it to match your CouchDB server and configure
the rest of the settings.


3. Make sure your CouchDB server is running and start the application server with

```
npm start
```


