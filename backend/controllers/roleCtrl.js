const Role = require('./../model/role');

// exports.createRole = async (req, res) => {
//     try {
//         const testRole = await Role.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 testRole
//             }
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: error.message
//         })
//     }
// }

// exports.createRole= async (req,res)=>{
//     try {
//         const {Abbreviation, Position} = req.body
//         const checkRole = await Role.findOne({Position:req.body.Position});
//         console.log(checkRole);
        
//         // if(checkRole){
//         //     res.status(400).send(`${req.body.Abbreviation} is already exists`);
//         // }
//         // if(checkRole.Position===Position){
//         //     res.status(400).send(`${eq.body.Position} is already exists`)
//         // }
//         // const roleToBeAdded = new Role({...req.body});
//         // const role = await roleToBeAdded.save();
//         // res.send({role,msg:"Role Created Successfully"});

//     } catch (error) {
//         console.log(error);
        
//     }
// }

exports.createRole = async (req, res) => {
    
    try {
      const { Abbreviation, Position } = req.body;
  
      const checkPosition = await Role.findOne({Position:req.body.Position});  
      if (checkPosition) {
        return res.status(400).send(`This Position ${Position} already exists.`);
      }
      const checkAbbreviation= await Role.findOne({Abbreviation:Abbreviation})
      if(checkAbbreviation){
        return res.status(400).send(`This Abbreviation ${Abbreviation} already exists.`)
      }
  
      const roleToBeAdded = new Role({ Abbreviation, Position });
      const role = await roleToBeAdded.save();
      res.status(200).send({ role, msg: "Role Created Successfully" });
  
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Server Error");
    }
  };
//--------------------------------------------------------------------------------
exports.getAllRole = async (req, res) => {
    try {
        const Roles = await Role.find();
        res.status(200).json({
            status: 'success',
            length: Roles.length,
            data: {
                Roles
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getRole = async (req, res) => {

}
//--------------------------------------------------------------------------------
exports.updateRole = async (req, res) => {
    try {
        const testRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testRole // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}
//--------------------------------------------------------------------------------
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params; 
        const deleteRole = await Role.findByIdAndDelete(id);
        if (!deleteRole) {
          // If no Roles is found, respond with an error
          return res.status(404).json({ message: "Roles not found" });
        }
        // If the Roles is deleted, send a success response
        res.status(200).send({ message: "Roles deleted successfully", deleteRole });
      } catch (error) {
        console.error("Error deleting Roles:", error);
        res.status(500).json({ message: "Failed to delete the Roles. Please try again." });
      }
}