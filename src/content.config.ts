import { file } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const ACCEPTED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".svg"];
const ACCEPTED_SONG_EXTENSIONS = [".mp3", ".wav", ".ogg", ".flac"];

const nextSongsCollection = defineCollection({
    loader: file("src/content/nextsongs/Next_songs.json"),
    schema: ({ image }) => z.object({
        id: z.number().int().min(0),
        title: z.string(),
        author: z.string(),
        url: z.string().url(),
        imagePreviewUrl: image(),
        songFileName: z.string().min(1, { message: "File path cannot be empty." })
            .regex(
                new RegExp(`.*(${ACCEPTED_SONG_EXTENSIONS.join('|')})$`, 'i'),
                { message: "Invalid song file path or extension." }
            ),
    })
})

export const collections = { nextSongsCollection };