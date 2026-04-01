const pdfParse = require("pdf-parse/lib/pdf-parse"); 
const generateInterviewReport = require("../services/ai.service")   
const interviewReportModel=require("../Models/interviewReportModel")
const { response } = require("../app")



async function generateInterviewReportController(req,res){
    
     if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }
    const parsed = await pdfParse(req.file.buffer);
    console.log("Parsed PDF content:", parsed); // Log the parsed text content of the PDF
    const resumeContent = parsed.text;
    const{selfDescription,jobDescription} = req.body

   const interviewReportAi=await generateInterviewReport({
    resume:resumeContent,
    selfDescription,
    jobDescription
   })

   const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportAi

   })

   res.status(201).json({
    message:"Interview report generated successfully",
    interviewReport
   })
}


/**
 * 
 * @description constroller to get interview report by interviewId 
 */
async function generateInterviewReportByIDController(req,res){
    const{interviewId} =  req.params

    const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:res.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    res.status(202).json({
        message:"Interview report fetched successfully",
        interviewReport
    })

}

/**
 * @description controller to get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req,res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription,-jobDescription,-_v -technicalQuestions -behaviourQuestions -skillGaps -preparationPlan") // Exclude certain fields from the response
    res.status(200).json({
        message:"All interview reports fetched succesfully",
        interviewReports
    })

}

module.exports ={generateInterviewReportController,generateInterviewReportByIDController,getAllInterviewReportsController}