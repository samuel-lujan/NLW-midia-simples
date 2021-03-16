import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRespository } from "../repositories/SurveysUsersRespository";
import SendMailService from "../services/SendMailService";

class UserController {

    async create(request: Request,response: Response){
        
        const {name, email} = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const surveyRepository = getCustomRepository(SurveysRepository);

        const surveyUserRepository = getCustomRepository(SurveysUsersRespository);

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if(userAlreadyExists){
            return response.status(409).json({
                error: 'This user already exists!',
            });
        }

        const user = userRepository.create({name, email});

        await userRepository.save(user);

        const surveys = await surveyRepository.find();
        
        const questions = await Promise.all(surveys.map(survey => {
            const s = surveyUserRepository.create({survey_id: survey.id,user_id: user.id});
            return surveyUserRepository.save(s);
        }));

        await SendMailService.excute(user.email, "Pesquisa de NPS", `Clique no link para responder nossa pesquisa <a href='http://localhost:3000/responder/${questions[0].id}'>Responder Email </a>`);

        return response.status(201).json(user);
    }

}

export { UserController }