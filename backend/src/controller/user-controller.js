import userService from '../services/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({ 
      code: 200, 
      message: 'Register user success', 
      status: true,
      data: result, 
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      code: 200,
      message: 'Login success',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await userService.getUser(id);
    res.status(200).json({
      code: 200,
      message: "Get data success",
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUser(req.user.role);
    res.status(200).json({
      code: 200,
      message: "Get data success",
      status: true,
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await userService.updateUser(req.body, id);
    res.status(200).json({
      code: 200,
      message: 'Update user success',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await userService.logout(req.user.id);
    res.status(200).json({
      code: 200,
      message: 'Logout success',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await userService.deleteUser(id, req.user.role);
    res.status(200).json({
      code: 200,
      message: 'Delete success',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export default { register, login, getUser, getAllUser, updateUser, logout, deleteUser };
