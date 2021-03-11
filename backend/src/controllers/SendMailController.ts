import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRespository } from "../repositories/SurveysUsersRespository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendMailController {

    async execute(request: Request, response: Response){
        const { email, survey_id} = request.body;
        
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRespository = getCustomRepository(SurveysUsersRespository);

        const userAlreadyExists = await usersRepository.findOne({email});

        if(!userAlreadyExists){
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({id: survey_id});

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: "The survey does not exists!"
            });
        }

        const surveyUser = surveysUsersRespository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        return response.json(surveyUser);
    }
}

export { SendMailController }