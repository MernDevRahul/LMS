const Session = require("../model/session");

  exports.createSession = async (req, res) => {
      try {
        // console.log(req.body)
        const newSession = new Session(req.body);
    
        await newSession.save();
        res.status(201).json({ message: "Session created successfully", session: newSession });
      } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    };

  exports.getStudentAttendance = async (req, res) => {
    try {
      const { studentId } = req.params;
      // console.log(studentId)
      // Fetch attendance records for the student
      const sessions = await Session.find({ "attendance.studentId": studentId })
        .populate("batchId", "name") // Get batch details
        .lean();
  
      if (!sessions.length) {
        return res.status(404).json({ message: "No attendance records found for this student." });
      }
  
      // Process attendance data
      const attendanceHistory = sessions.map(session => {
        const studentRecord = session.attendance.find(att => att.studentId.toString() === studentId);
        return {
          date: session.date,
          batch: session.batchId.name, // Batch name
          status: studentRecord.status
        };
      });
  
      res.status(200).json({
        studentId,
        totalSessions: attendanceHistory.length,
        attendanceHistory
      });
    } catch (error) {
      console.error("Error fetching student attendance:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


  exports.getSession = async(req,res)=>{
    try {
        const session = await Session.find()
        res.send({session})
    } catch (error) {
        console.log(error)
    }
  }