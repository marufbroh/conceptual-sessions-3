/* eslint-disable @typescript-eslint/no-explicit-any */
import { filter } from '../helpers/filterHelper'
import { ITour } from '../interfaces/tour.interface'
import Tour from '../models/tour.model'
import { TQueryObj } from '../types/TQueryObj'

const createTour = async (tourData: ITour): Promise<ITour> => {
    const result = await Tour.create(tourData)

    return result
}



const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {
    const modelQuery = filter(Tour.find(), query);

    if (query.searchTerm) {
        const fieldValues = Object.values(modelQuery.model.schema.paths);
        const searchableFields = fieldValues
            .filter((fieldObj) => {
                if (fieldObj.instance === "String") {
                    return true;
                }
            })
            .map((fieldObj) => ({
                [fieldObj.path]: { $regex: query.searchTerm, $options: 'i' }
            }))

        modelQuery.find({
            $or: searchableFields
        });
    }

    return modelQuery
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