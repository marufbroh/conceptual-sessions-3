/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookingServices } from '../services/booking.service'
import sendSuccessResponse from '../utils/sendResponse'
import catchAsync from '../utils/catchAsync'

const createBooking = catchAsync(async (req, res) => {
    const bookingData = req.body
    const result = await bookingServices.createBooking(bookingData)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Booking created successfully",
        data: result
    })
})

const getAllBookings = catchAsync(async (req, res) => {
    const result = await bookingServices.getAllBookings()
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Booking fetched successfully",
        data: result
    })
})

const getSingleBooking = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await bookingServices.getSingleBooking(id)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Single Booking fetched successfully",
        data: result
    })
})

const getAllBookingsOfUser = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await bookingServices.getAllBookingsOfUser(id)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "User bookings fetched successfully",
        data: result
    })
})

const updateBooking = catchAsync(async (req, res) => {
    const bookingData = req.body
    const id = req.params.id
    const result = await bookingServices.updateBooking(id, bookingData)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Booking updated successfully",
        data: result
    })
})

const deleteBooking = catchAsync(async (req, res) => {
    const id = req.params.id
    await bookingServices.deleteBooking(id)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Booking deleted successfully",
        data: null
    })
})

export const bookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
    getAllBookingsOfUser,
}