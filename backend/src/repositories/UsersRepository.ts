import { EntityRepository, Repository } from "typeorm";
import { Users } from "../models/Users";

class UsersRepository extends Repository<Users>{

}

export { UsersRepository }