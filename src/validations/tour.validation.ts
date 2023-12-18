import { z } from 'zod'

export const createTourZodSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(255),
        durationHours: z.number().min(1),
        ratingAverage: z.number(),
        ratingQuantity: z.number(),
        price: z.number().min(0),
        imageCover: z.string().min(1),
        images: z.array(z.string()),
        createdAt: z.string(), // Assuming a string format for simplicity
        startDates: z.array(z.string()), // Assuming a string format for simplicity
        startLocation: z.string().min(1),
        availableSeats: z.number().min(0),
        locations: z.array(z.string()),
        slug: z.string(),
    })
})