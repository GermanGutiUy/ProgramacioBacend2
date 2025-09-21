import UserRepository from '../repositories/user.repository.js';
import UserDTO from '../dtos/user.dto.js';

const userRepo = new UserRepository();

export const getCurrent = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id || req.user; // dependiendo de cómo venga
    const user = await userRepo.getById(userId);
    if (!user) return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });

    const dto = new UserDTO(user);
    res.json({ status: 'success', payload: dto });
  } catch (err) {
    next(err);
  }
};
