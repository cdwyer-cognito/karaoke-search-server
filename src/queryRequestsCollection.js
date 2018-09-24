class QueryRequestCollection {

    constructor(){
        this.url = "mongodb://localhost:27017/karaokeSearch";
        this.dbName = "karaoke";
        this.collection = "requests";
    }

    async addRequest( jsonObj ) {

        const MongoClient = require('mongodb').MongoClient;
        const equal = require('assert');
        const url = this.url;
        const dbName = this.dbName;
        const collection = this.collection;

        function guid() {
            function s4() {
            return Math.floor( ( 1 + Math.random() ) * 0x10000)
            .toString(16)
            .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }


        await async function() {
            let client;
        
            try {

                client = await MongoClient.connect( url, { useNewUrlParser: true });
                console.log("Connected correctly to server");
                
                const db = client.db( dbName );
            
                let r = await db.collection( collection ).insertOne({
                    GUID: guid(),
                    Singer: jsonObj.Singer,
                    DiscRef: jsonObj.DiscRef,
                    Artist: jsonObj.Artist,
                    Title: jsonObj.Title,
                    DateTime: new Date(),
                    State: false
                });

                equal( 1, r.insertedCount );
                console.log("Data added to " + collection + " collection");  
                    
            } catch (err) {
                console.log( err.stack );
                return "Failed";
            }
        
            if (client) {
                client.close();
            }
            return "Success";
        }();
    }

    async getRequests(){

        let results;
        
        await async function() {
            let client;
        
            try {
                client = await MongoClient.connect( url, { useNewUrlParser: true } );
                console.log("Connected correctly to server");
        
                const db = client.db( dbName );

                const col = db.collection( collection );
        
                results = await col.find( { Singer: /.*/ } ).toArray();

                console.log("There are " + results.length + " records returned");
            } catch (err) {
                console.log( err.stack );
            }
        
            client.close();
        }();

        return results;

    }

    async requestCompleted( jsonObj ){

        const MongoClient = require('mongodb').MongoClient;
        const equal = require('assert');
        const url = this.url;
        const dbName = this.dbName;
        const collection = this.collection;

        await async function() {
            let client;
        
            try {
            client = await MongoClient.connect( url,  { useNewUrlParser: true } );
            console.log("Connected correctly to server");
        
            const db = client.db( dbName );
            const col = db.collection( collection );

            let r = await col.updateOne( { GUID: jsonObj.GUID },  {$set: {State: true } } );
            equal( 1, r.matchedCount );
            equal( 1, r.modifiedCount );

            console.log("Request for " + jsonObj.Singer + " is complete");
                    
            } catch (err) {
            console.log( err.stack );
            }
        
            client.close();
        }();
    }

    async clearRequestsCollection(){

        const MongoClient = require('mongodb').MongoClient;
        const equal = require('assert');
        const url = this.url;
        const dbName = this.dbName;
        const collection = this.collection;

        console.log("Dropping " + collection + " collection in " + dbName);

	    await async function(){
		    let client;
	  
            try {
                client = await MongoClient.connect( url, { useNewUrlParser: true } );
                console.log("Connected correctly to server");
                
                const db = client.db( dbName );
            
                let r = await db.collection( collection ).drop();
                console.log(collection + " collection dropped");
            
            } catch ( err ) {
                console.log( err.stack );
                return "ERROR: Failed to drop " + collection + " collection" + "<br/>" + err.stack;  
            }
        
            if ( client ) {
                client.close();
            }
            
            return "Sucessfully dropped " + collection + " collection";
        }();

    }
}

module.exports = QueryRequestCollection;