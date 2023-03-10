const { formatTimeStamp } = require("./formatTime");
const formatCourseRequestBody = (requestBody) => {
  const {
    name,
    teacher_id,
    description,
    status,
    credit,
    department_id,
    date,
  } = requestBody

  const newRequestBody = {
    name,
    teacher_id: parseInt(teacher_id),
    description,
    status: `${status}`,
    credit: `${credit}`,
    department_id: parseInt(department_id),
    start_time: formatTimeStamp(date[0]),
    end_time: formatTimeStamp(date[1]),
  };

  return newRequestBody
}

module.exports = {
  formatCourseRequestBody
}