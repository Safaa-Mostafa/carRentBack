const e = require("cors");
const userModel = require("../database/Models/user.model");
let Country = require("country-state-city").Country;
let city = require("country-state-city").City;
const bcrypt = require("bcryptjs");

class user {
  // registeration
  static register = async (req, res) => {
    try {
      const userData = new userModel(req.body);
      const token = await user.generateToken();
      await user.save();
       let data = {
        email:userData.email,
        token:token,
        name:userData.name,
        id:userData._id,
        image:userData.image,
        isAdmin:userData.isAdmin
      };
      res.status(200).send({
        apiStatus: true,
        data,
        message: "Logged In successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static register = async (req, res) => {
    try {
      const user = new userModel(req.body);

      const token = await user.generateToken();
      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: { user, token },
        message: "user added successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static uploadImage = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      user.image = req.file.path.replace("public\\", "") || "";

      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "added",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static all = async (req, res) => {
    try {
      const allUsers = await userModel.find();
      res.status(200).send({
        apiStatus: true,
        data: allUsers,
        message: "all data fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: true,
        data: e,
        message: e.message,
      });
    }
  };
  static single = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "data",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static delete = async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.user._id);
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "data",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static editUser = async (req, res) => {
    try {
      const myUpdates = Object.keys(req.body);
      const allowedEdits = ["name", "age", "email"];
      const validEdits = myUpdates.every((update) =>
        allowedEdits.includes(update)
      );
      if (!validEdits) throw new Error("invalid edits");
      const user = await userModel.findById(req.params.id);
      if (!user) throw new Error("invalid id");
      myUpdates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.status(200).send({
        apiStatus: true,
        date: user,
        message: "user data fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
  };
  static editPass = async (req, res) => {
    try {
      const valid = await userModel.checkPass(req.body.email, req.body.oldPass);
      if (!valid) throw new Error("enter correct pass");
      valid.password = req.body.newPass;
      await valid.save();
      res.status(200).send({
        apiStatus: true,
        data: valid,
        message: "password updated",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static login = async (req, res) => {
    try {
      const userData = await userModel.login(req.body.email, req.body.password);
      const token = await userData.generateToken();
      let data = {
        email:userData.email,
        token:token,
        name:userData.name,
        _id:userData._id,
        image:userData.image,
        isAdmin:userData.isAdmin
      };
      res.status(200).send({
        apiStatus: true,
        data,
        message: "Logged In successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static profile = (req, res) => {
    res
      .status(200)
      .send({ apiStatus: true, data: req.user, message: "user profile" });
  };
  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        data: "",
        message: "logged out on device",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, data: e, message: e.message });
    }
  };

  static order = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      await user.orders.push({ ...req.body });
      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "order is saved",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static Delorder = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      for (let i = 0; i < user.orders.length; i++) {
        if (user.orders[i]._id == req.body.id) {
          user.orders.splice(user.orders[i], 1);
        }
      }
      user.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "order is deleted successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  // static editorder = async(req,res)=>{
  //     try{
  // const user = userModel.findById(req.params._id)
  // console.log(req.user.orders[1].products[0].quantity )
  //     }catch(e){

  //     }
  // }

  static allCountry = async (req, res) => {
    try {
      var newVariable = [];
      Country.getAllCountries().forEach(function (country) {
        newVariable.push({ name: country.name });
      });
      res.status(200).send({
        apiStatus: true,
        data: newVariable,
        message: "all countries fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static allCities = async (req, res) => {
    try {
      var cities = [];
      city.getAllCities().forEach(function (city) {
        cities.push({ name: city.name });
      });
      res.status(200).send({
        apiStatus: true,
        data: cities,
        message: "all cities fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
}
module.exports = user;
