/* eslint-disable @typescript-eslint/no-explicit-any */
import { getQuery } from '../helpers/getQuery'
import { ITour } from '../interfaces/tour.interface'
import Tour from '../models/tour.model'
import { TQueryObj } from '../types/TQueryObj'

const createTour = async (tourData: ITour): Promise<ITour> => {
    const result = await Tour.create(tourData)

    return result
}

const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {
    const result = await getQuery(Tour.find(), query);
    return result;
}

const getSingleTour = async (id: string): Promise<ITour | null> => {
    const result = await Tour.findById(id).populate('reviews')
    return result
}

const updateTour = async (id: string, tourData: ITour): Promise<ITour | null> => {
    const result = await Tour.findByIdAndUpdate(id, tourData, {
        new: true,
        runValidators: true,
    })

    return result
}

const deleteTour = async (id: string): Promise<ITour | null> => {
    const result = await Tour.findByIdAndDelete(id)
    // const result = await Tour.findByIdAndUpdate(id, { isDeleted: true });
    return result
}

const getNextSchedule = async (id: string): Promise<any> => {
    const tour = await Tour.findById(id)
    const nextSchedule = tour?.getNextNearestStartDateAndEndDate()

    return {
        tour,
        nextSchedule,
    }
}

export const tourServices = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    getNextSchedule,
}