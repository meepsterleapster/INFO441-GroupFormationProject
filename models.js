
import mongoose from 'mongoose';


let models = {};

async function main() {
    await mongoose.connect('mongodb+srv://george10lee:DvpnzTd9n!U94i4@groupformation.munya01.mongodb.net/?retryWrites=true&w=majority&appName=GroupFormation');
    console.log("Connected to MongoDB");

    const userSchema = new mongoose.Schema({
        username: { type: String },
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        picture: { type: Image },
        role: { type: [String] },
        description: { type: String }
    })

    models.User = mongoose.model('User', userSchema)

    console.log("User model created");


    const projectSchema = new mongoose.Schema({
        projectName: { type: String },
        projectDescription: { type: String },
        projectMembers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] },
        projectStarter: { type: String },
    });
    models.Project = mongoose.model('Project', projectSchema);
    console.log("Project schema created");

}

export default models;