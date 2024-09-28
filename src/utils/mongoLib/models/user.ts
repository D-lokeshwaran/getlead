import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    birthday: {
        type: Date,
        required: true
    },
    password:  {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
