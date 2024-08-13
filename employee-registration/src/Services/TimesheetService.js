import axios from "axios";

const API_URL = "https://localhost:44301/api/";

const requestData = {
  itimeSheetId: 0,
  dstartDate: null,
  dendDate: null,
  vempName: "",
  vemployeeEmailId: "",
  vmon: "",
  vtue: "",
  vwed: "",
  vthu: "",
  vfri: "",
  vsat: "",
  vsun: "",
  vmonNote: "",
  vtueNote: "",
  vwedNote: "",
  vthuNote: "",
  vfriNote: "",
  vsatNote: "",
  vsunNote: "",
};

const postTimesheet = async (formData) => {
  debugger;

  // Populate requestData with formData fields
  requestData.itimeSheetId = formData.itimeSheetId;
  requestData.dstartDate = formData.dstartDate;
  requestData.dendDate = formData.dendDate;
  requestData.vempName = formData.vempName;
  requestData.vemployeeEmailId = formData.vemployeeEmailId;
  requestData.vmon = formData.vmon;
  requestData.vtue = formData.vtue;
  requestData.vwed = formData.vwed;
  requestData.vthu = formData.vthu;
  requestData.vfri = formData.vfri;
  requestData.vsat = requestData.vsat;
  requestData.vsun = requestData.vsun;
  requestData.vmonNote = formData.vmonNote;
  requestData.vtueNote = formData.vtueNote;
  requestData.vwedNote = formData.vwedNote;
  requestData.vthuNote = formData.vthuNote;
  requestData.vfriNote = formData.vfriNote;
  requestData.vsatNote = formData.vsatNote;
  requestData.vsunNote = formData.vsunNote;

  // Make the POST request
  return await axios.post(API_URL + "TimeSheet", requestData);
};

const fetchTimesheetByEmailId = async (email) => {
  try {
    debugger;
    const response = await axios.get(
      `${API_URL}TimeSheet/ByMailId?emailId=${email}`,
      {}
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching Timesheet:", error);
    throw error; // Optionally rethrow or handle as needed
  }
};

const TimesheetService = {
  postTimesheet,
  fetchTimesheetByEmailId,
};

export default TimesheetService;
