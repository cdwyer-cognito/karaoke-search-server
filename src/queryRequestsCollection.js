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
        let dataObj;

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

                dataObj = {
                    GUID: guid(),
                    Singer: jsonObj.Singer,
                    DiscRef: jsonObj.DiscRef,
                    Artist: jsonObj.Artist,
                    Title: jsonObj.Title,
                    Length: jsonObj.Length,
                    DateTime: new Date(),
                    State: false,
                    CompletedDateTime: 0
                }
            
                let r = await db.collection( collection ).insertOne(dataObj);

                equal( 1, r.insertedCount );
                console.log("Data added to " + collection + " collection");  
                    
            } catch (err) {
                console.log( err.stack );
                return { Status: "failed", Request: dataObj };
            }
        
            if (client) {
                client.close();
            }
            return { Status: "success", Request: dataObj };
        }();
    }

    async getRequests(){

        let results;
        const MongoClient = require('mongodb').MongoClient;
        const url = this.url;
        const dbName = this.dbName;
        const collection = this.collection;
        
        await async function() {
            let client;
        
            try {
                client = await MongoClient.connect( url, { useNewUrlParser: true } );
                console.log("Connected correctly to server");
        
                const db = client.db( dbName );

                const col = db.collection( collection );
        
                results = await col.find( { GUID: /.*/ } ).toArray();

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

            let r = await col.updateOne( { GUID: jsonObj.GUID },  {$set: {State: true, CompletedDateTime: new Date() } } );
            equal( 1, r.matchedCount );
            equal( 1, r.modifiedCount );

            console.log("Request for " + jsonObj.GUID + " is complete");
                    
            } catch (err) {
            console.log( err.stack );
            }
        
            client.close();
        }();
    }

    async clearRequestsCollection(){

        const MongoClient = require('mongodb').MongoClient;
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

    async countRecords(){
        return await this.getRequests().length;
    }
}

module.exports = QueryRequestCollection;