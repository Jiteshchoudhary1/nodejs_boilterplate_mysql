const userRepository = require("../repository/userRepository");
const HttpStatus = require('http-status');
const { passwordEncryption, comparePassword } = require('../helper/passwordHelper');
const { generateToken } = require("../helper/jwtHelper");
module.exports = {
    async create(req, res, next) {
        try {
            req.body.password = await passwordEncryption(req.body.password);
            let user = await userRepository.create(req.body);
            return res.status(HttpStatus.OK).json({
                success: true,
                data: user,
                message: 'User created successfully'
            });

        } catch (error) {
            return next(error);
        }
    },
    async findAll(req, res, next) {
        try {
            let user = await userRepository.findAll();
            return res.status(HttpStatus.OK).json({
                success: true,
                data: user,
                message: 'User list successfully'
            });
        } catch (error) {
            return next(error);
        }
    },
    async update(req, res, next) {
        try {
            let _id = req.params._id;
            let isUserExits = await userRepository.findOne({ _id });
            if (!isUserExits) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                    message: 'Invalid Id'
                });
            }
            await userRepository.update(isUserExits, req.body);
            return res.status(HttpStatus.OK).json({
                success: true,
                data: null,
                message: 'User updated successfully'
            });

        } catch (error) {
            return next(error);
        }
    },
    // async create(req, res, next) {
    //     try {
    //         let user = await userRepository.create(req.body);
    //         return res.status(HttpStatus.OK).json({
    //             success: false,
    //             data: user,
    //             message: 'User created successfully'
    //         });

    //     } catch (error) {
    //         return next(error);
    //     }
    // },
    async login(req, res, next) {
        try {
            let isUserExits = await userRepository.findOne({ email: req.body.email });
            if (!isUserExits) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                    message: 'email not found'
                });
            }
            let isPasswordMatch = await comparePassword(req.body.password, isUserExits.password);
            if (!isPasswordMatch) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    data: null,
                    message: 'Invalid password'
                });
            }
            let token = await generateToken({ _id: isUserExits._id, email: isUserExits.email });
            return res.status(HttpStatus.OK).json({
                success: true,
                data: token,
                message: 'login successfully'

            })

        } catch (error) {
            return next(error);
        }

    }
}