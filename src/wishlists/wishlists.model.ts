import * as mongoose from 'mongoose'

export const WishlistsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    uid: { type: String, required: true },
    rating: { type: Number, required: false },
    authors: { type: String, required: false },
    thumbnail: { type: String, required: false },
})

export interface Wishlists extends mongoose.Document {
    id: string
    uid: string
    title: string
    rating: number
    authors: string
    thumbnail: string
}