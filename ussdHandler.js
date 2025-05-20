const db = require('./db');
const menus = require('./menus');

function handleUssd(req, res) {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  const textArray = text.split("*");

  db.get("SELECT language FROM users WHERE phone = ?", [phoneNumber], (err, row) => {
    let lang = row ? row.language : null;

    switch (textArray.length) {
      case 1: // Language selection
        if (!lang) {
          return res.send(`CON ${menus.welcome.en}`);
        } else {
          return res.send(`CON ${menus.mainMenu[lang]}`);
        }

      case 2:
        if (!lang) {
          lang = textArray[1] === "1" ? "en" : "rw";
          db.run("INSERT OR REPLACE INTO users(phone, language) VALUES(?, ?)", [phoneNumber, lang]);
          return res.send(`CON ${menus.mainMenu[lang]}`);
        } else {
          return res.send(`CON ${menus.servicesMenu[lang]}`);
        }

      case 3:
        return res.send("END Thank you for using our service.");
    }
  });
}

module.exports = handleUssd;
