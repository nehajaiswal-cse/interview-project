const { GoogleGenAI } = require("@google/genai");
const{z}=require("zod")
const{zodToJsonSchema}=require("zod-to-json-schema");
const { be } = require("zod/locales");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportModel=z.object({
    matchScore:z.number().describe("The match score between the candidate's resume and the job description, represented as a percentage"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical question asked during the interview"),
        intention:z.string().describe("The intention interviewer behind asking in the question"),
        answer:z.string().describe("How to answer this question,what points to cover,what approach to take etc.")   
    })).describe("List of technical questions asked during the interview"),  

    behaviourQuestions:z.array(z.object({
        question:z.string().describe("The behaviour question asked during the interview"),
        intention:z.string().describe("The intention interviewer behind asking in the question"),
        answer:z.string().describe("How to answer this question,what points to cover,what approach to take etc.")    
    })).describe("List of behavioural questions asked during the interview"),

    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill in which the candidate is lacking"),
        severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap")
    })).describe("List of skill gaps identified during the interview"),

    preparationPlan:z.array(z.object({
        day:z.number().describe("The day number in the preparation plan"),
        focus:z.string().describe("The focus of the preparation for that day")  ,
        tasks:z.array(z.string()).describe("The tasks to be completed on that day for preparation")   
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview")  , 
    title:z.string().describe("The title of the job for which the interview report is generated")    


})

async function generateInterviewReport({resume,selfDescription,jobDescription}){
const prompt = `
You are an AI interview assistant.
- DO NOT stringify arrays
- Arrays must be actual JSON arrays, not strings
Return STRICT JSON. No explanation.

{
  "title": "string",
  "jobDescription": "string",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behaviourQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}

Job Description:
${jobDescription}

Self Description:
${selfDescription}

Resume:
${resume}
`
    
      const response = await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportModel)
            
        }
      })

     return JSON.parse(response.text) 
}

module.exports=generateInterviewReport