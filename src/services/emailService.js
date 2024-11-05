// import nodemailer from 'nodemailer';
import transporter from "../config/transporter.js";

// const transporter = nodemailer.createTransport({
//   service: 'gmail', 
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   },
// });

const sendStockAlert = async (adminEmails, productName, stock, seuil) => {
    console.log(`Envoi d'une alerte de stock pour le produit: ${productName}, stock actuel: ${stock}, seuil: ${seuil}`);
    console.log(`Emails des administrateurs: ${adminEmails}`);
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmails,
      subject: 'Alerte de stock faible',
      text: `Le stock du produit ${productName} est faible. Stock actuel: ${stock}. Seuil: ${seuil}. Veuillez réapprovisionner.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Alerte de stock envoyée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'alerte de stock', error);
    }
  };
  

export default sendStockAlert;
