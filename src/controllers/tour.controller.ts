/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { tourServices } from '../services/tour.service'
import sendSuccessResponse from '../utils/sendResponse'

const createTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tourData = req.body
        const result = await tourServices.createTour(tourData)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Tour created successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const getAllTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tourServices.getAllTours()
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Tour fetched successfully",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

const getSingleTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const result = await tourServices.getSingleTour(id)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Single Tour fetched successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const updateTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tourData = req.body
        const id = req.params.id
        const result = await tourServices.updateTour(id, tourData)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Tour updated successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const getNextSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const result = await tourServices.getNextSchedule(id)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Next Schedule fetched successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const deleteTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        await tourServices.deleteTour(id)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Tour deleted successfully",
            data: null
        })
    } catch (error: any) {
        next();
    }
}

export const tourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    getNextSchedule,
}