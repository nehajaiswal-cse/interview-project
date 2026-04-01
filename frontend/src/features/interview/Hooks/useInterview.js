import{useContext,useEffect} from "react"

import { InterviewContext } from "../interview.context"

import { generateInterviewReport,generateInterviewReportById, getAllInterviewReports} from "../services/interview.api"

export const useInterview=()=>{
  const context = useContext(InterviewContext);

  if(!context){
    throw new Error("useInterview must be used with in InterviewProvider")
  }

  const{loading,setloading,report,setreport,reports,setreports}=context
  
    const generateReport = async({jobDescription,selfDescription,resumeFile,title})=>{        
        setloading(true)
        let response = null
        try{
             response = await generateInterviewReport({jobDescription,selfDescription,resumeFile,title})
            setreport(response.interviewReport)
        }
        catch(err){
            console.error("Error generating interview report:", err);
        }
        finally{
            setloading(false)
        }
        return response.interviewReport
    }

    const getReportById = async(interviewId)=>{
        setloading(true) 
        let response = null                       
        try{
             response = await generateInterviewReportById(interviewId)
            setreport(response.interviewReport)
        }
        catch(err){
            console.error("Error fetching interview report:", err);
        }
        finally{
            setloading(false)
        }
        return response.interviewReport
    }

    const getAllReports = async()=>{  
        setloading(true)

        try{
            let response = null
            response = await getAllInterviewReports()
            setreports(response.interviewReports)
        }
        catch(err){
            console.error("Error fetching interview reports:", err);
        }
        finally{
            setloading(false)
        }
        return response.interviewReports
    }

    return {
        loading,
        report,         
        reports,
        generateReport,
        getReportById,
        getAllReports               
    }   
}