import  {User}  from "../models/user.model.js";
// import {Address} from "../models/address.model.js"
const getUsersByWardNumber = async (req, res) => {
  try {
    const { wardNumber } = req.params;

    const users = await User.find()
      .populate({
        path: "address",
        match: { wardNumber },
      })
      .populate("water_tax")
      .populate("garbage_tax")
      .populate("property_tax");

    // Filter out users without the specified ward number
    const filteredUsers = users.filter(user => user.address);

    res.status(200).json({
      message: `Users in ward number ${wardNumber}`,
      users: filteredUsers.map(user => ({
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        waterTax: user.water_tax ? user.water_tax.totalAmount : null,
        garbageTax: user.garbage_tax ? user.garbage_tax.totalAmount : null,
        propertyTax: user.property_tax ? user.property_tax.totalAmount : null,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

export {
  getUsersByWardNumber
};