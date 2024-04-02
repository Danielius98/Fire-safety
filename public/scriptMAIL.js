const FEEDBACK_FORM = document.querySelector("#feedback-form");

function sendFeedback(feedback) {

  feedback.wrks_ = localStorage.getItem('wrks_value');
  feedback.total_ = localStorage.getItem('total_value');
  feedback.snsrs_ = localStorage.getItem('snsrs_value');
  feedback.area_ = localStorage.getItem('m_area_value');
  feedback.hrs_ = localStorage.getItem('hrs_value');
  feedback.Box = localStorage.getItem('CheckBoxStatus');
  feedback.Box_materials = localStorage.getItem('CheckBoxStatus_materials');

  //ДОБАВИЛ
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Форма успешно отправлена!");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    });
}

FEEDBACK_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackFormData = new FormData(e.target);
  const feedback = Object.fromEntries(feedbackFormData);

  

  sendFeedback(feedback);
});