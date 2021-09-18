import mongoose from 'mongoose'
import { IUser } from '../interfaces/user'

export default mongoose.model('Users', new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}))