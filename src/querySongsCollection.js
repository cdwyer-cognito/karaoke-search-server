class QuerySongsCollection {

    constructor(){
        this.MongoClient = require('mongodb').MongoClient;
        this.url = "mongodb://localhost:27017/karaokeSearch";
        this.dbName = "karaoke";
        this.collection = "songs";
    }

    async runQuery( jsonObj ){

        let results;

        await async function() {
            let client;
        
            try {
                client = await this.MongoClient.connect( this.url, { useNewUrlParser: true });
                console.log("Connected correctly to server");
        
                const db = client.db( this.dbName );

                const col = db.collection( this.collection );
        
                results = await col.find( jsonObj ).toArray();

                console.log("There are " + results.length + " records returned");
            } catch (err) {
                console.log( err.stack );
            }
        
            client.close();
        }();

        return results;
    }

    regexEscape( string ){
        return string.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
    }

    async countRecords(){
        return await this.runQuery( { Title: /.*/ } );
    }

    async findbyTitle( search ){
        return await this.runQuery( { Title: { $regex:  regexEscape( search ), $options: 'i'} } ); 
    }

    async findbyArtist( search ){
        return await this.runQuery( {Artist: { $regex:  regexEscape( search ), $options: 'i'} } ); 
    }

    async findinAll(search){
        search =  this.regexEscape( search );
        return await this.runQuery( { $or: [ 
            { Title: { $regex: search, $options: 'i'} },
            { Artist:  { $regex: search, $options: 'i'} } 
            ] 
        });
    }

    async artistStartsWith(search){
        return await this.runQuery( { Artist: { $regex: '^' +  search + '.*', $options: 'i'} } );
    }

    async titleStartsWith(search){
        return await runQuery( { Title: { $regex: '^' +  search + '.*', $options: 'i'} } );
    }
}

module.exports = QuerySongsCollection;
