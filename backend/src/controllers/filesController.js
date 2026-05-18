import File from "../models/File.js";

export async function getAllFiles(req, res) {
  try {
    const files = await File.find().sort({ createdAt: -1}); 
    res.status(200).json(files);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({message:"Internal server error"});
  }
};

export async function getFileById(req, res) {
  try {
    const file = await File.findById(req.params.id)
    if(!file) return res.status(404).json({message:"File not found"})
    res.json(file)
  } catch (error) {
    console.error("Error in getFileById controller", error);
    res.status(500).json({message:"Internal server error"});
  }
};

export async function createFile(req, res) {
  try {
    const {title, content} = req.body;
    const newFile = new File({ title, content });

    await newNote.save();
    res.status(201).json({message: "Note created successfully"});
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({message:"Internal server error"});
  }
};

export async function editFile(req, res) {
    try {
      const {title, content} = req.body;
      const updatedFile = await File.findByIdAndUpdate(
        req.params.id, 
        { title, content },
        {
          new: true,
        }
      );

      if(!updatedFile) return res.status(404).json({message: "File not found"})

      res.status(200).json({message: "Note updated successfully"});
    } catch (error) {
      console.error("Error in editNote controller", error);
      res.status(500).json({message:"Internal server error"});
    }
};

export async function deleteFile(req, res) {
  try {
    const deletedNote = await File.findByIdAndDelete(req.params.id)
    if(!deleteNote) return res.status(404).json({message: "File not found"})
    res.json({message: "Note deleted"})
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({message:"Internal server error"});
  }
};