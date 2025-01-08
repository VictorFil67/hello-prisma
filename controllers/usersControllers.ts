import { getUsers } from "../services/usersServices";

const usersList = async (req: any, res: any) => {
  const result = await getUsers();
  res.status(200).json(result);
};

export default {
  usersList,
};
