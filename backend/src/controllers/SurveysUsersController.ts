import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRespository } from "../repositories/SurveysUsersRespository";

class SurveysUsersController {
    async show(request: Request, response: Response){
        const { idSurveyUser } = request.params;

        const surveysUsersRespository = getCustomRepository(SurveysUsersRespository);

        const { survey_id } = await surveysUsersRespository.findOne({id: idSurveyUser});

        if(!survey_id){
            return response.status(400).json({
                error: "The survey/user was not found! :("
            });
        }

        const surveyRepository = getCustomRepository(SurveysRepository);

        const survey = await surveyRepository.findOne({id: survey_id});

        if(!survey){
            return response.status(400).json({
                error: "The survey was not found! :("
            });
        }

        return response.status(200).json({
            title: survey.title,
            description: survey.description
        });
    }


    async update(request: Request, response: Response){
        const { idSurveyUser } = request.params 
        const { newValue } = request.body;

        const surveysUsersRespository = getCustomRepository(SurveysUsersRespository);

        let surveyUser = await surveysUsersRespository.findOne({id: idSurveyUser})
        
        if(!surveyUser){
            return response.status(400).json({
                error: "The survey/user was not found! :("
            });
        }

        surveyUser.value = newValue;

        surveysUsersRespository.save(surveyUser);
        
        console.log(surveyUser);

        return response.status(200).json({
            success: "Updated successfully",
        });
    }
}

export { SurveysUsersController }