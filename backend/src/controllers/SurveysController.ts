import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController{

    async create(request: Request, response: Response){
        const {title, description} = request.body;

        const sRepository = getCustomRepository(SurveysRepository);

        const survey = sRepository.create({
            title,
            description
        });

        await sRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response){
        const sRepository = getCustomRepository(SurveysRepository);
        const all = await sRepository.find();

        return response.status(200).json(all);
    }
    
}

export { SurveysController }