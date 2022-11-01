const UserAuthAbl =  require("../../abl/user/user")
const UserListAbl =  require("../../abl/user/list")
const UserDeleteAbl =  require("../../abl/user/delete")
const UserGetAbl =  require("../../abl/user/get")
const UserUpdateAbl =  require("../../abl/user/update")

class UsersController{
    registration(dtoIn) {return UserAuthAbl.registration(dtoIn);
    }
    auth(dtoIn) {
        return UserAuthAbl.auth(dtoIn);
    }
    login(dtoIn) {
        return UserAuthAbl.login(dtoIn);
    }
    list(dtoIn) {
        return UserListAbl.list(dtoIn);
    }
    delete(dtoIn) {
        return UserDeleteAbl.delete(dtoIn);
    }
    get(dtoIn) {
        return UserGetAbl.get(dtoIn);
    }
    update(dtoIn) {
        return UserUpdateAbl.update(dtoIn);
    }
}

module.exports = new UsersController()
//
// const activateAccount = async (req, res) => {
//     try {
//         const activationLink = req.params.link;
//         const user = await UserModel.findOne({
//             activationLink
//         })
//         if (!user) {
//             return res.status(404).send("user not found")
//         }
//         user.isActivated = true;
//         user.save();
//         return res.status(200).redirect(`${process.env.FRONT_URL}/login`)
//         //return res.status(200).json(user)
//     } catch (err) {
//         return res.status(404).send(err)
//     }
//
// }
//
// export const register = async (req, res) => {
//     try {
//
//         if (await UserModel.findOne({
//             email: req.body.email
//         })) {
//             return res.status(401).send(`user with email ${req.body.email} is exist`);
//         }
//         const password = req.body.password;
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);
//         const activationLink = uuidv4();
//
//         const userRole = await rolesModel.findOne({
//             role: "user"
//         })
//         const doc = new UserModel({
//             email: req.body.email,
//             typeRegist: "default",
//             fullName: req.body.fullName,
//             avatarURL: req.body.avatarURL,
//             activationLink: activationLink,
//             passwordHash: hash,
//             status:"offline",
//             roles: [userRole._id]
//         })
//         const user = await doc.save();
//
//         const {
//             passwordHash,
//             ...userData
//         } = user._doc;
//         const tokens = generateTokens(userData)
//         await saveToken(user._id, tokens.refresh)
//         await mailSend(req.body.email, `${process.env.FRONT_URL}/activate/${activationLink}`)
//         res.cookie("refreshToken", tokens.refresh, {
//             maxAge: 30 * 24 * 60 * 60 * 1000,
//             httpOnly: true
//         })
//         res
//             .status(200)
//             .json({
//                 ...userData,
//                 tokens
//             });
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось зарегатись"
//             })
//     }
// }
// export const login = async (req, res) => {
//     try {
//         const user = await UserModel.findOne({
//             email: req.body.email
//         });
//         if (!user) {
//             return res
//                 .status(404)
//                 .json({
//                     message: "Користувача не знайдено"
//                 });
//         }
//         const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
//
//         if (!isValidPass) {
//             return res
//                 .status(404)
//                 .json({
//                     message: "Неправильний логін або пароль"
//                 });
//         }
//         if (!user.isActivated) {
//             return res
//                 .status(404)
//                 .json({
//                     message: "Активуйте ваш аккаунт"
//                 });
//         }
//         const {
//             passwordHash,
//             ...userData
//         } = user._doc;
//         let tokens = generateTokens(userData)
//         await saveToken(user._id, tokens.refresh)
//         res
//             .cookie("refreshToken", tokens.refresh, {
//                 maxAge: 30 * 24 * 60 * 60 * 1000,
//                 httpOnly: true,
//                 priority: "high"
//             })
//         res.status(200)
//             .json({
//                 ...userData,
//                 tokens
//             });
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось увійти"
//             })
//     }
// }
//
// export const loginGoogle = async (req, res) => {
//     const {
//         tokens
//     } = await oAuth2Client.getToken(req.body.code);
//     try {
//
//         const userObject = jwtDecode(tokens.id_token);
//         const user = await UserModel.findOne({
//             email: userObject.email
//         });
//         const hashString = userObject.email + userObject.name;
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(hashString, salt);
//         const activationLink = uuidv4();
//
//         if (!user) {
//             const userRole = await rolesModel.findOne({
//                 role: "user"
//             })
//
//             const doc = new UserModel({
//                 email: userObject.email,
//                 typeRegist: "google",
//                 fullName: userObject.name,
//                 avatar: {
//                     image: userObject.picture
//                 },
//                 status:"offline",
//                 activationLink: activationLink,
//                 passwordHash: hash,
//                 roles: [userRole._id]
//             })
//             const user = await doc.save();
//             const {
//                 passwordHash,
//                 ...userData
//             } = user._doc;
//
//             if (!user.isActivated) {
//                 return res
//                     .status(404)
//                     .json({
//                         message: "Активуйте ваш аккаунт"
//                     });
//             }
//             const tokens = generateTokens(userData)
//             await saveToken(user._id, tokens.refresh)
//             await mailSend(userObject.email, `${process.env.FRONT_URL}/activate/${activationLink}`)
//             res.cookie("refreshToken", tokens.refresh, {
//                 maxAge: 30 * 24 * 60 * 60 * 1000,
//                 httpOnly: true
//             })
//             res
//                 .status(200)
//                 .json({
//                     ...userData,
//                     tokens
//                 });
//         } else {
//             const isValidPass = await bcrypt.compare(hashString, user._doc.passwordHash);
//             if (!isValidPass) {
//                 const salt = await bcrypt.genSalt(10);
//                 const hashString = userObject.email + userObject.name;
//                 const hash = await bcrypt.hash(hashString, salt);
//                 await UserModel.findOneAndUpdate({
//                     email: userObject.email
//                 }, {
//                     passwordHash: hash
//                 }, {
//                     returnDocument: "before",
//                 }).then((doc) => {
//                     const {
//                         passwordHash,
//                         ...userData
//                     } = user._doc;
//                     if (!doc.isActivated) {
//                         return res
//                             .status(404)
//                             .json({
//                                 message: "Активуйте ваш аккаунт"
//                             });
//                     }
//                     const tokens = generateTokens(userData)
//                     saveToken(user._id, tokens.refresh)
//
//                     res.cookie("refreshToken", tokens.refresh, {
//                         maxAge: 30 * 24 * 60 * 60 * 1000,
//                         httpOnly: true
//                     })
//
//                     return res
//                         .status(200)
//                         .json({
//                             ...userData,
//                             tokens
//                         });
//                 }).catch(err => {
//                     return res.status(500).json({
//                         message: "Не вдалось отримати інформацію"
//                     })
//                 })
//             }
//             if (!user.isActivated) {
//                 return res
//                     .status(404)
//                     .json({
//                         message: "Активуйте ваш аккаунт"
//                     });
//             }
//
//             const {
//                 passwordHash,
//                 ...userData
//             } = user._doc;
//             const tokens = generateTokens(userData)
//             await saveToken(user._id, tokens.refresh)
//             res.cookie("refreshToken", tokens.refresh, {
//                 maxAge: 30 * 24 * 60 * 60 * 1000,
//                 httpOnly: true
//             })
//
//             res
//                 .status(200)
//                 .json({
//                     ...userData,
//                     tokens
//                 });
//         }
//
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось увійти"
//             })
//     }
// }
//
// export const logout = async (req, res) => {
//     try {
//         const {
//             refreshToken,
//         } = req.cookies;
//
//         const userData = await logoutUser(refreshToken);
//         // setStatus(_id, "offline");
//         res.clearCookie("refreshToken");
//         return res.status(200).json(userData);
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось увійти"
//             })
//     }
// }
//
// export const refreshUserToken = async (req, res) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;
//         const userRefreshData = await refresh(refreshToken)
//         res.cookie("refreshToken", userRefreshData.tokens.refresh, {
//             maxAge: 30 * 24 * 60 * 60 * 1000,
//             httpOnly: true
//         })
//         res
//             .status(200)
//             .json(
//                 userRefreshData
//             );
//
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось увійти"
//             })
//     }
// }
//
//
// export const getUser = async (req, res) => {
//
//     try {
//         const user = await UserModel.findById(req.userId).populate({
//             path: "roles",
//             select: "role -_id"
//         })
//         if (!user) {
//             res
//                 .status(404)
//                 .json({
//                     message: "Користувача не знайдено"
//                 })
//         }
//         const {
//             passwordHash,
//             roles: changeRoles,
//             ...userData
//         } = user._doc;
//         const roles = changeRoles.map((obj) => obj.role);
//         res
//             .status(200)
//             .json({
//                 roles,
//                 ...userData
//             });
//     } catch (err) {
//         console.log(err);
//         return res
//             .sendStatus(200)
//             .json({
//                 succcess: true,
//                 message: "Користувач розлогінений"
//             });
//     }
// }
//
// export const getCurrentUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const user = await UserModel.findById(userId).populate({
//             path: "roles",
//             select: "role -_id"
//         })
//         if (!user) {
//             res
//                 .status(404)
//                 .json({
//                     message: "Користувача не знайдено"
//                 })
//         }
//         const {
//             passwordHash,
//             roles: changeRoles,
//             ...userData
//         } = user._doc;
//         const roles = changeRoles.map((obj) => obj.role);
//         res
//             .status(200)
//             .json({
//                 roles,
//                 ...userData
//             });
//     } catch (err) {
//         console.log(err);
//         return res
//             .sendStatus(200)
//             .json({
//                 succcess: true,
//                 message: "Користувач розлогінений"
//             });
//     }
// }
//
// export const updateUserInfo = async (req, res) => {
//     try {
//         console.log(req.body);
//         const userId = req.params.id
//
//         await UserModel.findOneAndUpdate({
//             _id: userId
//         }, {
//             fullName: req.body.fullName,
//             email: req.body.email,
//             avatar: req.body.avatar,
//         }, {
//             returnDocument: "before",
//         }, (err, doc) => {
//             if (err) {
//                 console.log(err);
//                 return res
//                     .status(500)
//                     .json({
//                         message: "Не вдалось отримати профіль"
//                     })
//             }
//             const {
//                 passwordHash,
//                 ...userData
//             } = doc._doc;
//             res
//                 .status(200)
//                 .json(userData);
//         }).clone().catch(function (err) {
//             console.log(err)
//         })
//
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось оновити профіль"
//             })
//     }
// }
//
// export const setUserLikesPost = async (req, res) => {
//     const postId = req.body.postId;
//     const userId = req.body.userId;
//     try {
//         await UserModel.findOneAndUpdate({
//             _id: userId
//         }, {
//             $push: {
//                 likesPostArray: postId
//             },
//             $pull: {
//                 disLikesPostArray: postId
//             }
//         }, {
//             new: true
//         }).then((doc) => {
//             calcLike(postId)
//             const {
//                 passwordHash,
//                 ...userData
//             } = doc._doc;
//             return res.status(200).json(userData)
//         }).catch(err => {
//             return res.status(505).send(err)
//         })
//
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось добавити лайк"
//             })
//     }
// }
//
// export const setUserDisLikesPost = async (req, res) => {
//     const postId = req.body.postId;
//     const userId = req.body.userId;
//     try {
//         await UserModel.findOneAndUpdate({
//             _id: userId
//         }, {
//             $push: {
//                 disLikesPostArray: postId
//             },
//             $pull: {
//                 likesPostArray: postId
//             }
//         }, {
//             new: true
//         }).then((doc) => {
//             calcLike(postId)
//             const {
//                 passwordHash,
//                 ...userData
//             } = doc._doc;
//             return res.status(200).json(userData)
//         }).catch(err => {
//             return res.status(505).send(err)
//         })
//
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось добавити дизлайк"
//             })
//     }
// }
//
//
// export const getAllUsers = async (req, res) => {
//     try {
//         const user = await UserModel.find({}).populate({
//             path: "roles",
//             select: "role -_id"
//         })
//         const usersAll = user.map((data, key) => {
//             const {
//                 passwordHash,
//                 roles: changeRoles,
//                 ...userData
//             } = data._doc;
//             const roles = changeRoles.map((obj) => obj.role);
//             return {
//                 ...userData,
//                 roles
//             }
//         })
//         res
//             .status(200)
//             .json(usersAll);
//     } catch (err) {
//         console.log(err);
//         return res
//             .sendStatus(200)
//             .json({
//                 succcess: true,
//                 message: err
//             });
//     }
// }
//
//
// export const deleteUser = async (req, res) => {
//     try {
//         const user = req.params.id
//         UserModel.findByIdAndDelete({
//             _id: user
//         }, (err, doc) => {
//             if (err) {
//                 console.log(err);
//                 return res
//                     .status(500)
//                     .json({
//                         message: "Не вдалось видалити користувача"
//                     })
//             }
//             if (!doc) {
//                 return res
//                     .status(404)
//                     .json({
//                         message: "Не вдалось знайти користувача для видалення"
//                     })
//             }
//             res
//                 .status(200)
//                 .json({
//                     message: "користувача видалено успішно",
//                     user
//                 });
//         });
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось отримати статті"
//             })
//     }
// }
//
// export const updateUserInfoAdmin = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const role = req.body.roles;
//         console.log("req.body.fullName",req.body.fullName);
//         const find = await rolesModel.find({
//             "role": {
//                 $in: role
//             }
//         })
//         await UserModel.findOneAndUpdate({
//             _id: userId
//         }, {
//             fullName: req.body.fullName,
//             roles: find
//         }, {
//             returnDocument: "before",
//         }, (err, doc) => {
//             if (err) {
//                 console.log(err);
//                 return res
//                     .status(500)
//                     .json({
//                         message: "Не вдалось отримати профіль"
//                     })
//             }
//             const {
//                 passwordHash,
//                 ...userData
//             } = doc._doc;
//             res
//                 .status(200)
//                 .json(userData);
//         }).clone().catch(function (err) {
//             console.log(err)
//         })
//
//     } catch (err) {
//         console.log(err);
//         res
//             .status(500)
//             .json({
//                 message: "Не вдалось оновити профіль"
//             })
//     }
// }