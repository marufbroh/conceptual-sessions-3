/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { reviewServices } from '../services/review.service'
import sendSuccessResponse from '../utils/sendResponse'

const createReview = async (req: Request, res: Response, next: NewableFunction) => {
    try {
        const reviewData = req.body
        const result = await reviewServices.createReview(reviewData)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Review created successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const getAllReviews = async (req: Request, res: Response, next: NewableFunction) => {
    try {
        const result = await reviewServices.getAllReviews()
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Review fetched successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const getSingleReview = async (req: Request, res: Response, next: NewableFunction) => {
    try {
        const id = req.params.id
        const result = await reviewServices.getSingleReview(id)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Single Review fetched successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const updateReview = async (req: Request, res: Response, next: NewableFunction) => {
    try {
        const reviewData = req.body
        const id = req.params.id
        const result = await reviewServices.updateReview(id, reviewData)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Review updated successfully",
            data: result
        })
    } catch (error: any) {
        next();
    }
}

const deleteReview = async (req: Request, res: Response, next: NewableFunction) => {
    try {
        const id = req.params.id
        await reviewServices.deleteReview(id)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: "Review deleted successfully",
            data: null
        })
    } catch (error: any) {
        next();
    }
}

export const reviewController = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
}