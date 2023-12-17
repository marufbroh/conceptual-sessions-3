/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import { IBooking } from "../interfaces/booking.interface"
import Booking from "../models/booking.model"
import Tour from "../models/tour.model"

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
    // const result = await Booking.create(bookingData)
    // if (!result) {
    //     throw new Error("Something wrong")
    // }
    // await Tour.findByIdAndUpdate(result.tour, {
    //     $inc: {
    //         availableSeats: -result.bookedSlots
    //     }
    // })
    // return result

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        const booking = await Booking.create([bookingData], { session })

        if (!booking) {
            throw new Error("Booking failed");
        }

        const tour = await Tour.findByIdAndUpdate(booking[0].tour,
            {
                $inc: { availableSeats: -booking[0].bookedSlots }
            },
            {
                session,
            }
        )

        if (!tour) {
            throw new Error("Booking failed");
        }

        await session.commitTransaction();
        await session.endSession();

        return booking[0];

    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error)
    }

}

const getAllBookings = async (): Promise<IBooking[]> => {
    const result = await Booking.find()
    return result
}

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
    const result = await Booking.findById(id)
    return result
}

const getAllBookingsOfUser = async (id: string): Promise<IBooking[] | null> => {
    const result = await Booking.find({
        user: id
    })
    return result
}

const updateBooking = async (id: string, bookingData: IBooking): Promise<IBooking | null> => {
    const result = await Booking.findByIdAndUpdate(id, bookingData, {
        new: true,
        runValidators: true,
    })

    return result
}

const deleteBooking = async (id: string): Promise<IBooking | null> => {
    const result = await Booking.findByIdAndDelete(id)
    // const result = await Booking.findByIdAndUpdate(id, { isDeleted: true });
    return result
}

export const bookingServices = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getAllBookingsOfUser,
    updateBooking,
    deleteBooking,
}