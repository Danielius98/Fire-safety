const express = require('express');
const path = require('path');

const fs = require('fs');
const nodemailer = require("nodemailer");

const port = 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//это со старого
//app.use(express.static(__dirname+'/public'));
//app.use(express.json());
//

//ОСНОВНАЯ СТРАНИЦА
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/index.html'));

})
app.get('/index.html', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/index.html'));

})

app.get('/user_data.json', (req,res) =>{
  res.sendFile(path.join(__dirname, './user_data.json'));

})

app.get('/style.css', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/style.css'));
  
})
app.get('/forest.jpeg', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/forest.jpeg'));
  
})

/////////////Конец основной

////////////REGISTER & REMINDER
app.get('/indexRegister.html', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/indexRegister.html'));
  
})

app.get('/reg.js', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/reg.js'));
  
})

app.get('/indexPasReminder.html', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/indexPasReminder.html'));
  
})

// app.get('/user_data.json', (req,res) =>{
//   res.sendFile(path.join(__dirname, './user_data.json'));
// })

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Асинхронное чтение из файла
    fs.readFile('user_data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        console.error("ОШИБКА ПРИ ЧТЕНИИ JSON");
        return;
      }
      // Преобразование считанной строки в объект JavaScript
      const obj = JSON.parse(data);
      obj[username] = password
      fs.writeFile('user_data.json', JSON.stringify(obj), (err) => {// fs.writeFile('user_data.json', JSON.stringify({ username, password }, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка при записи данных');
        }
        res.send('Данные успешно сохранены');
    });
      // Теперь вы можете работать с объектом obj
    });
  
});
///


//ИНДЕКС 2 СТРАНИЦА
app.get('/index2.html', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/index2.html'));
  
})
app.get('/scriptCALC.js', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/scriptCALC.js'));
  
})
app.get('/sensors.jpg', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/sensors.jpg'));
  
})
app.get('/heat.PNG', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/heat.PNG'));
  
})
app.get('/heat_line.PNG', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/heat_line.PNG'));
  
})
app.get('/smoke_sens.PNG', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/smoke_sens.PNG'));
  
})
app.get('/handle_sens.PNG', (req,res) =>{
  res.sendFile(path.join(__dirname, './public/handle_sens.PNG'));
  
})
//конец второй



//////////////ПОЧТЫ ЧАСТЬ
app.get("/indexMAIL.html", (req, res) => {
  res.sendFile(path.join(__dirname, './public/indexMAIL.html'));
});

app.get("/scriptMAIL.js", (req, res) => {
  res.sendFile(path.join(__dirname, './public/scriptMAIL.js'));
});
app.get("/styleMAIL.css", (req, res) => {
  res.sendFile(path.join(__dirname, './public/styleMAIL.css'));
});



app.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "tested2244@mail.ru",
        pass: "9JHqH3ZWTryrXxSFVKSs",
      },
    });

    const { wrks_, total_, snsrs_, area_, hrs_, Box, Box_materials, name, phone, message, email } = req.body;
    //const {Box, name, phone, message, email } = req.body;
    //var sendmail = document.getElementById('email').textContent;
    

    await transporter.sendMail({
      
      from: "tested2244@mail.ru",
      to: email,//"skufidon141@gmail.com",
      subject: ` Сайт пожарных систем${name} (${phone})`,
      text: message,
      html: `
        <p>Поступила заявка с сайта </p>
        <p>Ваше имя ${name}</p>
        <p>Ваш номер ${phone}</p>
        <p>Ваше сообщение ${message}</p>
        <p>Колв-во работников: ${area_}</p>
        <p>Колв-во работников: ${wrks_}</p>
        <p>Кол-во часов: ${hrs_}</p>
        <p>Кол-во датчиков: ${snsrs_}</p>
        <p>Использование материалов: ${Box_materials}</p>
        <p>Испытание системы: ${Box}</p>
        <p>Конечная стоимость: ${total_} руб </p>
        `,
    });


    return res.status(200).send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});
/////////////////



app.listen(port, ()=>{ //порт 3000
  console.log("RABOTAEM")
})