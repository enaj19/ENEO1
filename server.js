const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;;

app.use(cors());

// Le chemin vers votre serveur de fichiers simulé
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || path.join(__dirname, "fichiers_test");

// Fonction pour déterminer le type de fichier en se basant sur son extension
function getFileType(filename, isDirectory) {
  if (isDirectory) {
    return "Dossier de fichiers";
  }
  const extension = path.extname(filename).toLowerCase();
  switch (extension) {
    case ".xlsx":
    case ".xls":
      return "Feuille de calcul Microsoft Excel";
    case ".docx":
    case ".doc":
      return "Document Microsoft Word";
    case ".pptx":
    case ".ppt":
      return "Présentation Microsoft PowerPoint";
    case ".pdf":
      return "Document PDF";
    case ".txt":
      return "Document texte";
    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".gif":
      return "Image";
    case ".mp4":
    case ".mov":
      return "Vidéo";
    default:
      return "Fichier";
  }
}

// Route pour lister le contenu des dossiers, en utilisant le chemin via query string
app.get("/api/files", (req, res) => {
  // Récupérer le chemin depuis la query string
  const requestedPath = req.query.path || "";
  const absolutePath = path.join(UPLOAD_FOLDER, requestedPath);

  // Vérification de sécurité
  if (!absolutePath.startsWith(UPLOAD_FOLDER)) {
    return res.status(403).json({ error: "Accès non autorisé." });
  }

  // Vérifier si le chemin existe et est un dossier
  if (
    !fs.existsSync(absolutePath) ||
    !fs.statSync(absolutePath).isDirectory()
  ) {
    return res.status(404).json({ error: "Dossier non trouvé." });
  }

  fs.readdir(absolutePath, (err, filenames) => {
    if (err) {
      console.error("Erreur lors de la lecture du dossier :", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }

    const fileList = filenames.map((filename) => {
      const filePath = path.join(absolutePath, filename);
      const stats = fs.statSync(filePath);
      const isDirectory = stats.isDirectory();

      return {
        name: filename,
        is_directory: isDirectory,
        // Ajout de la date de modification et du type de fichier
        modified_at: stats.mtime,
        type: getFileType(filename, isDirectory),
        size: isDirectory ? null : stats.size,
      };
    });

    res.json(fileList);
  });
});

// Route pour télécharger un fichier, en utilisant le chemin via query string
app.get("/api/download", (req, res) => {
  // Récupérer le chemin complet du fichier
  const filePath = req.query.path || "";
  const absolutePath = path.join(UPLOAD_FOLDER, filePath);

  if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()) {
    res.download(absolutePath);
  } else {
    res.status(404).send("Fichier non trouvé.");
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
