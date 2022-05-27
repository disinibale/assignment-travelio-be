import * as mongoose from 'mongoose'

export const WishlistsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
})

export interface Wishlists extends mongoose.Document {
    id: string
    title: string
    description: string
}