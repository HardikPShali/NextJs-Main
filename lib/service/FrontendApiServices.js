import axios from "axios";
import LocalStorageService from "../utils/LocalStorageService";
import { commonUtilFunction } from "../utils";

// GET PRE-LOGIN ACCESS CODE FOR SIGNUP
export const getPreLoginAccessCode = async () => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/pre-login`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}

// SIGNUPFORM
export const signupWithEmail = async (userData) => {
    var payload = {
        method: "post",
        mode: "no-cors",
        data: JSON.stringify(userData),
        url: "/api/mobile/register",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

//PRE-LOGIN API FOR ADMIN
export const addPreLoginAccessCode = async (data) => {
    var payload = {
        method: "post",
        data: data,
        mode: "no-cors",
        url: `/api/v2/pre-login`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};
export const editPreLoginAccessCode = async (data) => {
    var payload = {
        method: "put",
        data: data,
        mode: "no-cors",
        url: `/api/v2/pre-login`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

//PATIENT
export const getUnreadNotificationsCount = async (userId) => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/count/unread/notification?userId=${userId}`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}

export const putMarkAsReadNotification = async (userId) => {
    var payload = {
        method: "put",
        mode: "no-cors",
        url: `/api/v2/mark-all-as-read?userId=${userId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

export const putMarkAsReadFromNotificationMenu = async (data, userId) => {
    var payload = {
        method: "put",
        data: data,
        mode: "no-cors",
        url: `/api/v2/set/read/notification?userId=${userId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

export const pushNotificationsApi = async (userId) => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/notifications?userId=${userId}`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}

export const getUpcomingAppointmentsForHomepage = async () => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/appointments/upcoming`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "application/json",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

export const getHealthAssessment = async (patientId) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/assessment?patientId=${patientId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

export const updateDoctorTimeZone = async (data) => {
    var payload = {
      method: "put",
      mode: "no-cors",
      url: `/api/doctors/timezone?doctorId=${data.id}&doctorTimeZone=${data.doctorTimeZone}`,
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios(payload).then((res) => {
      if (res) {
        return res;
      }
    });
    return response;
  };

  //Doctor-Homepage 
  export const getAppointmentsForHomepage = async (
    startTime,
    endTime,
    doctorId
  ) => {
    var payload = {
      method: "get",
      mode: "no-cors",
      url: `/api/v2/appointments/doctor/mobile?startTime=${startTime}&endTime=${endTime}&doctorId=${doctorId}`,
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "Content-Type": "application/json",
      },
    };
    const response = await axios(payload).then((res) => {
      if (res) {
        return res;
      }
    });
    return response;
  };
