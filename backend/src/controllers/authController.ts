import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      name,
      email,
      password,
      role,
      department
    } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      res.status(400).json({
        message: 'Email already registered'
      });

      return;
    }

    // Create new user
    const user = new User({

      name,
      email,
      password,
      role,
      department

    });

    await user.save();

    res.status(201).json({

      message: 'User registered successfully',
      userId: user.userId

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      message: 'Registration failed'

    });

  }

};



export const login = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    // API delay simulation
    const delay = Number(req.query.delay) || 0;

    if (delay > 0) {

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );

    }

    const {
      email,
      password
    } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {

      res.status(401).json({

        message: 'Invalid credentials'

      });

      return;
    }

    // Compare password
    const isPasswordCorrect =
      await user.comparePassword(password);

    if (!isPasswordCorrect) {

      res.status(401).json({

        message: 'Invalid credentials'

      });

      return;
    }

    // Check user status
    if (user.status === 'inactive') {

      res.status(403).json({

        message:
        'Account is inactive. Contact admin.'

      });

      return;
    }

    // Generate JWT token
    const token = generateToken({

      id: user._id.toString(),
      userId: user.userId,
      role: user.role,
      name: user.name,
      email: user.email

    });

    res.status(200).json({

      token,

      user: {

        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department

      }

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      message: 'Login failed'

    });

  }

};