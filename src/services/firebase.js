var serviceAccount = require("../config/firebase-key");
var admin = require("firebase-admin");

const BUCKET = "transcorp-937d3.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(
    process.env.FIREBASE_PRIVATE_KEY
      ? {
          type: "service_account",
          project_id: "senai-overflow",
          private_key_id: "73066f27e33601b0035117947f795a484b773efe",
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: "105469033790114328493",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k09tb%40senai-overflow.iam.gserviceaccount.com",
        }
      : serviceAccount
  ),
  storageBucket: BUCKET,
});
//instanciar o bucket
const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  //criar nome
  const imagem = req.file;

  //split separa o nome do arquivo da extensão então vamos mudar o nome do arquivo
  //e concatenar com a extensão do arquivo após o ponto
  //como poderiam ter mais pontos no originalname, vamos usar o pop para pegar sempre a ultima
  //parte da string depois do ultimo ponto
  const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();

  //criar arquivo no bucket
  const file = bucket.file(nomeArquivo);

  //tipo do arquivo
  //enviar via stream
  //criar um stream de escrita
  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    },
  });

  //ouvir os eventos
  //quando acontecer algo ...
  stream.on("error", (e) => {
    console.error(e);
  });

  //para quando terminar a função
  stream.on("finish", async () => {
    //tonar o arquivo publico
    await file.makePublic();
    //obter a url publica
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;

    next();
  });

  stream.end(imagem.buffer);
};

module.exports = uploadImage;
