import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { loginUserValidation, registerUserValidation, updateUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'Email already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      email: true,
      nama: true,
      id_lembaga: true,
      role: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      id: user.id,
    },
    select: {
      id: true,
      email: true,
      nama: true,
      role: true,
      id_lembaga: true,
      token: true,
    },
  });
};

const getUser = async (id) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      nama: true,
      role: true,
      lembaga: {
        select: {
          id: true,
          nama_lembaga: true
        }
      },
      nta: true,
      tmpt_lahir: true,
      tgl_lahir: true,
      alamat: true,
      agama: true,
      jabatan: true,
      token: true,
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
};

const getAllUser = async(role) => {
  if(role !== 'super_admin') {
    throw new ResponseError(403, "Access denied")
  }

  const user = await prismaClient.user.findMany({
    select: {
      id: true,
      email: true,
      nama: true,
      role: true,
      lembaga: {
        select: {
          id: true,
          nama_lembaga: true
        }
      },
      nta: true,
      tmpt_lahir: true,
      tgl_lahir: true,
      alamat: true,
      agama: true,
      jabatan: true,
      token: true,
    }
  })

  if(!user) {
    throw new ResponseError(404, 'User not found')
  }

  return user
}

const updateUser = async (request, id) => {
  const user = validate(updateUserValidation, request);

  const totalUser = await prismaClient.user.count({
    where: {
      id,
    },
  });
  if (totalUser !== 1) {
    throw new ResponseError(404, 'User not found');
  }

  if (user.email) {
    const emailExists = await prismaClient.user.count({
      where: {
        email: user.email,
        NOT: {
          id,
        },
      },
    });

    if (emailExists > 0) {
      throw new ResponseError(400, 'Email already exists');
    }
  }

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      id,
    },
    data: user,
    select: {
      email: true,
      nama: true,
      id_lembaga: true,
      role: true,
    },
  });
};

const logout = async (id) => {
  const user = prismaClient.user.findUnique({
    id,
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return prismaClient.user.update({
    where: {
      id,
    },
    data: {
      token: null,
    },
    select: {
      email: true,
    },
  });
};

const deleteUser = async (id, role) => {
  if(role !== 'super_admin') {
    throw new ResponseError(403, "Access denied")
  }
  const totalUser = await prismaClient.user.count({
    where: {
      id
    }
  })

  if(totalUser !== 1) {
    throw new ResponseError(404, "User not found")
  }

  return prismaClient.user.delete({
    where: {
      id
    },
    select: {
      email: true
    }
  })
}

export default { register, login, getUser, getAllUser, updateUser, logout, deleteUser };
