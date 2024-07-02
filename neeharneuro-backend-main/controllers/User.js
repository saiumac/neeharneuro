const Model = require('../models');
const ThisModel = Model.User
const DoctorModel = Model.Doctor
const AdminModel = Model.Admin
const ReceptionistModel = Model.Receptionist
const bcrypt = require('bcrypt');
const jwt_token = require('jsonwebtoken');
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const md5 = require('md5');
const sequelize = require('sequelize')

const registeruser = async (req, res) => {
    // #swagger.tags = ['Admin']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "required": ["name","email","password","role"], 
        "properties": { 
          "name": { 
            "type": "string",
          },
          "email": { 
            "type": "string",
          },
          "mobile_no":{
            "type":"string"
          },
          "password":{
            "type":"string",
          },
          "role":{
            "type": "string",
          },
        } 
      } 
    }
    */
    try {
        const { name, email, password, mobile_no, role } = req.body;
        const user = await ThisModel.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        const hashedPassword = md5(password);
        const newUser = await ThisModel.create({ name, email, password: hashedPassword, mobile_no, role });
        
        // Save the data in the doctor table if the role is doctor
        if (role === 'doctor') {
            await DoctorModel.create({
                //user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email,
                mobile_no: newUser.mobile_no,
                password: newUser.password,
                status: newUser.status
            });
        }else if (role === 'admin') {
            await AdminModel.create({
                //user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email,
                mobile_no: newUser.mobile_no,
                password: newUser.password,
                status: newUser.status
            });
        } else if (role === 'receptionist') {
            await ReceptionistModel.create({
                //user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email,
                mobile_no: newUser.mobile_no,
                password: newUser.password,
                status: newUser.status
            });
        }

        res.status(200).json({ message: "User created", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to register", error: error.message });
    }
};

const loginuser = async (req, res) => {
    // #swagger.tags = ['Admin']
    /*
    #swagger.parameters['body'] = {
      in: 'body', 
      '@schema': { 
        "properties": { 
          "name": { 
            "type": "string",
          },
          "password": { 
            "type": "string",
          }
        } 
      } 
    }
    */
    try {
        const { name, password } = req.body;
        const user = await ThisModel.findOne({ where: { name } });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        const hashedPassword = md5(password);
        if (hashedPassword !== user.password) {
            return res.status(404).json({ error: "Invalid password." });
        }
        const accesstoken = jwt_token.sign({ userId: user.user_id }, "super-secret-key", { expiresIn: "30d" });
        res.status(200).json({ message: "Login success", accesstoken, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ChangePassword = async (req, res) => {
    // #swagger.tags = ['Admin']
    /*
    #swagger.parameters['body'] = {
        in: 'body', 
        '@schema': { 
          "required": ["currentPassword","newPassword","confirmPassword"],
            "properties": { 
                "currentPassword": { 
                    "type": "string",
                },
                "newPassword": { 
                    "type": "string",
                },
                "confirmPassword": { 
                    "type": "string",
                }
            } 
        } 
    }
    */
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        console.log('Request user:', req.user); // Add this line for debugging
        const user = await ThisModel.findByPk(req.user.userId); // Use the correct key userId
        if (!user) {
            return res.status(204).json({ error: 'User not found.' });
        }
        if (!currentPassword || typeof currentPassword !== 'string') {
            return res.status(400).json({ error: 'Current password is missing or invalid.' });
        }
        const Curpassword = md5(currentPassword); // Hash the current password
        if (Curpassword !== user.password) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }
        if (newPassword !== confirmPassword) {
            return res.status(203).json({ error: 'New password and confirm password do not match.' });
        }
        const hashedPassword = md5(newPassword); // Hash the new password
        user.password = hashedPassword;
        await user.save();
        res.status(202).json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password.', error: error.message });
    }
};

const getUsersByRole = async (req, res) => {
    // #swagger.tags = ['Admin']
    /*
    #swagger.parameters['role'] = {
        '@schema': { 
            "type": "string",
            "enum": ["admin", "doctor", "receptionist"],
            "required": true
        } 
    }
    */
    try {
        const { role } = req.query;
        if (!role || !['admin', 'doctor', 'receptionist'].includes(role)) {
            return res.status(400).json({ error: 'Invalid or missing role parameter.' });
        }

        const users = await ThisModel.findAll({ where: { role } });
        if (users.length === 0) {
            return res.status(204).json({ message: 'No users found for the specified role.' });
        }

        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.error('Error retrieving users by role:', error);
        res.status(500).json({ error: 'Failed to retrieve users by role.', error: error.message });
    }
};

const updateuser = async (req, res) => {
    // #swagger.tags = ['Admin']
    /*
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        "required": ["name", "mobile_no"],
        "properties": {
          "name": {
            "type": "string",
          },
          "mobile_no": {
            "type": "string"
          },
        }
      }
    }
    */
    try {
        const { name, mobile_no } = req.body;
        const userid = req.user.userId; // Ensure req.user.userId is available
        const user = await ThisModel.findByPk(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.mobile_no = mobile_no;
        await user.save();
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', error: err.message });
    }
};

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587, 
    secure: false,
    auth: {
      user: 'momsfood262@gmail.com',
      pass: '9XknBbM2RQIS8NTJ',
    },
  });
  

const forgotpassword = async(req,res) =>{
    // #swagger.tags = ['Admin']
    /*
    #swagger.parameters['body']={
        in: 'body',
        '@schema': {
          "required": ["email"],
            "properties": {
                "email":{
                    "type":"string",
                }
            }
        }
    }
    */
   try {
       let email = req.body.email;
       const user = await ThisModel.findOne({where: {email}});
       if (!user) {
        return res.status(204).json({error: "User not found"});
       }
       const randomPassword = crypto.randomBytes(8).toString('hex');
       const hashedPassword = md5(randomPassword);
       user.password = hashedPassword
       await user.save();
       const mailOptions = {
                from: 'abhizgn@photonxtech.com',
                to: email,
                subject: 'Forgot Password',
                html: `Your new password is: ${randomPassword}`    
       };
       transporter.sendMail(mailOptions,(error) =>{
                if (error) {
                    console.error('Error sending new password email:',error);
                }else{
                    res.status(200).json({message: 'New password sent successfully. Check your mail.'})
                }
       });
       res.status(200).json({ message: 'New password sent successfully. Check your email.',new_password:randomPassword });
    } catch (error) {
      console.error('Error sending new password:', error);
      res.status(500).json({ error: 'Failed to send new password.', error:error.message });
    }
}


module.exports = { registeruser, loginuser ,ChangePassword,getUsersByRole,updateuser,forgotpassword};
