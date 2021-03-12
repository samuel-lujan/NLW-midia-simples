import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveysController } from './controllers/SurveysController'
import { SendMailController } from './controllers/SendMailController';
import { SurveysUsersController } from './controllers/SurveysUsersController';

const router = Router();

const userController        = new UserController();
const surveysController     = new SurveysController();
const sendMailController    = new SendMailController();
const surveysUsersController = new SurveysUsersController(); 

router.post('/users', userController.create);


router.get('/surveys', surveysController.index);
router.post('/surveys', surveysController.create);

router.post('/sendMail', sendMailController.execute);

router.get('/surveys/users/:idSurveyUser', surveysUsersController.show);
router.put('/surveys/users/:idSurveyUser', surveysUsersController.update);

export { router }