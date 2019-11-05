class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const kittenSchema = new mongoose.Schema({
            question: String,
            answers: [{answer: String, votes: Number}] // A list of hobbies as string
        });

        // This model is used in the methods of this class to access kittens
        this.kittenModel = mongoose.model('kitten', kittenSchema);
    }

    async getKittens() {
        try {
            //console.log(this.kittenModel.find({}));
            return await this.kittenModel.find({});
        } catch (error) {
            console.error("getKittens:", error.message);
            return {};
        }
    }

    async getAnswers(id) {
        try {
            console.log("id = " + id);
            console.log(this.kittenModel.findById(id));
            return await this.kittenModel.findById(id);
            //return await this.kittenModel.findById(id);
        } catch (error) {
            console.error("getAnswers:", error.message);
            return {};
        }
    }

    async getKitten(id) {
        try {
            //console.log(this.kittenModel.findById(id));
            return await this.kittenModel.findById(id);
        } catch (error) {
            console.error("getKitten:", error.message);
            return {};
        }
    }

    async createKitten(newKitten) {
        // TODO: Error handling
        let kitten = new this.kittenModel(newKitten);
        return kitten.save();
    }

    async updateVotes(votesId, newVotes){
        let votes = await this.getKitten(votesId);
        votes.votes.update(newVotes);
        return votes.save();
    }

    async addHobby(kittenId, hobby) {
        // TODO: Error handling
        const kitten = await this.getKitten(kittenId);
        kitten.hobbies.push(hobby);
        return kitten.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        const answers = [{answer: "test", votes: 2},{answer: "test2", votes: 23}];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomName() {
            return ['Unable to connect to mongoDB using mongoose', 'How to use OAuth2RestTemplate with Spring Authorization Code Flow', 'Felix', 'Broadcast Receiver overwrites previous notifications Android Studio'][getRandomInt(0,3)]
        }

        function getRandomHobbies() {
            const shuffled = answers.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }

        let l = (await this.getKittens()).length;
        console.log("Kitten collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let kitten = new this.kittenModel({
                    question: getRandomName(),
                    answers: getRandomHobbies()
                });
                promises.push(kitten.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);