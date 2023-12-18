/* eslint-disable @typescript-eslint/no-explicit-any */
import { tourServices } from '../services/tour.service'
import sendSuccessResponse from '../utils/sendResponse'
import catchAsync from '../utils/catchAsync'

const createTour = catchAsync(async (req, res) => {
    const tourData = req.body
    const result = await tourServices.createTour(tourData)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Tour created successfully",
        data: result
    })
})

const getAllTours = catchAsync(async (req, res) => {
    const result = await tourServices.getAllTours(req.query)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Tour fetched successfully",
        data: result
    })
})

const getSingleTour = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await tourServices.getSingleTour(id)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Single Tour fetched successfully",
        data: result
    })
})

const updateTour = catchAsync(async (req, res) => {
    const tourData = req.body
    const id = req.params.id
    const result = await tourServices.updateTour(id, tourData)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Tour updated successfully",
        data: result
    })
})

const getNextSchedule = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await tourServices.getNextSchedule(id)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Next Schedule fetched successfully",
        data: result
    })
})

const deleteTour = catchAsync(async (req, res) => {
    const id = req.params.id
    await tourServices.deleteTour(id)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Tour deleted successfully",
        data: null
    })
})

export const tourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    getNextSchedule,
}